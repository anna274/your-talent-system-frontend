export const formatDateString = (date: string | Date) => {
  return new Date(date).toLocaleDateString('ru', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const areSameDates = (dateStr1?: string, dateStr2?: string) => {
  if (!dateStr1 || !dateStr2) {
    return false;
  }
  const date1 = new Date(dateStr1);
  const date2 = new Date(dateStr2);
  return date1.setHours(0, 0, 0, 0) === date2.setHours(0, 0, 0, 0);
};
