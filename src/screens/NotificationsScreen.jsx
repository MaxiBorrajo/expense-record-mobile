import {
  Text,
  View,
  FlatList,
  SafeAreaView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { NotificationContext } from "../context/NotificationContext";
import { UserContext } from "../context/UserContext";
import NotificationComponent from "../components/NotificationComponent";
import ErrorComponent from "../components/ErrorComponent";
import { useTheme } from "@react-navigation/native";
import i18n from "../utils/i18n";
import GoBackButtonComponent from "../components/GoBackButtonComponent";
export default function NotificationsScreen() {
  const { colors } = useTheme();
  const [errorMessage, setErrorMessage] = useState("");
  const { handleNotifications, notifications } = useContext(UserContext);

  useEffect(() => {
    handleNotifications();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
          color: colors.text,
          alignItems: "center",
          position: "relative",
          paddingHorizontal: 20,
          minHeight: Dimensions.get("window").height,
          justifyContent: "center",
          paddingTop: 90,
          rowGap: 15,
        }}
      >
        <GoBackButtonComponent />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Text
            style={{
              color: colors.text,
              fontSize: 20,
              fontFamily: "Poppins_500Medium",
            }}
          >
            {i18n.t("notifications")}
          </Text>
        </View>
        {errorMessage ? <ErrorComponent errorMessage={errorMessage} /> : null}
        <FlatList
          style={{ height: "100%" }}
          contentContainerStyle={{
            paddingBottom: 50,
          }}
          data={notifications}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <NotificationComponent item={item} />}
          ListEmptyComponent={() =>
            !notifications ? (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "100%",
                  minWidth: "100%",
                }}
              >
                <ActivityIndicator color={colors.attention} size="large" />
              </View>
            ) : notifications && notifications.length === 0 ? (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "100%",
                  minWidth: "100%",
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: "Poppins_400Regular",
                    color: colors.text,
                  }}
                >
                  {i18n.t("dataNotFound")}
                </Text>
              </View>
            ) : null
          }
          ItemSeparatorComponent={() => (
            <View style={{ height: 20, width: "100%" }}></View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
