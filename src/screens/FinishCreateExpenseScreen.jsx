import { StyleSheet, Text, View, SafeAreaView, TextInput } from "react-native";
import ButtonComponent from "../components/ButtonComponent";
import { useState, useContext, useEffect } from "react";
import GoBackButtonComponent from "../components/GoBackButtonComponent";
import ErrorComponent from "../components/ErrorComponent";
import { ExpenseContext } from "../context/ExpenseContext";

export default function CreateExpenseScreen({ route, navigation }) {
  useEffect(() => {
    setFinishExpenseForm({
      ...finishExpenseForm,
      amount: +expenseForm.amount,
    });
  }, []);
  const { createExpense } = useContext(ExpenseContext);
  const { expenseForm } = route.params;

  const [finishExpenseForm, setFinishExpenseForm] = useState(expenseForm);

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

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  return (
    <View style={styles.container}>
      <GoBackButtonComponent />
      <Text style={styles.title}>Finish new expense</Text>
      {errorMessage ? <ErrorComponent errorMessage={errorMessage} /> : null}
      <TextInput
        style={{
          width: "100%",
          color: "white",
          fontFamily: "Poppins_300Light",
          fontSize: 12,
          padding: 10,
          backgroundColor: "#1c1917",
          borderRadius: 5,
          elevation: 5,
          borderColor: "white",
          borderWidth: 1,
          borderStyle: "solid",
        }}
        onChangeText={(text) =>
          setFinishExpenseForm({ ...finishExpenseForm, title: text })
        }
        value={finishExpenseForm.title ? finishExpenseForm.title : ""}
        placeholder="Write a title"
        placeholderTextColor="white"
      />
      <TextInput
        multiline
        numberOfLines={5}
        placeholderTextColor="white"
        style={{
          width: "100%",
          color: "white",
          fontFamily: "Poppins_300Light",
          fontSize: 12,
          padding: 10,
          backgroundColor: "#1c1917",
          borderRadius: 5,
          elevation: 5,
          borderColor: "white",
          borderWidth: 1,
          borderStyle: "solid",
          textAlignVertical: "top",
        }}
        onChangeText={(text) =>
          setFinishExpenseForm({ ...finishExpenseForm, description: text })
        }
        value={
          finishExpenseForm.description ? finishExpenseForm.description : ""
        }
        placeholder="Write a description (optional)"
      />
      <ButtonComponent
        label={"Create"}
        action={createNewExpense}
        loading={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    color: "fff",
    paddingHorizontal: 30,
    justifyContent: "center",
    position: "relative",
    rowGap: 50,
  },
  title: {
    fontSize: 20,
    fontFamily: "Poppins_500Medium",
    color: "#fff",
  },
});
