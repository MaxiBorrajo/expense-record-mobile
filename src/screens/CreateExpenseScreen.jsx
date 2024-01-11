import { StyleSheet, Text, View, SafeAreaView, TextInput } from "react-native";
import ButtonComponent from "../components/ButtonComponent";
import { useState, useContext, useEffect } from "react";
import GoBackButton from "../components/GoBackButton";
import { Input, Icon } from "@rneui/themed";
import ErrorComponent from "../components/ErrorComponent";
import { ExpenseContext } from "../context/ExpenseContext";
export default function CreateExpenseScreen({ navigation }) {
  const { errorMessage, createExpense, getIcons } = useContext(ExpenseContext);

  useEffect(() => {
    getIcons(keyword).then((icons) => {
      setIcons(icons);
    });
  }, []);

  const [expenseForm, setExpenseForm] = useState({
    title: "",
    description: "",
  });

  const [selectedIcon, setSelectedIcon] = useState("money-bill-wave");

  const [loading, setLoading] = useState(false);
  const [icons, setIcons] = useState(null);
  const [keyword, setKeyword] = useState(null);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <GoBackButton />
        <Text style={styles.title}>Create new expense</Text>
        {errorMessage ? <ErrorComponent errorMessage={errorMessage} /> : null}
        <View
          style={{
            backgroundColor: "white",
            width: 100,
            height: 100,
            borderRadius: 50,
            alignContent: "center",
            justifyContent: "center",
            alignSelf:'center'
          }}
        >
          <Icon
            name={selectedIcon}
            type="font-awesome-5"
            iconStyle={{ color: "black", fontSize:50 }}
          ></Icon>
        </View>
        <Input
          placeholder="Title"
          inputStyle={{ color: "white", fontFamily: "Poppins_300Light" }}
          onChangeText={(newText) =>
            setExpenseForm({ ...expenseForm, title: newText })
          }
        />
        <ButtonComponent
          label={"Create"}
          action={createExpense}
          loading={loading}
        />
      </View>
    </SafeAreaView>
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
  safeArea: {
    flex: 1,
  },
  title: {
    fontFamily: "Poppins_500Medium",
    fontSize: 30,
    color: "#fff",
  },
  link: {
    fontFamily: "Poppins_300Light",
    fontSize: 15,
    color: "#fff",
  },
});
