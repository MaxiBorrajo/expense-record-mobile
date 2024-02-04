import { StyleSheet, Text, View, SafeAreaView, TextInput } from "react-native";
import ButtonComponent from "../components/ButtonComponent";
import { useState, useEffect } from "react";
import axios from "axios";
import GoBackButtonComponent from "../components/GoBackButtonComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OTPTextInput from "react-native-otp-textinput";
import ErrorComponent from "../components/ErrorComponent";
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

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  async function verifyCode() {
    try {
      setLoading(true);
      if (verifyCodeForm.code != "") {
        const response = await axios.post(
          "http://192.168.0.159:3000/api/auth/verify",
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
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <GoBackButtonComponent />
        <Text style={styles.title}>Verify code</Text>
        <Text style={styles.subtitle}>
          Enter the 6 digits of the code receive on your email.
        </Text>
        {errorMessage ? <ErrorComponent errorMessage={errorMessage} /> : null}
        <OTPTextInput
          handleTextChange={(newText) =>
            setVerifyCodeForm({ ...verifyCodeForm, code: newText })
          }
          inputCount={6}
          tintColor="#fff"
          offTintColor="#9ca3af"
          textInputStyle={{
            color: "white",
            fontFamily: "Poppins_300Light",
            alignItems: "center",
            backgroundColor: "#1c1917",
            borderRadius: 5,
            elevation: 5,
            borderColor: "white",
            borderWidth: 1,
            borderStyle: "solid",
            borderBottomWidth: 1,
            paddingTop:3
          }}
        />
        <Text
          style={styles.link}
          onPress={() => navigation.navigate("ForgotPassword")}
        >
          Haven't receive the code? Try again
        </Text>
        <ButtonComponent label={"Verify"} action={verifyCode} />
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
