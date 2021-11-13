export const isObjectEmpty = (obj = {}) => Object.keys(obj).length === 0;

export const objectToFormData = (obj) => {
  const fd = new FormData();
  for (const key in obj) {
    if (typeof obj[key] === 'object' && !(obj[key] instanceof File)) {
      fd.append(key, JSON.stringify(obj[key]));
    } else {
      fd.append(key, obj[key]);
    }
  }
  return fd;
};
