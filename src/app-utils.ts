export const dateAsDate = (date: Date) => {
  return (
    date?.getUTCFullYear() +
    "-" +
    (date.getUTCMonth() + 1) +
    "-" +
    date?.getUTCDate()
  );
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
