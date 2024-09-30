import { cwd } from "node:process";
import { defineConfig } from "drizzle-kit";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(cwd());

export default defineConfig({
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  // out: "./src/db/migrations",
  dbCredentials: {
    url: process.env.DB_URL!,
    database: "postgres",
  },
  verbose: true,
  strict: true,
});
