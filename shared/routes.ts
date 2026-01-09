
import { z } from 'zod';
import { insertVisitorSchema, visitors, insertGuestbookMessageSchema, guestbookMessages } from './schema';

export const errorSchemas = {
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  visitors: {
    log: {
      method: 'POST' as const,
      path: '/api/visitors/log',
      input: insertVisitorSchema,
      responses: {
        201: z.custom<typeof visitors.$inferSelect>(),
        500: errorSchemas.internal,
      },
    },
  },
  guestbook: {
    list: {
      method: 'GET' as const,
      path: '/api/guestbook',
      responses: {
        200: z.array(z.custom<typeof guestbookMessages.$inferSelect>()),
        500: errorSchemas.internal,
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/guestbook',
      input: insertGuestbookMessageSchema,
      responses: {
        201: z.custom<typeof guestbookMessages.$inferSelect>(),
        500: errorSchemas.internal,
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
