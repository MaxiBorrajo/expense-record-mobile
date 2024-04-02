import { Text, View, SafeAreaView, Dimensions, FlatList } from "react-native";
import ButtonComponent from "../components/ButtonComponent";
import { useContext, useState, useEffect } from "react";
import GoBackButtonComponent from "../components/GoBackButtonComponent";
import { Input, Icon } from "@rneui/themed";
import ErrorComponent from "../components/ErrorComponent";
import { useTheme } from "@react-navigation/native";
import { UserContext } from "../context/UserContext";
import Foect from "foect";
import i18n from "../utils/i18n";
// import { GoogleSignin } from "@react-native-google-signin/google-signin";
export default function RegisterScreen({ navigation }) {
  const { register, handleGoogleLogin } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const { colors } = useTheme();

  // useEffect(() => {
  //   GoogleSignin.configure({
  //     webClientId:
  //       "440036428069-q9ecs17on0dg5m5ms6vc7tnmvcr44kqs.apps.googleusercontent.com",
  //   });
  // }, []);

  // const signin = async () => {
  //   try {
  //     const userInfo = await GoogleSignin.signIn();
  //     const user = {
  //       firstName: userInfo.givenName,
  //       lastName: userInfo.familyName,
  //       email: userInfo.email,
  //       oauthuser: true,
  //     };
  //     await handleGoogleLogin(user);
  //     navigation.navigate("Home");
  //   } catch (err) {
  //     setError(err);
  //   }
  // };

  async function registerUser(form) {
    try {
      setLoading(true);
      await register(form);
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
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        ListHeaderComponent={
          <View
            style={{
              flex: 1,
              backgroundColor: colors.background,
              color: colors.text,
              paddingHorizontal: 30,
              rowGap: 20,
              justifyContent: "center",
              minHeight: Dimensions.get("window").height,
              paddingTop: 120,
              paddingBottom: 50,
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
              {i18n.t("signUp")}
            </Text>
            {errorMessage ? (
              <ErrorComponent errorMessage={errorMessage} />
            ) : null}
            <Foect.Form
              onValidSubmit={async (model) => {
                await registerUser(model);
              }}
            >
              {(form) => (
                <View>
                  <Foect.Control name="firstName" required>
                    {(control) => (
                      <Input
                        placeholder={i18n.t("firstName")}
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
                          marginBottom: control.isValid ? 20 : 0,
                        }}
                        onBlur={control.markAsTouched}
                        onChangeText={(text) => control.onChange(text)}
                        value={control.value}
                        errorMessage={
                          control.isInvalid && control.errors.required
                            ? i18n.t("firstNameError")
                            : null
                        }
                        errorStyle={{
                          color: "#ed2139",
                          fontSize: 12,
                          fontFamily: "Poppins_500Medium",
                        }}
                        renderErrorMessage={
                          control.isInvalid && control.errors.required
                        }
                      />
                    )}
                  </Foect.Control>
                  <Foect.Control name="lastName" required>
                    {(control) => (
                      <Input
                        placeholder={i18n.t("lastName")}
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
                          marginBottom: control.isValid ? 20 : 0,
                        }}
                        onBlur={control.markAsTouched}
                        value={control.value}
                        onChangeText={(text) => control.onChange(text)}
                        errorMessage={
                          control.isInvalid && control.errors.required
                            ? i18n.t("lastNameError")
                            : null
                        }
                        errorStyle={{
                          color: "#ed2139",
                          fontSize: 12,
                          fontFamily: "Poppins_500Medium",
                        }}
                        renderErrorMessage={
                          control.isInvalid && control.errors.required
                        }
                      />
                    )}
                  </Foect.Control>
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
                            marginBottom: control.isValid ? 20 : 0,
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
                        placeholder={i18n.t("password")}
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
                          marginBottom: control.isValid ? 20 : 0,
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
                        }}
                        renderErrorMessage={
                          (control.isInvalid && control.errors.required) ||
                          (control.isInvalid && control.errors.pattern)
                        }
                      />
                    )}
                  </Foect.Control>
                  <Text
                    style={{
                      fontFamily: "Poppins_300Light",
                      fontSize: 15,
                      color: colors.text,
                      paddingBottom: 20,
                    }}
                    onPress={() => navigation.navigate("Login")}
                  >
                    {i18n.t("haveAccount")}
                  </Text>
                  <View style={{ rowGap: 30 }}>
                    <ButtonComponent
                      label={i18n.t("signUp")}
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
                      onPress={signin}
                    /> */}
                  </View>
                </View>
              )}
            </Foect.Form>
          </View>
        }
      />
    </SafeAreaView>
  );
}
