import { Text, View, SafeAreaView, Dimensions } from "react-native";
import ButtonComponent from "../components/ButtonComponent";
import { useContext, useState } from "react";
import GoBackButtonComponent from "../components/GoBackButtonComponent";
import { Input } from "@rneui/themed";
import ErrorComponent from "../components/ErrorComponent";
import { useTheme } from "@react-navigation/native";
import { UserContext } from "../context/UserContext";

export default function ForgotPasswordScreen({ navigation }) {
  const [forgotPasswordForm, setForgotPasswordForm] = useState({
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const { colors } = useTheme();
  const { forgotPassword } = useContext(UserContext);

  const sendForgotPassword = async () => {
    try {
      setLoading(true);
      const validation = validateForm();
      if (validation) {
        await forgotPassword(forgotPasswordForm);
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
  };

  const validateForm = () => {
    if (!forgotPasswordForm.email) {
      setErrorMessage("An email must be provided");
      return false;
    }

    return true;
  };

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
            setForgotPasswordForm((prev) => ({ ...prev, email: newText }))
          }
        />
        <Text
          style={{
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
          action={sendForgotPassword}
          loading={loading}
        />
      </View>
    </SafeAreaView>
  );
}
