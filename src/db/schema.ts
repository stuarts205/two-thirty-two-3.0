import { pgTable, text, uuid } from "drizzle-orm/pg-core";


export const slides = pgTable("slide_info", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  slidename: text("slidename").notNull(),
  people: text("people").notNull(),
  approxDate: text("approxDate").notNull(),
  // createdAt: date("created_at").defaultNow().notNull(),
  // updatedAt: date("updated_at").defaultNow().notNull(),
});