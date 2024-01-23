import { StyleSheet } from "react-native";
import { Button } from "@rneui/themed";
export default function ButtonComponent({ action, label, loading, disabled }) {
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
      disabled={disabled}
      disabledStyle={{
        backgroundColor: "#d4d4d4",
        color:'#262626'
      }}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal:30,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    color: "#000",
    fontSize: 15,
    fontFamily: "Poppins_500Medium",
  },
});
