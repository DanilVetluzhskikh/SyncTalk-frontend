export const sleep = (duration: number) => {
  return new Promise(res => {
    setTimeout(res, duration);
  });
};
