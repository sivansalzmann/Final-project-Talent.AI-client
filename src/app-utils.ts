export const dateAsDate = (date: Date) => {
  return (
    date?.getUTCFullYear() +
    "-" +
    (date.getUTCMonth() + 1) +
    "-" +
    date?.getUTCDate()
  );
};
