import { StyleSheet, Text, View, SafeAreaView, TextInput } from "react-native";
import ButtonComponent from "../components/ButtonComponent";
import { useState } from "react";
import axios from "axios";
import GoBackButton from "../components/GoBackButton";
import { Input } from "@rneui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ErrorComponent from "../components/ErrorComponent";
export default function ForgotPasswordScreen({ navigation }) {
  const [forgotPasswordForm, setForgotPasswordForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  async function forgotPassword() {
    try {
      setLoading(true);
      if (forgotPasswordForm.email !== "") {
        const response = await axios.post(
          "http://192.168.0.159:3000/api/auth/forgotPassword",
          forgotPasswordForm
        );
        await AsyncStorage.setItem("email", forgotPasswordForm.email);
        setLoading(false);
        navigation.navigate("VerifyCode");
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
        <GoBackButton />
        <Text style={styles.title}>Forgot password?</Text>
        <Text style={styles.subtitle}>
          Enter your email for the verification process. It will be send a 6
          digits code to your email address.
        </Text>
        {errorMessage ? <ErrorComponent errorMessage={errorMessage} /> : null}
        <Input
          placeholder="Email"
          inputStyle={{ color: "white", fontFamily: "Poppins_300Light" }}
          onChangeText={(newText) =>
            setForgotPasswordForm({ ...forgotPasswordForm, email: newText })
          }
        />
        <Text
          style={styles.link}
          onPress={() => navigation.navigate("VerifyCode")}
        >
          Have a code?
        </Text>
        <ButtonComponent
          label={"Send"}
          action={forgotPassword}
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
  subtitle: {
    fontFamily: "Poppins_300Light",
    fontSize: 15,
    color: "#9ca3af",
  },
  link: {
    fontFamily: "Poppins_300Light",
    fontSize: 15,
    color: "#fff",
  },
});
