import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useTheme } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import i18n from "../utils/i18n";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CountUp } from "use-count-up";

export default function AnnualBalanceComponent({ balance, income, loss, loading }) {
  const { colors } = useTheme();
  const [hideBalance, setHideBalance] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("hideBalance", (value) => {
      setHideBalance(Boolean(value));
    });
  }, []);

  return (
    <View
      style={{
        paddingVertical: 40,
        paddingHorizontal: 30,
        width: "100%",
        backgroundColor: colors.card,
        borderRadius: 20,
        justifyContent: "space-between",
        gap: 10,
        elevation:5
      }}
    >
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
                duration={3.2}
                easing={'easeOutCubic'}
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
              duration={3.2}
              easing={'easeOutCubic'}
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
            {i18n.t("totalIncome")}
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
              {hideBalance ? (
                "******"
              ) : (
                <CountUp
                  isCounting={!loading}
                  end={income}
                  formatter={(val) => {
                    return `$${val?.toFixed(2)?.toLocaleString()}`;
                  }}
                  duration={3.2}
                  easing={'easeOutCubic'}
                />
              )}
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
            {i18n.t("totalLoss")}
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
              {hideBalance ? (
                "******"
              ) : (
                <CountUp
                  isCounting={!loading}
                  end={loss * -1}
                  formatter={(val) => {
                    return `$${val?.toFixed(2)?.toLocaleString()}`;
                  }}
                  duration={3.2}
                  easing={'easeOutCubic'}
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
