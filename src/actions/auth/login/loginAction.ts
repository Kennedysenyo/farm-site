import { createClient } from "@/lib/supabase/server";
import { handleError } from "@/utils/handleError";

export const loginAction = async (
  email: string,
  password: string,
): Promise<string | null> => {
  try {
    const { auth } = await createClient();
    const { error } = await auth.signInWithPassword({ email, password });
    if (error) throw error;
    return null;
  } catch (error) {
    return handleError(error);
  }
};
