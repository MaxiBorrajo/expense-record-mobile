import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Icon } from "@rneui/themed";

export default function IncomeOrLossComponent({ amount, action }) {
  return (
    <View
      style={{
        height: 54.5,
        width: 115,
        flexDirection: "row",
        borderRadius: 5,
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: "white",
      }}
    >
      <TouchableOpacity
        style={{
          height: "100%",
          width: "50%",
          backgroundColor: amount > 0 ? "#22c55e" : "#012b03",
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={action}
      >
        <Icon
          name="plus"
          type="font-awesome-5"
          iconStyle={{ color: "white", fontSize: 17 }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          height: "100%",
          width: "50%",
          backgroundColor: amount < 0 ? "#ff0019" : "#450007",
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={action}
      >
        <Icon
          name="minus"
          type="font-awesome-5"
          iconStyle={{ color: "white", fontSize: 17 }}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
