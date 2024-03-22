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
import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ExpenseContextProvider } from "./src/context/ExpenseContext";
import { CategoryContextProvider } from "./src/context/CategoryContext";
import { UserContextProvider } from "./src/context/UserContext";
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
import * as WebBrowser from "expo-web-browser";
import { DotEnvConfig } from 'react-native-dotenv';
DotEnvConfig();

WebBrowser.maybeCompleteAuthSession();
const Stack = createNativeStackNavigator();

export default function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem("theme").then((theme) => {
      setIsDarkTheme(!theme ? isDarkTheme : theme === "dark");
    });
    AsyncStorage.getItem("token").then((token) => {
      setAuth(token);
    });
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
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ExpenseContextProvider>
          <CategoryContextProvider>
            <UserContextProvider>
              <MenuProvider>
                <NavigationContainer
                  theme={isDarkTheme ? DarkTheme : LightTheme}
                >
                  <AppContext.Provider value={{ isDarkTheme, setIsDarkTheme }}>
                    <Stack.Navigator
                      screenOptions={{
                        headerShown: false,
                        animation: "slide_from_bottom",
                      }}
                      initialRouteName={auth ? "Home" : "Hero"}
                    >
                      <Stack.Screen name="Hero" component={HeroScreen} />
                      <Stack.Screen name="Login" component={LoginScreen} />
                      <Stack.Screen name="Home" component={HomeScreen} />
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
                      <Stack.Screen
                        name="Expenses"
                        component={ExpensesScreen}
                      />
                      <Stack.Screen name="Expense" component={ExpenseScreen} />
                      <Stack.Screen
                        name="Category"
                        component={CategoryScreen}
                      />
                      <Stack.Screen
                        name="CreateCategory"
                        component={CreateCategoryScreen}
                      />
                      <Stack.Screen name="Profile" component={ProfileScreen} />
                      <Stack.Screen
                        name="Categories"
                        component={CategoriesScreen}
                      />
                      <Stack.Screen name="AboutUs" component={AboutUsScreen} />
                    </Stack.Navigator>
                  </AppContext.Provider>
                </NavigationContainer>
              </MenuProvider>
            </UserContextProvider>
          </CategoryContextProvider>
        </ExpenseContextProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
