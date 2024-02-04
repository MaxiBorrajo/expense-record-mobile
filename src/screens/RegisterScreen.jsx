import { StyleSheet, Text, View, SafeAreaView, TextInput } from "react-native";
import ButtonComponent from "../components/ButtonComponent";
import { useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GoBackButtonComponent from "../components/GoBackButtonComponent";
import { Input, Icon } from "@rneui/themed";
import ErrorComponent from "../components/ErrorComponent";
export default function RegisterScreen({ navigation }) {
  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  async function register() {
    try {
      setLoading(true);
      if (registerForm.email !== "" && registerForm.password !== "") {
        const response = await axios.post(
          "https://expense-record-production.up.railway.app/api/auth",
          registerForm
        );
        await AsyncStorage.setItem("token", response.data.resource.token);
        await AsyncStorage.setItem(
          "user",
          JSON.stringify(response.data.resource.user)
        );
        setLoading(false);
        navigation.navigate("Home");
      }
    } catch (error) {
      setLoading(false);
      if (error.response.data) {
        setErrorMessage(error.response.data.Error);
      } else {
        setErrorMessage(error.message);
      }
    }
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <GoBackButtonComponent />
        <Text style={styles.title}>Sign up</Text>
        {errorMessage ? <ErrorComponent errorMessage={errorMessage} /> : null}
        <Input
          placeholder="Email"
          inputStyle={{
            color: "white",
            fontFamily: "Poppins_300Light",
            fontSize: 12,
            width: "100%",
          }}
          inputContainerStyle={{
            width: "100%",
            alignItems: "center",
            backgroundColor: "#1c1917",
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 5,
            elevation: 5,
            borderColor: "white",
            borderWidth: 1,
            borderStyle: "solid",
          }}
          onChangeText={(newText) =>
            setRegisterForm({ ...registerForm, email: newText })
          }
        />
        <Input
          placeholder="Password"
          rightIcon={
            <Icon
              name={showPassword ? "eye-slash" : "eye"}
              size={20}
              reverse
              type="font-awesome-5"
              onPress={() => setShowPassword(!showPassword)}
            />
          }
          secureTextEntry={!showPassword}
          inputStyle={{
            color: "white",
            fontFamily: "Poppins_300Light",
            fontSize: 12,
            width: "100%",
          }}
          inputContainerStyle={{
            width: "100%",
            alignItems: "center",
            backgroundColor: "#1c1917",
            paddingVertical: 10,
            paddingLeft: 20,
            borderRadius: 5,
            elevation: 5,
            borderColor: "white",
            borderWidth: 1,
            borderStyle: "solid",
          }}
          onChangeText={(newText) =>
            setRegisterForm({ ...registerForm, password: newText })
          }
        />
        <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
          Have account?
        </Text>
        <ButtonComponent
          label={"Sign up"}
          action={register}
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
    paddingTop: 100,
    justifyContent: "center",
    position: "relative",
    rowGap: 30,
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
