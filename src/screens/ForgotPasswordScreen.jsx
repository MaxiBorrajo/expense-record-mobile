import { StyleSheet, Text, View, SafeAreaView, Dimensions } from "react-native";
import ButtonComponent from "../components/ButtonComponent";
import { useState } from "react";
import axios from "axios";
import GoBackButtonComponent from "../components/GoBackButtonComponent";
import { Input } from "@rneui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ErrorComponent from "../components/ErrorComponent";
import { useTheme } from "@react-navigation/native";

export default function ForgotPasswordScreen({ navigation }) {
  const [forgotPasswordForm, setForgotPasswordForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const { colors } = useTheme();

  async function forgotPassword() {
    try {
      setLoading(true);
      if (forgotPasswordForm.email !== "") {
        const response = await axios.post(
          "https://expense-record-production.up.railway.app/api/auth/forgotPassword",
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
    <SafeAreaView
      style={{ flex: 1, minHeight: Dimensions.get("window").height }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
          color: colors.text,
          paddingHorizontal: 30,
          justifyContent: "center",
          position: "relative",
          rowGap: 30,
          minHeight: Dimensions.get("window").height,
        }}
      >
        <GoBackButtonComponent />
        <Text
          style={{
            fontFamily: "Poppins_500Medium",
            fontSize: 30,
            color: colors.text,
          }}
        >
          Forgot password?
        </Text>
        <Text
          style={{
            fontFamily: "Poppins_300Light",
            fontSize: 15,
            color: colors.text,
          }}
        >
          Enter your email for the verification process. It will be send a 6
          digits code to your email address.
        </Text>
        {errorMessage ? <ErrorComponent errorMessage={errorMessage} /> : null}
        <Input
          placeholder="Email"
          inputStyle={{
            color: colors.text,
            fontFamily: "Poppins_300Light",
            fontSize: 12,
            width: "100%",
          }}
          inputContainerStyle={{
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
          onChangeText={(newText) =>
            setForgotPasswordForm({ ...forgotPasswordForm, email: newText })
          }
        />
        <Text
          style={ {
            fontFamily: "Poppins_300Light",
            fontSize: 15,
            color: colors.text,
          }}
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