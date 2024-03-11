import { StyleSheet, Text, View, Animated } from "react-native";
import React, { useState, useEffect } from "react";
import { Icon } from "@rneui/themed";
import { formatDate } from "../utils/utils";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation, useTheme } from "@react-navigation/native";

export default function ExpenseComponent({ item }) {
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
        onPress={() =>
          navigation.navigate({
            name: "Expense",
            params: { id: item?._id },
          })
        }
      >
        <Animated.View
          style={{ columnGap: 15, flexDirection: "row", alignItems: "center", opacity: fadeAnim, }}
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
              name={
                item.category_id ? item.category_id.icon_id.icon : "money-bill"
              }
              type="font-awesome-5"
              iconStyle={{ fontSize: 20, color: colors.text }}
            ></Icon>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ alignItems: "flex-start" }}>
              <Text
                style={{
                  color: colors.text,
                  fontSize: 12,
                  fontFamily: "Poppins_500Medium",
                }}
              >
                {item.title.length > 16
                  ? item.title.slice(0, 14) + "..."
                  : item.title}
              </Text>
              <Text
                style={{
                  color: colors.text,
                  fontSize: 11,
                  fontFamily: "Poppins_300Light",
                }}
              >
                {formatDate(item.createdAt)}
              </Text>
            </View>
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "flex-end",
                flex: 1,
              }}
            >
              <Text
                style={{
                  color: item.amount > 0 ? "#47bf2a" : "#ed2139",
                  fontSize: 12,
                  fontFamily: "Poppins_500Medium",
                }}
              >
                {item.amount > 0
                  ? `+ $${(item.amount / 1000).toFixed(2)}`
                  : `- $${(item.amount / 1000).toFixed(2) * -1}`}
                K
              </Text>
            </View>
          </View>
        </Animated.View>
      </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  deleteButton: {
    backgroundColor: "#ed2139",
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    position: "relative",
    height: "100%",
    width: 50,
  },
  beforeComponent: {
    position: "absolute",
    top: 0,
    left: -50,
    width: 50,
    height: "100%",
    backgroundColor: "#ed2139",
  },
});
