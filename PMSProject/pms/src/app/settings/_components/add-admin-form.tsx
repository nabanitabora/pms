"use client";
import { FaCirclePlus } from "react-icons/fa6";
import { MdFileUpload } from "react-icons/md";
// import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MultiSelect } from "react-multi-select-component";
import { FormEvent, useState } from "react";
import { addAdmin } from "@/app/actions";
import { Machine } from "@/db/schema";
import { MachineOption } from "@/types";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import { adminSchema } from "@/types/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";
import { z } from "zod";
// import { Label } from "@/components/ui/label";
import { Label } from "recharts";
export default function AddAdminForm({
  machines,
}: {
  machines: Machine[] | undefined;
}) {
  const [selected, setSelected] = useState<MachineOption[]>([]);
  const [showCreateAdmin, setShowCreateAdmin] = useState(false);
  // const [profileImage, setProfileImage] = useState<File>();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(adminSchema),
    defaultValues: {
      username: "",
      password: "",
      profileImage: undefined,
    },
  });

  const profileImage = watch("profileImage");

  const options =
    machines?.length &&
    machines?.map((machine: Machine) => ({
      id: machine.id,
      label: machine.name,
      value: machine.name,
    }));

  async function submit(data: z.infer<typeof adminSchema>) {
    console.log("data -> ", data);

    const formData = new FormData();
    data.profileImage = data.profileImage[0];
    // data.assignedMachines = selected
    formData.append("assignedMachines", JSON.stringify(selected));
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const res = await addAdmin(formData);
    if (!res.success) alert("something went wrong!");
    if (res.success) {
      setShowCreateAdmin(false);
      reset()
    }
  }

  return (
    <>
      <div className="flex justify-between mb-6">
        <p className="text-lg font-semibold">Admins</p>
        <Button
          onClick={() => setShowCreateAdmin(true)}
          variant="ghost"
          className=" flex items-center gap-2 cursor-pointer text-[#A3AED0]"
        >
          <FaCirclePlus className="fill-light-blue bg-light-blue/5 p-1.5 box-content rounded-[10px]" />
          Create Admin
        </Button>
      </div>

      {showCreateAdmin && (
        <form
          onSubmit={handleSubmit(submit)}
          className="flex items-center gap-12 mb-10"
        >
          <div className="w-full flex-[0_0_20%] ">
            <label
              htmlFor="profile"
              className="relative min-h-40 flex flex-col justify-center items-center bg-[#FAFCFE] rounded-lg border-2 border-dashed cursor-pointer"
            >
              {profileImage && profileImage[0] ? (
                <Image
                  src={URL.createObjectURL(profileImage[0])}
                  alt="profile"
                  fill
                  className=" object-cover rounded-lg"
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
              // onChange={(e) => setProfileImage(e.target.files?.[0])}
              {...register("profileImage")}
              // name="profile"
              id="profile"
              type="file"
              className="hidden"
            />
          </div>

          <div className="grid grid-cols-2 gap-5 w-full">
            <div>
              <label htmlFor="username">Username</label>
              <Input
                {...register("username")}
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
                {...register("password")}
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
            <div>
              <label htmlFor="machine">Assign Machine</label>
              {options && (
                <MultiSelect
                  className=" mt-2"
                  options={options}
                  value={selected}
                  onChange={setSelected}
                  labelledBy="Select"
                  hasSelectAll={false}
                  overrideStrings={{
                    allItemsAreSelected: `${options.map((o) => ` ${o.label}`)}`,
                  }}
                />
              )}
            </div>
            <div className="flex items-end gap-4">
              <Button
                className="rounded-2xl max-w-[156px] w-full"
                variant="outline"
                type="submit"
                disabled={isSubmitting}
              >
                Add
              </Button>
              <Button
                // disabled
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
      )}
    </>
  );
}