export const compareStrings = (str1: string, str2: string) => {
  if (str1 === str2) {
    return 0;
  }
  return str1 > str2 ? 1 : -1;
};
