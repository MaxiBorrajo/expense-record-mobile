import { Text, View, Animated } from "react-native";
import React, { useEffect, useState, memo } from "react";
import { useTheme } from "@react-navigation/native";
export default memo(function NotificationComponent({ item }) {
  const { colors } = useTheme();
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View
      style={{
        flexDirection: "column",
        width: "100%",
        opacity: fadeAnim,
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          color: colors.text,
          fontSize: 15,
          fontFamily: "Poppins_500Medium",
        }}
      >
        {item.title}
      </Text>
      <Text
        style={{
          color: colors.text,
          fontSize: 12,
          fontFamily: "Poppins_300Light",
        }}
      >
        {item.body}
      </Text>
    </Animated.View>
  );
});
