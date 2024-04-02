import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ExpensesStatisticsScreen from "./ExpensesStatisticsScreen";
import CategoriesStatisticsScreen from "./CategoriesStatisticsScreen";
import BudgetStatisticsScreen from "./BudgetStatisticsScreen";
import SavingGoalStatisticsScreen from "./SavingGoalStatisticsScreen";
import { useTheme } from "@react-navigation/native";
import TabBarIcon from "../components/TabBarIcon";

const Tab = createBottomTabNavigator();
export default function StatisticsScreen() {
  const screenOptions = {
    tabBarShowLabel: false,
    headerShown: false,

    tabBarStyle: {
      position: "absolute",
      height: 50,
      backgroundColor: 'transparent',
      width: '90%',
      borderRadius: 10,
      borderTopWidth: 0,
      left: Dimensions.get("window").width / 2 - 184,
      top: 45,
      elevation:0
    },
  };

  return (
    <Tab.Navigator
      initialLayout={{ width: Dimensions.get("window").width }}
      screenOptions={screenOptions}
      tabBarIndicatorContainerStyle={{ borderWidth: 0 }}
    >
      <Tab.Screen
        name="ExpenseStatistics"
        component={ExpensesStatisticsScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return <TabBarIcon focused={focused} icon="wallet" />;
          },
        }}
      />
      <Tab.Screen
        name="CategoriesStatistics"
        component={CategoriesStatisticsScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return <TabBarIcon focused={focused} icon="list-ul" />;
          },
        }}
      />
      <Tab.Screen
        name="BudgetStatisticsScreen"
        component={BudgetStatisticsScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return <TabBarIcon focused={focused} icon="dollar-sign" />;
          },
        }}
      />
      <Tab.Screen
        name="SavingGoalStatisticsScreen"
        component={SavingGoalStatisticsScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return <TabBarIcon focused={focused} icon="piggy-bank" />;
          },
        }}
      />
    </Tab.Navigator>
  );
}
