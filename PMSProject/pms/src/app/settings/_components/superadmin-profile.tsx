"use client";
import { updateSuperAdminProfile } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { SuperAdmin } from "@/db/schema";
import { generateImageUrl } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { FormEvent, useState } from "react";

export default function SuperAdminProfile({
  superAdmin,
}: {
  superAdmin: SuperAdmin | undefined;
}) {
  const [profile, setProfile] = useState<File>();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateSuperAdminProfile,
  });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profile", profile!);
    formData.append("superAdminId", superAdmin?.id?.toString()!);
    formData.append("oldProfileImage", superAdmin?.profileImage!);
    const res = await mutateAsync(formData);
    if (res.success) {
      alert("Profile updated successfully");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-6 items-center mb-6">
      <label className="cursor-pointer" htmlFor="profile">
        <Image
          className="rounded-2xl object-cover aspect-square "
          src={
            profile
              ? URL.createObjectURL(profile)
              : superAdmin?.profileImage
              ? generateImageUrl(superAdmin?.profileImage)
              : "/dummy-profile.png"
          }
          width="87"
          height="87"
          alt="admin profile picture"
        />
      </label>
      <input
        onChange={(e) => setProfile(e.target.files?.[0])}
        className="hidden"
        type="file"
        name="profile"
        id="profile"
      />

      <Button
        type="submit"
        variant="outline"
        className="rounded-2xl max-w-[156px] w-full"
        disabled={isPending}
      >
        Upload
      </Button>
      <Button type="button" disabled variant="ghost" className="rounded-2xl">
        Delete
      </Button>
    </form>
  );
}