import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import ButtonComponent from "../components/ButtonComponent";
import { useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GoBackButton from "../components/GoBackButton";
import { Input, Icon } from "@rneui/themed";
import ErrorComponent from "../components/ErrorComponent";
export default function LoginScreen({ navigation }) {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  async function login() {
    try {
      if (loginForm.email !== "" && loginForm.password !== "") {
        setLoading(true);
        const response = await axios.post(
          "http://192.168.0.159:3000/api/auth/login",
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
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <GoBackButton />
        <Text style={styles.title}>Sign in</Text>
        {errorMessage ? <ErrorComponent errorMessage={errorMessage} /> : null}
        <Input
          placeholder="Email"
          inputStyle={{ color: "white", fontFamily: "Poppins_300Light" }}
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
              reverse
              type="font-awesome-5"
              onPress={() => setShowPassword(!showPassword)}
            />
          }
          secureTextEntry={!showPassword}
          inputStyle={{ color: "white", fontFamily: "Poppins_300Light" }}
          onChangeText={(newText) =>
            setLoginForm({ ...loginForm, password: newText })
          }
        />
        <View>
          <Text
            style={styles.link}
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            Forgot password?
          </Text>
          <Text
            style={styles.link}
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
