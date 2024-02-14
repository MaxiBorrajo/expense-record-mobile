import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
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
          fontSize: 12,
          color: colors.text,
          fontFamily: "Poppins_300Light",
        }}
      >
        {"< Go back"}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 100,
  },
});
