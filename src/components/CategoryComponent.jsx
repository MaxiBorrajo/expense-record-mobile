import { Text, TouchableOpacity, View, Animated } from "react-native";
import React, { useEffect, useState, memo } from "react";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@react-navigation/native";
import i18n from "../utils/i18n";
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
  responsiveWidth
} from "react-native-responsive-dimensions";

export default memo(function CategoryComponent({ item, setErrorMessage }) {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const handlePress = () => {
    if (item.user_id) {
      navigation.navigate({
        name: "Category",
        params: { category: item },
      });
    } else {
      setErrorMessage((prev) => i18n.t("categoryError"));
      setTimeout(() => {
        setErrorMessage((prev) => null);
      }, 3000);
    }
  };

  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        padding: responsiveWidth(1),
        alignItems: "center",
        width: responsiveScreenWidth(100),
        borderRadius: 5,
      }}
      onPress={handlePress}
    >
      <Animated.View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: responsiveScreenWidth(100),
          columnGap: responsiveScreenHeight(2),
          opacity: fadeAnim,
        }}
      >
        <View
          style={{
            borderRadius: 50,
            backgroundColor: colors.softCard,
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            width: responsiveWidth(15),
            height: responsiveWidth(15),
          }}
        >
          <Icon
            name={item?.icon_id?.icon}
            type="font-awesome-5"
            iconStyle={{ fontSize: responsiveScreenFontSize(2), color: colors.text }}
          ></Icon>
        </View>
        <Text
          style={{
            color: colors.text,
            fontSize: responsiveScreenFontSize(1.8),
            fontFamily: "Poppins_500Medium",
          }}
        >
          {item?.user_id ? item?.category_name : i18n.t(item?.category_name)}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
});
