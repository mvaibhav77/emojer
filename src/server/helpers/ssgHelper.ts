import { createServerSideHelpers } from "@trpc/react-query/server";
import { appRouter } from "../api/root";
import SuperJSON from "superjson";
import { db } from "@/server/db";

export const generateSSGHelper = () => {
  return createServerSideHelpers({
    router: appRouter,
    ctx: { db, userId: null },
    transformer: SuperJSON, // optional - adds superjson serialization
  });
};
