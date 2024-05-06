import { Text, View, FlatList, ActivityIndicator } from "react-native";
import React, { useContext, useEffect } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
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
    <View
      style={{
        height: 70,
        paddingTop: 10,
        paddingHorizontal: 15,
      }}
    >
      <FlatList
        stickyHeaderIndices={[0]}
        contentContainerStyle={{ paddingBottom: 200 }}
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
        ListHeaderComponent={() => <ExpensesHeaderComponent />}
        ListHeaderComponentStyle={{ backgroundColor: colors.background }}
        ItemSeparatorComponent={() => (
          <View style={{ height: 10, width: "100%" }}></View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
