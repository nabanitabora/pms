import Link from "next/link";
import AdminTab from "./_components/admin-tab";
import MachineTab from "./_components/machine-tab";
import SettingsTab from "./_components/settings-tab";
import { Button } from "@/components/ui/button";
import { logout } from "@/app/actions";
import LogoutBtn from "@/components/logout-btn";

const tabs = [
  {
    title: "Admins",
    tab: "admins",
  },
  {
    title: "Machines",
    tab: "machines",
  },
  {
    title: "My Settings",
    tab: "settings",
  },
];

export default function Settings({
  searchParams,
}: {
  searchParams: { tab: string };
}) {
  const activeTab = searchParams.tab;

  return (
    <main className="max-w-[1086px] mx-auto p-6">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-[32px] font-bold text-dark-blue">Settings</h1>
          <p className="font-light text-[#575F6E]">Admin and Machines</p>
        </div>
       <div className="flex items-end gap-4">
        <form action={logout}>
          <Button type="submit" variant="destructive">
            Logout
          </Button>
        </form>
        <Link href="/dashboard">
          <Button type="button">
            Back
          </Button>
        </Link>
        </div> 
      </div>

      <div className="flex gap-5 md:gap-8 border-b border-[#D4D4D4] overflow-auto">
        {tabs.map((tab) => (
          <p key={tab.tab} className="relative pb-2 px-3 whitespace-nowrap">
            <Link
              href={`/settings?tab=${tab.tab}`}
              className={`${
                (activeTab === tab.tab ||
                  (!activeTab && tab.tab === "admins")) &&
                "after:absolute after:-bottom-0 after:left-0 after:w-full after:h-1 after:bg-light-blue"
              }`}
            >
              {tab.title}
            </Link>
          </p>
        ))}
      </div>

      <div className="pt-6">
        {(!activeTab || activeTab === "admins") && <AdminTab />}
        {activeTab === "machines" && <MachineTab />}
        {activeTab === "settings" && <SettingsTab />}
      </div>
    </main>
  );
}
