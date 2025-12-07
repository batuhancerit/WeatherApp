export const getDayName = (dateStr, locale) => {
    let date = new Date(dateStr);
    return date.toLocaleDateString(locale, { weekday: "long" });
  };