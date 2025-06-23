import { InferSelectModel } from "drizzle-orm";

import {
  boolean,
  numeric,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
  jsonb,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").unique().notNull(),
  phone: text("phone"),
  subscribeNewsletter: boolean("subscribe_newsletter"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const products = pgTable("products", {
  id: uuid("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  category: text("category", {
    enum: ["seedlings", "fertilizers", "pesticides", "tools"],
  }).notNull(),
  price: numeric("price").notNull(),
  imageUrl: text("image_url").notNull(),
  inStock: boolean("in_stock").default(true),
  rating: numeric("rating"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const farmlands = pgTable("farmlands", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  location: text("location").notNull(),
  region: varchar("region", { length: 100 }).notNull(),
  size: numeric("size", { precision: 10, scale: 2 }).notNull(),
  price: numeric("price", { precision: 12, scale: 2 }).notNull(),
  pricePerAcre: numeric("price_per_acre", {
    precision: 12,
    scale: 2,
  }).notNull(),
  description: text("description").notNull(),
  features: jsonb("features").notNull().$type<string[]>(),
  images: jsonb("images").notNull().$type<string[]>(),
  waterAccess: boolean("water_access").notNull(),
  electricity: boolean("electricity").notNull(),
  roadAccess: varchar("road_access", { length: 20 }).notNull(),
  status: varchar("status", { length: 20 }).notNull(),
});

export type FarmlandType = InferSelectModel<typeof farmlands>;
export type ProductsType = InferSelectModel<typeof products>;
export type Users = InferSelectModel<typeof users>;
