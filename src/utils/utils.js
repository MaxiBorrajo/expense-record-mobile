import { format } from 'date-fns';

export const months = [
  "January",
  "Febreary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const getDaysOfTheMonth = (year, month) => {
  const finalDate = new Date(year, month + 1, 0).getDate();

  const days = Array.from({ length: finalDate }, (_, index) => index + 1);

  return days;
};

export const getMonth = (index) => {
  return months[index];
};

export const formatDate = (date) => {
  return format(date, 'MMM dd, yyyy'); 
}

export const generateYearList = (startYear) => {
  const currentYear = new Date().getFullYear();
  const yearList = [];

  for (let year = startYear; year <= currentYear; year++) {
    yearList.unshift(year);
  }

  return yearList;
};
