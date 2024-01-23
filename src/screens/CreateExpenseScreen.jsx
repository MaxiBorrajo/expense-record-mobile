import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import ButtonComponent from "../components/ButtonComponent";
import { useState, useContext, useEffect, useRef } from "react";
import GoBackButtonComponent from "../components/GoBackButtonComponent";
import { Input, Icon } from "@rneui/themed";
import ErrorComponent from "../components/ErrorComponent";
import { CategoryContext } from "../context/CategoryContext";
import SelectDropdown from "react-native-select-dropdown";
import { useNavigation } from "@react-navigation/native";

export default function CreateExpenseScreen() {
  const { getCategories } = useContext(CategoryContext);
  const firstCharge = useRef(true);
  const navigation = useNavigation();

  useEffect(() => {
    getCategories().then((categories) => {
      setCategories(categories);
    });
  }, []);

  const [expenseForm, setExpenseForm] = useState({
    isIncome: true,
    amount: "0.00",
  });

  const [icon, setIcon] = useState(null);

  useEffect(() => {
    if (firstCharge.current) {
      firstCharge.current = false;
    } else {
      setDisabled(validateAmount(expenseForm.amount));
    }
  }, [expenseForm.amount]);

  const [categories, setCategories] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [disabled, setDisabled] = useState(true);

  const validateAmount = (amount) => {
    if (!amount) {
      setErrorMessage("An amount must be provided");
      return true;
    }

    if (+amount === 0) {
      setErrorMessage("The amount must be different than zero");
      return true;
    }
    setErrorMessage(null);
    return false;
  };

  return (
    <View style={styles.container}>
      <GoBackButtonComponent />
      <View
        style={{
          width: "100%",
          height: "100%",
          rowGap:50,
          justifyContent:'center',
        }}
      >
        <Text style={styles.title}>Create new expense</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-around",
            columnGap: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => setExpenseForm({ ...expenseForm, isIncome: true })}
            style={{
              flexDirection: "row",
              alignItems: "center",
              columnGap: 10,
            }}
          >
            {expenseForm.isIncome ? (
              <Icon
                name="arrow-up"
                type="font-awesome-5"
                iconStyle={{ fontSize: 20, color: "#22c55e" }}
              />
            ) : null}
            <Text
              style={[
                {
                  color: "white",
                  fontFamily: "Poppins_500Medium",
                  fontSize: 20,
                },
                expenseForm.isIncome
                  ? {
                      color: "#22c55e",
                    }
                  : null,
              ]}
            >
              Income
            </Text>
            {expenseForm.isIncome ? (
              <Icon
                name="arrow-up"
                type="font-awesome-5"
                iconStyle={{ fontSize: 20, color: "#22c55e" }}
              />
            ) : null}
          </TouchableOpacity>
          <Text
            style={{
              color: "white",
              fontFamily: "Poppins_500Medium",
              fontSize: 20,
            }}
          >
            |
          </Text>
          <TouchableOpacity
            onPress={() => setExpenseForm({ ...expenseForm, isIncome: false })}
            style={{
              flexDirection: "row",
              alignItems: "center",
              columnGap: 10,
            }}
          >
            {!expenseForm.isIncome ? (
              <Icon
                name="arrow-down"
                type="font-awesome-5"
                iconStyle={{ fontSize: 20, color: "#dc2626" }}
              />
            ) : null}
            <Text
              style={[
                {
                  color: "white",
                  fontFamily: "Poppins_500Medium",
                  fontSize: 20,
                },
                !expenseForm.isIncome
                  ? {
                      color: "#dc2626",
                    }
                  : null,
              ]}
            >
              Loss
            </Text>
            {!expenseForm.isIncome ? (
              <Icon
                name="arrow-down"
                type="font-awesome-5"
                iconStyle={{ fontSize: 20, color: "#dc2626" }}
              />
            ) : null}
          </TouchableOpacity>
        </View>
        {errorMessage ? <ErrorComponent errorMessage={errorMessage} /> : null}

        <View
          style={{
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-between",
            columnGap: 10,
          }}
        >
          {expenseForm.category_id ? (
            <View
              style={{
                borderRadius: 5,
                backgroundColor: "#1c1917",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                width: 67,
                height: 67,
                elevation: 5,
                borderColor: "white",
                borderWidth: 1,
                borderStyle: "solid",
              }}
            >
              <Icon
                name={icon}
                type="font-awesome-5"
                iconStyle={{ fontSize: 20, color: "white" }}
              ></Icon>
            </View>
          ) : null}
          <View
            style={{
              flexDirection: "row",
              width: expenseForm.category_id ? "80%" : "100%",
              alignItems: "center",
              columnGap: expenseForm.isIncome ? 10 : 3,
              backgroundColor: "#1c1917",
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 5,
              elevation: 5,
              borderColor: "white",
              borderWidth: 1,
              borderStyle: "solid",
            }}
          >
            <Text
              style={{
                color: "white",
                fontFamily: "Poppins_500Medium",
                fontSize: 20,
              }}
            >
              {expenseForm.isIncome ? "$" : "$ -"}
            </Text>
            <TextInput
              style={{
                color: "white",
                fontFamily: "Poppins_500Medium",
                fontSize: 18,
                width: "100%",
                paddingRight: 15,
              }}
              onChangeText={(text) => {
                setExpenseForm({ ...expenseForm, amount: text });
              }}
              value={expenseForm.amount.toString()}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
            columnGap: 10,
          }}
        >
          <SelectDropdown
            data={categories}
            onSelect={(selectedItem) => {
              setIcon(selectedItem.icon_id.icon);
              setExpenseForm({ ...expenseForm, category_id: selectedItem._id });
            }}
            buttonTextAfterSelection={(selectedItem) => {
              return selectedItem.category_name;
            }}
            rowTextForSelection={(item) => {
              return item.category_name;
            }}
            defaultButtonText="Select a category"
            defaultValue={
              expenseForm.category_id ? expenseForm.category_id : null
            }
            buttonStyle={{
              borderRadius: 5,
              alignSelf: "center",
              height: "100%",
              backgroundColor: "#1c1917",
              color: "white",
              borderColor: "white",
              borderWidth: 1,
              borderStyle: "solid",
              flexGrow: 1,
            }}
            buttonTextStyle={{ fontFamily: "Poppins_300Light", color: "white" }}
            rowTextStyle={{ fontFamily: "Poppins_300Light" }}
          />

          <ButtonComponent
            label="Next"
            disabled={disabled}
            action={() => {
              setExpenseForm({ ...expenseForm, amount: +expenseForm.amount });
              navigation.navigate({
                name: "FinishCreateExpense",
                params: { expenseForm: expenseForm },
              });
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    color: "fff",
    paddingHorizontal: 30,
    paddingVertical: 100,
    position: "relative",
  },
  title: {
    fontSize: 20,
    fontFamily: "Poppins_500Medium",
    color: "#fff",
  },
});
