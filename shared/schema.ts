
import { pgTable, text, serial, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Minimal schema since this is primarily a visual site
// We can use this to track simple things like a guestbook or just system status
export const visitors = pgTable("visitors", {
  id: serial("id").primaryKey(),
  userAgent: text("user_agent"),
  timestamp: text("timestamp").notNull(),
});

export const insertVisitorSchema = createInsertSchema(visitors);

export type Visitor = typeof visitors.$inferSelect;
export type InsertVisitor = z.infer<typeof insertVisitorSchema>;
