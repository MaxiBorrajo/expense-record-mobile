import { StyleSheet, Text, View, SafeAreaView, Dimensions } from "react-native";
import ButtonComponent from "../components/ButtonComponent";
import { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GoBackButtonComponent from "../components/GoBackButtonComponent";
import { Input, Icon } from "@rneui/themed";
import ErrorComponent from "../components/ErrorComponent";
export default function ResetPasswordScreen({ navigation }) {
  useEffect(() => {
    const getEmail = async () => {
      const emailFound = await AsyncStorage.getItem("email");
      setResetPasswordForm({ ...resetPasswordForm, email: emailFound });
    };

    getEmail();
  }, []);

  const [resetPasswordForm, setResetPasswordForm] = useState({
    password: "",
    confirm_password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  async function resetPassword() {
    try {
      setLoading(true);
      if (
        resetPasswordForm.password !== "" &&
        resetPasswordForm.confirm_password !== "" &&
        resetPasswordForm.password === resetPasswordForm.confirm_password
      ) {
        await axios.post(
          "https://expense-record-production.up.railway.app/api/auth/resetPassword",
          resetPasswordForm
        );
        await AsyncStorage.removeItem("email");
        setLoading(false);
        navigation.navigate("Login");
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
    <SafeAreaView style={{ flex: 1, minHeight: Dimensions.get("window").height }}>
      <View style={styles.container}>
        <GoBackButtonComponent />
        <Text style={styles.title}>Reset password</Text>
        <Text style={styles.subtitle}>
          Set your new password so you can login and access to your account
          again.
        </Text>
        {errorMessage ? <ErrorComponent errorMessage={errorMessage} /> : null}
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
            setResetPasswordForm({ ...resetPasswordForm, password: newText })
          }
        />
        <Input
          placeholder="Confirm password"
          secureTextEntry={true}
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
            setResetPasswordForm({
              ...resetPasswordForm,
              confirm_password: newText,
            })
          }
        />
        <ButtonComponent
          label={"Reset"}
          action={resetPassword}
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
    rowGap: 30,
    minHeight: Dimensions.get("window").height
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
