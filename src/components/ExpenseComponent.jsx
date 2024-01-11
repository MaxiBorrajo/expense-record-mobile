import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Icon } from "@rneui/themed";
import { getTime } from "../utils/utils";

export default function ExpenseComponent({ item }) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 20,
        alignItems: "center",
      }}
    >
      <View
        style={{ columnGap: 15, flexDirection: "row", alignItems: "center" }}
      >
        <View
          style={{
            borderRadius: 50,
            backgroundColor: "#78716c",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            width: 50,
            height: 50,
          }}
        >
          <Icon
            name={item.icon_id.icon}
            type="font-awesome-5"
            iconStyle={{ fontSize: 25, color: "white" }}
          ></Icon>
        </View>
        <View>
          <Text
            style={{
              color: "white",
              fontSize: 15,
              fontFamily: "Poppins_500Medium",
            }}
          >
            {item.title}
          </Text>
          <Text
            style={{
              color: "white",
              fontSize: 11,
              fontFamily: "Poppins_300Light",
            }}
          >
            {getTime(item.createdAt)}
          </Text>
        </View>
      </View>
      <Text
        style={{
          color: "white",
          fontSize: 17,
          fontFamily: "Poppins_700Bold",
        }}
      >
        {item.amount < 0
          ? item.amount.toString().replace("-", "-$")
          : "$" + item.amount}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({});
