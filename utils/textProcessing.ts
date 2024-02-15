export const shortenDisplayText = (text: String, maxLength: number) => {
  return text && text.length > maxLength
    ? text.slice(0, maxLength - 3) + "..."
    : text;
};
