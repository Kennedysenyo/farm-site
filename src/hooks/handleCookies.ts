export const hasCookie = (name: string): boolean => {
  return document.cookie
    .split(";")
    .map((c) => c.trim())
    .includes(`${name}=true`);
};

export const deleteCookie = (name: string): void => {
  document.cookie = `${name}=; Max-Age=0; path=/`;
};
