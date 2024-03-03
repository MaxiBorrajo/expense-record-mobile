import { Text, View, SafeAreaView, Dimensions } from "react-native";
import ButtonComponent from "../components/ButtonComponent";
import { useContext, useState } from "react";
import GoBackButtonComponent from "../components/GoBackButtonComponent";
import { Input, Icon } from "@rneui/themed";
import ErrorComponent from "../components/ErrorComponent";
import { useTheme } from "@react-navigation/native";
import { UserContext } from "../context/UserContext";
import Foect from "foect";

export default function RegisterScreen({ navigation }) {
  const { register } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const { colors } = useTheme();

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
    <SafeAreaView style={{ flex: 1, paddingTop: 30 }}>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
          color: colors.text,
          paddingHorizontal: 30,
          rowGap: 20,
          justifyContent: "center",
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
                    onBlur={control.markAsTouched}
                    onChangeText={(text) => control.onChange(text)}
                    value={control.value}
                    errorMessage={control.isInvalid && control.errors.required ? "Please enter a first name." : null}
                    errorStyle={{
                      color: "#ed2139",
                      fontSize: 12,
                      fontFamily: "Poppins_500Medium",
                      marginTop: control.isInvalid && control.errors.required ? 5 : 20,
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
                    onBlur={control.markAsTouched}
                    value={control.value}
                    onChangeText={(text) => control.onChange(text)}
                    errorMessage={control.isInvalid && control.errors.required ? "Please enter a last name." : null}
                    errorStyle={{
                      color: "#ed2139",
                      fontSize: 12,
                      fontFamily: "Poppins_500Medium",
                      marginTop: control.isInvalid && control.errors.required ? 5 : 20,
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
                          ? "Please enter an email."
                          : control.isInvalid && control.errors.email
                          ? "Please enter a valid email."
                          : null
                      }
                      errorStyle={{
                        color: "#ed2139",
                        fontSize: 12,
                        fontFamily: "Poppins_500Medium",
                        marginTop: (control.isInvalid && control.errors.required) ||
                        (control.isInvalid && control.errors.email) ? 5 : 20,
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
                      color: "#ed2139",
                      fontSize: 12,
                      fontFamily: "Poppins_500Medium",
                      marginTop: (control.isInvalid && control.errors.required) ||
                      (control.isInvalid && control.errors.pattern) ? 5 : 20,
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
                Have account?
              </Text>
              <ButtonComponent
                label={"Sign up"}
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
