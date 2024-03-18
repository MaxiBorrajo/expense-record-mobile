import { Text, View, FlatList, ActivityIndicator } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import { Card } from "@rneui/themed";
import ExpenseComponent from "./ExpenseComponent";
import ExpensesHeaderComponent from "./ExpensesHeaderComponent";
import { useTheme } from "@react-navigation/native";
import { UserContext } from "../context/UserContext";
import i18n from "../utils/i18n";
export default function ExpensesComponent({ route, navigation }) {
  const { getExpenses } = useContext(ExpenseContext);
  const { reload } = useContext(UserContext);
  const [expenses, setExpenses] = useState(null);
  const { colors } = useTheme();

  const getLastExpenses = async () => {
    const filters = [
      {
        filter: "year",
        value: new Date().getFullYear(),
      },
      {
        filter: "month",
        value: new Date().getMonth(),
      },
    ];

    getExpenses(null, null, filters).then((expenses) => {
      setExpenses(expenses.splice(0, 5));
    });
  };

  useEffect(() => {
    getLastExpenses();
  }, [reload]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (route.params?.actionCompleted) {
        getLastExpenses();
      }
    });

    return unsubscribe;
  }, [navigation, route.params?.actionCompleted]);

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
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 10,
          paddingBottom: 490,
        }}
        data={expenses}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <ExpenseComponent
            item={item}
          />
        )}
        ListEmptyComponent={() =>
          !expenses ? (
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
          ) : expenses && expenses.length === 0 ? (
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
