import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

export default function CategoryComponent({ item, setErrorMessage }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 20,
        alignItems: "center",
        backgroundColor: "#1c1917",
        width: "100%",
        elevation: 5,
        borderRadius: 5,
      }}
      onPress={() => {
        if (item.user_id) {
          navigation.navigate({
            name: "Category",
            params: { id: item._id },
          });
        }else{
          setErrorMessage('You can only edit categories created by you')
          setTimeout(()=>{setErrorMessage(null)}, 3000)
        }
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          columnGap: 20,
        }}
      >
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
            name={item.icon_id.icon}
            type="font-awesome-5"
            iconStyle={{ fontSize: 20, color: "white" }}
          ></Icon>
        </View>
        <Text
          style={{
            color: "white",
            fontSize: 15,
            fontFamily: "Poppins_500Medium",
          }}
        >
          {item.category_name}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
