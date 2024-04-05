import { Text, View, SafeAreaView, Dimensions } from "react-native";
import ButtonComponent from "../components/ButtonComponent";
import { useContext, useState } from "react";
import GoBackButtonComponent from "../components/GoBackButtonComponent";
import { Input } from "@rneui/themed";
import ErrorComponent from "../components/ErrorComponent";
import { useTheme } from "@react-navigation/native";
import { UserContext } from "../context/UserContext";
import Foect from "foect";
import i18n from "../utils/i18n";

export default function ForgotPasswordScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const { colors } = useTheme();
  const { forgotPassword } = useContext(UserContext);

  const sendForgotPassword = async (form) => {
    try {
      setLoading(true);
      await forgotPassword(form);
      setLoading(false);
      navigation.navigate("VerifyCode");
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
          {i18n.t("forgotPassword")}
        </Text>
        <Text
          style={{
            fontFamily: "Poppins_300Light",
            fontSize: 15,
            color: colors.text,
          }}
        >
          {i18n.t("forgotPasswordDescription")}
        </Text>
        {errorMessage ? <ErrorComponent errorMessage={errorMessage} /> : null}
        <Foect.Form
          onValidSubmit={async (model) => {
            await sendForgotPassword(model);
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
                        marginBottom: control.isValid ? 20 : 0,
                      }}
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
              <Text
                style={{
                  fontFamily: "Poppins_300Light",
                  fontSize: 15,
                  color: colors.text,
                  paddingBottom: 20,
                }}
                onPress={() => navigation.navigate("VerifyCode")}
              >
                {i18n.t("haveCode")}
              </Text>
              <ButtonComponent
                label={i18n.t("send")}
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
