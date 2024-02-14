import { StyleSheet, Text, View, SafeAreaView, Dimensions } from "react-native";
import ButtonComponent from "../components/ButtonComponent";
import { useState, useEffect } from "react";
import axios from "axios";
import GoBackButtonComponent from "../components/GoBackButtonComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OTPTextInput from "react-native-otp-textinput";
import ErrorComponent from "../components/ErrorComponent";
import { useTheme } from "@react-navigation/native";

export default function VerifyCodeScreen({ navigation }) {
  useEffect(() => {
    const getEmail = async () => {
      const emailFound = await AsyncStorage.getItem("email");
      setVerifyCodeForm({ ...verifyCodeForm, email: emailFound });
    };

    getEmail();
  }, []);

  const [verifyCodeForm, setVerifyCodeForm] = useState({
    code: "",
  });
  const { colors } = useTheme();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  async function verifyCode() {
    try {
      setLoading(true);
      if (verifyCodeForm.code != "") {
        const response = await axios.post(
          "https://expense-record-production.up.railway.app/api/auth/verify",
          verifyCodeForm
        );
        setLoading(false);
        navigation.navigate("ResetPassword");
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
          Verify code
        </Text>
        <Text
          style={{
            fontFamily: "Poppins_300Light",
            fontSize: 15,
            color: colors.text,
          }}
        >
          Enter the 6 digits of the code receive on your email.
        </Text>
        {errorMessage ? <ErrorComponent errorMessage={errorMessage} /> : null}
        <OTPTextInput
          handleTextChange={(newText) =>
            setVerifyCodeForm({ ...verifyCodeForm, code: newText })
          }
          inputCount={6}
          tintColor={colors.text}
          offTintColor={colors.disabledColor}
          textInputStyle={{
            color: colors.text,
            fontFamily: "Poppins_300Light",
            alignItems: "center",
            backgroundColor: colors.card,
            borderRadius: 5,
            elevation: 5,
            borderColor: colors.border,
            borderWidth: 1,
            borderStyle: "solid",
            borderBottomWidth: 1,
            paddingTop: 3,
          }}
        />
        <Text
          style={{
            fontFamily: "Poppins_300Light",
            fontSize: 15,
            color: colors.text,
          }}
          onPress={() => navigation.navigate("ForgotPassword")}
        >
          Haven't receive the code? Try again
        </Text>
        <ButtonComponent label={"Verify"} action={verifyCode} />
      </View>
    </SafeAreaView>
  );
}
