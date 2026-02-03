import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql, type InferSelectModel, type InferInsertModel } from "drizzle-orm";

export const tattoos = sqliteTable("tattoos", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description"),
  category: text("category").notNull(),
  image_url: text("image_url").notNull(),
  featured: integer("featured").default(0),
  created_at: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updated_at: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export const siteContent = sqliteTable("site_content", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
  updated_at: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export const testimonials = sqliteTable("testimonials", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  text: text("text").notNull(),
  created_at: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export type Tattoo = InferSelectModel<typeof tattoos>;
export type NewTattoo = InferInsertModel<typeof tattoos>;
export type SiteContent = InferSelectModel<typeof siteContent>;
export type NewSiteContent = InferInsertModel<typeof siteContent>;
export type Testimonial = InferSelectModel<typeof testimonials>;
export type NewTestimonial = InferInsertModel<typeof testimonials>;
