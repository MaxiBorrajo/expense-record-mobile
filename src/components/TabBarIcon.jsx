import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Icon } from "@rneui/themed";

export default function TabBarIcon({ icon, focused }) {
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
              backgroundColor: "white",
              alignItems: "center",
              justifyContent: "center",
              elevation: 4,
            }
          : {
              position: "relative",
              backgroundColor: "white",
              alignItems: "center",
              justifyContent: "center",
              elevation: 0,
            }
      }
    >
      <Icon
        name={icon}
        type="font-awesome-5"
        color={focused ? "black" : "#737373"}
        iconStyle={focused ? { fontSize: 30 } : { fontSize: 25 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
