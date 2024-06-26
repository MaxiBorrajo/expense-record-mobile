import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import i18n from "../utils/i18n";

export default function GoBackButtonComponent() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      style={styles.backButton}
      onPress={() => navigation.goBack()}
    >
      <Text
        style={{
          fontSize: 15,
          color: colors.text,
          fontFamily: "Poppins_300Light",
        }}
      >
        {`< ${i18n.t("goBack")}`}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    top: 2,
    left: 4,
    zIndex: 100,
  },
});
