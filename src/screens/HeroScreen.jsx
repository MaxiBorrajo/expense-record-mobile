import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  Dimensions,
  Platform,
} from "react-native";
import { Button } from "@rneui/themed";
import i18n from "../utils/i18n";
import { UserContext } from "../context/UserContext";
import { useContext, useEffect, useState, useRef } from "react";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import * as TaskManager from "expo-task-manager";

// const BACKGROUND_NOTIFICATION_TASK = "BACKGROUND-NOTIFICATION-TASK";

// TaskManager.defineTask(
//   BACKGROUND_NOTIFICATION_TASK,
//   ({ data, error, executionInfo }) => {
//     console.log("Received a notification in the background!");
//     // Do something with the notification data
//   }
// );

// Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

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
        console.log(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

      return () => {
        Notifications.removeNotificationSubscription(notificationListener.current);
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
              title="Press to schedule a notification"
              onPress={async () => {
                await schedulePushNotification();
              }}
            />
          </View>
          <View>
            <Text style={styles.subtitle}>{i18n.t("phrase")}</Text>
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

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: "Here is the notification body",
      data: { data: "goes here" },
    },
    trigger: { seconds: 2 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
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
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: "0854aae1-2b3d-4d3d-a448-00b41c05b3f0",
      })
    ).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}