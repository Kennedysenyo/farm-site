export const hasCookie = (name: string): boolean => {
  console.log(document.cookie);
  return document.cookie.includes(name);
  // .split(";")
  // .some((cookie) => cookie.trim().startsWith(`${name}=true`));
};

export const deleteCookie = (name: string): void => {
  document.cookie = `${name}=; Max-Age=0; path=/`;
};
