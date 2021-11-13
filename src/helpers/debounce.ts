function debounce(f: Function, ms: number) {
  let timer: number | NodeJS.Timeout;
  return function (...args: any[]) {
    clearTimeout(timer as number);
    timer = setTimeout(() => f(...args), ms);
  };
}

export { debounce };
