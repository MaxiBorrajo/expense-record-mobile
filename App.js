import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HeroScreen from "./src/screens/HeroScreen";
import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import ForgotPasswordScreen from "./src/screens/ForgotPasswordScreen";
import VerifyCodeScreen from "./src/screens/VerifyCodeScreen";
import ResetPasswordScreen from "./src/screens/ResetPasswordScreen";
import ExpensesScreen from "./src/screens/ExpensesScreen";
import ExpenseScreen from "./src/screens/ExpenseScreen";
import CategoryScreen from "./src/screens/CategoryScreen";
import CreateCategoryScreen from "./src/screens/CreateCategoryScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import CategoriesScreen from "./src/screens/CategoriesScreen";
import AboutUsScreen from "./src/screens/AboutUsScreen";
import ConfigurationScreen from "./src/screens/ConfigurationScreen";
import NotificationsScreen from "./src/screens/NotificationsScreen";
import { useEffect, useRef, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ExpenseContextProvider } from "./src/context/ExpenseContext";
import { CategoryContextProvider } from "./src/context/CategoryContext";
import { UserContextProvider } from "./src/context/UserContext";
import { NotificationContextProvider } from "./src/context/NotificationContext";
import { SavingGoalContextProvider } from "./src/context/SavingGoalContext";
import { AuthContext } from "./src/context/AuthContext";
import { MenuProvider } from "react-native-popup-menu";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DarkTheme from "./src/theme/DarkTheme";
import LightTheme from "./src/theme/LightTheme";
import "react-native-reanimated";
import "react-native-gesture-handler";
import {
  Poppins_900Black,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_300Light,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppContext } from "./src/context/AppContext";
import { StatusBar, Alert, Platform } from "react-native";
import messaging from "@react-native-firebase/messaging";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
const Stack = createNativeStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [auth, setAuth] = useState(null);

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log("Authorization status:", authStatus);
    }
  };

  useEffect(() => {
    AsyncStorage.getItem("theme").then((theme) => {
      setIsDarkTheme(!theme ? isDarkTheme : theme === "dark");
    });
    AsyncStorage.getItem("token").then((token) => {
      setAuth(token ? token : null);
    });
    if (requestUserPermission()) {
      messaging()
        .getToken()
        .then((token) => {
          console.log(token);
          AsyncStorage.setItem("notificationToken", token);
        });
    } else {
      console.log("Permission not granted", authStatus);
    }

    messaging()
      .getInitialNotification()
      .then(async (remoteMessage) => {
        if (remoteMessage) {
          console.log(
            "Notification caused app to open from quit state:",
            remoteMessage
          );
        }
      });

    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        "Notification caused app to open from background state:",
        remoteMessage.notification
      );
    });

    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("Notification handle in background:", remoteMessage);
    });

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Notifications.scheduleNotificationAsync({
        content: {
          title: remoteMessage.notification.title,
          body: remoteMessage.notification.body,
        },
        trigger: null,
      });
      //Alert.alert("A new FCM message arrived!", JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

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

  let [fontsLoaded] = useFonts({
    Poppins_900Black,
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_500Medium,
    Poppins_300Light,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={isDarkTheme ? DarkTheme.colors.text : LightTheme.colors.text}
        backgroundColor={
          isDarkTheme
            ? DarkTheme.colors.background
            : LightTheme.colors.background
        }
        translucent
      />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AuthContext.Provider value={{ auth, setAuth }}>
          <NotificationContextProvider>
            <UserContextProvider>
              <SavingGoalContextProvider>
                <ExpenseContextProvider>
                  <CategoryContextProvider>
                    <MenuProvider>
                      <NavigationContainer
                        theme={isDarkTheme ? DarkTheme : LightTheme}
                      >
                        <AppContext.Provider
                          value={{ isDarkTheme, setIsDarkTheme }}
                        >
                          <Stack.Navigator
                            screenOptions={{
                              headerShown: false,
                              animation: "slide_from_bottom",
                            }}
                            initialRouteName={auth ? "Home" : "Hero"}
                          >
                            {auth ? (
                              <>
                                <Stack.Screen
                                  name="Home"
                                  component={HomeScreen}
                                />
                                <Stack.Screen
                                  name="Expenses"
                                  component={ExpensesScreen}
                                />
                                <Stack.Screen
                                  name="Expense"
                                  component={ExpenseScreen}
                                />
                                <Stack.Screen
                                  name="Category"
                                  component={CategoryScreen}
                                />
                                <Stack.Screen
                                  name="CreateCategory"
                                  component={CreateCategoryScreen}
                                />
                                <Stack.Screen
                                  name="Profile"
                                  component={ProfileScreen}
                                />
                                <Stack.Screen
                                  name="Categories"
                                  component={CategoriesScreen}
                                />
                                <Stack.Screen
                                  name="AboutUs"
                                  component={AboutUsScreen}
                                />
                                <Stack.Screen
                                  name="Configuration"
                                  component={ConfigurationScreen}
                                />
                                <Stack.Screen
                                  name="Notifications"
                                  component={NotificationsScreen}
                                />
                              </>
                            ) : (
                              <>
                                <Stack.Screen
                                  name="Hero"
                                  component={HeroScreen}
                                />
                                <Stack.Screen
                                  name="Login"
                                  component={LoginScreen}
                                />
                                <Stack.Screen
                                  name="Register"
                                  component={RegisterScreen}
                                />
                                <Stack.Screen
                                  name="ForgotPassword"
                                  component={ForgotPasswordScreen}
                                />
                                <Stack.Screen
                                  name="ResetPassword"
                                  component={ResetPasswordScreen}
                                />
                                <Stack.Screen
                                  name="VerifyCode"
                                  component={VerifyCodeScreen}
                                />
                              </>
                            )}
                          </Stack.Navigator>
                        </AppContext.Provider>
                      </NavigationContainer>
                    </MenuProvider>
                  </CategoryContextProvider>
                </ExpenseContextProvider>
              </SavingGoalContextProvider>
            </UserContextProvider>
          </NotificationContextProvider>
        </AuthContext.Provider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
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
        projectId: "your-project-id",
      })
    ).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}
