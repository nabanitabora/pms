// /db/sqlite.ts
import { Database, open } from "sqlite";
import sqlite3 from "sqlite3";

let db: Database | null = null;

export async function connectDB() {
  if (!db) {
    db = await open({
      filename: 'C:/Users/DELL/Desktop/data1.db',
      driver: sqlite3.Database,
    });
    console.log("Database connection established");
  }
  return db;
}