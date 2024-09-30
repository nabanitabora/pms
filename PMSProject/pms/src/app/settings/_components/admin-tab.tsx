// admin-tab.tsx
import { Fragment } from "react";
import AddAdminForm from "./add-admin-form";
import { getAdmins, getMachines } from "@/db/queries";
import AdminItem from "./AdminItem"; // Import the client component

export default async function AdminTab() {
  const result = await getAdmins();
  const machines = await getMachines();

  if (!result.success) return <p>Oops something went wrong</p>;
  const admins = result.data;

  return (
    <div>
      <AddAdminForm machines={machines} />

      {/* Admin list */}
      <div className="space-y-10">
        {admins &&
          admins.map((admin) => (
            <AdminItem key={admin.id} admin={admin} machines={undefined} />
          ))}
      </div>
    </div>
  );
}