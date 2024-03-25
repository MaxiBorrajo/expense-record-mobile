import { Text, View, TextInput, SafeAreaView, Dimensions } from "react-native";
import { useEffect, useState, useContext } from "react";
import { Button } from "@rneui/themed";
import { UserContext } from "../context/UserContext";
import { useNavigation, useTheme } from "@react-navigation/native";
import ErrorComponent from "../components/ErrorComponent";
import Foect from "foect";
import GoBackButtonComponent from "../components/GoBackButtonComponent";
import LoadingScreen from "./LoadingScreen";
import i18n from "../utils/i18n";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [errorMessage, setErrorMessage] = useState(null);
  const [userForm, setUserForm] = useState(null);
  const [loading, setLoading] = useState(false);
  const { updateCurrentUser, getCurrentUser, setReload } =
    useContext(UserContext);

  const updateUser = async (form) => {
    setLoading(true);
    setErrorMessage(null);
    await updateCurrentUser(form);
    setLoading(false);
    navigation.navigate("Main");
    setReload(true);
  };

  useEffect(() => {
    getCurrentUser().then((user) => {
      setUserForm({
        ...userForm,
        firstName: user.firstName ? user.firstName : "",
        lastName: user.lastName ? user.lastName : "",
        budget: user.budget ? user.budget : 0,
        budgetWarning: user.budgetWarning ? user.budgetWarning : 0,
      });
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {userForm ? (
        <View
          style={{
            flex: 1,
            backgroundColor: colors.background,
            color: colors.text,
            paddingHorizontal: 30,
            rowGap: 20,
            justifyContent: "center",
            minHeight: Dimensions.get("window").height,
            position: "relative",
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
          {errorMessage ? <ErrorComponent errorMessage={errorMessage} /> : null}
          <Foect.Form
            onValidSubmit={async (model) => {
              model.budget = +model.budget;
              model.budgetWarning = +model.budgetWarning;
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
              <View
                style={{
                  rowGap: form.isInvalid ? 10 : 20,
                }}
              >
                <Foect.Control name="firstName" required>
                  {(control) => (
                    <View
                      style={{
                        rowGap: 10,
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
                          }}
                          value={control.value}
                        />
                      </View>
                      {control.isInvalid && control.errors.required && (
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
                          }}
                          value={control.value}
                        />
                      </View>
                      {control.isInvalid && control.errors.required && (
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
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    columnGap: 10,
                  }}
                >
                  <Foect.Control
                    name="budget"
                    callback={(value, control) => {
                      return +value != 0;
                    }}
                  >
                    {(control) => (
                      <View
                        style={{
                          rowGap: 10,
                          flex: 1,
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
                            }}
                            value={control.value.toString()}
                            keyboardType="numeric"
                          />
                        </View>
                        {control.isInvalid && control.errors.callback && (
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
                  <Foect.Control
                    name="budgetWarning"
                    callback={(value, control) => {
                      return +value != 0;
                    }}
                  >
                    {(control) => (
                      <View
                        style={{
                          rowGap: 10,
                          flex: 1,
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
                            }}
                            value={control.value.toString()}
                            keyboardType="numeric"
                          />
                        </View>
                        {control.isInvalid && control.errors.callback && (
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
                </View>
                <View
                  style={{
                    width: "100%",
                    rowGap: 20,
                    paddingTop: form.isInvalid ? 20 : 0,
                  }}
                >
                  <Button
                    loading={loading}
                    loadingProps={{
                      size: "small",
                      color: colors.background,
                    }}
                    onPress={() => form.submit()}
                    title={i18n.t("save")}
                    titleStyle={{
                      color: colors.background,
                      fontSize: 15,
                      fontFamily: "Poppins_500Medium",
                    }}
                    buttonStyle={{
                      backgroundColor: colors.text,
                      paddingVertical: 11.5,
                      paddingHorizontal: 30,
                      borderRadius: 5,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    disabled={form.isInvalid}
                    disabledStyle={{
                      backgroundColor: colors.disabledColor,
                      color: colors.disabledBackground,
                    }}
                  />
                </View>
              </View>
            )}
          </Foect.Form>
        </View>
      ) : (
        <LoadingScreen />
      )}
    </SafeAreaView>
  );
}
