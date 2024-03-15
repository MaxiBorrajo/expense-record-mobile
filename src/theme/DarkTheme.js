import { DefaultTheme } from "@react-navigation/native";

const DarkTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#242528",
    border: "#E8E9EE",
    card: "#2e2f33",
    softCard: "#3c3d42",
    text: "#E8E9EE",
    disabledBackground: "#8a6f38",
    disabledColor: "#5e5e5e",
    attention:'#D7AD57'
  },
};

export default DarkTheme;
