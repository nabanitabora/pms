import { MdEdit } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { getSuperAdmin } from "@/db/queries";
import SuperAdminPasswordForm from "./superadmin-password-form";
import SuperAdminProfile from "./superadmin-profile";

export default async function SettingsTab() {
  const superAdmin = await getSuperAdmin();

  return (
    <div>
      <p className="text-lg font-semibold mb-6">My Profile</p>
      <SuperAdminProfile superAdmin={superAdmin} />
      <div className="max-w-xl shadow-[0px_18px_40px_0px_rgba(112,144,176,0.12)] px-8 py-6 rounded-2xl">
        <input className="hidden peer" type="checkbox" id="edit" />
        <div className="w-full flex justify-between items-center peer-checked:hidden">
          <div>
            <p className="text-[#A3AED0]">Password</p>
            <p className="font-bold text-dark-blue">{superAdmin?.password}</p>
          </div>
          <Button variant="ghost" size="icon">
            <label
              className="size-full grid place-content-center cursor-pointer"
              htmlFor="edit"
            >
              <MdEdit className="fill-[#8F9BBA] cursor-pointer" size={20} />
            </label>
          </Button>
        </div>

        <div className="hidden peer-checked:block">
          {superAdmin && <SuperAdminPasswordForm superAdmin={superAdmin} />}
        </div>
      </div>
    </div>
  );
}