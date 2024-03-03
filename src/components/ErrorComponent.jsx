import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function ErrorComponent({ errorMessage }) {
  return (
    <View>
      <Text style={styles.error}>{errorMessage}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  error: {
    color: "#ed2139",
    fontFamily: "Poppins_500Medium",
    fontSize: 15,
  },
});
