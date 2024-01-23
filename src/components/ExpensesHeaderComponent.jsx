import { StyleSheet, Text, View } from "react-native";
import { Icon } from "@rneui/themed";
import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

export default function ExpensesHeaderComponent({ openParameteres }) {
  const navigation = useNavigation();
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom:20
      }}
    >
      <Text
        style={{
          fontSize: 15,
          fontFamily: "Poppins_500Medium",
          color: "white",
        }}
      >
        Recent expenses
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("Expenses")}
        style={{
          alignItems: "center",
          justifyContent: "center",
          columnGap: 10,
          flexDirection: "row",
        }}
      >
        <Text
          style={{
            fontSize: 12,
            fontFamily: "Poppins_300Light",
            color: "white",
          }}
        >
          See all
        </Text>
        <Icon
          name="arrow-right"
          type="font-awesome-5"
          iconStyle={{
            fontSize: 12,
            color: "white",
          }}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
