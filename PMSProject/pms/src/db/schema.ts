import { relations, sql } from "drizzle-orm";
import {
  serial,
  text,
  pgTable,
  pgEnum,
  integer,
  primaryKey,
} from "drizzle-orm/pg-core";

export const superAdmin = pgTable("superAdmin", {
  id: serial("id").primaryKey().notNull(),
  profileImage: text("profileImage"),
  username: text("username").unique().notNull(),
  password: text("password").notNull(),
});

export type SuperAdmin = typeof superAdmin.$inferSelect;

export const admins = pgTable("admins", {
  id: serial("id").primaryKey().notNull(),
  username: text("username").unique().notNull(),
  password: text("password").notNull(),
  profileImage: text("image"),
  // assignedMachines: text("assignedMachines")
  //   .array()
  //   .notNull()
  //   .default(sql`ARRAY[]::text[]`),
});

export type Admin = typeof admins.$inferSelect;

export const statusEnum = pgEnum("status", ["active", "inactive"]);

export const machines = pgTable("machines", {
  id: serial("id").primaryKey().notNull(),
  name: text("title").notNull(),
  status: statusEnum("status").notNull(),
});

export type Machine = typeof machines.$inferSelect;

export const machineAdmins = pgTable(
  "machineAdmins",
  {
    adminId: integer("adminId")
      .references(() => admins.id, { onDelete: "cascade" })
      .notNull(),
    machineId: integer("machineId")
      .references(() => machines.id, { onDelete: "cascade" })
      .notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.adminId, table.machineId] }),
    };
  }
);

//Relations

export const adminRelations = relations(admins, ({ many }) => ({
  machineAdmins: many(machineAdmins),
}));

export const machineRealtions = relations(machines, ({ many }) => ({
  machineAdmins: many(machineAdmins),
}));

export const adminMachineRelations = relations(machineAdmins, ({ one }) => ({
  admin: one(admins, {
    fields: [machineAdmins.adminId],
    references: [admins.id],
  }),
  machine: one(machines, {
    fields: [machineAdmins.machineId],
    references: [machines.id],
  }),
}));
