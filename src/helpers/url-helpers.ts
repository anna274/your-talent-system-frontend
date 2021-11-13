export const getReturnToUrl = (search: string) => new URLSearchParams(search).get('returnTo');
