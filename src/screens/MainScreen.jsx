import { StyleSheet, Text, View, SafeAreaView, Dimensions } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import InfoComponent from "../components/InfoComponent";
import ExpensesComponent from "../components/ExpensesComponent";
import { Icon } from "@rneui/themed";
import { UserContext } from "../context/UserContext";
import { useTheme } from "@react-navigation/native";

export default function MainScreen({ route, navigation }) {
  const { getChange } = useContext(ExpenseContext);
  const { getCurrentUser } = useContext(UserContext);
  const [reload, setReload] = useState(false);
  const { colors } = useTheme();

  useEffect(() => {
    setReload(false);

    getChange().then((percentage) => {
      setChange(percentage);
    });

    getCurrentUser().then((user) => {
      setUser(user);
    });
  }, [reload]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (route.params?.actionCompleted) {
        getChange().then((percentage) => {
          setChange(percentage);
        });

        getCurrentUser().then((user) => {
          setUser(user);
        });
      }
    });

    return unsubscribe;
  }, [navigation, route.params?.actionCompleted]);

  const [user, setUser] = useState(null);

  const [change, setChange] = useState(null);

  return (
    <SafeAreaView
      style={{ flex: 1, minHeight: Dimensions.get("window").height }}
    >
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
        {user ? (
          <Text
            style={{
              fontSize: 15,
              fontFamily: "Poppins_500Medium",
              color: colors.text,
              alignSelf: "flex-start",
              paddingHorizontal: 20,
              paddingTop: 10,
            }}
          >
            Welcome, {user.firstName} {user.lastName}{" "}
          </Text>
        ) : null}
        <InfoComponent route={route} navigation={navigation} reload={reload} />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            width: "100%",
            paddingLeft: 30,
          }}
        >
          <Icon
            name={change && change.percentage > 0 ? "caret-up" : "caret-down"}
            type="font-awesome"
            iconStyle={
              change && change.percentage > 0 ? styles.profit : styles.loss
            }
          ></Icon>
          <Text
            style={[
              {
                fontFamily: "Poppins_400Regular",
                fontSize: 11,
                marginHorizontal: 5,
                marginTop: 5,
              },
              change && change.percentage > 0 ? styles.profit : styles.loss,
            ]}
          >
            {change && change.percentage ? change.percentage.toFixed(2) : 0} %
          </Text>
          <Text
            style={{
              fontFamily: "Poppins_400Regular",
              fontSize: 11,
              color: colors.text,
            }}
          >
            ($ {change && change.nominal ? change.nominal.toFixed(2) : 0})
            compared to last month
          </Text>
        </View>
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

const styles = StyleSheet.create({
  profit: {
    color: "#58eb34",
  },
  loss: {
    color: "red",
  },
});
