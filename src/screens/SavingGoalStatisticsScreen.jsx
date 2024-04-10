import {
  Text,
  View,
  Dimensions,
  SafeAreaView,
  TextInput,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useState, useContext, useEffect, useRef } from "react";
import { SavingGoalContext } from "../context/SavingGoalContext";
import { useTheme } from "@react-navigation/native";
import i18n from "../utils/i18n";
import Foect from "foect";
import ButtonComponent from "../components/ButtonComponent";
import CircularProgress from "react-native-circular-progress-indicator";
import { Icon } from "@rneui/themed";
import WarningDialogComponent from "../components/WarningDialogComponent";
import ErrorComponent from "../components/ErrorComponent";

Foect.Validators.add("greaterThanZero", (val, controlName, control) => {
  if (val > 0 && val != null && val != null) {
    return null;
  }

  return val === control.form.getValue(controlName)
    ? null
    : { greaterThanZero: true };
});

export default function SavingGoalStatisticsScreen() {
  const {
    createSavingGoal,
    deleteSavingGoal,
    updateSavingGoal,
    getSavingGoal,
    savingGoal,
  } = useContext(SavingGoalContext);
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme();
  const [visible, setVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const form = useRef(null);
  const title = useRef(null);
  const description = useRef(null);
  const final_amount = useRef(null);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await getSavingGoal();
    setRefreshing(false);
  };

  const createGoal = async (data) => {
    try {
      setErrorMessage(null);
      setLoading(true);
      await createSavingGoal(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error?.response?.data) {
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
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error?.response?.data) {
        setErrorMessage(error.response.data.Error);
      } else {
        setErrorMessage(error.message);
      }
    }
  };

  const resetForm = () => {
    form.current.setValue("title", null);
    form.current.setValue("description", null);
    form.current.setValue("final_amount", null);
    title.current.markAsUntouched();
    description.current.markAsUntouched();
    final_amount.current.markAsUntouched();
  };

  const deleteGoal = async () => {
    try {
      toggleDialog();
      setErrorMessage(null);
      await deleteSavingGoal();
      resetForm();
    } catch (error) {
      setLoading(false);
      if (error?.response?.data) {
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
    getSavingGoal();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
            {savingGoal ? (
              <Icon
                name="trash-alt"
                type="font-awesome-5"
                iconStyle={{ fontSize: 17, color: "#ed2139" }}
                onPress={toggleDialog}
              />
            ) : null}
          </View>
          {errorMessage && <ErrorComponent errorMessage={errorMessage} />}
          <View style={{ width: "100%", alignItems: "center" }}>
            {savingGoal ? (
              <CircularProgress
                value={((savingGoal.current_amount / savingGoal.final_amount) *
                  100 >
                100
                  ? 100
                  : (savingGoal.current_amount / savingGoal.final_amount) * 100
                )?.toFixed(2)}
                duration={2000}
                progressValueColor={colors.attention}
                maxValue={100}
                valueSuffix={"%"}
                progressValueStyle={{
                  fontFamily: "Poppins_400Regular",
                  color: colors.text,
                }}
              />
            ) : null}
          </View>
          <Foect.Form
            ref={form}
            defaultValue={{
              title: savingGoal?.title,
              description: savingGoal?.description,
              final_amount: savingGoal?.final_amount?.toFixed(2),
            }}
            onValidSubmit={async (model) => {
              model.final_amount = +model.final_amount;
              if (savingGoal) {
                await updateGoal(model);
              } else {
                await createGoal(model);
              }
              model = { ...savingGoal };
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
                <Foect.Control name={"title"} required ref={title}>
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
                <Foect.Control
                  name="final_amount"
                  required
                  greaterThanZero
                  ref={final_amount}
                >
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
                <Foect.Control name="description" ref={description}>
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
      </ScrollView>
    </SafeAreaView>
  );
}
