"use server";
import { createClient } from "@/lib/supabase/server";
import { handleError } from "@/utils/handleError";

export const logOut = async (): Promise<string | null> => {
  try {
    const { auth } = await createClient();
    const { error } = await auth.signOut();
    if (error) throw error;
    return null;
  } catch (error) {
    return handleError(error);
  }
};
