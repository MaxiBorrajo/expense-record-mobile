import { Text, View, SafeAreaView, Dimensions } from "react-native";
import ButtonComponent from "../components/ButtonComponent";
import { useContext, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GoBackButtonComponent from "../components/GoBackButtonComponent";
import { Input, Icon } from "@rneui/themed";
import ErrorComponent from "../components/ErrorComponent";
import { useTheme } from "@react-navigation/native";
import { UserContext } from "../context/UserContext";

export default function RegisterScreen({ navigation }) {
  const [registerForm, setRegisterForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const { register } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const { colors } = useTheme();

  async function registerUser() {
    try {
      setLoading(true);
      const validation = validateForm();
      if (validation) {
        await register(registerForm);
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

  function validateForm() {
    if (!registerForm.firstName) {
      setLoading(false);
      setErrorMessage("Please enter a first name");
      return false;
    }

    if (!registerForm.lastName) {
      setLoading(false);
      setErrorMessage("Please enter a last name");
      return false;
    }

    if (!registerForm.email) {
      setLoading(false);
      setErrorMessage("Please enter an email");
      return false;
    }

    if (!registerForm.password) {
      setLoading(false);
      setErrorMessage("Please enter a password");
      return false;
    }

    return true;
  }

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
          rowGap: 20,
          minHeight: Dimensions.get("window").height,
        }}
      >
        <GoBackButtonComponent />
        <Text
          style={{
            fontFamily: "Poppins_500Medium",
            fontSize: 30,
            color: colors.text,
            paddingBottom: 10,
          }}
        >
          Sign up
        </Text>
        {errorMessage ? <ErrorComponent errorMessage={errorMessage} /> : null}
        <Input
          placeholder="First name"
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
            setRegisterForm((prev) => ({ ...prev, firstName: newText }))
          }
        />
        <Input
          placeholder="Last name"
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
            setRegisterForm((prev) => ({ ...prev, lastName: newText }))
          }
        />
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
            backgroundColor: colors.background,
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 5,
            elevation: 5,
            borderColor: colors.border,
            borderWidth: 1,
            borderStyle: "solid",
          }}
          onChangeText={(newText) =>
            setRegisterForm((prev) => ({ ...prev, email: newText }))
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
              iconStyle={{ color: colors.text }}
            />
          }
          rightIconContainerStyle={{ marginRight: 10 }}
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
            setRegisterForm((prev) => ({ ...prev, password: newText }))
          }
        />
        <Text
          style={{
            fontFamily: "Poppins_300Light",
            fontSize: 15,
            color: colors.text,
          }}
          onPress={() => navigation.navigate("Login")}
        >
          Have account?
        </Text>
        <ButtonComponent
          label={"Sign up"}
          action={registerUser}
          loading={loading}
        />
      </View>
    </SafeAreaView>
  );
}
