import { defineConfig } from "drizzle-kit";

export default defineConfig(
  process.env.TURSO_DATABASE_URL
    ? {
        dialect: "turso",
        schema: "./src/lib/schema.ts",
        out: "./drizzle",
        dbCredentials: {
          url: process.env.TURSO_DATABASE_URL,
          authToken: process.env.TURSO_AUTH_TOKEN,
        },
      }
    : {
        dialect: "sqlite",
        schema: "./src/lib/schema.ts",
        out: "./drizzle",
        dbCredentials: {
          url: "file:./local.db",
        },
      }
);
