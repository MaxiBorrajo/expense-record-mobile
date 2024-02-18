import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Dimensions,
} from "react-native";
import ButtonComponent from "../components/ButtonComponent";
import { useState, useContext, useEffect } from "react";
import GoBackButtonComponent from "../components/GoBackButtonComponent";
import ErrorComponent from "../components/ErrorComponent";
import { ExpenseContext } from "../context/ExpenseContext";
import { useTheme } from "@react-navigation/native";

export default function CreateExpenseScreen({ route, navigation }) {
  const { createExpense } = useContext(ExpenseContext);
  const { expenseForm } = route.params;
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [finishExpenseForm, setFinishExpenseForm] = useState(expenseForm);
  const { colors } = useTheme();

  const createNewExpense = async () => {
    setErrorMessage(null);
    setLoading(true);
    const validation = validateExpenseForm();
    if (validation) {
      await createExpense(finishExpenseForm);
      navigation.navigate("Main", { actionCompleted: true });
    }
    setLoading(false);
  };

  const validateExpenseForm = () => {
    const failedTitle = !finishExpenseForm.title;

    if (failedTitle) {
      setErrorMessage("A title is required");
      return false;
    }

    return true;
  };

  useEffect(() => {
    setFinishExpenseForm((prev) => ({
      ...prev,
      amount: +expenseForm.amount,
    }));
  }, []);

  return (
    <SafeAreaView
      style={{ flex: 1, paddingTop:30 }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
          color: colors.text,
          paddingHorizontal: 30,
          justifyContent: "center",
          position: "relative",
          rowGap: 50,
          minHeight: Dimensions.get("window").height,
        }}
      >
        <GoBackButtonComponent />
        <Text
          style={{
            fontSize: 20,
            fontFamily: "Poppins_500Medium",
            color: colors.text,
          }}
        >
          Finish new expense
        </Text>
        {errorMessage ? <ErrorComponent errorMessage={errorMessage} /> : null}
        <TextInput
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
          }}
          onChangeText={(text) =>
            setFinishExpenseForm((prev) => ({ ...prev, title: text }))
          }
          value={finishExpenseForm?.title}
          placeholder="Write a title"
          placeholderTextColor={colors.text}
        />
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
          onChangeText={(text) =>
            setFinishExpenseForm((prev) => ({ ...prev, description: text }))
          }
          value={
            finishExpenseForm?.description
          }
          placeholder="Write a description (optional)"
        />
        <ButtonComponent
          label={"Create"}
          action={createNewExpense}
          loading={loading}
        />
      </View>
    </SafeAreaView>
  );
}
