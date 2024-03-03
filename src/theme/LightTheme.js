import { DefaultTheme } from "@react-navigation/native";

const LightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#ffffff",
    border: "#000000",
    card: "#f5f7fa",
    softCard: "#e3e4e6",
    text: "#000000",
    disabledBackground: "#636262",
    disabledColor: "#c9c9c9",
  },
};

export default LightTheme;
