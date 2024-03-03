import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import { Icon } from "@rneui/themed";

export default function AnnualBalanceComponent({ balance, income, loss }) {
  const { colors } = useTheme();
  return (
    <View
      style={{
        paddingVertical: 40,
        paddingHorizontal: 30,
        width: "100%",
        backgroundColor: colors.card,
        borderBottomStartRadius: 50,
        borderBottomEndRadius: 50,
        justifyContent: "space-between",
        gap: 10,
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
          Total balance
        </Text>
        <Text
          style={{
            fontFamily: "Poppins_500Medium",
            fontSize: 35,
            color: colors.text,
          }}
        >
          {balance >= 0
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
            Total Income
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
              {income > 0
                ? `$${income?.toFixed(2)}`
                : `-$${income?.toFixed(2) * -1}`}
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
            Total loss
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
              {loss > 0 ? `$${loss?.toFixed(2)}` : `-$${loss?.toFixed(2) * -1}`}
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
