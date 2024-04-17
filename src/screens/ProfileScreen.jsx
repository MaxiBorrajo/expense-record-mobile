import {
  Text,
  View,
  TextInput,
  Dimensions,
  ScrollView,
  RefreshControl,
} from "react-native";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigation, useTheme } from "@react-navigation/native";
import ErrorComponent from "../components/ErrorComponent";
import Foect from "foect";
import GoBackButtonComponent from "../components/GoBackButtonComponent";
import LoadingScreen from "./LoadingScreen";
import i18n from "../utils/i18n";
import ButtonComponent from "../components/ButtonComponent";

Foect.Validators.add("greaterThanZero", (val, controlName, control) => {
  if (val >= 0) {
    return null;
  }

  return val === control.form.getValue(controlName)
    ? null
    : { greaterThanZero: true };
});

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [errorMessage, setErrorMessage] = useState(null);
  const { updateCurrentUser, setActualUser, loadConfiguration, user } =
    useContext(UserContext);
  const [userForm, setUserForm] = useState({
    firstName: user.firstName ? user.firstName : "",
    lastName: user.lastName ? user.lastName : "",
    budget: user.budget ? user.budget : 0,
    budgetWarning: user.budgetWarning ? user.budgetWarning : 0,
  });
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await setActualUser();
    setRefreshing(false);
  };

  const updateUser = async (form) => {
    try {
      setLoading(true);
      setErrorMessage(null);
      await updateCurrentUser(form);
      await loadConfiguration();
      setLoading(false);
      navigation.navigate("Main");
    } catch (error) {
      setLoading(false);
      if (error?.response?.data) {
        setErrorMessage(error.response.data.Error);
      } else {
        setErrorMessage(error.message);
      }
    }
  };

  useEffect(() => {
    setActualUser();
  }, []);

  return (
    <>
      {userForm ? (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              progressBackgroundColor={colors.background}
              tintColor={colors.attention}
              titleColor={colors.attention}
              colors={[colors.attention]}
            />
          }
        >
          <View
            style={{
              flex: 1,
              backgroundColor: colors.background,
              color: colors.text,
              paddingHorizontal: 30,
              rowGap: 20,
              minHeight: Dimensions.get("window").height,
              position: "relative",
              justifyContent: "center",
              paddingTop: 110,
              paddingBottom: 50,
            }}
          >
            <GoBackButtonComponent />
            <Text
              style={{
                fontSize: 20,
                fontFamily: "Poppins_500Medium",
                color: colors.text,
              }}
            >
              {i18n.t("profile")}
            </Text>
            {errorMessage ? (
              <ErrorComponent errorMessage={errorMessage} />
            ) : null}
            <Foect.Form
              onValidSubmit={async (model) => {
                model.budget = model.budget ? +model.budget : 0;
                model.budgetWarning = model.budgetWarning
                  ? +model.budgetWarning
                  : 0;
                await updateUser(model);
              }}
              defaultValue={{
                firstName: userForm.firstName,
                lastName: userForm.lastName,
                budget: userForm.budget,
                budgetWarning: userForm.budgetWarning,
              }}
            >
              {(form) => (
                <View>
                  <Foect.Control name="firstName" required>
                    {(control) => (
                      <View
                        style={{
                          rowGap: 10,
                          marginBottom: control.isInvalid ? 10 : 20,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 13,
                            fontFamily: "Poppins_400Regular",
                            color: colors.text,
                          }}
                        >
                          {i18n.t("firstName")}
                        </Text>
                        <View
                          style={{
                            width: "100%",
                            alignItems: "center",
                            backgroundColor: colors.card,
                            paddingVertical: 10,
                            paddingHorizontal: 20,
                            borderRadius: 5,
                            elevation: 3,
                          }}
                        >
                          <TextInput
                            style={{
                              color: colors.text,
                              fontFamily: "Poppins_300Light",
                              fontSize: 12,
                              width: "100%",
                              paddingRight: 15,
                            }}
                            onChangeText={(value) => {
                              control.onChange(value);
                              control.markAsTouched();
                            }}
                            value={control.value}
                          />
                        </View>
                        {control.isTouched &&
                          control.isInvalid &&
                          control.errors.required && (
                            <Text
                              style={{
                                color: "#ed2139",
                                fontSize: 12,
                                fontFamily: "Poppins_500Medium",
                              }}
                            >
                              {i18n.t("firstNameError")}
                            </Text>
                          )}
                      </View>
                    )}
                  </Foect.Control>
                  <Foect.Control name="lastName" required>
                    {(control) => (
                      <View
                        style={{
                          rowGap: 10,
                          marginBottom: control.isInvalid ? 10 : 20,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 13,
                            fontFamily: "Poppins_400Regular",
                            color: colors.text,
                          }}
                        >
                          {i18n.t("lastName")}
                        </Text>
                        <View
                          style={{
                            width: "100%",
                            alignItems: "center",
                            backgroundColor: colors.card,
                            paddingVertical: 10,
                            paddingHorizontal: 20,
                            borderRadius: 5,
                            elevation: 3,
                          }}
                        >
                          <TextInput
                            style={{
                              color: colors.text,
                              fontFamily: "Poppins_300Light",
                              fontSize: 12,
                              width: "100%",
                              paddingRight: 15,
                            }}
                            onChangeText={(value) => {
                              control.onChange(value);
                              control.markAsTouched();
                            }}
                            value={control.value}
                          />
                        </View>
                        {control.isTouched &&
                          control.isInvalid &&
                          control.errors.required && (
                            <Text
                              style={{
                                color: "#ed2139",
                                fontSize: 12,
                                fontFamily: "Poppins_500Medium",
                              }}
                            >
                              {i18n.t("lastNameError")}
                            </Text>
                          )}
                      </View>
                    )}
                  </Foect.Control>
                  <Foect.Control name="budget" greaterThanZero>
                    {(control) => (
                      <View
                        style={{
                          rowGap: 10,
                          marginBottom:
                            control.isValid || control.isUntouched ? 20 : 10,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 13,
                            fontFamily: "Poppins_400Regular",
                            color: colors.text,
                          }}
                        >
                          {i18n.t("budget")}
                        </Text>
                        <View
                          style={{
                            backgroundColor: colors.card,
                            paddingVertical: 10,
                            borderRadius: 5,
                            elevation: 3,
                            paddingHorizontal: 20,
                          }}
                        >
                          <TextInput
                            style={{
                              color: colors.text,
                              fontFamily: "Poppins_300Light",
                              fontSize: 12,
                            }}
                            onChangeText={(value) => {
                              control.onChange(value);
                              control.markAsTouched();
                            }}
                            value={control.value.toString()}
                            keyboardType="numeric"
                          />
                        </View>
                        {control.isTouched &&
                          control.isInvalid &&
                          control.errors.greaterThanZero && (
                            <Text
                              style={{
                                color: "#ed2139",
                                fontSize: 12,
                                fontFamily: "Poppins_500Medium",
                              }}
                            >
                              {i18n.t("budgetError")}
                            </Text>
                          )}
                      </View>
                    )}
                  </Foect.Control>
                  <Foect.Control name="budgetWarning" greaterThanZero>
                    {(control) => (
                      <View
                        style={{
                          rowGap: 10,
                          marginBottom: control.isInvalid ? 10 : 20,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 13,
                            fontFamily: "Poppins_400Regular",
                            color: colors.text,
                          }}
                        >
                          {i18n.t("warningBudget")}
                        </Text>
                        <View
                          style={{
                            backgroundColor: colors.card,
                            paddingVertical: 10,
                            borderRadius: 5,
                            elevation: 3,
                            paddingHorizontal: 20,
                          }}
                        >
                          <TextInput
                            style={{
                              color: colors.text,
                              fontFamily: "Poppins_300Light",
                              fontSize: 12,
                            }}
                            onChangeText={(value) => {
                              control.onChange(value);
                              control.markAsTouched();
                            }}
                            value={control.value.toString()}
                            keyboardType="numeric"
                          />
                        </View>
                        {control.isTouched &&
                          control.isInvalid &&
                          control.errors.greaterThanZero && (
                            <Text
                              style={{
                                color: "#ed2139",
                                fontSize: 12,
                                fontFamily: "Poppins_500Medium",
                              }}
                            >
                              {i18n.t("warningBudgetError")}
                            </Text>
                          )}
                      </View>
                    )}
                  </Foect.Control>
                  <View
                    style={{
                      paddingTop: form.isInvalid ? 20 : 10,
                    }}
                  >
                    <ButtonComponent
                      label={i18n.t("save")}
                      loading={loading}
                      action={() => form.submit()}
                      disabled={form.isInvalid}
                    />
                  </View>
                </View>
              )}
            </Foect.Form>
          </View>
        </ScrollView>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
}
