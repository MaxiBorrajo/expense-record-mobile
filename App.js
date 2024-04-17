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
import { StatusBar } from "react-native";
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
import messaging from "@react-native-firebase/messaging";
import * as Notifications from "expo-notifications";
import mobileAds from "react-native-google-mobile-ads";
const Stack = createNativeStackNavigator();

mobileAds()
  .initialize()
  .then((adapterStatuses) => {});

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

  useEffect(() => {
    requestUserPermission();

    AsyncStorage.getItem("theme").then((theme) => {
      setIsDarkTheme(!theme ? isDarkTheme : theme === "dark");
    });

    AsyncStorage.getItem("token").then((token) => {
      setAuth(token ? token : null);
    });

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Notifications.scheduleNotificationAsync({
        content: {
          title: remoteMessage.notification.title,
          body: remoteMessage.notification.body,
        },
        trigger: null,
      });

      setNotification(notification);
    });

    return unsubscribe;
  }, []);

  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();

  useEffect(() => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
    };
  }, []);

  const requestUserPermission = async () => {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();

    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus === "granted") {
      messaging()
        .getToken()
        .then((token) => {
          AsyncStorage.setItem("notificationToken", token);
        });
    } else {
      console.log("Permission not granted");
    }
  };

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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar />
      <AuthContext.Provider
        value={{ auth, setAuth, notification, setNotification }}
      >
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
  );
}
