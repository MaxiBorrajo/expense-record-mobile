import { StyleSheet, Text, View } from "react-native";
import { useState, useEffect, useContext } from "react";
import InfoCardComponent from "./InfoCardComponent";
import { ExpenseContext } from "../context/ExpenseContext";

export default function InfoComponent() {
  const { getBalance, getAmount } = useContext(ExpenseContext);

  useEffect(() => {
    getBalance().then((balance) => setBalance(balance));

    getAmount().then((amount) => {
      setMonthBalance(amount);
    });

    getAmount(new Date().getMonth(), 1).then((amount) => {
      setMonthIncomeBalance(amount);
    });

    getAmount(new Date().getMonth(), 0).then((amount) => {
      setMonthLossBalance(amount);
    });
  }, []);

  const [balance, setBalance] = useState(null);
  const [monthBalance, setMonthBalance] = useState(null);
  const [monthIncomeBalance, setMonthIncomeBalance] = useState(null);
  const [monthLossBalance, setMonthLossBalance] = useState(null);

  return (
    <View
      style={{
        padding: 20,
        gap: 10,
        height: 250,
      }}
    >
      <View
        style={{ flexDirection: "row", width: "100%", gap: 10, height: "50%" }}
      >
        <InfoCardComponent title="Total balance" content={balance} width={'50%'}/>
        <InfoCardComponent title="Month balance" content={monthBalance} width={'50%'}/>
      </View>
      <View
        style={{ flexDirection: "row", width: "100%", gap: 10, height: "50%" }}
      >
        <InfoCardComponent
          title="Total month income"
          content={monthIncomeBalance}
          icon='arrow-up'
          iconColor='green'
          width={'50%'}
        />
        <InfoCardComponent
          title="Total month loss"
          content={monthLossBalance}
          icon='arrow-down'
          iconColor='red'
          width={'50%'}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
