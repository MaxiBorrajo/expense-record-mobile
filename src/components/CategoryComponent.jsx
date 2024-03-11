import { Text, TouchableOpacity, View, Animated } from "react-native";
import React, { useEffect, useState } from "react";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@react-navigation/native";
import i18n from "../utils/i18n";

export default function CategoryComponent({ item, setErrorMessage }) {
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
        params: { id: item._id },
      });
    } else {
      setErrorMessage((prev) => "You can only edit categories created by you");
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
        padding: 20,
        alignItems: "center",
        backgroundColor: colors.card,
        width: "100%",
        borderRadius: 5,
      }}
      onPress={handlePress}
    >
      <Animated.View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          columnGap: 20,
          opacity: fadeAnim,
        }}
      >
        <View
          style={{
            borderRadius: 5,
            backgroundColor: colors.softCard,
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            width: 60,
            height: 60,
          }}
        >
          <Icon
            name={item?.icon_id?.icon}
            type="font-awesome-5"
            iconStyle={{ fontSize: 20, color: colors.text }}
          ></Icon>
        </View>
        <Text
          style={{
            color: colors.text,
            fontSize: 15,
            fontFamily: "Poppins_500Medium",
          }}
        >
          {item?.user_id ? item?.category_name : i18n.t(item?.category_name)}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
}
