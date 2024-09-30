"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateSuperAdminPassword } from "@/app/actions";
import { FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
export default function SuperAdminPasswordForm({
  superAdmin,
}: {
  superAdmin: { id: number; password: string };
}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateSuperAdminPassword,
  });
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const password = formData.get("password") as string;

    const res = await mutateAsync({ id: superAdmin.id, password });
    if (!res.success) alert(res?.message || "Something went wrong");
    (document.getElementById("edit") as HTMLInputElement).checked = false;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col sm:flex-row items-start  sm:items-center justify-between gap-4  "
    >
      <Input
        name="password"
        required
        type="text"
        defaultValue={superAdmin?.password}
        className="bg-[#F4F7FE] border-none"
      />
      <Button
        disabled={isPending}
        type="submit"
        className="bg-dark-blue rounded-full hover:bg-dark-blue/90 max-w-24 w-full"
      >
        Save
      </Button>
    </form>
  );
}