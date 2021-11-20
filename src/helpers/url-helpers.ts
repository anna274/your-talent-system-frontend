export const getReturnToUrl = (search: string) => new URLSearchParams(search).get('returnTo');
export const getSearchParamByName = (search: string, name: string) =>
  new URLSearchParams(search).get(name);
