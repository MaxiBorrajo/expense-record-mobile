import { SafeAreaView, Dimensions } from "react-native";
import TabBarIcon from "../components/TabBarIcon";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CreateExpenseScreen from "./CreateExpenseScreen";
import StatisticsScreen from "./StatisticsScreen";
import CategoriesScreen from "./CategoriesScreen";
import MainScreen from "./MainScreen";
import LoadingScreen from "./LoadingScreen";
import { useTheme } from "@react-navigation/native";
import { UserContext } from "../context/UserContext";
import React, { useContext } from "react";

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
  const { colors } = useTheme();
  const { loading } = useContext(UserContext);

  const screenOptions = {
    tabBarShowLabel: false,
    headerShown: false,
    tabBarStyle: {
      position: "absolute",
      bottom: 0,
      elevation: 0,
      height: 60,
      backgroundColor: colors.text,
    },
  };

  return (
    <SafeAreaView
      style={{ flex: 1 }}
    >
      {loading ? <LoadingScreen /> : null}
      <Tab.Navigator screenOptions={screenOptions} initialRouteName="Main">
        <Tab.Screen
          name="Main"
          component={MainScreen}
          options={{
            tabBarIcon: ({ focused }) => {
              return <TabBarIcon focused={focused} icon="home" />;
            }
          }}
        />
        <Tab.Screen
          name="Categories"
          component={CategoriesScreen}
          options={{
            tabBarIcon: ({ focused }) => {
              return <TabBarIcon focused={focused} icon="list-ul" />;
            }
          }}
        />
        <Tab.Screen
          name="CreateExpense"
          component={CreateExpenseScreen}
          options={{
            tabBarIcon: ({ focused }) => {
              return <TabBarIcon focused={focused} icon="plus" />;
            }
          }}
        />
        <Tab.Screen
          name="Statistics"
          component={StatisticsScreen}
          options={{
            tabBarIcon: ({ focused }) => {
              return <TabBarIcon focused={focused} icon="chart-pie" />;
            }
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}
