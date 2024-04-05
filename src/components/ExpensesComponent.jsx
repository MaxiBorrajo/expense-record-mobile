import { Text, View, FlatList, ActivityIndicator } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import { Card } from "@rneui/themed";
import ExpenseComponent from "./ExpenseComponent";
import ExpensesHeaderComponent from "./ExpensesHeaderComponent";
import { useTheme } from "@react-navigation/native";
import i18n from "../utils/i18n";
export default function ExpensesComponent() {
  const { lastExpenses, getLastExpenses } = useContext(ExpenseContext);
  const { colors } = useTheme();

  useEffect(() => {
    getLastExpenses();
  }, []);

  return (
    <Card
      containerStyle={{
        width: "100%",
        backgroundColor: "transparent",
        elevation: 0,
        borderWidth: 0,
        marginTop: 0,
      }}
    >
      <ExpensesHeaderComponent />
      <FlatList
        contentContainerStyle={{
          minHeight: "100%",
          minWidth: "100%",
          alignItems: "center",
          paddingTop: 10,
          paddingBottom: 490,
          justifyContent:
            lastExpenses && lastExpenses.length ? "flex-start" : "center",
        }}
        data={lastExpenses}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <ExpenseComponent item={item} />}
        ListEmptyComponent={() =>
          !lastExpenses ? (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100%",
                minWidth: "100%",
              }}
            >
              <ActivityIndicator color={colors.attention} size="large" />
            </View>
          ) : lastExpenses && lastExpenses.length === 0 ? (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100%",
                minWidth: "100%",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "Poppins_400Regular",
                  color: colors.text,
                }}
              >
                {i18n.t("dataNotFound")}
              </Text>
            </View>
          ) : null
        }
        ItemSeparatorComponent={() => (
          <View style={{ height: 10, width: "100%" }}></View>
        )}
      />
    </Card>
  );
}
