"use server";

import { cookies } from "next/headers";

export const getCookie = async (name: string): Promise<boolean> => {
  const cookiesStore = await cookies();
  return cookiesStore.get(name)?.value === "true";
};

export const deleteCookie = async (name: string) => {
  const cookiesStore = await cookies();
  if (cookiesStore.has(name)) {
    cookiesStore.delete(name);
  }
  return true;
};
