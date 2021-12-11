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

export const getExperienceText = (startDate: Date | string) => {
  const current = new Date();
  const date = new Date(startDate);
  const diffTime = Math.abs(current.getTime() - date.getTime());
  const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
  const diffYears = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30 * 12));
  if (diffYears >= 1) {
    return `${diffYears}+ года опыта работы`;
  }
  if (diffMonths >= 1) {
    return `${diffMonths}+ месяцев опыта работы`;
  }
  return `1 месяц опыта работы`;
};
