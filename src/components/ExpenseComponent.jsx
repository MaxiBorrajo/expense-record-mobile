import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Icon } from "@rneui/themed";
import { formatDate } from "../utils/utils";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

export default function ExpenseComponent({ item }) {
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
      onPress={() =>
        navigation.navigate({
          name: "Expense",
          params: { id: item._id },
        })
      }
    >
      <View
        style={{ columnGap: 15, flexDirection: "row", alignItems: "center" }}
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
            name={item.category_id ? item.category_id.icon_id.icon : 'money-bill'}
            type="font-awesome-5"
            iconStyle={{ fontSize: 20, color: "white" }}
          ></Icon>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ alignItems: "flex-start" }}>
            <Text
              style={{
                color: "white",
                fontSize: 15,
                fontFamily: "Poppins_500Medium",
              }}
            >
              {item.title.length > 14
                ? item.title.slice(0, 14) + "..."
                : item.title}
            </Text>
            <Text
              style={{
                color: "white",
                fontSize: 11,
                fontFamily: "Poppins_300Light",
              }}
            >
              {item.category_id
                ? item.category_id.category_name
                : "Without category"}
            </Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text
              style={{
                color: item.amount > 0 ? "green" : "red",
                fontSize: 13,
                fontFamily: "Poppins_500Medium",
              }}
            >
              $ {item.amount}
            </Text>
            <Text
              style={{
                color: "white",
                fontSize: 11,
                fontFamily: "Poppins_300Light",
              }}
            >
              {formatDate(item.createdAt)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
