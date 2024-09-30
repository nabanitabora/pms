"use client";
import { updateMachineName, updateMachineStatus } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useMutation } from "@tanstack/react-query";
import { FormEvent } from "react";
import { MdEdit } from "react-icons/md";
import { useQueryClient } from "@tanstack/react-query";
import { Machine } from "@/db/schema";

export default function MachineForm({ machine }: { machine: Machine }) {
  const queryClient = useQueryClient();

  const machineName = useMutation({
    mutationFn: updateMachineName,
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: ["machines"] });
    // },
  });

  const machineStatus = useMutation({
    mutationFn: updateMachineStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["machines"] });
    },
  });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("name") as string;

    const res = await machineName.mutateAsync({ id: machine.id, name });
    if (!res.success) alert("something went wrong!");
    (
      document.getElementById(machine.id.toString()) as HTMLInputElement
    ).checked = false;
  }

  return (
    <>
      <input
        type="checkbox"
        className="hidden peer"
        id={machine.id.toString()}
      />

      <form
        onSubmit={handleSubmit}
        className="w-full flex-col sm:flex-row items-start  sm:items-center justify-between gap-4 hidden peer-checked:flex"
      >
        <Input
          name="name"
          required
          type="text"
          defaultValue={machine.name}
          className="bg-[#F4F7FE] border-none"
        />
        <Button
          disabled={machineName.isPending}
          className="bg-dark-blue rounded-full hover:bg-dark-blue/90 max-w-24 w-full"
        >
          Save
        </Button>
      </form>

      <div className="w-full flex flex-col sm:flex-row items-start  sm:items-center justify-between gap-4 peer-checked:hidden">
        <p className="font-bold text-dark-blue flex items-center gap-3">
          {machine.name}
          <Button asChild variant="ghost" size="icon">
            <label htmlFor={machine.id.toString()} className="cursor-pointer">
              <MdEdit className="fill-[#8F9BBA] cursor-pointer" size={18} />
            </label>
          </Button>
        </p>
        <div className="flex items-center gap-4">
          <p className="text-sm font-medium text-green-500">Active</p>
          <Switch
            name="status"
            defaultChecked={machine.status === "active" ? true : false}
            disabled={machineStatus.isPending}
            onCheckedChange={async (value) =>
              await machineStatus.mutateAsync({
                id: machine.id,
                status: value === true ? "active" : "inactive",
              })
            }
            className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500"
          />
          <p className="text-sm font-medium text-[#D8D8D8]">Inactive</p>
        </div>
      </div>
    </>
  );
}