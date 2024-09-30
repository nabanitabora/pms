'use client';

import { Fragment, useState, useEffect, AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from 'react';
import Image from 'next/image';
import { BsThreeDots } from 'react-icons/bs';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { MdFileUpload } from 'react-icons/md';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { generateImageUrl } from '@/lib/utils';
import { deleteAdmin } from '@/app/actions';
import { useForm } from 'react-hook-form';
import { adminSchema } from '@/types/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ErrorMessage } from '@hookform/error-message';
import { Machine } from '@/db/schema';
import { MachineOption } from '@/types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
// import 'react-multi-select-component/dist/default.css'; // Ensure this is imported
import MultiSelect from 'react-multi-select-component';
import { updateAdminInfo } from '@/app/actions';

async function handleDelete(adminId: any) {
  const confirmed = window.confirm('Are you sure you want to delete?');
  if (confirmed) {
    const response = await deleteAdmin(Number(adminId));
    if (response.success) {
      alert('Admin deleted successfully!');
      // Add additional logic to update the UI, such as refetching data
    } else {
      alert('Something went wrong.');
    }
  }
}

function AdminItem({ admin, machines }) {
  const [showCreateAdmin, setShowCreateAdmin] = useState(false);
  const [selected, setSelected] = useState<MachineOption[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(adminSchema),
    defaultValues: {
      username: admin.username || '',
      password: admin.password || '',
      profileImage: undefined,
      assignedMachines: admin.assignedMachines || [],
    },
  });

  useEffect(() => {
    if (admin.assignedMachines) {
      setSelected(
        admin.assignedMachines.map((machine: { id: any; name: any; }) => ({
          id: machine.id,
          label: machine.name,
          value: machine.name,
        }))
      );
    }
  }, [admin.assignedMachines]);

  const profileImage = watch('profileImage');

  const options: MachineOption[] =
    machines?.length &&
    machines.map((machine: Machine) => ({
      id: machine.id,
      label: machine.name,
      value: machine.name,
    }));

    const submit = async (data: any) => {
      const plainData = {
        username: data.username,
        password: data.password,
        // profileImage: data.profileImage ? data.profileImage[0] : undefined,
        // assignedMachines: selected.map((machine) => ({
        //   id: machine.id,
        //   name: machine.label,
        // })),
      };
    console.log(data.username, "ssssssssssssssssssssssssssssssssssssssssssssssssssssss");
      const response = await updateAdminInfo(admin.id, plainData);
      if (response.success) {
        alert('Admin updated successfully!');
        setShowCreateAdmin(false);
        // Additional logic to update the UI
      } else {
        alert('Something went wrong.');
      }
    };
    

  return (
    <div
      key={admin.id}
      className="flex justify-between items-center p-10 shadow-[0px_18px_40px_0px_rgba(112,144,176,0.12)] rounded-[20px]"
    >
      {showCreateAdmin ? (
        <form
          onSubmit={handleSubmit(submit)}
          className="flex flex-col items-center gap-12 mb-10 w-full"
        >
          <div className="w-full flex-[0_0_20%]">
            <label
              htmlFor="profile"
              className="relative min-h-40 flex flex-col justify-center items-center bg-[#FAFCFE] rounded-lg border-2 border-dashed cursor-pointer"
            >
              {profileImage && profileImage[0] ? (
                <Image
                  src={URL.createObjectURL(profileImage[0])}
                  alt="profile"
                  fill
                  className="object-cover rounded-lg"
                />
              ) : (
                <>
                  <MdFileUpload size={32} className="fill-light-blue" />
                  <p className="text-sm font-bold text-light-blue">Upload</p>
                  <p className="text-[10px] font-medium text-[#8F9BBA]">
                    PNG/JPG
                  </p>
                </>
              )}
            </label>
            <ErrorMessage
              errors={errors}
              name="profileImage"
              render={({ message }) => (
                <p className="text-red-500 text-xs mt-0.5"> {message}</p>
              )}
            />
            <input
              {...register('profileImage')}
              id="profile"
              type="file"
              className="hidden"
            />
          </div>

          <div className="grid grid-cols-2 gap-5 w-full">
            <div>
              <label htmlFor="username">Username</label>
              <Input
                {...register('username')}
                type="text"
                id="username"
                className="w-full rounded-md mt-2"
              />
              <ErrorMessage
                errors={errors}
                name="username"
                render={({ message }) => (
                  <p className="text-red-500 text-xs mt-0.5"> {message}</p>
                )}
              />
            </div>
            <div>
              <label htmlFor="password">Create Password</label>
              <Input
                {...register('password')}
                type="password"
                id="password"
                className="w-full rounded-md mt-2"
              />
              <ErrorMessage
                errors={errors}
                name="password"
                render={({ message }) => (
                  <p className="text-red-500 text-xs mt-0.5"> {message}</p>
                )}
              />
            </div>
            <div className="col-span-2">
              <label htmlFor="machine">Assign Machine</label>
              <div className="relative mt-2">
              <select name="machines" id="machines">
                <optgroup>select machine</optgroup>
                <option value="">select</option>
                <option value="one" >Machine 1</option>
                <option value="two">Machine 2</option>
              </select>
              </div>
              {/* {options && (
                <div className="relative mt-2">
                  <MultiSelect
                    options={options}
                    value={selected}
                    onChange={setSelected}
                    labelledBy="Select"
                    hasSelectAll={false}
                    className="relative z-10" // Ensure it has a higher z-index
                  />
                </div>
              )} */}
            </div>
            <div className="flex items-end gap-4 col-span-2">
              <Button
                className="rounded-2xl max-w-[156px] w-full"
                variant="outline"
                type="submit"
                disabled={isSubmitting}
              >
                Save
              </Button>
              <Button
                className="rounded-2xl max-w-[156px] w-full"
                variant="ghost"
                type="button"
                onClick={() => setShowCreateAdmin(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>
      ) : (
        <>
          <div className="flex gap-8 items-center h-16">
            <Image
              src={
                admin.profileImage
                  ? generateImageUrl(admin.profileImage)
                  : '/dummy-profile.png'
              }
              width={66}
              height={66}
              alt="admin profile"
              className="rounded-xl object-cover aspect-square"
            />
            <div>
              <p className="font-bold text-dark-blue">{admin.username}</p>
              <p className="text-[#A3AED0]">Admin</p>
            </div>
            <div>
              <p className="font-bold text-dark-blue">Password</p>
              <p className="text-[#A3AED0]">{admin.password}</p>
            </div>
            <Separator orientation="vertical" />
            <div>
              <p className="font-bold text-dark-blue">Assign Machine</p>
              <p className="text-[#A3AED0]">
                {admin.assignedMachines.length
                  ? admin.assignedMachines.map((machine: { id: Key | null | undefined; name: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }, index: number) => (
                      <Fragment key={machine.id}>
                        {machine.name}
                        {admin.assignedMachines.length !== index + 1 && ', '}
                      </Fragment>
                    ))
                  : 'No machine assigned!'}
              </p>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon">
                <BsThreeDots size={18} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => setShowCreateAdmin(true)}>
                  Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => handleDelete(admin.id)}
                  className="text-red-600"
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )}
    </div>
  );
}

export default AdminItem;
