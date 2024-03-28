import { Text, View, Animated } from "react-native";
import React, { useEffect, useState, memo, useContext } from "react";
import { useTheme } from "@react-navigation/native";
import { Badge } from "@rneui/themed";
import { NotificationContext } from "../context/NotificationContext";
import { UserContext } from "../context/UserContext";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { calculateElapsedTime } from "../utils/utils";
export default memo(function NotificationComponent({ item }) {
  const { colors } = useTheme();
  const [fadeAnim] = useState(new Animated.Value(0));
  const { readNotification, deleteNotification } =
    useContext(NotificationContext);
  const { handleNotifications, language } = useContext(UserContext);
  const [read, setRead] = useState(item.read);

  const rightSwipeActions = (progress, dragX) => {
    return (
      <View
        style={{ width: "100%" }}
      ></View>
    );
  };

  const readAndUpdateNotification = async () => {
    if (!read) {
      setRead((prev) => true);
      await readNotification(item._id);
      await handleNotifications();
    }
  };

  const handleDeleteNotification = async () => {
    await deleteNotification(item._id);
    await handleNotifications();
  };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Swipeable
      renderRightActions={rightSwipeActions}
      onSwipeableOpen={handleDeleteNotification}
    >
      <Animated.View
        style={{
          opacity: fadeAnim,
          width: "100%",
        }}
        onTouchEnd={readAndUpdateNotification}
      >
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View
            style={{
              width: "10%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {read ? <Badge status="primary" /> : <Badge status="warning" />}
          </View>
          <View style={{ width: "90%", padding: 5, rowGap: 5 }}>
            <Text
              style={{
                color: colors.text,
                fontSize: 14,
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
            <Text
              style={{
                color: colors.text,
                fontSize: 11,
                fontFamily: "Poppins_300Light",
                alignSelf: "flex-end",
              }}
            >
              {calculateElapsedTime(new Date(item.createdAt), language)}
            </Text>
          </View>
        </View>
      </Animated.View>
    </Swipeable>
  );
});
