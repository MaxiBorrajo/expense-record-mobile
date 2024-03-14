import { DefaultTheme } from "@react-navigation/native";

const LightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#f2f2f2",
    border: "#141414",
    card: "#E9E9E9",
    softCard: "#DCDCDC",
    text: "#141414",
    disabledBackground: "#4a4949",
    disabledColor: "#b5b3b3",
    attention:'#2E78A6'
  },
};

export default LightTheme;
