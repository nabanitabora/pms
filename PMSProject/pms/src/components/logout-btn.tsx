"use client";
import { Button } from "./ui/button";
import { logout } from "@/app/actions";
export default function LogoutBtn() {
  return (
    <Button onClick={async () => await logout()} variant="destructive">
      Logout
    </Button>
  );
}
