import { StyleSheet, View } from "react-native";
import React from "react";
import { Icon } from "@rneui/themed";
import { useTheme } from "@react-navigation/native";

export default function TabBarIcon({ icon, focused }) {
  const { colors } = useTheme();

  return (
    <View
      style={
        focused
          ? {
              position: "relative",
              borderRadius: 50,
              height: 60,
              width: 60,
              marginBottom: 20,
              backgroundColor: colors.text,
              alignItems: "center",
              justifyContent: "center",
              elevation: 4,
              borderColor: colors.background,
              borderStyle: 'solid',
              borderWidth: 1
            }
          : {
              position: "relative",
              backgroundColor: colors.text,
              alignItems: "center",
              justifyContent: "center",
              elevation: 0,
            }
      }
    >
      <Icon
        name={icon}
        type="font-awesome-5"
        color={colors.background}
        iconStyle={focused ? { fontSize: 30 } : { fontSize: 25 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
