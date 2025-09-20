import { v } from "convex/values";
import { query } from "./_generated/server";

export const hasEntitalment = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    for await (const sub of ctx.db
      .query("subscriptions")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))) {
      const status = String(sub.status || "").toLocaleLowerCase();
      const periodDK =
        sub.currentPeriodEnd == null || sub.currentPeriodEnd > now;
      if (status === "active" && periodDK) {
        return true;
      }
    }
    return false;
  },
});
