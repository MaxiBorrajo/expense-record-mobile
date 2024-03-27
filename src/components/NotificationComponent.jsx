import { Text, View, Animated } from "react-native";
import React, { useEffect, useState, memo, useContext } from "react";
import { useTheme } from "@react-navigation/native";
import { Badge } from "@rneui/themed";
import { NotificationContext } from "../context/NotificationContext";
import { UserContext } from "../context/UserContext";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { RectButton } from "react-native-gesture-handler";

export default memo(function NotificationComponent({ item }) {
  const { colors } = useTheme();
  const [fadeAnim] = useState(new Animated.Value(0));
  const { readNotification, deleteNotification } =
    useContext(NotificationContext);
  const { handleNotifications } = useContext(UserContext);
  const [read, setRead] = useState(item.read);

  const rightSwipeActions = () => {
    return <View></View>;
  };

  const readAndUpdateNotification = async () => {
    if (!read) {
      setRead((prev) => true);
      await readNotification(item._id);
      await handleNotifications();
    }
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
      onSwipeableOpen={() => deleteNotification(item._id)}
    >
      <Animated.View
        style={{
          flexDirection: "row",
          opacity: fadeAnim,
          alignItems: "center",
          justifyContent: "center",
          columnGap: 22,
        }}
        onTouchEnd={readAndUpdateNotification}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: "5%",
          }}
        >
          {read ? (
            <Badge
              status="primary"
              containerStyle={{ position: "absolute", top: 0, right: -2 }}
            />
          ) : (
            <Badge
              status="warning"
              containerStyle={{ position: "absolute", top: 0, right: -2 }}
            />
          )}
        </View>
        <View
          style={{
            width: "90%",
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
        </View>
      </Animated.View>
    </Swipeable>
  );
});
