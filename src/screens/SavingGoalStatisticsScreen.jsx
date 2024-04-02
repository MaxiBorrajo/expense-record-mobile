import { Text, View, Dimensions, SafeAreaView, TextInput } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { getRandomHexColor } from "../utils/utils";
import { ExpenseContext } from "../context/ExpenseContext";
import { UserContext } from "../context/UserContext";
import { SavingGoalContext } from "../context/SavingGoalContext";
import { useTheme } from "@react-navigation/native";
import i18n from "../utils/i18n";
import Foect from "foect";
import ButtonComponent from "../components/ButtonComponent";
import ErrorComponent from "../components/ErrorComponent";
import CircularProgress from "react-native-circular-progress-indicator";
import { Icon } from "@rneui/themed";
import WarningDialogComponent from "../components/WarningDialogComponent";

Foect.Validators.add("greaterThanZero", (val, controlName, control) => {
  if (val > 0 && val != null && val != null) {
    return null;
  }

  return val === control.form.getValue(controlName)
    ? null
    : { greaterThanZero: true };
});

export default function SavingGoalStatisticsScreen({ navigation }) {
  const {
    createSavingGoal,
    deleteSavingGoal,
    updateSavingGoal,
    getSavingGoal,
  } = useContext(SavingGoalContext);
  const [savingGoal, setSavingGoal] = useState(null);
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme();
  const [visible, setVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const createGoal = async (data) => {
    try {
      setErrorMessage(null);
      setLoading(true);
      await createSavingGoal(data);
      getSavingGoal().then((result) => {
        setSavingGoal(result);
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.response.data) {
        setErrorMessage(error.response.data.Error);
      } else {
        setErrorMessage(error.message);
      }
    }
  };

  const updateGoal = async (data) => {
    try {
      setErrorMessage(null);
      setLoading(true);
      await updateSavingGoal(data);
      getSavingGoal().then((result) => {
        setSavingGoal(result);
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.response.data) {
        setErrorMessage(error.response.data.Error);
      } else {
        setErrorMessage(error.message);
      }
    }
  };

  const deleteGoal = async () => {
    try {
      setErrorMessage(null);
      await deleteSavingGoal();
      getSavingGoal().then((result) => {
        setSavingGoal(result);
      });
    } catch (error) {
      setLoading(false);
      if (error.response.data) {
        setErrorMessage(error.response.data.Error);
      } else {
        setErrorMessage(error.message);
      }
    }
  };

  const toggleDialog = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    getSavingGoal().then((result) => {
      if (result) {
        setSavingGoal({
          ...result,
          final_amount: result.final_amount,
        });
      }
    });
  }, [savingGoal]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", (e) => {
      getSavingGoal().then((result) => {
        setSavingGoal(result);
      });
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {!savingGoal ? (
        <View
          style={{
            flex: 1,
            backgroundColor: colors.background,
            color: colors.text,
            position: "relative",
            paddingHorizontal: 30,
            minHeight: Dimensions.get("window").height,
            rowGap: 10,
            paddingTop: 120,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Poppins_300Light",
              color: colors.text,
              paddingBottom: 10,
            }}
          >
            {i18n.t("savingGoal")}
          </Text>
          {errorMessage ? <ErrorComponent errorMessage={errorMessage} /> : null}
          <Foect.Form
            defaultValue={{
              title: "",
              description: "",
            }}
            onValidSubmit={async (model) => {
              model.final_amount = +model.final_amount;
              await createGoal(model);
            }}
          >
            {(form) => (
              <View
                style={{
                  rowGap: form.isValid ? 20 : 10,
                }}
              >
                <Foect.Control name={"title"} required>
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
                        {i18n.t("title")}
                      </Text>
                      <View
                        style={{
                          width: "100%",
                          alignItems: "center",
                          backgroundColor: colors.softCard,
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
                            fontSize: 14,
                            width: "100%",
                            paddingRight: 15,
                          }}
                          onChangeText={(text) => {
                            control.onChange(text);
                            control.markAsTouched();
                          }}
                          value={control.value}
                          placeholderTextColor={colors.text}
                          name="title"
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
                            {i18n.t("savingTitleError")}
                          </Text>
                        )}
                    </View>
                  )}
                </Foect.Control>
                <Foect.Control name="final_amount" required greaterThanZero>
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
                        {i18n.t("finalAmount")}
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          width: "100%",
                          alignItems: "center",
                          justifyContent: "center",
                          columnGap: 10,
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            width: "100%",
                            alignItems: "center",
                            columnGap: 3,
                            backgroundColor: colors.softCard,
                            paddingVertical: 10,
                            paddingHorizontal: 20,
                            borderRadius: 5,
                            elevation: 3,
                          }}
                        >
                          <Text
                            style={{
                              color: colors.text,
                              fontFamily: "Poppins_500Medium",
                              fontSize: 15,
                            }}
                          >
                            $
                          </Text>
                          <TextInput
                            style={{
                              color: colors.text,
                              fontFamily: "Poppins_300Light",
                              fontSize: 14,
                              width: "100%",
                              paddingRight: 25,
                            }}
                            onChangeText={(text) => {
                              if (+text <= 0) {
                                control.onChange(null);
                              } else {
                                control.onChange(+text);
                              }
                              control.markAsTouched();
                            }}
                            value={control.value.toString()}
                            keyboardType="numeric"
                            name="final_amount"
                          />
                        </View>
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
                            {i18n.t("finalAmountError")}
                          </Text>
                        )}
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
                            {i18n.t("finalAmountZeroError")}
                          </Text>
                        )}
                    </View>
                  )}
                </Foect.Control>
                <Foect.Control name="description">
                  {(control) => (
                    <View
                      style={{
                        rowGap: 10,
                        paddingBottom: 10,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 13,
                          fontFamily: "Poppins_400Regular",
                          color: colors.text,
                        }}
                      >
                        {i18n.t("description")}
                      </Text>
                      <TextInput
                        multiline
                        numberOfLines={5}
                        placeholderTextColor={colors.text}
                        style={{
                          width: "100%",
                          color: colors.text,
                          fontFamily: "Poppins_300Light",
                          fontSize: 14,
                          padding: 10,
                          backgroundColor: colors.softCard,
                          borderRadius: 5,
                          elevation: 3,
                          textAlignVertical: "top",
                        }}
                        onChangeText={(value) => {
                          control.onChange(value);
                        }}
                        value={control.value}
                        name="description"
                      />
                    </View>
                  )}
                </Foect.Control>
                <ButtonComponent
                  label={i18n.t("save")}
                  loading={loading}
                  action={() => form.submit()}
                  disabled={form.isInvalid}
                />
              </View>
            )}
          </Foect.Form>
          <Text
            style={{
              fontSize: 10,
              fontFamily: "Poppins_300Light",
              color: colors.text,
            }}
          >
            *{i18n.t("savingGoalHelp")}
          </Text>
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: colors.background,
            color: colors.text,
            position: "relative",
            paddingHorizontal: 30,
            minHeight: Dimensions.get("window").height,
            rowGap: 10,
            paddingTop: 120,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Poppins_300Light",
                color: colors.text,
              }}
            >
              {i18n.t("savingGoal")}
            </Text>
            <Icon
              name="trash-alt"
              type="font-awesome-5"
              iconStyle={{ fontSize: 17, color: "#ed2139" }}
              onPress={toggleDialog}
            />
          </View>
          <View
            style={{ width: "100%", alignItems: "center", paddingVertical: 15 }}
          >
            <CircularProgress
              value={(
                savingGoal.current_amount / savingGoal.final_amount
              ).toFixed(2)}
              duration={2000}
              progressValueColor={colors.attention}
              maxValue={100}
              valueSuffix={"%"}
              progressValueStyle={{
                fontFamily: "Poppins_400Regular",
                color: colors.text,
              }}
            />
          </View>
          <Foect.Form
            defaultValue={{
              title: savingGoal?.title,
              description: savingGoal?.description,
              final_amount: +savingGoal?.final_amount?.toFixed(2),
            }}
            onValidSubmit={async (model) => {
              model.final_amount = +model.final_amount;
              await updateGoal(model);
            }}
          >
            {(form) => (
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
                  {i18n.t("title")}
                </Text>
                <Foect.Control name={"title"} required>
                  {(control) => (
                    <View
                      style={{
                        rowGap: 10,
                        marginBottom: control.isValid ? 10 : 0,
                      }}
                    >
                      <View
                        style={{
                          width: "100%",
                          alignItems: "center",
                          backgroundColor: colors.softCard,
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
                            fontSize: 14,
                            width: "100%",
                            paddingRight: 15,
                          }}
                          onChangeText={(text) => {
                            control.onChange(text);
                            control.markAsTouched();
                          }}
                          value={control.value}
                          placeholderTextColor={colors.text}
                          name="title"
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
                            {i18n.t("savingTitleError")}
                          </Text>
                        )}
                    </View>
                  )}
                </Foect.Control>
                <Foect.Control name="final_amount" required greaterThanZero>
                  {(control) => (
                    <View
                      style={{
                        rowGap: 10,
                        marginBottom: control.isValid ? 10 : 0,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 13,
                          fontFamily: "Poppins_400Regular",
                          color: colors.text,
                        }}
                      >
                        {i18n.t("finalAmount")}
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          width: "100%",
                          alignItems: "center",
                          justifyContent: "center",
                          columnGap: 10,
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            width: "100%",
                            alignItems: "center",
                            columnGap: 3,
                            backgroundColor: colors.softCard,
                            paddingVertical: 10,
                            paddingHorizontal: 20,
                            borderRadius: 5,
                            elevation: 3,
                          }}
                        >
                          <Text
                            style={{
                              color: colors.text,
                              fontFamily: "Poppins_500Medium",
                              fontSize: 15,
                            }}
                          >
                            $
                          </Text>
                          <TextInput
                            style={{
                              color: colors.text,
                              fontFamily: "Poppins_300Light",
                              fontSize: 14,
                              width: "100%",
                              paddingRight: 25,
                            }}
                            onChangeText={(text) => {
                              control.onChange(+text);
                              control.markAsTouched();
                            }}
                            value={control.value.toString()}
                            keyboardType="numeric"
                            name="final_amount"
                          />
                        </View>
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
                            {i18n.t("finalAmountError")}
                          </Text>
                        )}
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
                            {i18n.t("finalAmountZeroError")}
                          </Text>
                        )}
                    </View>
                  )}
                </Foect.Control>
                <Foect.Control name="description">
                  {(control) => (
                    <View
                      style={{
                        rowGap: 10,
                        paddingBottom: 20,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 13,
                          fontFamily: "Poppins_400Regular",
                          color: colors.text,
                        }}
                      >
                        {i18n.t("description")}
                      </Text>
                      <TextInput
                        multiline
                        numberOfLines={5}
                        placeholderTextColor={colors.text}
                        style={{
                          width: "100%",
                          color: colors.text,
                          fontFamily: "Poppins_300Light",
                          fontSize: 14,
                          padding: 10,
                          backgroundColor: colors.softCard,
                          borderRadius: 5,
                          elevation: 3,
                          textAlignVertical: "top",
                        }}
                        onChangeText={(value) => {
                          control.onChange(value);
                        }}
                        value={control.value}
                        name="description"
                      />
                    </View>
                  )}
                </Foect.Control>
                <ButtonComponent
                  label={i18n.t("save")}
                  loading={loading}
                  action={() => form.submit()}
                  disabled={form.isInvalid}
                />
              </View>
            )}
          </Foect.Form>
          <Text
            style={{
              fontSize: 10,
              fontFamily: "Poppins_300Light",
              color: colors.text,
            }}
          >
            *{i18n.t("savingGoalHelp")}
          </Text>

          <WarningDialogComponent
            dialogObject={{
              isVisible: visible,
              toggleDialog: () => toggleDialog(),
              title: i18n.t("deleteSavingGoal"),
              description: i18n.t("deleteSavingGoalWarning"),
              cancel: () => setVisible(false),
              action: () => deleteGoal(),
            }}
          />
        </View>
      )}
    </SafeAreaView>
  );
}
