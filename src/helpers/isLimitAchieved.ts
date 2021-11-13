export const isLimitAchieved = (items: any[], size?: number) => {
  if (!items.length || !size) {
    return false;
  }
  return items.length < size;
};
