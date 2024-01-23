import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HeroScreen from "./src/screens/HeroScreen"; //✓
import HomeScreen from "./src/screens/HomeScreen"; //✓
import LoginScreen from "./src/screens/LoginScreen"; //✓
import RegisterScreen from "./src/screens/RegisterScreen"; //✓
import ForgotPasswordScreen from "./src/screens/ForgotPasswordScreen"; //✓
import VerifyCodeScreen from "./src/screens/VerifyCodeScreen"; //✓
import ResetPasswordScreen from "./src/screens/ResetPasswordScreen"; //✓
import ExpensesScreen from "./src/screens/ExpensesScreen"; //✓
import ExpenseScreen from "./src/screens/ExpenseScreen"; //✓
import EditExpenseScreen from "./src/screens/EditExpenseScreen"; //✓
import FinishCreateExpenseScreen from "./src/screens/FinishCreateExpenseScreen"; //
import CategoryScreen from "./src/screens/CategoryScreen"; //
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
import { MenuProvider } from "react-native-popup-menu";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Stack = createNativeStackNavigator();

export default function App() {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const getAuth = async () => {
      const authToken = await AsyncStorage.getItem("token");
      setAuth(authToken);
    };

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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ExpenseContextProvider>
          <CategoryContextProvider>
            <MenuProvider>
              <NavigationContainer>
                <Stack.Navigator
                  screenOptions={{ headerShown: false }}
                  initialRouteName={auth ? "Home" : "Hero"}
                >
                  <Stack.Screen name="Hero" component={HeroScreen} />
                  <Stack.Screen name="Login" component={LoginScreen} />
                  <Stack.Screen name="Home" component={HomeScreen} />
                  <Stack.Screen name="Register" component={RegisterScreen} />
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
                  <Stack.Screen name="Expenses" component={ExpensesScreen} />
                  <Stack.Screen name="Expense" component={ExpenseScreen} />
                  <Stack.Screen name="FinishCreateExpense" component={FinishCreateExpenseScreen} />
                  <Stack.Screen
                    name="EditExpense"
                    component={EditExpenseScreen}
                  />
                  <Stack.Screen
                    name="Category"
                    component={CategoryScreen}
                  />
                </Stack.Navigator>
              </NavigationContainer>
            </MenuProvider>
          </CategoryContextProvider>
        </ExpenseContextProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
