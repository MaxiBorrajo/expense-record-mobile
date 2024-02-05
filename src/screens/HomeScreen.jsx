import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Dimensions
} from "react-native";
import React, { useRef, useMemo, useState, useEffect } from "react";
import TabBarIcon from "../components/TabBarIcon";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CreateExpenseScreen from "./CreateExpenseScreen"; //✓
import StatisticsScreen from "./StatisticsScreen"; //✓
import CategoriesScreen from "./CategoriesScreen"; //✓
import ProfileScreen from "./ProfileScreen"; //✓
import MainScreen from "./MainScreen"; //✓

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
  const screenOptions = {
    tabBarShowLabel: false,
    headerShown: false,
    tabBarStyle: {
      position: "absolute",
      bottom: 0,
      elevation: 0,
      height: 60,
      backgroundColor: "#FFFFFF",
    },
  };

  return (
    <SafeAreaView style={{ flex: 1, minHeight: Dimensions.get("window").height }}>
      <Tab.Navigator screenOptions={screenOptions} initialRouteName="Main">
        <Tab.Screen
          name="Main"
          component={MainScreen}
          options={{
            tabBarIcon: ({ focused }) => {
              return <TabBarIcon focused={focused} icon="home" />;
            },
            unmountOnBlur: true,
          }}
        />
        <Tab.Screen
          name="Categories"
          component={CategoriesScreen}
          options={{
            tabBarIcon: ({ focused }) => {
              return <TabBarIcon focused={focused} icon="list-ul" />;
            },
            unmountOnBlur: true,
          }}
        />
        <Tab.Screen
          name="CreateExpense"
          component={CreateExpenseScreen}
          options={{
            tabBarIcon: ({ focused }) => {
              return <TabBarIcon focused={focused} icon="plus" />;
            },
            unmountOnBlur: true,
          }}
        />
        <Tab.Screen
          name="Statistics"
          component={StatisticsScreen}
          options={{
            tabBarIcon: ({ focused }) => {
              return <TabBarIcon focused={focused} icon="chart-pie" />;
            },
            unmountOnBlur: true,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ focused }) => {
              return <TabBarIcon focused={focused} icon="user" />;
            },
            unmountOnBlur: true,
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}
