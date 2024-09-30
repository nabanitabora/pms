import { z } from "zod";

export const adminSchema = z.object({
  // id: z.number(),
  username: z.string().trim().min(1, { message: "Username is required" }),
  password: z.string().trim().min(1, { message: "Password is required" }),
  profileImage: z
    .any()
    .refine((file) => file?.length == 1, "File is required.")
    .refine((file) => file[0]?.size <= 6000000, `Max file size is 6MB.`),
  // assignedMachines: z.array(z.string()),
});
