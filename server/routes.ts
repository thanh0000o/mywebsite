
import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.post(api.visitors.log.path, async (req, res) => {
    try {
      const input = api.visitors.log.input.parse(req.body);
      const visitor = await storage.logVisitor(input);
      res.status(201).json(visitor);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(500).json({
          message: err.errors[0].message,
        });
      }
      throw err;
    }
  });

  return httpServer;
}
