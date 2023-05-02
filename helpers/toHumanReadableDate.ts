function toHumanReadableDate(ISODate: Date | string) {
  const date = new Date(ISODate);

  const dateTimeFormat = new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return dateTimeFormat.format(date);
}

export default toHumanReadableDate;
