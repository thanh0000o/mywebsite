
import { pgTable, text, serial, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const visitors = pgTable("visitors", {
  id: serial("id").primaryKey(),
  userAgent: text("user_agent"),
  timestamp: text("timestamp").notNull(),
});

export const insertVisitorSchema = createInsertSchema(visitors);

export type Visitor = typeof visitors.$inferSelect;
export type InsertVisitor = z.infer<typeof insertVisitorSchema>;

export const guestbookMessages = pgTable("guestbook_messages", {
  id: serial("id").primaryKey(),
  username: text("username").notNull(),
  message: text("message").notNull(),
  timestamp: text("timestamp").notNull(),
});

export const insertGuestbookMessageSchema = createInsertSchema(guestbookMessages).omit({ id: true });

export type GuestbookMessage = typeof guestbookMessages.$inferSelect;
export type InsertGuestbookMessage = z.infer<typeof insertGuestbookMessageSchema>;
