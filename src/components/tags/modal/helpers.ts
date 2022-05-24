export const randomColor = (): string => {
  return '#******'.replaceAll('*', () => Math.floor(Math.random() * 15).toString(16));
};
