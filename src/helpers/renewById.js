const renewById = (arr, renewItem) =>
  arr.map((item) => (item.id === renewItem.id ? renewItem : item));

export { renewById };
