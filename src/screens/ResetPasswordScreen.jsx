import { Text, View, KeyboardAvoidingView } from "react-native";
import ButtonComponent from "../components/ButtonComponent";
import { useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GoBackButtonComponent from "../components/GoBackButtonComponent";
import { Input, Icon } from "@rneui/themed";
import ErrorComponent from "../components/ErrorComponent";
import { useTheme } from "@react-navigation/native";
import { UserContext } from "../context/UserContext";
import Foect from "foect";
import i18n from "../utils/i18n";
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from "react-native-responsive-dimensions";
export default function ResetPasswordScreen({ navigation }) {
  const { colors } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const { resetPassword } = useContext(UserContext);

  const sendResetPassword = async (form) => {
    try {
      setLoading(true);
      await resetPassword(form);
      setLoading(false);
      navigation.navigate("Login");
    } catch (error) {
      setLoading(false);
      if (error?.response?.data) {
        setErrorMessage(error.response.data.Error);
      } else {
        setErrorMessage(error.message);
      }
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
          color: colors.text,
          paddingHorizontal: responsiveScreenWidth(10),
          justifyContent: "center",
          position: "relative",
          rowGap: responsiveScreenHeight(2),
        }}
      >
        <GoBackButtonComponent />
        <Text
          style={{
            fontFamily: "Poppins_500Medium",
            fontSize: responsiveScreenFontSize(3),
            color: colors.text,
          }}
        >
          {i18n.t("resetPassword")}
        </Text>
        <Text
          style={{
            fontFamily: "Poppins_300Light",
            fontSize: responsiveScreenFontSize(1.5),
            color: colors.text,
          }}
        >
          {i18n.t("resetPasswordDescription")}
        </Text>
        {errorMessage ? <ErrorComponent errorMessage={errorMessage} /> : null}
        <Foect.Form
          onValidSubmit={async (model) => {
            model.email = await AsyncStorage.getItem("email");
            await sendResetPassword(model);
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
                      fontSize: responsiveScreenFontSize(1.5),
                      width: responsiveScreenWidth(100),
                    }}
                    inputContainerStyle={{
                      alignItems: "center",
                      backgroundColor: colors.card,
                      paddingVertical: responsiveScreenHeight(0.7),
                      paddingLeft: responsiveScreenWidth(5),
                      paddingRight: responsiveScreenWidth(0),
                      borderRadius: 5,
                      elevation: 3,
                      borderBottomWidth: 0,
                      marginBottom: control.isValid
                        ? responsiveScreenHeight(2)
                        : 0,
                    }}
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
                      fontSize: responsiveScreenFontSize(1.5),
                      fontFamily: "Poppins_500Medium",
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
                {(control) => (
                  <Input
                    placeholder={i18n.t("confirmPassword")}
                    secureTextEntry={true}
                    inputStyle={{
                      color: colors.text,
                      fontFamily: "Poppins_300Light",
                      fontSize: responsiveScreenFontSize(1.5),
                      width: responsiveScreenWidth(100),
                    }}
                    inputContainerStyle={{
                      alignItems: "center",
                      backgroundColor: colors.card,
                      paddingVertical: responsiveScreenHeight(1),
                      paddingHorizontal: responsiveScreenWidth(5),
                      borderRadius: 5,
                      elevation: 3,
                      borderBottomWidth: 0,
                      marginBottom: control.isValid
                        ? responsiveScreenHeight(3)
                        : 0,
                    }}
                    onChangeText={(text) => control.onChange(text)}
                    value={control.value}
                    errorMessage={
                      control.isInvalid && control.errors.required
                        ? i18n.t("confirmPasswordError")
                        : control.isInvalid && control.errors.equalToControl
                        ? i18n.t("passwordsNotMatch")
                        : null
                    }
                    errorStyle={{
                      color: "#ed2139",
                      fontSize: responsiveScreenFontSize(1.5),
                      fontFamily: "Poppins_500Medium",
                    }}
                    renderErrorMessage={
                      (control.isInvalid && control.errors.required) ||
                      (control.isInvalid && control.errors.equalToControl)
                    }
                  />
                )}
              </Foect.Control>
              <ButtonComponent
                label={i18n.t("reset")}
                action={() => form.submit()}
                loading={loading}
                disabled={form.isInvalid}
              />
            </View>
          )}
        </Foect.Form>
      </View>
    </KeyboardAvoidingView>
  );
}
