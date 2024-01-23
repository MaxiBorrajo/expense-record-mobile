import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

const CreateCategoryButtonComponent = ({action}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{
        borderRadius: 50,
        backgroundColor: "white",
        width: 55,
        height: 55,
        position: "absolute",
        bottom: 80,
        right: 15,
        zIndex:1,
        alignContent: "center",
        justifyContent: "center",
      }}
      onPress={action}
    >
      <Icon
        name="plus"
        type="font-awesome-5"
        iconStyle={{ fontSize: 25, color: "black" }}
      ></Icon>
    </TouchableOpacity>
  );
};

export default CreateCategoryButtonComponent;

const styles = StyleSheet.create({});
