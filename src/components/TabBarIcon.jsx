import { StyleSheet, View } from "react-native";
import React from "react";
import { Icon } from "@rneui/themed";
import { useTheme } from "@react-navigation/native";

export default function TabBarIcon({ icon, focused, name }) {
  const { colors } = useTheme();

  return (
    <View
      style={{
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Icon
        name={icon}
        type="font-awesome-5"
        color={focused ? colors.text : colors.disabledColor}
        iconStyle={{ fontSize: 22 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
