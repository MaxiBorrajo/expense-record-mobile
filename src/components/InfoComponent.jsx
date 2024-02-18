import { View } from "react-native";
import { useState, useEffect, useContext } from "react";
import InfoCardComponent from "./InfoCardComponent";
import { ExpenseContext } from "../context/ExpenseContext";

export default function InfoComponent({ route, navigation, reload }) {
  const { getBalance, getAmount } = useContext(ExpenseContext);
  const [balance, setBalance] = useState(null);
  const [monthBalance, setMonthBalance] = useState(null);
  const [monthIncomeBalance, setMonthIncomeBalance] = useState(null);
  const [monthLossBalance, setMonthLossBalance] = useState(null);

  const getMainInformation = async () => {
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
        padding: 20,
        gap: 10,
        height: 250,
      }}
    >
      <View
        style={{ flexDirection: "row", width: "100%", gap: 10, height: "50%" }}
      >
        <InfoCardComponent
          title="Total balance"
          content={balance?.toFixed(2)}
          width={"50%"}
        />
        <InfoCardComponent
          title="Month balance"
          content={monthBalance?.toFixed(2)}
          width={"50%"}
        />
      </View>
      <View
        style={{ flexDirection: "row", width: "100%", gap: 10, height: "50%" }}
      >
        <InfoCardComponent
          title="Total month income"
          content={monthIncomeBalance?.toFixed(2)}
          icon="arrow-up"
          iconColor="#58eb34"
          width={"50%"}
        />
        <InfoCardComponent
          title="Total month loss"
          content={monthLossBalance?.toFixed(2)}
          icon="arrow-down"
          iconColor="red"
          width={"50%"}
        />
      </View>
    </View>
  );
}
