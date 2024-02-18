import { TouchableOpacity } from "react-native";
import { Icon } from "@rneui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ToggleThemeComponent({ isDarkTheme, setIsDarkTheme }) {
  return (
    <TouchableOpacity
      onPress={() => {
        AsyncStorage.setItem("theme", !isDarkTheme ? "dark" : "light", () => {
          setIsDarkTheme(!isDarkTheme);
        });
      }}
      style={{
        position: "absolute",
        top: 20,
        right: 20,
      }}
    >
      {isDarkTheme ? (
        <Icon name="moon" type="font-awesome-5" color="white" size={30} />
      ) : (
        <Icon name="sun" type="font-awesome-5" color="#fcb603" size={30} />
      )}
    </TouchableOpacity>
  );
}
