import { format } from "date-fns";

export const languages = ["EN", "ES"];

export const months = [
  "January",
  "February",
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
  return format(date, "MMM dd, yyyy");
};

export const generateYearList = (startYear) => {
  const currentYear = new Date().getFullYear();
  const yearList = [];

  for (let year = startYear; year <= currentYear; year++) {
    yearList.unshift(year);
  }

  return yearList;
};

export const getRandomHexColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
};

export const hexToRGBA = (hex, alpha) => {
  hex = hex.replace("#", "");
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const currencies = [
  "AED",
  "AFN",
  "ALL",
  "AMD",
  "ANG",
  "AOA",
  "ARS",
  "AUD",
  "AWG",
  "AZN",
  "BAM",
  "BBD",
  "BDT",
  "BGN",
  "BHD",
  "BIF",
  "BMD",
  "BND",
  "BOB",
  "BRL",
  "BSD",
  "BTN",
  "BWP",
  "BYN",
  "BZD",
  "CAD",
  "CDF",
  "CHF",
  "CLP",
  "CNY",
  "COP",
  "CRC",
  "CUP",
  "CVE",
  "CZK",
  "DJF",
  "DKK",
  "DOP",
  "DZD",
  "EGP",
  "ERN",
  "ETB",
  "EUR",
  "FJD",
  "FKP",
  "FOK",
  "GBP",
  "GEL",
  "GGP",
  "GHS",
  "GIP",
  "GMD",
  "GNF",
  "GTQ",
  "GYD",
  "HKD",
  "HNL",
  "HRK",
  "HTG",
  "HUF",
  "IDR",
  "ILS",
  "IMP",
  "INR",
  "IQD",
  "IRR",
  "ISK",
  "JEP",
  "JMD",
  "JOD",
  "JPY",
  "KES",
  "KGS",
  "KHR",
  "KID",
  "KMF",
  "KRW",
  "KWD",
  "KYD",
  "KZT",
  "LAK",
  "LBP",
  "LKR",
  "LRD",
  "LSL",
  "LYD",
  "MAD",
  "MDL",
  "MGA",
  "MKD",
  "MMK",
  "MNT",
  "MOP",
  "MRU",
  "MUR",
  "MVR",
  "MWK",
  "MXN",
  "MYR",
  "MZN",
  "NAD",
  "NGN",
  "NIO",
  "NOK",
  "NPR",
  "NZD",
  "OMR",
  "PAB",
  "PEN",
  "PGK",
  "PHP",
  "PKR",
  "PLN",
  "PYG",
  "QAR",
  "RON",
  "RSD",
  "RUB",
  "RWF",
  "SAR",
  "SBD",
  "SCR",
  "SDG",
  "SEK",
  "SGD",
  "SHP",
  "SLE",
  "SOS",
  "SRD",
  "SSP",
  "STN",
  "SYP",
  "SZL",
  "THB",
  "TJS",
  "TMT",
  "TND",
  "TOP",
  "TRY",
  "TTD",
  "TVD",
  "TWD",
  "TZS",
  "UAH",
  "UGX",
  "USD",
  "UYU",
  "UZS",
  "VES",
  "VND",
  "VUV",
  "WST",
  "XAF",
  "XCD",
  "XDR",
  "XOF",
  "XPF",
  "YER",
  "ZAR",
  "ZMW",
  "ZWL",
];

export function calculateElapsedTime(fecha, language) {
  const now = new Date();
  const timeElapse = now - fecha;

  const secondsElapsed = Math.floor(timeElapse / 1000);
  const minutesElapsed = Math.floor(secondsElapsed / 60);
  const hoursElapsed = Math.floor(minutesElapsed / 60);
  const daysElapsed = Math.floor(hoursElapsed / 24);
  const monthsElapsed = Math.floor(daysElapsed / 30);

  if (monthsElapsed > 0) {
    return language === "EN"
      ? `${monthsElapsed} ${monthsElapsed === 1 ? "month ago" : "months ago"}`
      : `Hace ${monthsElapsed} ${monthsElapsed === 1 ? "mes" : "meses"}`;
  } else if (daysElapsed > 0) {
    return language === "EN"
      ? `${daysElapsed} ${daysElapsed === 1 ? "day ago" : "days ago"}`
      : `Hace ${daysElapsed} ${daysElapsed === 1 ? "día" : "días"}`;
  } else if (hoursElapsed > 0) {
    return language === "EN"
      ? `${hoursElapsed} ${hoursElapsed === 1 ? "hour ago" : "hours ago"}`
      : `Hace ${hoursElapsed} ${hoursElapsed === 1 ? "hora" : "horas"}`;
  } else if (minutesElapsed > 0) {
    return language === "EN"
      ? `${minutesElapsed} ${
          minutesElapsed === 1 ? "minute ago" : "minutes ago"
        }`
      : `Hace ${minutesElapsed} ${minutesElapsed === 1 ? "minuto" : "minutos"}`;
  } else {
    return language === "EN" ? "Just now" : "Hace unos momentos";
  }
}
