import { StyleSheet } from "react-native";
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
import {
  Poppins_900Black,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_300Light,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ExpenseContextProvider } from "./src/context/ExpenseContext";
import { CategoryContextProvider } from "./src/context/CategoryContext";
import { UserContextProvider } from "./src/context/UserContext";
import { MenuProvider } from "react-native-popup-menu";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DarkTheme from "./src/theme/DarkTheme";
import LightTheme from "./src/theme/LightTheme";
import { AppContext } from "./src/context/AppContext";
import "react-native-reanimated";
import "react-native-gesture-handler";

const Stack = createNativeStackNavigator();

export default function App() {
  const [auth, setAuth] = useState(null);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const getAuth = async () => {
      const authToken = await AsyncStorage.getItem("token");
      setAuth(authToken);
    };

    AsyncStorage.getItem("theme").then((theme) => {
      theme && theme === "dark" ? setIsDarkTheme(true) : setIsDarkTheme(false);
    });

    getAuth();
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
                      screenOptions={{ headerShown: false }}
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
