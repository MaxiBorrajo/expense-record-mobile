import { Text, View, SafeAreaView, Dimensions } from "react-native";
import ButtonComponent from "../components/ButtonComponent";
import { useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GoBackButtonComponent from "../components/GoBackButtonComponent";
import { Input, Icon } from "@rneui/themed";
import ErrorComponent from "../components/ErrorComponent";
import { useTheme } from "@react-navigation/native";
import { UserContext } from "../context/UserContext";
import Foect from "foect";

export default function ResetPasswordScreen({ navigation }) {
  const [resetPasswordForm, setResetPasswordForm] = useState({
    password: "",
    confirm_password: "",
  });
  const { colors } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const { resetPassword } = useContext(UserContext);

  const getEmail = async () => {
    const emailFound = await AsyncStorage.getItem("email");
    setResetPasswordForm((prev) => ({ ...prev, email: emailFound }));
  };

  const sendResetPassword = async () => {
    try {
      setLoading(true);
      const validation = validateForm();
      if (validation) {
        resetPassword(resetPasswordForm);
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
  };

  const validateForm = () => {
    if (!resetPasswordForm.password) {
      setLoading(false);
      setErrorMessage("A password must be provided");
      return false;
    }

    if (!resetPasswordForm.confirm_password) {
      setLoading(false);
      setErrorMessage("Your password must be confirmed");
      return false;
    }

    if (resetPasswordForm.password != resetPasswordForm.confirm_password) {
      setLoading(false);
      setErrorMessage("Passwords do not match");
      return false;
    }

    return true;
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
          Reset password
        </Text>
        <Text
          style={{
            fontFamily: "Poppins_300Light",
            fontSize: 15,
            color: colors.text,
          }}
        >
          Set your new password so you can login and access to your account
          again.
        </Text>
        {errorMessage ? <ErrorComponent errorMessage={errorMessage} /> : null}
        <Foect.Form
          onValidSubmit={async (model) => {
            model.email = await AsyncStorage.getItem("email");
            //await verify(model);
            console.log(model);
          }}
        >
          {(form) => (
            <View>
              <Foect.Control
                name="password"
                required
                pattern={
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
                }
              >
                {(control) => (
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
                    onBlur={control.markAsTouched}
                    onChangeText={(text) => control.onChange(text)}
                    value={control.value}
                    errorMessage={
                      control.isInvalid && control.errors.required
                        ? "Please enter a password."
                        : control.isInvalid && control.errors.pattern
                        ? "The value of 'password' attribute must have at least one lowercase letter, one uppercase letter, one digit, one special character (@$!%*?&), and be 8 characters or longer."
                        : null
                    }
                    errorStyle={{
                      color: "red",
                      fontSize: 12,
                      fontFamily: "Poppins_500Medium",
                      marginTop: 10,
                    }}
                    renderErrorMessage={
                      (control.isInvalid && control.errors.required) ||
                      (control.isInvalid && control.errors.pattern)
                    }
                  />
                )}
              </Foect.Control>
              <Foect.Control
                name="confirm_password"
                required
                equalToControl={"password"}
              >
                <Input
                  placeholder="Confirm password"
                  secureTextEntry={true}
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
                  onBlur={control.markAsTouched}
                  onChangeText={(text) => control.onChange(text)}
                  value={control.value}
                  errorMessage={
                    control.isInvalid && control.errors.required
                      ? "Please confirm your password."
                      : control.isInvalid && control.errors.equalToControl
                      ? "The passwords do not match."
                      : null
                  }
                  errorStyle={{
                    color: "red",
                    fontSize: 12,
                    fontFamily: "Poppins_500Medium",
                    marginTop: 10,
                  }}
                  renderErrorMessage={
                    (control.isInvalid && control.errors.required) ||
                    (control.isInvalid && control.errors.equalToControl)
                  }
                />
              </Foect.Control>
              <ButtonComponent
                label={"Reset"}
                action={() => form.submit()}
                loading={loading}
                disabled={form.isInvalid}
              />
            </View>
          )}
        </Foect.Form>
      </View>
    </SafeAreaView>
  );
}
