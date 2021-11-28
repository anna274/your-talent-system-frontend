const getQueryString = (queryParams = {}) => {
  const queriesArray = [];
  for (let [key, value] of Object.entries(queryParams)) {
    if (typeof value === 'string' || typeof value === 'number') {
      queriesArray.push(`${key}=${value}`);
    }
    if (Array.isArray(value)) {
      if (value.length !== 0) {
        queriesArray.push(`${key}=${JSON.stringify(value)}`);
      }
    }
  }
  if (queryParams.filters) {
    for (let [key, value] of Object.entries(queryParams.filters)) {
      if (Array.isArray(value)) {
        if (value.length !== 0) {
          queriesArray.push(`filters[${key}]=${JSON.stringify(value)}`);
        }
      } else {
        if (value !== null && value !== '') {
          queriesArray.push(`filters[${key}]=${value}`);
        }
      }
    }
  }

  return queriesArray.length > 0 ? `?${queriesArray.join('&')}` : '';
};

export { getQueryString };
