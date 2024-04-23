import { TouchableOpacity } from "react-native";
import React from "react";
import { Icon } from "@rneui/themed";
import { useTheme } from "@react-navigation/native";
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
  responsiveWidth
} from "react-native-responsive-dimensions";

const CreateCategoryButtonComponent = ({ action }) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={{
        borderRadius: 50,
        backgroundColor: colors.attention,
        width: responsiveWidth(15),
        height: responsiveWidth(15),
        position: "absolute",
        bottom: responsiveScreenHeight(7),
        right: responsiveScreenWidth(5),
        zIndex: 1,
        alignContent: "center",
        justifyContent: "center",
      }}
      onPress={action}
    >
      <Icon
        name="plus"
        type="font-awesome-5"
        iconStyle={{ fontSize: responsiveScreenFontSize(3), color: colors.background}}
      ></Icon>
    </TouchableOpacity>
  );
};

export default CreateCategoryButtonComponent;
