import { TouchableOpacity } from "react-native";
import React from "react";
import { Icon } from "@rneui/themed";
import { useTheme } from "@react-navigation/native";

const CreateCategoryButtonComponent = ({ action }) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={{
        borderRadius: 50,
        backgroundColor: colors.text,
        width: 55,
        height: 55,
        position: "absolute",
        bottom: 80,
        right: 15,
        zIndex: 1,
        alignContent: "center",
        justifyContent: "center",
      }}
      onPress={action}
    >
      <Icon
        name="plus"
        type="font-awesome-5"
        iconStyle={{ fontSize: 25, color: colors.background}}
      ></Icon>
    </TouchableOpacity>
  );
};

export default CreateCategoryButtonComponent;
