import { SafeAreaView, Dimensions } from "react-native";
import TabBarIcon from "../components/TabBarIcon";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CreateExpenseScreen from "./CreateExpenseScreen";
import StatisticsScreen from "./StatisticsScreen";
import MainScreen from "./MainScreen";
import LoadingScreen from "./LoadingScreen";
import { useTheme } from "@react-navigation/native";
import { UserContext } from "../context/UserContext";
import React, { useContext, useEffect } from "react";
import i18n from "../utils/i18n";

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
  const { colors } = useTheme();
  const { loading, loadConfiguration } = useContext(UserContext);

  useEffect(()=>{
    loadConfiguration()
  }, [])

  const screenOptions = {
    tabBarShowLabel: false,
    headerShown: false,
    tabBarStyle: {
      position: "absolute",
      height: 60,
      backgroundColor: colors.softCard,
      width: 200,
      borderRadius: 20,
      borderTopWidth: 0,
      left: (Dimensions.get('window').width / 2) - 100,
      bottom:20,
      elevation:5
    },
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {loading ? <LoadingScreen /> : null}
      <Tab.Navigator screenOptions={screenOptions} initialRouteName="Main">
        <Tab.Screen
          name="Main"
          component={MainScreen}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <TabBarIcon
                  focused={focused}
                  icon="home"
                  name={i18n.t("Home")}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="CreateExpense"
          component={CreateExpenseScreen}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <TabBarIcon
                  focused={focused}
                  icon="plus"
                  name={i18n.t("create")}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="Statistics"
          component={StatisticsScreen}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <TabBarIcon
                  focused={focused}
                  icon="chart-pie"
                  name={i18n.t("statistics")}
                />
              );
            },
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}
