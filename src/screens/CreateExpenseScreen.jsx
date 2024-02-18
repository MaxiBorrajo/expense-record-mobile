import { Text, View, TextInput, SafeAreaView, Dimensions } from "react-native";
import ButtonComponent from "../components/ButtonComponent";
import { useState, useContext, useEffect, useRef } from "react";
import GoBackButtonComponent from "../components/GoBackButtonComponent";
import { Icon } from "@rneui/themed";
import ErrorComponent from "../components/ErrorComponent";
import { CategoryContext } from "../context/CategoryContext";
import SelectDropdown from "react-native-select-dropdown";
import { useNavigation } from "@react-navigation/native";
import IncomeOrLossComponent from "../components/IncomeOrLossComponent";
import { useTheme } from "@react-navigation/native";

export default function CreateExpenseScreen() {
  const { getCategories } = useContext(CategoryContext);
  const firstCharge = useRef(true);
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [expenseForm, setExpenseForm] = useState({
    amount: 100,
  });
  const [icon, setIcon] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [categories, setCategories] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

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

  useEffect(() => {
    getCategories().then((categories) => {
      setCategories(categories);
    });
  }, []);

  useEffect(() => {
    if (firstCharge.current) {
      firstCharge.current = false;
    } else {
      setDisabled(validateAmount(expenseForm.amount));
    }
  }, [expenseForm.amount]);

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 30 }}>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
          color: colors.text,
          paddingHorizontal: 30,
          position: "relative",
          minHeight: Dimensions.get("window").height,
        }}
      >
        <GoBackButtonComponent />
        <View
          style={{
            flex: 1,
            rowGap: 50,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontFamily: "Poppins_500Medium",
              color: colors.text,
            }}
          >
            Create new expense
          </Text>
          {errorMessage ? <ErrorComponent errorMessage={errorMessage} /> : null}
          {expenseForm.category_id ? (
            <View
              style={{
                borderRadius: 5,
                backgroundColor: colors.card,
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                width: 70,
                height: 70,
                elevation: 5,
                borderColor: colors.border,
                borderWidth: 1,
                borderStyle: "solid",
                alignSelf: "center",
              }}
            >
              <Icon
                name={icon}
                type="font-awesome-5"
                iconStyle={{ fontSize: 20, color: colors.text }}
              ></Icon>
            </View>
          ) : null}
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              columnGap: 10,
            }}
          >
            <IncomeOrLossComponent
              amount={expenseForm?.amount}
              action={() => {
                setExpenseForm((prev) => ({
                  ...prev,
                  amount: +prev.amount * -1,
                }));
              }}
            />
            <View
              style={{
                flexDirection: "row",
                width: "65%",
                alignItems: "center",
                columnGap: 3,
                backgroundColor: colors.card,
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 5,
                elevation: 5,
                borderColor: colors.border,
                borderWidth: 1,
                borderStyle: "solid",
              }}
            >
              <Text
                style={{
                  color: colors.text,
                  fontFamily: "Poppins_500Medium",
                  fontSize: 15,
                }}
              >
                $
              </Text>
              <TextInput
                style={{
                  color: colors.text,
                  fontFamily: "Poppins_500Medium",
                  fontSize: 15,
                  width: "100%",
                  paddingRight: 15,
                }}
                onChangeText={(text) => {
                  setExpenseForm((prev) => ({ ...prev, amount: +text }));
                }}
                value={expenseForm?.amount.toString()}
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
                setExpenseForm((prev) => ({
                  ...prev,
                  category_id: selectedItem._id,
                }));
              }}
              buttonTextAfterSelection={(selectedItem) => {
                return selectedItem.category_name;
              }}
              rowTextForSelection={(item) => {
                return item.category_name;
              }}
              defaultButtonText="Select a category"
              defaultValue={expenseForm?.category_id}
              buttonStyle={{
                borderRadius: 5,
                alignSelf: "center",
                height: "100%",
                backgroundColor: colors.card,
                color: colors.text,
                borderColor: colors.border,
                borderWidth: 1,
                borderStyle: "solid",
                flexGrow: 1,
              }}
              buttonTextStyle={{
                fontFamily: "Poppins_300Light",
                color: colors.text,
              }}
              rowTextStyle={{ fontFamily: "Poppins_300Light" }}
            />

            <ButtonComponent
              label="Next"
              disabled={disabled}
              action={() => {
                navigation.navigate({
                  name: "FinishCreateExpense",
                  params: { expenseForm: expenseForm },
                });
              }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
