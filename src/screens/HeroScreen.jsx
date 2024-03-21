import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  Dimensions,
} from "react-native";
import { Button } from "@rneui/themed";
import i18n from "../utils/i18n";
import { UserContext } from "../context/UserContext";
import { useContext, useEffect, useState, useRef } from "react";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Original Title",
    body: "And here is the body!",
    data: { someData: "goes here" },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId,
    });
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token.data;
}
export default function HeroScreen({ navigation }) {
  const { loadConfiguration } = useContext(UserContext);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    loadConfiguration();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../assets/images/pexels-todd-trapani-1461996.jpg")}
        resizeMode="cover"
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Fehu: Expense Tracker</Text>
          <View>
            <Text style={styles.subtitle}>{i18n.t("phrase")}</Text>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <Text>Your expo push token: {expoPushToken}</Text>
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Text>
                  Title: {notification && notification.request.content.title}{" "}
                </Text>
                <Text>
                  Body: {notification && notification.request.content.body}
                </Text>
                <Text>
                  Data:{" "}
                  {notification &&
                    JSON.stringify(notification.request.content.data)}
                </Text>
              </View>
              <Button
                title="Press to Send Notification"
                onPress={async () => {
                  await sendPushNotification(expoPushToken);
                }}
              />
            </View>
            <Button
              title={i18n.t("getStarted")}
              buttonStyle={{
                backgroundColor: "white",
                paddingVertical: 10,
                paddingHorizontal: 30,
                borderRadius: 5,
                alignItems: "center",
                justifyContent: "center",
              }}
              titleStyle={{
                color: "black",
                fontSize: 15,
                fontFamily: "Poppins_500Medium",
              }}
              onPress={() => navigation.navigate("Login")}
            />
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: "fff",
    padding: 30,
    justifyContent: "space-between",
    rowGap: 150,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    minHeight: Dimensions.get("window").height,
  },
  safeArea: {
    flex: 1,
  },
  title: {
    fontFamily: "Poppins_500Medium",
    fontSize: 15,
    color: "#fff",
  },
  subtitle: {
    fontFamily: "Poppins_300Light",
    fontSize: 30,
    color: "#fff",
    paddingBottom: 30,
  },
});
