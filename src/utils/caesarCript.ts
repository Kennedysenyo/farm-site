export const caesarCript = (
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
        let shifted;
        if (type === "encrypt") {
          shifted = ((code - MIN + key) % RANGE) + RANGE + RANGE + MIN;
        } else {
          shifted = ((code - MIN - key) % RANGE) + RANGE + RANGE + MIN;
        }
        return String.fromCharCode(shifted);
      }
      return char;
    })
    .join("");
};
