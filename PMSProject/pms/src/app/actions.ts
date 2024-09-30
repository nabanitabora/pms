"use server";

import db from "@/db/drizzle";
import { admins, machineAdmins, machines, superAdmin } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { encrypt, getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { MachineOption } from "@/types";
import { NextApiRequest, NextApiResponse } from 'next';
import { getDataFromTable } from "@/db/queries";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export async function addAdmin(formData: FormData) {
  try {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const profileImage = formData.get("profileImage") as File;
    const assignedMachines = JSON.parse(
      formData.get("assignedMachines") as string
    );

    // console.log("formdata --", formData);

    // return;
    const { data, error } = await supabase.storage
      .from("pms")
      .upload(profileImage.name, profileImage);

    if (error)
      return { success: false, message: "Failed to upload profile picture!" };

    if (!username || !password)
      return {
        success: false,
        message: "Please provide username and password",
      };

    const admin = await db
      .insert(admins)
      .values({ username, password, profileImage: data.path })
      .returning({ id: admins.id });

    if (assignedMachines.length > 0) {
      const adminMachines = assignedMachines.map((machine: MachineOption) => {
        return {
          adminId: admin[0].id,
          machineId: machine?.id,
        };
      });

      await db.insert(machineAdmins).values(adminMachines);
    }

    revalidatePath("/settings");
    return { success: true, message: "Admin created successfully!" };
  } catch (error) {
    console.log("errer ", error);
    return { success: false, message: "Something went wrong!" };
  }
}

export async function updateMachineName({
  id,
  name,
}: {
  id: number;
  name: string;
}) {
  await db.update(machines).set({ name }).where(eq(machines.id, id));

  revalidatePath("/settings");
  return {
    success: true,
    message: "Machine name updated successfully!",
    // data: updatedMachine,
  };
}

export async function updateSuperAdminPassword({
  id,
  password,
}: {
  id: number;
  password: string;
}) {
  const currentAdmin = await getSession();
  // console.log("currentAdmin", currentAdmin);
  if (currentAdmin?.username !== "ajay")
    return {
      success: false,
      message: "You are not authorized to update password",
    };

  if (!password || !id)
    return { success: false, message: "Please provide password to update" };
  try {
    await db.update(superAdmin).set({ password }).where(eq(superAdmin.id, id));
    revalidatePath("/settings");
    return { success: true, message: "Password updated successfully!" };
  } catch (error) {
    return { success: false, message: "Something went wrong!" };
  }
}

export async function updateMachineStatus({
  id,
  status,
}: {
  id: number;
  status: "active" | "inactive";
}) {
  await db.update(machines).set({ status }).where(eq(machines.id, id));

  revalidatePath("/settings");
}

export async function login({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  if (!username || !password) {
    return { success: false, message: "Please provide username and password" };
  }

  const superAdmin = await db.query.superAdmin.findFirst();

  if (username !== superAdmin?.username || password !== superAdmin?.password) {
    return { success: false, message: "Invalid username or password" };
  }

  const token = await encrypt({ username, expires: new Date() });
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);

  cookies().set("session", token, {
    expires,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
  redirect("/dashboard");
  // return { success: true, message: "Logged in successfully" };
}

export async function logout() {
  cookies().delete("session");
  redirect("/login");
}

export async function updateSuperAdminProfile(formData: FormData) {
  try {
    const profile = formData.get("profile") as File;
    const id = formData.get("superAdminId") as string;
    const oldProfileImage = formData.get("oldProfileImage") as string;

    if (oldProfileImage) {
      await supabase.storage.from("pms").remove([oldProfileImage]);
    }
    const { data, error } = await supabase.storage
      .from("pms")
      .upload(profile?.name, profile);
    if (error) {
      console.log("err --> ", error);
      return {
        success: false,
        message: error.message || "Failed to upload profile",
      };
    }
    await db
      .update(superAdmin)
      .set({ profileImage: data.path })
      .where(eq(superAdmin.id, Number(id)));
    revalidatePath("/settings");
    return { success: true, message: "Profile updated successfully!" };
  } catch (error) {
    return { success: false, message: "Something went wrong!" };
  }
}


export async function updateAdminInfo( 
  id: number,
  username: string,
  password: string,
) {
  await db.update(admins).set({ username , password }).where(eq(admins.id, id));

  revalidatePath("/settings");
  return {
    success: true,
    message: "Admin Information updated successfully!",
    // data: updatedMachine,
  };
}

export async function deleteAdmin(id: number) {
  await db.delete(admins).where(eq(admins.id, id));
  
  revalidatePath("/settings");
  return {
    success: true,
    message: "Admin deleted successfully!",
    // data: updatedMachine,
  };
}

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     const { table } = req.query;
//     if (!table) {
//       return res.status(400).json({ message: "Table name is required" });
//     }

//     const data = await getDataFromTable(table as string);
//     res.status(200).json(data);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching data", error });
//   }
// }