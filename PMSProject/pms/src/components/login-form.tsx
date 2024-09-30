"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/app/actions";

export default function LoginForm() {
  const mutation = useMutation({
    mutationFn: login,
  });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const res = await mutation.mutateAsync({ username, password });
    // console.log(res);
    if (res && res?.success === false) {
      alert(res?.message || "something went wrong");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <Label
          htmlFor="username"
          className="text-dark-blue font-medium text-sm"
        >
          Username<span className="text-light-blue">*</span>
        </Label>
        <Input
          name="username"
          id="username"
          type="text"
          className="rounded-2xl w-full mt-2 h-12"
          required
        />
      </div>
      <div className="mb-12">
        <Label
          htmlFor="password"
          className="text-dark-blue font-medium text-sm"
        >
          Password<span className="text-light-blue">*</span>
        </Label>
        <Input
          name="password"
          id="password"
          type="password"
          className="rounded-2xl w-full  mt-2 h-12"
          required
        />
      </div>

      <Button
        disabled={mutation.isPending}
        type="submit"
        className="w-full rounded-2xl h-12"
      >
        Log in
      </Button>
    </form>
  );
}
