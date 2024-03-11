import { DefaultTheme } from "@react-navigation/native";

const DarkTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#000000",
    border: "#ffffff",
    card: "#242424",
    softCard: "#363433",
    text: "#ffffff",
    disabledBackground: "#999999",
    disabledColor: "#262626",
  },
};

export default DarkTheme;
