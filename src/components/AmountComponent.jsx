import { StyleSheet, Text, View } from "react-native";
import { useState, useEffect, useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import { Icon } from "@rneui/themed";
import { getMonth } from "../utils/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "@react-navigation/native";

export default function AmountComponent({ openYearMonth, year, month }) {
  const { getAmount, getProfitPercentage, getCurrentAmount } =
    useContext(ExpenseContext);

  useEffect(() => {
    getCurrentAmount().then((amount) => setCurrentAmount(amount));
    getAmount(year, month).then((amount) => setAmount(amount));
    getProfitPercentage(year, month).then((percentage) =>
      setProfitPercentage(percentage)
    );
    AsyncStorage.getItem("user").then((item) => {
      const user = JSON.parse(item);
      setCurrency(user.currency);
    });
  }, [year, month]);
  const [amount, setAmount] = useState(0);
  const [currentAmount, setCurrentAmount] = useState(0);
  const [currency, setCurrency] = useState(null);
  const [profitPercentage, setProfitPercentage] = useState(0);
  const { colors } = useTheme();

  return (
    <View
      style={{
        rowGap: 10,
        width: "100%",
        paddingVertical: 10,
        paddingHorizontal: 20,
        height: "25%",
      }}
    >
      <View style={{ flexDirection: "row", columnGap: 10 }}>
        <Text
          style={{
            fontFamily: "Poppins_300Light",
            fontSize: 15,
            color: colors.text,
          }}
        >
          {year}, {getMonth(month)}
        </Text>
        <Icon
          name="sliders"
          type="font-awesome"
          iconStyle={{ color: colors.text }}
          onPress={() => openYearMonth()}
        />
      </View>
      <View
        style={{
          flexWrap: "wrap",
        }}
      >
        <Text
          style={{
            fontSize: 35,
            fontFamily: "Poppins_500Medium",
            color: colors.text,
          }}
        >
          $ {currentAmount ? currentAmount.toFixed(2) : 0} {">"}
        </Text>

        <Text
          style={{
            fontSize: 12,
            fontFamily: "Poppins_300Light",
            color: colors.text,
          }}
        >
          ($ {amount ? amount.toFixed(2) : 0}) this month
        </Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Icon
          name={change > 0 ? "caret-up" : "caret-down"}
          type="font-awesome"
          iconStyle={change > 0 ? styles.profit : styles.loss}
        ></Icon>
        <Text
          style={[
            {
              fontFamily: "Poppins_400Regular",
              fontSize: 13,
              marginHorizontal: 5,
            },
            change > 0 ? styles.profit : styles.loss,
          ]}
        >
          {change ? change.toFixed(2) : 0} %
        </Text>
        <Text
          style={{
            fontFamily: "Poppins_400Regular",
            fontSize: 12,
            color: colors.text,
          }}
        >
          compared to last month
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profit: {
    color: "green",
  },
  loss: {
    color: "red",
  },
});
