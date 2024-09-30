import { asc } from "drizzle-orm";
import db from "./drizzle";
import { machines } from "./schema";
import { connectDB } from "@/db/sqlite";

export async function getAdmins() {
  try {
    const result = await db.query.admins.findMany({
      with: {
        machineAdmins: {
          columns: {},
          with: {
            machine: true,
          },
        },
      },
    });
    const finalResult = result.map((admin) => {
      const { machineAdmins, ...rest } = admin;
      return {
        ...rest,
        assignedMachines: admin.machineAdmins.map((machine) => machine.machine),
      };
    });
    return { success: true, data: finalResult };
  } catch (error) {
    return { success: false, message: "Something went wrong!" };
  }
}

export async function getMachines() {
  const result = await db.select().from(machines).orderBy(asc(machines.name));
  console.log("machines", result);
  return result;
}

export async function getSuperAdmin() {
  const result = await db.query.superAdmin.findFirst();
  return result;
}

export async function getDataFromTable(tableName: string) {
  const db = await connectDB();
  const data = await db.all(`SELECT * FROM sensor_data_08082024`);
  return data;
}
