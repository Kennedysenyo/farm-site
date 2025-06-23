export const hasCookie = async (name: string): Promise<boolean> => {
  return document.cookie
    .split(";")
    .map((c) => c.trim())
    .includes(`${name}=true`);
};

export const deleteCookie = async (name: string): Promise<void> => {
  document.cookie = `${name}=; Max-Age=0; path=/`;
};
