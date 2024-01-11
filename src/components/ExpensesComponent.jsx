import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import { Card, Icon, Divider } from "@rneui/themed";
import ExpenseComponent from "./ExpenseComponent";
import ExpensesHeaderComponent from "./ExpensesHeaderComponent";
export default function ExpensesComponent({
  sort,
  order,
  year,
  month,
  keyword,
  openParameteres,
}) {
  const { errorMessage, getExpenses } = useContext(ExpenseContext);
  const [expenses, setExpenses] = useState(null);
  useEffect(() => {
    const filters = [
      { filter: "keyword", value: keyword },
      {
        filter: "year",
        value: year,
      },
      {
        filter: "month",
        value: month,
      },
    ];

    getExpenses(sort, order, filters).then((expenses) => {
      setExpenses(expenses);
    });
  }, [sort, order, keyword, year, month]);

  return (
    <Card
      containerStyle={{
        borderRadius: 30,
        backgroundColor: "#27272a",
        borderColor: "#27272a",
        padding: 20,
        width: "100%",
        height: "65%",
      }}
    >
      <FlatList
        removeClippedSubviews={true}
        data={expenses}
        keyExtractor={(item) => item._id}
        ListHeaderComponent={() => (
          <ExpensesHeaderComponent openParameteres={openParameteres} />
        )}
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
      />
    </Card>
  );
}

const styles = StyleSheet.create({});
