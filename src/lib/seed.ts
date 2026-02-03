import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { siteContent } from "./schema";

const sqlite = new Database("./local.db");
const db = drizzle(sqlite);

const seedData = [
  { key: "hero_tagline", value: "Cildinize Sanat, Ruhunuza Dokunuş" },
  {
    key: "about_text",
    value:
      "Beste Bozkurt, profesyonel dövme sanatçısı olarak her tasarımda özgün ve kişiye özel çalışmalar üretmektedir. Bestemiy Ink olarak, sanatı cildinize taşıyorum.",
  },
  { key: "contact_phone", value: "+90 536 749 81 54" },
  { key: "contact_email", value: "bestemiytattoo@gmail.com" },
  { key: "contact_address", value: "Kutlubey Mahallesi, Ak Fatma Sevil Sokak No:3 Kat:3 Daire:3, 32100 Burdur Merkez/Isparta" },
  { key: "working_hours", value: "Pazartesi - Cumartesi: 10:00 - 20:00" },
  { key: "whatsapp_number", value: "905367498154" },
  { key: "instagram_url", value: "https://instagram.com/bestemiy" },
];

async function seed() {
  console.log("Seeding site_content...");

  for (const item of seedData) {
    db.insert(siteContent)
      .values(item)
      .onConflictDoNothing()
      .run();
  }

  console.log(`Seeded ${seedData.length} site_content entries.`);
  process.exit(0);
}

seed();
