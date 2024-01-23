import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Icon } from "@rneui/themed";

export default function IconCarouselComponent({ icons, index, next, prev }) {

  return (
    <View
      style={{
        flexDirection: "row",
        columnGap: 50,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Icon
        name="chevron-left"
        type="font-awesome-5"
        iconStyle={{ fontSize: 40, color: "white", padding: 10 }}
        onPress={prev}
      />
      <View
        style={{
          borderRadius: 5,
          backgroundColor: "#78716c",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          width: 60,
          height: 60,
        }}
      >
        <Icon
          name={icons ? icons[index].icon : "money-bill-wave"}
          type="font-awesome-5"
          iconStyle={{ fontSize: 20, color: "white" }}
        />
      </View>
      <Icon
        name="chevron-right"
        type="font-awesome-5"
        iconStyle={{ fontSize: 40, color: "white", padding: 10 }}
        onPress={next}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
