import { DefaultTheme } from "@react-navigation/native";

const DarkTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#141414",
    border: "#f2f2f2",
    card: "#303030",
    softCard: "#474747",
    text: "#f2f2f2",
    disabledBackground: "#999999",
    disabledColor: "#5e5e5e",
    attention:'#2E78A6'
  },
};

export default DarkTheme;
