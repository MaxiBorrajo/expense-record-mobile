import { View, Text, StyleSheet } from "react-native";
import { useState, useEffect, useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import { useTheme } from "@react-navigation/native";
import { UserContext } from "../context/UserContext";
import { Icon } from "@rneui/themed";
import i18n from "../utils/i18n";

export default function InfoComponent({
  route,
  navigation,
  reload,
  openBottomSheet,
  hideBalance,
}) {
  const { getBalance, getAmount } = useContext(ExpenseContext);
  const [balance, setBalance] = useState(null);
  const [monthIncomeBalance, setMonthIncomeBalance] = useState(null);
  const [monthLossBalance, setMonthLossBalance] = useState(null);
  const { colors } = useTheme();
  const { getCurrentUser, endLoading } = useContext(UserContext);
  const [user, setUser] = useState(null);

  const getMainInformation = async () => {
    await Promise.all([
      getCurrentUser().then((user) => setUser(user)),
      getBalance().then((balance) => setBalance(balance)),
      getAmount(new Date().getMonth(), 1).then((amount) =>
        setMonthIncomeBalance(amount)
      ),
      getAmount(new Date().getMonth(), 0).then((amount) =>
        setMonthLossBalance(amount)
      ),
    ]);
    endLoading();
  };

  useEffect(() => {
    getMainInformation();
  }, [reload]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (route.params?.actionCompleted) {
        getMainInformation();
      }
    });

    return unsubscribe;
  }, [navigation, route.params?.actionCompleted]);

  return (
    <View
      style={{
        paddingVertical: 50,
        paddingHorizontal: 30,
        width: "100%",
        backgroundColor: colors.card,
        borderBottomStartRadius: 50,
        borderBottomEndRadius: 50,
        rowGap:40
      }}
    >
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 15,
            fontFamily: "Poppins_300Light",
            color: colors.text,
          }}
        >
          {i18n.t("welcome")}, {user?.firstName} {user?.lastName}
        </Text>
        <Icon
          name="gear"
          type="font-awesome"
          iconStyle={{ color: colors.text, fontSize: 20, paddingBottom: 3 }}
          onPress={openBottomSheet}
        ></Icon>
      </View>
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "Poppins_300Light",
            fontSize: 20,
            color: colors.text,
          }}
        >
          {i18n.t("totalBalance")}
        </Text>
        <Text
          style={{
            fontFamily: "Poppins_500Medium",
            fontSize: 35,
            color: colors.text,
          }}
        >
          {hideBalance
            ? "******"
            : balance >= 0
            ? balance?.toFixed(2) >= 0.01
              ? `$${balance?.toFixed(2)}`
              : "$0.00"
            : balance?.toFixed(2) * -1 >= 0.01
            ? `-$${balance?.toFixed(2) * -1}`
            : "$0.00"}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "50%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "Poppins_300Light",
              fontSize: 13,
              color: colors.text,
            }}
          >
            {i18n.t("incomeOfMonth")}
          </Text>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              columnGap: 10,
              flexDirection: "row",
            }}
          >
            <Icon
              name="arrow-up"
              type="font-awesome"
              iconStyle={[styles.profit, { fontSize: 17 }]}
            ></Icon>
            <Text
              style={{
                fontFamily: "Poppins_400Regular",
                fontSize: 17,
                color: colors.text,
              }}
            >
              {hideBalance
                ? "******"
                : `$${monthIncomeBalance?.toFixed(2)}`}
            </Text>
          </View>
        </View>
        <View
          style={{
            width: "50%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "Poppins_300Light",
              fontSize: 13,
              color: colors.text,
            }}
          >
            {i18n.t("lossOfMonth")}
          </Text>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              columnGap: 10,
              flexDirection: "row",
            }}
          >
            <Icon
              name="arrow-down"
              type="font-awesome"
              iconStyle={[styles.loss, { fontSize: 17 }]}
            ></Icon>
            <Text
              style={{
                fontFamily: "Poppins_400Regular",
                fontSize: 17,
                color: colors.text,
              }}
            >
              {hideBalance
                ? "******"
                : `$${monthLossBalance?.toFixed(2)}`}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profit: {
    color: "#58eb34",
  },
  loss: {
    color: "#ed2139",
  },
});
