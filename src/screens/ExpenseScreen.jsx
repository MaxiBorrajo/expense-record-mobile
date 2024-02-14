import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  Dimensions,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import { CategoryContext } from "../context/CategoryContext";
import SelectDropdown from "react-native-select-dropdown";
import GoBackButtonComponent from "../components/GoBackButtonComponent";
import ButtonComponent from "../components/ButtonComponent";
import IncomeOrLossComponent from "../components/IncomeOrLossComponent";
import ErrorComponent from "../components/ErrorComponent";
import { Icon, Dialog, Button } from "@rneui/themed";
import { formatDate } from "../utils/utils";
import { useTheme } from "@react-navigation/native";

export default function ExpenseScreen({ route, navigation }) {
  const { deleteExpenseById, getExpenseById, updateExpenseById } =
    useContext(ExpenseContext);
  const { getCategories } = useContext(CategoryContext);
  const { id } = route.params;
  const [loading, setLoading] = useState(false);
  const [expense, setExpense] = useState(null);
  const [categories, setCategories] = useState(null);
  const toggleDialog = () => {
    setVisible(!visible);
  };
  const [visible, setVisible] = useState(false);
  const { colors } = useTheme();

  useEffect(() => {
    getExpenseById(id).then((exp) => {
      setExpense({
        amount: exp.amount.toFixed(2),
        category_id: exp.category_id,
        title: exp.title,
        description: exp.description,
        createdAt: exp.createdAt,
      });
    });

    getCategories().then((categories) => {
      setCategories(categories);
    });
  }, []);
  const [errorMessage, setErrorMessage] = useState(null);

  const updateExpense = async () => {
    setLoading(true);
    const validation = validateExpense();
    if (validation) {
      await updateExpenseById(id, expense);
      setLoading(false);
      navigation.navigate("Main", { actionCompleted: true });
    }

    setLoading(false);
  };

  const deleteExpense = async () => {
    await deleteExpenseById(id);
    navigation.navigate("Main", { actionCompleted: true });
  };

  const validateExpense = () => {
    setErrorMessage(null);

    if (!expense.title) {
      setErrorMessage("A title must be provided");
      return false;
    }

    if (!expense.amount || +expense.amount === 0) {
      setErrorMessage("An amount must be provided");
      return false;
    }

    return true;
  };

  return (
    <SafeAreaView
      style={{ flex: 1, minHeight: Dimensions.get("window").height }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
          color: colors.text,
          paddingHorizontal: 30,
          rowGap: 50,
          justifyContent: "center",
          minHeight: Dimensions.get("window").height,
        }}
      >
        <Dialog
          isVisible={visible}
          onBackdropPress={toggleDialog}
          overlayStyle={{
            borderRadius: 5,
            elevation: 5,
            backgroundColor: colors.background,
            borderColor: colors.border,
            borderWidth: 1,
            borderStyle: "solid",
          }}
        >
          <Text
            style={{
              fontFamily: "Poppins_500Medium",
              color: colors.text,
              fontSize: 20,
            }}
          >
            Delete expense
          </Text>
          <Text
            style={{
              fontFamily: "Poppins_300Light",
              color: colors.text,
              fontSize: 12,
            }}
          >
            Are you sure you want to delete this expense? All information will
            be deleted and cannot be recovered
          </Text>
          <Dialog.Actions>
            <Button
              title="Delete"
              titleStyle={{
                color: "#fff",
                fontSize: 12,
                fontFamily: "Poppins_500Medium",
              }}
              buttonStyle={{
                backgroundColor: "#eb1717",
                borderRadius: 5,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => deleteExpense()}
            />
            <View style={{ width: 15 }}></View>
            <Button
              title="Cancel"
              titleStyle={{
                color: colors.background,
                fontSize: 12,
                fontFamily: "Poppins_500Medium",
              }}
              buttonStyle={{
                backgroundColor: colors.text,
                borderRadius: 5,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => setVisible(false)}
            />
          </Dialog.Actions>
        </Dialog>
        <GoBackButtonComponent />
        <View>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontFamily: "Poppins_500Medium",
                color: colors.text,
              }}
            >
              Details
            </Text>
            <Icon
              name="trash-alt"
              type="font-awesome-5"
              iconStyle={{ fontSize: 20, color: "red", paddingBottom: 9 }}
              onPress={toggleDialog}
            />
          </View>
          {expense ? (
            <Text
              style={{
                color: colors.text,
                fontSize: 10,
                fontFamily: "Poppins_300Light",
              }}
            >
              {formatDate(expense.createdAt)}
            </Text>
          ) : null}
        </View>
        {errorMessage ? <ErrorComponent errorMessage={errorMessage} /> : null}
        <View
          style={{
            width: "100%",
            alignItems: "center",
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
          <TextInput
            style={{
              color: colors.text,
              fontFamily: "Poppins_300Light",
              fontSize: 12,
              width: "100%",
              paddingRight: 15,
            }}
            onChangeText={(text) => {
              setExpense({ ...expense, title: text });
            }}
            value={expense ? expense.title : ""}
            placeholder="Write a title"
            placeholderTextColor={colors.text}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 50,
            columnGap: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              width: "90%",
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
                fontFamily: "Poppins_300Light",
                fontSize: 12,
                width: "100%",
                paddingRight: 25,
              }}
              onChangeText={(text) => {
                setExpense({ ...expense, amount: text });
              }}
              value={expense ? expense.amount.toString() : "0"}
              keyboardType="numeric"
            />
          </View>
          <IncomeOrLossComponent
            amount={expense ? expense.amount : 0}
            action={() =>
              setExpense({ ...expense, amount: expense.amount * -1 })
            }
          />
        </View>
        <TextInput
          multiline
          numberOfLines={5}
          placeholderTextColor={colors.text}
          style={{
            width: "100%",
            color: colors.text,
            fontFamily: "Poppins_300Light",
            fontSize: 12,
            padding: 10,
            backgroundColor: colors.card,
            borderRadius: 5,
            elevation: 5,
            borderColor: colors.border,
            borderWidth: 1,
            borderStyle: "solid",
            textAlignVertical: "top",
          }}
          onChangeText={(text) => setExpense({ ...expense, description: text })}
          value={expense ? expense.description : ""}
          placeholder="Write a description (optional)"
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            columnGap: 10,
            width: "100%",
          }}
        >
          {expense ? (
            <SelectDropdown
              data={categories}
              onSelect={(selectedItem) => {
                setExpense({ ...expense, category_id: selectedItem._id });
              }}
              buttonTextAfterSelection={(selectedItem) => {
                return selectedItem.category_name;
              }}
              rowTextForSelection={(item) => {
                return item.category_name;
              }}
              defaultButtonText="Select a category"
              defaultValue={expense.category_id}
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
          ) : null}
          <ButtonComponent
            label="Save"
            loading={loading}
            action={() => {
              setExpense({
                ...expense,
                amount: +expense.amount,
                category_id: expense.category_id._id,
              });
              updateExpense();
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
