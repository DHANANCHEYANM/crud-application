import {
  pgTable,
  text,
  timestamp,
 } from "drizzle-orm/pg-core";

 
export const contacts = pgTable("contacts", {
  id: text("id")
    .$defaultFn(() => crypto.randomUUID())
    .primaryKey(),

  name: text("name").notNull(),

  email: text("email").notNull(),

  phone: text("phone").notNull(),

  status: text("status").notNull(),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
});