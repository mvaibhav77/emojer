import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { clerkClient } from "@clerk/nextjs/server";
import { filterUserForClient } from "@/server/helpers/filterUserData";

export const profileRouter = createTRPCRouter({
  getUserByUsername: publicProcedure
    .input(z.object({ username: z.string() }))
    .query(async ({ input }) => {
      const [user] = (
        await clerkClient().users.getUserList({
          username: [input.username],
        })
      ).data;

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      return filterUserForClient(user);
    }),
});
