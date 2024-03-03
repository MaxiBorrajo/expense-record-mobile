import { StyleSheet, Text, View, SafeAreaView, Dimensions } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import InfoComponent from "../components/InfoComponent";
import ExpensesComponent from "../components/ExpensesComponent";

import { useTheme } from "@react-navigation/native";

export default function MainScreen({ route, navigation }) {
  const [reload, setReload] = useState(false);
  const { colors } = useTheme();

  useEffect(() => {
    setReload(false);
  }, [reload]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
          color: colors.text,
          alignItems: "center",
          position: "relative",
          minHeight: Dimensions.get("window").height,
        }}
      >
        <InfoComponent route={route} navigation={navigation} reload={reload} />
        <ExpensesComponent
          route={route}
          navigation={navigation}
          setReload={setReload}
          reload={reload}
        />
      </View>
    </SafeAreaView>
  );
}

