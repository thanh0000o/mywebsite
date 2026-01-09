
import { db } from "./db";
import {
  visitors,
  guestbookMessages,
  type InsertVisitor,
  type Visitor,
  type InsertGuestbookMessage,
  type GuestbookMessage
} from "@shared/schema";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  logVisitor(visitor: InsertVisitor): Promise<Visitor>;
  getGuestbookMessages(): Promise<GuestbookMessage[]>;
  createGuestbookMessage(message: InsertGuestbookMessage): Promise<GuestbookMessage>;
}

export class DatabaseStorage implements IStorage {
  async logVisitor(insertVisitor: InsertVisitor): Promise<Visitor> {
    const [visitor] = await db.insert(visitors).values(insertVisitor).returning();
    return visitor;
  }

  async getGuestbookMessages(): Promise<GuestbookMessage[]> {
    return db.select().from(guestbookMessages).orderBy(desc(guestbookMessages.id)).limit(50);
  }

  async createGuestbookMessage(message: InsertGuestbookMessage): Promise<GuestbookMessage> {
    const [guestbookMessage] = await db.insert(guestbookMessages).values(message).returning();
    return guestbookMessage;
  }
}

export const storage = new DatabaseStorage();
