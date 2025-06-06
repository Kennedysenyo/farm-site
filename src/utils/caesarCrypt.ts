export const caesarCrypt = (
  type: "encrypt" | "decrypt",
  text: string,
  key: number,
): string => {
  const MIN = 32;
  const MAX = 126;
  const RANGE = MAX - MIN + 1;

  return [...text]
    .map((char) => {
      const code = char.charCodeAt(0);
      if (code >= MIN && code <= MAX) {
        const shift = type === "encrypt" ? key : -key;
        const shifted =
          ((((code - MIN + shift) % RANGE) + RANGE) % RANGE) + MIN;
        return String.fromCharCode(shifted);
      }
      return char;
    })
    .join("");
};
