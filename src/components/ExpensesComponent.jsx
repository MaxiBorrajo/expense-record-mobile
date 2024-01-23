import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import { Card, Icon, Divider } from "@rneui/themed";
import ExpenseComponent from "./ExpenseComponent";
import ExpensesHeaderComponent from "./ExpensesHeaderComponent";

export default function ExpensesComponent() {
  const { errorMessage, getExpenses } = useContext(ExpenseContext);
  const [expenses, setExpenses] = useState(null);
  useEffect(() => {
    const filters = [
      {
        filter: "year",
        value: new Date().getFullYear(),
      },
      {
        filter: "month",
        value: new Date().getMonth(),
      }
    ];

    getExpenses(null, null, filters).then((expenses) => {
      setExpenses(expenses.splice(0, 4));
    });
  }, []);

  return (
    <Card
      containerStyle={{
        width: "100%",
        height: "50%",
        backgroundColor: "transparent",
        elevation: 0,
        borderWidth: 0,
      }}
    >
      <ExpensesHeaderComponent />
      <FlatList
        style={{ height: "100%" }}
        data={expenses}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <ExpenseComponent item={item} />}
        ListEmptyComponent={() => (
          <Text
            style={{
              color: "white",
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
          <View style={{ height: 20, width: "100%" }}></View>
        )}
      />
    </Card>
  );
}

const styles = StyleSheet.create({});
