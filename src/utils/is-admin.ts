import { db } from "@/db";
import { users } from "@/db/schema";

import { eq } from "drizzle-orm";

export const isAdmin = async (id: string) => {
  const dbUser = await db
    .select({ role: users.role })
    .from(users)
    .where(eq(users.id, id));
  console.log("this is from the middleware", dbUser);

  if (!dbUser[0] || dbUser[0].role !== "admin") {
    return false;
  }
  return true;
};
