import { DefaultTheme } from "@react-navigation/native";

const DarkTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#000000",
    border: "#ffffff",
    card: "#1c1917",
    softCard: "#363433",
    text: "#ffffff",
    disabledBackground: "#d4d4d4",
    disabledColor: "#262626",
  },
};

export default DarkTheme;
