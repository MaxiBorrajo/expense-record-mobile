import { StyleSheet, Text, View, SafeAreaView, Dimensions } from "react-native";
import ButtonComponent from "../components/ButtonComponent";
import { useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GoBackButtonComponent from "../components/GoBackButtonComponent";
import { Input, Icon } from "@rneui/themed";
import ErrorComponent from "../components/ErrorComponent";
import { useTheme } from "@react-navigation/native";

export default function LoginScreen({ navigation }) {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const { colors } = useTheme();

  async function login() {
    try {
      if (loginForm.email !== "" && loginForm.password !== "") {
        setLoading(true);
        const response = await axios.post(
          "https://expense-record-production.up.railway.app/api/auth/login",
          loginForm
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
          Sign in
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
            setLoginForm({ ...loginForm, email: newText })
          }
        />
        <Input
          placeholder="Password"
          rightIcon={
            <Icon
              name={showPassword ? "eye-slash" : "eye"}
              size={20}
              type="font-awesome-5"
              onPress={() => setShowPassword(!showPassword)}
              iconStyle={{color:colors.text}}
            />
          }
          rightIconContainerStyle={{marginRight:10}}
          secureTextEntry={!showPassword}
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
            paddingLeft: 20,
            borderRadius: 5,
            elevation: 5,
            borderColor: colors.border,
            borderWidth: 1,
            borderStyle: "solid",
          }}
          onChangeText={(newText) =>
            setLoginForm({ ...loginForm, password: newText })
          }
        />
        <View>
          <Text
            style={{
              fontFamily: "Poppins_300Light",
              fontSize: 15,
              color: colors.text,
            }}
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            Forgot password?
          </Text>
          <Text
            style={{
              fontFamily: "Poppins_300Light",
              fontSize: 15,
              color: colors.text,
            }}
            onPress={() => navigation.navigate("Register")}
          >
            No account? Register
          </Text>
        </View>
        <ButtonComponent label={"Sign In"} action={login} loading={loading} />
      </View>
    </SafeAreaView>
  );
}
