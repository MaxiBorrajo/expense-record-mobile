import { Text, View, FlatList } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import { Card } from "@rneui/themed";
import ExpenseComponent from "./ExpenseComponent";
import ExpensesHeaderComponent from "./ExpensesHeaderComponent";
import { useTheme } from "@react-navigation/native";
import { UserContext } from "../context/UserContext";
import { Skeleton } from "moti/skeleton";
import { AppContext } from "../context/AppContext";

export default function ExpensesComponent({
  route,
  navigation,
  setReload,
  reload,
}) {
  const { getExpenses } = useContext(ExpenseContext);
  const { loading } = useContext(UserContext);
  const [expenses, setExpenses] = useState(null);
  const { colors } = useTheme();
  const { isDarkTheme, setIsDarkTheme } = useContext(AppContext);

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
        paddingBottom: 30,
        paddingTop: 20,
        marginTop: 0,
      }}
    >
      <ExpensesHeaderComponent />
      <FlatList
        style={{
          height: "100%",
        }}
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
        }}
        data={expenses}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <ExpenseComponent
            item={item}
            setReload={setReload}
            loading={loading}
          />
        )}
        ListEmptyComponent={() => (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              paddingBottom: 30,
              rowGap: 20,
              width: "100%",
              paddingRight: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                padding: 20,
                alignItems: "center",
                justifyContent: "flex-start",
                backgroundColor: colors.card,
                borderRadius: 5,
                columnGap: 15,
                width: "100%",
              }}
            >
              <Skeleton
                show={!expenses}
                width={60}
                height={60}
                colorMode={isDarkTheme ? "dark" : "light"}
                radius={5}
                transition={{
                  type: "timing",
                  duration: 2000,
                  direction: "left",
                }}
              ></Skeleton>
              <Skeleton
                show={!expenses}
                width={"80%"}
                height={40}
                colorMode={isDarkTheme ? "dark" : "light"}
                radius={5}
                transition={{
                  type: "timing",
                  duration: 2000,
                }}
              ></Skeleton>
            </View>
            <View
              style={{
                flexDirection: "row",
                padding: 20,
                alignItems: "center",
                justifyContent: "flex-start",
                backgroundColor: colors.card,
                borderRadius: 5,
                columnGap: 15,
                width: "100%",
              }}
            >
              <Skeleton
                show={!expenses}
                width={60}
                height={60}
                colorMode={isDarkTheme ? "dark" : "light"}
                radius={5}
                transition={{
                  type: "timing",
                  duration: 2000,
                }}
              ></Skeleton>
              <Skeleton
                show={!expenses}
                width={"80%"}
                height={40}
                colorMode={isDarkTheme ? "dark" : "light"}
                radius={5}
                transition={{
                  type: "timing",
                  duration: 2000,
                }}
              ></Skeleton>
            </View>
            <View
              style={{
                flexDirection: "row",
                padding: 20,
                alignItems: "center",
                justifyContent: "flex-start",
                backgroundColor: colors.card,
                borderRadius: 5,
                columnGap: 15,
                width: "100%",
              }}
            >
              <Skeleton
                show={!expenses}
                width={60}
                height={60}
                colorMode={isDarkTheme ? "dark" : "light"}
                radius={5}
                transition={{
                  type: "timing",
                  duration: 2000,
                }}
              ></Skeleton>
              <Skeleton
                show={!expenses}
                width={"80%"}
                height={40}
                colorMode={isDarkTheme ? "dark" : "light"}
                radius={5}
                transition={{
                  type: "timing",
                  duration: 2000,
                }}
              ></Skeleton>
            </View>
          </View>
        )}
        ItemSeparatorComponent={() => (
          <View style={{ height: 10, width: "100%" }}></View>
        )}
      />
    </Card>
  );
}
