import { Text, View, SafeAreaView, Dimensions } from "react-native";
import ButtonComponent from "../components/ButtonComponent";
import { useContext, useEffect, useState } from "react";
import GoBackButtonComponent from "../components/GoBackButtonComponent";
import { Input, Icon } from "@rneui/themed";
import ErrorComponent from "../components/ErrorComponent";
import { useTheme } from "@react-navigation/native";
import { UserContext } from "../context/UserContext";
import { AppContext } from "../context/AppContext";
import Foect from "foect";
import i18n from "../utils/i18n";
// import {
//   GoogleSignin,
//   GoogleSigninButton,
// } from "@react-native-google-signin/google-signin";
export default function LoginScreen({ navigation }) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const { colors } = useTheme();
  const { login, handleGoogleLogin } = useContext(UserContext);
  const { isDarkTheme } = useContext(AppContext);
  
  // useEffect(() => {
  //   GoogleSignin.configure();
  // }, []);

  // const googleLogin = async () => {
  //   try {
  //     setLoading(true);
  //     const userInfo = await GoogleSignin.signIn();
  //     const user = {
  //       email: userInfo.email,
  //       firstName: userInfo.givenName,
  //       lastName: userInfo.familyName,
  //       oauthuser: true,
  //     };
  //     await handleGoogleLogin(user);
  //     setLoading(false);
  //     navigation.navigate("Home");
  //   } catch (error) {
  //     setLoading(false);
  //     if (error.response.data) {
  //       setErrorMessage(error.response.data.Error);
  //     } else {
  //       setErrorMessage(error.message);
  //     }
  //   }
  // };

  const loginUser = async (form) => {
    try {
      setLoading(true);
      await login(form);
      setLoading(false);
      navigation.navigate("Home");
    } catch (error) {
      setLoading(false);
      if (error.response.data) {
        setErrorMessage(error.response.data.Error);
      } else {
        setErrorMessage(error.message);
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
          paddingTop: 100,
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
          {i18n.t("signIn")}
        </Text>
        {errorMessage ? <ErrorComponent errorMessage={errorMessage} /> : null}
        <Foect.Form
          onValidSubmit={async (model) => {
            await loginUser(model);
          }}
        >
          {(form) => (
            <View>
              <Foect.Control name="email" required email>
                {(control) => (
                  <View>
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
                        elevation: 3,
                        borderBottomWidth: 0,
                      }}
                      onBlur={control.markAsTouched}
                      onChangeText={(text) => control.onChange(text)}
                      value={control.value}
                      errorMessage={
                        control.isInvalid && control.errors.required
                          ? i18n.t("emailError")
                          : control.isInvalid && control.errors.email
                          ? i18n.t("emailValidError")
                          : null
                      }
                      errorStyle={{
                        color: "#ed2139",
                        fontSize: 12,
                        fontFamily: "Poppins_500Medium",
                        marginTop:
                          (control.isInvalid && control.errors.required) ||
                          (control.isInvalid && control.errors.email)
                            ? 5
                            : 20,
                      }}
                      renderErrorMessage={
                        (control.isInvalid && control.errors.required) ||
                        (control.isInvalid && control.errors.email)
                      }
                    />
                  </View>
                )}
              </Foect.Control>
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
                      elevation: 3,
                      borderBottomWidth: 0,
                    }}
                    onBlur={control.markAsTouched}
                    onChangeText={(text) => control.onChange(text)}
                    value={control.value}
                    errorMessage={
                      control.isInvalid && control.errors.required
                        ? i18n.t("passwordError")
                        : control.isInvalid && control.errors.pattern
                        ? i18n.t("passwordValidError")
                        : null
                    }
                    errorStyle={{
                      color: "#ed2139",
                      fontSize: 12,
                      fontFamily: "Poppins_500Medium",
                      marginTop:
                        (control.isInvalid && control.errors.required) ||
                        (control.isInvalid && control.errors.pattern)
                          ? 5
                          : 20,
                    }}
                    renderErrorMessage={
                      (control.isInvalid && control.errors.required) ||
                      (control.isInvalid && control.errors.pattern)
                    }
                  />
                )}
              </Foect.Control>
              <View style={{ paddingBottom: 20 }}>
                <Text
                  style={{
                    fontFamily: "Poppins_300Light",
                    fontSize: 15,
                    color: colors.text,
                  }}
                  onPress={() => navigation.navigate("ForgotPassword")}
                >
                  {i18n.t("forgotPassword")}
                </Text>
                <Text
                  style={{
                    fontFamily: "Poppins_300Light",
                    fontSize: 15,
                    color: colors.text,
                  }}
                  onPress={() => navigation.navigate("Register")}
                >
                  {i18n.t("noAccount")}
                </Text>
              </View>
              <View style={{ rowGap: 30 }}>
                <ButtonComponent
                  label={i18n.t("signIn")}
                  action={() => form.submit()}
                  loading={loading}
                  disabled={form.isInvalid}
                />
                <Text
                  style={{
                    fontFamily: "Poppins_300Light",
                    fontSize: 15,
                    color: colors.text,
                    textAlign: "center",
                  }}
                >
                  Or
                </Text>
                {/* <GoogleSigninButton
                  size={GoogleSigninButton.Size.Standard}
                  color={
                    isDarkTheme
                      ? GoogleSigninButton.Color.Dark
                      : GoogleSigninButton.Color.Dark
                  }
                  onPress={googleLogin}
                /> */}
                {/* <Icon
                  name="google"
                  type="font-awesome-5"
                  iconStyle={{
                    color: colors.text,
                    fontSize: 25,
                    padding: 15,
                    backgroundColor: colors.card,
                    borderRadius: 10,
                    alignSelf: "center",
                    maxWidth: "fit-content",
                  }}
                  onPress={() => {
                    promptAsync();
                  }}
                ></Icon> */}
              </View>
            </View>
          )}
        </Foect.Form>
      </View>
    </SafeAreaView>
  );
}
