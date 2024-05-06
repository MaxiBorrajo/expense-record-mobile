import { View, Text, StyleSheet } from "react-native";
import { useState, useEffect, useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import { useTheme } from "@react-navigation/native";
import { UserContext } from "../context/UserContext";
import { Icon, Badge } from "@rneui/themed";
import i18n from "../utils/i18n";
import { CountUp } from "use-count-up";

export default function InfoComponent({ openBottomSheet }) {
  const {
    getBalance,
    balance,
    getMonthIncome,
    monthIncomeBalance,
    getMonthLoss,
    monthLossBalance,
  } = useContext(ExpenseContext);

  const { colors } = useTheme();
  const {
    user,
    endLoading,
    loading,
    hideBalance,
    setActualUser,
    unreadNotifications,
  } = useContext(UserContext);

  const getMainInformation = async () => {
    await Promise.all([
      getBalance(),
      getMonthIncome(),
      getMonthLoss(),
      setActualUser(),
    ]);
    endLoading();
  };

  useEffect(() => {
    getMainInformation();
  }, []);

  return (
    <View
      style={{
        width: '100%',
        backgroundColor: colors.card,
        borderBottomStartRadius: 50,
        borderBottomEndRadius: 50,
        elevation: 3,
        height: '30%',
        justifyContent: "center",
        alignItems: "center",
        rowGap: 40,
      }}
    >
      <View
        style={{
          width: 100,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 10,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontFamily: "Poppins_300Light",
            color: colors.text,
          }}
        >
          {i18n.t("welcome")}, {user?.firstName} {user?.lastName}
        </Text>
        <View style={{ position: "relative" }}>
          <Icon
            name="gear"
            type="font-awesome"
            iconStyle={{ color: colors.text, fontSize: 20, paddingBottom: 10 }}
            onPress={openBottomSheet}
          ></Icon>
          {unreadNotifications && unreadNotifications.length ? (
            <Badge
              status="warning"
              containerStyle={{ position: "absolute", top: 0, right: -2 }}
            />
          ) : null}
        </View>
      </View>
      <View
        style={{
          width: '100%',
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "Poppins_300Light",
            fontSize: 19,
            color: colors.text,
          }}
        >
          {i18n.t("totalBalance")}
        </Text>
        <Text
          style={{
            fontFamily: "Poppins_500Medium",
            fontSize: 30,
            color: colors.text,
          }}
        >
          {hideBalance ? (
            "******"
          ) : balance >= 0 ? (
            balance?.toFixed(2) >= 0.01 ? (
              <CountUp
                isCounting={!loading}
                end={balance}
                formatter={(val) => {
                  return `$${val?.toFixed(2)?.toLocaleString()}`;
                }}
                duration={2.5}
                easing={"easeOutCubic"}
              />
            ) : (
              "$0.00"
            )
          ) : balance?.toFixed(2) * -1 >= 0.01 ? (
            <CountUp
              isCounting={!loading}
              end={balance * -1}
              formatter={(val) => {
                return `-$${val?.toFixed(2)?.toLocaleString()}`;
              }}
              duration={2.5}
              easing={"easeOutCubic"}
            />
          ) : (
            "$0.00"
          )}
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
            width: 50,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "Poppins_300Light",
              fontSize: 11,
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
              iconStyle={[styles.profit, { fontSize: 19 }]}
            ></Icon>
            <Text
              style={{
                fontFamily: "Poppins_400Regular",
                fontSize: 17,
                color: colors.text,
              }}
            >
              {hideBalance ? (
                "******"
              ) : (
                <CountUp
                  isCounting={!loading}
                  end={monthIncomeBalance}
                  formatter={(val) => {
                    return `$${val?.toFixed(2)?.toLocaleString()}`;
                  }}
                  duration={2.5}
                  easing={"easeOutCubic"}
                />
              )}
            </Text>
          </View>
        </View>
        <View
          style={{
            width: 50,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "Poppins_300Light",
              fontSize: 11,
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
              iconStyle={[styles.loss, { fontSize:19 }]}
            ></Icon>
            <Text
              style={{
                fontFamily: "Poppins_400Regular",
                fontSize: 17,
                color: colors.text,
              }}
            >
              {hideBalance ? (
                "******"
              ) : (
                <CountUp
                  isCounting={!loading}
                  end={monthLossBalance * -1}
                  formatter={(val) => {
                    return `$${val?.toFixed(2)?.toLocaleString()}`;
                  }}
                  duration={2.5}
                  easing={"easeOutCubic"}
                />
              )}
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
