export const hasCookie = (name: string): boolean => {
  console.log(
    "The cookie was found?",
    document.cookie
      .split(";")
      .map((c) => c.trim())
      .includes("signin-success=true"),
  );
  return document.cookie
    .split(";")
    .map((c) => c.trim())
    .includes("signin-success=true");
};

export const deleteCookie = (name: string): void => {
  document.cookie = `${name}=; Max-Age=0; path=/`;
};
