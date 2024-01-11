import { StyleSheet, Text, View } from "react-native";
import { Icon } from "@rneui/themed";
import { useState } from "react";
export default function ExpensesHeaderComponent({
  openParameteres
}) {


  
  return (
    <View
      style={{
        width: "100%",
        justifyContent: "center",
        paddingBottom: 5,
      }}
    >
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontSize: 17,
            fontFamily: "Poppins_500Medium",
            color: "white",
          }}
        >
          Expenses
        </Text>
        <View
          style={{ flexDirection: "row", alignItems: "center", columnGap: 30 }}
        >
          <Icon
            name="sliders"
            type="font-awesome"
            iconStyle={{ color: "white" }}
            onPress={() => openParameteres()}
          ></Icon>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
