import { DefaultTheme } from "@react-navigation/native";

const LightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#E8E9EE",
    border: "#242528",
    card: "#d5d6db",
    softCard: "#c3c4c9",
    text: "#242528",
    disabledBackground: "#8a6f38",
    disabledColor: "#8a8f9c",
    attention:'#D7AD57'
  },
};

export default LightTheme;
