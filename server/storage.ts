
import { db } from "./db";
import {
  visitors,
  type InsertVisitor,
  type Visitor
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  logVisitor(visitor: InsertVisitor): Promise<Visitor>;
}

export class DatabaseStorage implements IStorage {
  async logVisitor(insertVisitor: InsertVisitor): Promise<Visitor> {
    const [visitor] = await db.insert(visitors).values(insertVisitor).returning();
    return visitor;
  }
}

export const storage = new DatabaseStorage();
