import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

const CreateExpenseButtonComponent = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{
        borderRadius: 50,
        backgroundColor: "white",
        width: 70,
        height: 70,
        position: "absolute",
        bottom: 30,
        right: 15,
        zIndex:10000,
        alignContent: "center",
        justifyContent: "center",
      }}
      onPress={() => navigation.navigate("CreateExpense")}
    >
      <Icon
        name="plus"
        type="font-awesome-5"
        iconStyle={{ fontSize: 35, color: "black" }}
      ></Icon>
    </TouchableOpacity>
  );
};

export default CreateExpenseButtonComponent;

const styles = StyleSheet.create({});
