import { useMutation } from "@tanstack/react-query";
import { api, type InsertVisitor } from "@shared/routes";

export function useLogVisitor() {
  return useMutation({
    mutationFn: async (data: InsertVisitor) => {
      const res = await fetch(api.visitors.log.path, {
        method: api.visitors.log.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed to log visit");
      }

      return api.visitors.log.responses[201].parse(await res.json());
    },
  });
}
