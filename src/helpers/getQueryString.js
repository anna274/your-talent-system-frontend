const getQueryString = (queryParams = {}) => {
  const queriesArray = [];
  for (let [key, value] of Object.entries(queryParams)) {
    if (typeof value === 'string' || typeof value === 'number') {
      queriesArray.push(`${key}=${value}`);
    }
  }
  if (queryParams.filters) {
    for (let [key, value] of Object.entries(queryParams.filters)) {
      if (Array.isArray(value) && value.length) {
        queriesArray.push(`filters[${key}]=${JSON.stringify(value)}`);
      } else {
        queriesArray.push(`filters[${key}]=${value}`);
      }
    }
  }

  return queriesArray.length > 0 ? `?${queriesArray.join('&')}` : '';
};

export { getQueryString };
