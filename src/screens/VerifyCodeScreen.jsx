import { Text, View, SafeAreaView, Dimensions } from "react-native";
import ButtonComponent from "../components/ButtonComponent";
import { useState, useEffect, useContext } from "react";
import GoBackButtonComponent from "../components/GoBackButtonComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OTPTextInput from "react-native-otp-textinput";
import ErrorComponent from "../components/ErrorComponent";
import { useTheme } from "@react-navigation/native";
import { UserContext } from "../context/UserContext";

export default function VerifyCodeScreen({ navigation }) {
  const [verifyCodeForm, setVerifyCodeForm] = useState({
    code: "",
  });
  const { colors } = useTheme();
  const [errorMessage, setErrorMessage] = useState(null);
  const { verifyCode } = useContext(UserContext);

  const verify = async () => {
    try {
      const validation = validateForm();
      if (validation) {
        verifyCode(verifyCodeForm);
        navigation.navigate("ResetPassword");
      }
    } catch (error) {
      if (error.response.data) {
        setErrorMessage(error.response.data.Error);
      } else {
        setErrorMessage(error.message);
      }
    }
  };

  const validateForm = () => {
    if (!verifyCodeForm.code) {
      setErrorMessage("A code must be provided");
      return false;
    }

    return true;
  };

  const getEmail = async () => {
    const emailFound = await AsyncStorage.getItem("email");
    setVerifyCodeForm((prev) => ({ ...prev, email: emailFound }));
  };

  useEffect(() => {
    getEmail();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 30 }}>
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
            setVerifyCodeForm((prev) => ({ ...prev, code: newText }))
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
        <ButtonComponent label={"Verify"} action={verify} />
      </View>
    </SafeAreaView>
  );
}
