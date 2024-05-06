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
        backgroundColor: colors.attention,
        width: 15,
        height: 15,
        position: "absolute",
        bottom: 7,
        right: 5,
        zIndex: 1,
        alignContent: "center",
        justifyContent: "center",
      }}
      onPress={action}
    >
      <Icon
        name="plus"
        type="font-awesome-5"
        iconStyle={{ fontSize: 30, color: colors.background}}
      ></Icon>
    </TouchableOpacity>
  );
};

export default CreateCategoryButtonComponent;
