import * as schema from "./schema";

let db: ReturnType<typeof createDrizzle>;

function createDrizzle() {
  if (process.env.TURSO_DATABASE_URL) {
    const { createClient } = require("@libsql/client");
    const { drizzle } = require("drizzle-orm/libsql");
    const client = createClient({
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN,
    });
    return drizzle(client, { schema });
  } else {
    const Database = require("better-sqlite3");
    const { drizzle } = require("drizzle-orm/better-sqlite3");
    const sqlite = new Database("./local.db");
    return drizzle(sqlite, { schema });
  }
}

db = createDrizzle();

export { db };
