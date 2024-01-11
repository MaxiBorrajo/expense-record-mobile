import { StyleSheet } from "react-native";
import { Button } from "@rneui/themed";
export default function ButtonComponent({ action, label, loading }) {
  return (
    <Button
      title={label}
      buttonStyle={styles.button}
      titleStyle={styles.label}
      onPress={action}
      loading={loading}
      loadingProps={{
        size: "large",
        color: "black",
      }}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    color: "#000",
    fontSize: 20,
    fontFamily: "Poppins_500Medium",
  },
});
