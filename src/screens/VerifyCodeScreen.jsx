import { Text, View, SafeAreaView, Dimensions } from "react-native";
import ButtonComponent from "../components/ButtonComponent";
import { useState, useContext } from "react";
import GoBackButtonComponent from "../components/GoBackButtonComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OTPTextInput from "react-native-otp-textinput";
import ErrorComponent from "../components/ErrorComponent";
import { useTheme } from "@react-navigation/native";
import { UserContext } from "../context/UserContext";
import Foect from "foect";
import i18n from "../utils/i18n";

export default function VerifyCodeScreen({ navigation }) {
  const { colors } = useTheme();
  const [errorMessage, setErrorMessage] = useState(null);
  const { verifyCode } = useContext(UserContext);

  const verify = async (form) => {
    try {
      await verifyCode(form);
      navigation.navigate("ResetPassword");
    } catch (error) {
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
          {i18n.t("verifyCode")}
        </Text>
        <Text
          style={{
            fontFamily: "Poppins_300Light",
            fontSize: 15,
            color: colors.text,
          }}
        >
          {i18n.t("verifyCodeDescription")}
        </Text>
        {errorMessage ? <ErrorComponent errorMessage={errorMessage} /> : null}
        <Foect.Form
          onValidSubmit={async (model) => {
            model.email = await AsyncStorage.getItem("email");
            await verify(model);
          }}
        >
          {(form) => (
            <View>
              <Foect.Control
                name="code"
                required
                callback={(value, control) => {
                  return value.toString().length === 6;
                }}
              >
                {(control) => (
                  <View>
                    <OTPTextInput
                      handleTextChange={(text) => control.onChange(text)}
                      inputCount={6}
                      tintColor={colors.text}
                      offTintColor={colors.disabledColor}
                      textInputStyle={{
                        color: colors.text,
                        fontFamily: "Poppins_300Light",
                        alignItems: "center",
                        backgroundColor: colors.card,
                        borderRadius: 5,
                        elevation: 3,
                        borderColor: colors.border,
                        borderWidth: 1,
                        borderStyle: "solid",
                        borderBottomWidth: 1,
                        paddingTop: 3,
                      }}
                    />
                    {control.isInvalid && control.errors.required && (
                      <Text
                        style={{
                          color: "#ed2139",
                          fontSize: 12,
                          fontFamily: "Poppins_500Medium",
                          marginTop: 10,
                        }}
                      >
                        {i18n.t("codeError")}
                      </Text>
                    )}
                    {control.isInvalid && control.errors.callback && (
                      <Text
                        style={{
                          color: "#ed2139",
                          fontSize: 12,
                          fontFamily: "Poppins_500Medium",
                          marginTop: 10,
                        }}
                      >
                        {i18n.t("codeValidError")}
                      </Text>
                    )}
                  </View>
                )}
              </Foect.Control>
              <Text
                style={{
                  fontFamily: "Poppins_300Light",
                  fontSize: 15,
                  color: colors.text,
                  paddingVertical: 20,
                }}
                onPress={() => navigation.navigate("ForgotPassword")}
              >
                {i18n.t("noCode")}
              </Text>
              <ButtonComponent
                label={i18n.t("verify")}
                action={() => form.submit()}
                disabled={form.isInvalid}
              />
            </View>
          )}
        </Foect.Form>
      </View>
    </SafeAreaView>
  );
}
