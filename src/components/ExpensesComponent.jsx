import { Text, View, FlatList } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import { Card } from "@rneui/themed";
import ExpenseComponent from "./ExpenseComponent";
import ExpensesHeaderComponent from "./ExpensesHeaderComponent";
import { useTheme } from "@react-navigation/native";

export default function ExpensesComponent({
  route,
  navigation,
  setReload,
  reload,
}) {
  const { getExpenses } = useContext(ExpenseContext);
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
      setExpenses(expenses.splice(0, 4));
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
        height: "50%",
        backgroundColor: "transparent",
        elevation: 0,
        borderWidth: 0,
        paddingBottom:50
      }}
    >
      <ExpensesHeaderComponent />
      <FlatList
        style={{ height: "100%"}}
        data={expenses}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <ExpenseComponent item={item} setReload={setReload} />
        )}
        ListEmptyComponent={() => (
          <Text
            style={{
              color: colors.text,
              fontSize: 25,
              fontFamily: "Poppins_700Bold",
              textAlign: "center",
              padding: 20,
            }}
          >
            Nothing added yet
          </Text>
        )}
        ItemSeparatorComponent={() => (
          <View style={{ height: 10, width: "100%" }}></View>
        )}
      />
    </Card>
  );
}
