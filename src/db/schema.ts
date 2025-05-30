import { InferSelectModel } from "drizzle-orm";
import {
  boolean,
  numeric,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  category: text("category", {
    enum: ["seedlings", "fertilizers", "pesticides", "tools"],
  }).notNull(),
  price: numeric("price").notNull(),
  imageUrl: text("image_url").notNull(),
  inStock: boolean("in_stock").default(true),
  highlighted: boolean("highlighted").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type ProductsType = InferSelectModel<typeof products>;
