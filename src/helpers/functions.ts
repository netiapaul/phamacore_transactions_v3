export const numberFormatter = new Intl.NumberFormat("en-GB");

export const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});
