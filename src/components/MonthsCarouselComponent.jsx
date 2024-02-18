import { Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { Icon } from "@rneui/themed";
import { useTheme } from "@react-navigation/native";

export default function MonthsCarouselComponent({ monthsInfo, months }) {
  const [index, setIndex] = useState(0);
  const { colors } = useTheme();

  useEffect(() => {
    setIndex(
      monthsInfo.findIndex(
        (month) => +month.month === new Date().getMonth() + 1
      )
    );
  }, []);

  const next = () => {
    if (index != monthsInfo.length - 1) {
      setIndex((prev) => prev + 1);
    }
  };

  const prev = () => {
    if (index != 0) {
      setIndex((prev) => prev - 1);
    }
  };

  return (
    <View
      style={{
        width: "100%",
        alignItems: "center",
        flexDirection: "row",
        columnGap: 20,
        position: "relative",
        justifyContent: "center",
      }}
    >
      <Icon
        name="chevron-left"
        type="font-awesome-5"
        iconStyle={[
          { fontSize: 30, color: colors.text },
          index != 0 ? null : { opacity: 0 },
        ]}
        onPress={prev}
      />
      <View
        style={{
          width: 290,
          backgroundColor: colors.card,
          elevation: 5,
          borderRadius: 5,
          padding: 20,
          rowGap: 15,
          alignSelf: "center",
        }}
      >
        <Text
          style={{
            color: colors.text,
            fontSize: 15,
            fontFamily: "Poppins_300Light",
            justifyContent: "flex-start",
          }}
        >
          {months[+monthsInfo[index].month - 1]}
        </Text>
        <Text
          style={{
            color: colors.text,
            fontSize: 12,
            fontFamily: "Poppins_300Light",
            paddingHorizontal: 10,
          }}
        >
          Total balance: ${monthsInfo[index].total.toFixed(2)}
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            paddingHorizontal: 10,
          }}
        >
          <Text
            style={{
              color: colors.text,
              fontSize: 12,
              fontFamily: "Poppins_300Light",
              paddingRight: 5,
            }}
          >
            Total Income:
          </Text>
          <Icon
            name="arrow-up"
            color="#58eb34"
            type="font-awesome-5"
            iconStyle={{ fontSize: 12, paddingHorizontal: 5 }}
          />
          <Text
            style={{
              fontSize: 12,
              fontFamily: "Poppins_300Light",
              color: "#58eb34",
            }}
          >
            ${monthsInfo[index].totalIncome.toFixed(2)}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            paddingHorizontal: 10,
          }}
        >
          <Text
            style={{
              color: colors.text,
              fontSize: 12,
              fontFamily: "Poppins_300Light",
              paddingRight: 5,
            }}
          >
            Total loss:
          </Text>
          <Icon
            name="arrow-down"
            color="red"
            type="font-awesome-5"
            iconStyle={{ fontSize: 12, paddingHorizontal: 5 }}
          />
          <Text
            style={{
              fontSize: 12,
              fontFamily: "Poppins_300Light",
              color: "red",
            }}
          >
            ${monthsInfo[index].totalLoss.toFixed(2)}
          </Text>
        </View>
      </View>
      <Icon
        name="chevron-right"
        type="font-awesome-5"
        iconStyle={[
          { fontSize: 30, color: colors.text },
          index != monthsInfo.length - 1 ? null : { opacity: 0 },
        ]}
        onPress={next}
      />
    </View>
  );
}
