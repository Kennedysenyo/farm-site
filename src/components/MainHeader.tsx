import { getUser } from "@/lib/supabase/server";
import { Header } from "./Header";
import { User } from "@supabase/supabase-js";

export const MainHeader = async () => {
  const user: User | null = await getUser();
  return <Header user={user} />;
};
