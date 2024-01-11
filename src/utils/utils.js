export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const getMonth = (index) => {
  return months[index];
};

export const getTime = (date) => {
  const now = new Date();
  const differenceDays = now.getTime() - new Date(date).getTime();

  if (differenceDays < 60 * 1000) {
    return "Just now";
  }

  if (differenceDays >= 60 * 1000 && differenceDays < 60 * 60 * 1000) {
    return Math.round(differenceDays / (60 * 1000)) === 1
      ? `1 minute ago`
      : `${Math.round(differenceDays / (60 * 1000))} minutes ago`;
  }

  if (
    differenceDays >= 60 * 60 * 1000 &&
    differenceDays < 24 * 60 * 60 * 1000
  ) {
    return Math.round(differenceDays / (60 * 60 * 1000)) === 1
      ? "1 hour ago"
      : `${Math.round(differenceDays / (60 * 60 * 1000))} hours ago`;
  }

  if (
    differenceDays >= 24 * 60 * 60 * 1000 &&
    differenceDays < 30 * 24 * 60 * 60 * 1000
  ) {
    return Math.round(differenceDays / (24 * 60 * 60 * 1000)) === 1
      ? "1 hour ago"
      : `${Math.round(differenceDays / (24 * 60 * 60 * 1000))} days ago`;
  }

  if (
    differenceDays >= 30 * 24 * 60 * 60 * 1000 &&
    differenceDays < 365 * 30 * 24 * 60 * 60 * 1000
  ) {
    return Math.round(differenceDays / (30 * 24 * 60 * 60 * 1000)) === 1
      ? "1 month ago"
      : `${Math.round(differenceDays / (30 * 24 * 60 * 60 * 1000))} months ago`;
  }

  return Math.round(differenceDays / (365 * 30 * 24 * 60 * 60 * 1000)) === 1
    ? "1 year ago"
    : `${Math.round(
        differenceDays / (365 * 30 * 24 * 60 * 60 * 1000)
      )} years ago`;
};

export const generateYearList = (startYear) => {
  const currentYear = new Date().getFullYear();
  const yearList = [];

  for (let year = startYear; year <= currentYear; year++) {
    yearList.unshift(year);
  }

  return yearList;
};