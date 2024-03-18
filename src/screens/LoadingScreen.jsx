import { StyleSheet, View, ActivityIndicator } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";


export default function LoadingScreen() {
  const { colors } = useTheme();
  return (
    <View
      style={[
        StyleSheet.absoluteFillObject,
        {
          zIndex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.card,
        },
      ]}
    >
      <ActivityIndicator color={colors.attention} size='large' style={{ transform: [{ scaleX: 1.7 }, { scaleY: 1.7 }] }}/>
    </View>
  );
}
