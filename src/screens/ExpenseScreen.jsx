import {
  Text,
  View,
  TextInput,
  Dimensions,
  ScrollView,
  RefreshControl,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import { CategoryContext } from "../context/CategoryContext";
import SelectDropdown from "react-native-select-dropdown";
import GoBackButtonComponent from "../components/GoBackButtonComponent";
import ButtonComponent from "../components/ButtonComponent";
import ErrorComponent from "../components/ErrorComponent";
import { Icon, Badge } from "@rneui/themed";
import { formatDate } from "../utils/utils";
import { useTheme } from "@react-navigation/native";
import Foect from "foect";
import LoadingScreen from "./LoadingScreen";
import i18n from "../utils/i18n";
import WarningDialogComponent from "../components/WarningDialogComponent";
import { Switch } from "react-native-switch";
import { getDaysOfTheMonth } from "../utils/utils";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from "accordion-collapse-react-native";
import {
  BannerAd,
  BannerAdSize,
  useInterstitialAd,
} from "react-native-google-mobile-ads";

Foect.Validators.add("greaterThanZero", (val, controlName, control) => {
  if (val > 0) {
    return null;
  }

  return val === control.form.getValue(controlName)
    ? null
    : { greaterThanZero: true };
});

export default function ExpenseScreen({ route, navigation }) {
  const { expense } = route.params;
  const { categories, getCategories } = useContext(CategoryContext);
  const { deleteExpenseById, updateExpenseById } = useContext(ExpenseContext);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const { colors } = useTheme();
  const [errorMessage, setErrorMessage] = useState(null);
  const [frequency, setFrequency] = useState(1);
  const [selectedDays, setSelectedDays] = useState([1]);
  const [selectedMonthDays, setSelectedMonthDays] = useState([1]);
  const [isAutomaticallyCreated, setIsAutomaticallyCreated] = useState(
    expense.isAutomaticallyCreated
  );
  const [repeat, setRepeat] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [isCollapsedOpen, setIsCollapsedOpen] = useState(false);
  const { isLoaded, isClosed, load, show } = useInterstitialAd(
    "ca-app-pub-5123415331806704/5836360932"
  );

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (isClosed) {
      navigation.goBack();
    }
  }, [isClosed, navigation]);

  const onRefresh = async () => {
    setRefreshing(true);
    await getCategories();
    if (expense.cron) {
      const details = getCronDetails(expense.cron);
      setFrequency((prev) => details.frequency);
      setRepeat((prev) => details.repeat);
      setSelectedDays((prev) =>
        details.selectedDays.length ? details.selectedDays : [1]
      );
      setSelectedMonthDays((prev) =>
        details.selectedMonthDays.length ? details.selectedMonthDays : [1]
      );
    }
    setRefreshing(false);
  };

  const daysOfTheWeek = [
    {
      name: i18n.t("Mon"),
      value: 1,
    },
    {
      name: i18n.t("Tues"),
      value: 2,
    },
    {
      name: i18n.t("Wed"),
      value: 3,
    },
    {
      name: i18n.t("Thurs"),
      value: 4,
    },
    {
      name: i18n.t("Fri"),
      value: 5,
    },
    {
      name: i18n.t("Sat"),
      value: 6,
    },
    {
      name: i18n.t("Sun"),
      value: 7,
    },
  ];

  const generateCron = (repeat) => {
    const now = new Date();
    const cronMapping = {
      1: `${now.getMinutes()} ${now.getHours()} */${repeat} * *`, // Repetir cada día
      2: `${now.getMinutes()} ${now.getHours()} */${
        repeat * 7
      } * ${selectedDays.join(",")}`, // Repetir cada semana
      3: `${now.getMinutes()} ${now.getHours()} ${selectedMonthDays.join(
        ","
      )} */${repeat} *`, // Repetir cada mes
      4: `${now.getMinutes()} ${now.getHours()} ${now.getDate()} */${
        repeat * 12
      } *`, // Repetir cada año
    };

    return cronMapping[frequency];
  };

  const getCronDetails = (cronExpression) => {
    const cronParts = cronExpression.split(" ");
    const dayOfMonth = cronParts[2];
    const month = cronParts[3];
    const dayOfWeek = cronParts[4];

    let frequency;
    let repeat;
    let selectedDays = [];
    let selectedMonthDays = [];

    if (month === "*" && dayOfWeek === "*") {
      // Repeat every day
      frequency = 1;
      repeat = cronParts[2].replace("*/", "");
    } else if (month === "*") {
      // Repeat every week
      frequency = 2;
      repeat = cronParts[2].replace("*/", "") / 7;
      selectedDays = dayOfWeek.split(",");
      selectedDays = selectedDays.map((day) => +day);
    } else if (dayOfWeek === "*" && dayOfMonth != "1") {
      // Repeat every month
      frequency = 3;
      repeat = cronParts[3].replace("*/", "");
      selectedMonthDays = dayOfMonth.split(",");
      selectedMonthDays = selectedMonthDays.map((day) => +day);
    } else {
      // Repeat every year
      frequency = 4;
      repeat = cronParts[3].replace("*/", "") / 12;
    }

    return {
      frequency,
      repeat,
      selectedDays,
      selectedMonthDays,
    };
  };

  const toggleDialog = () => {
    setVisible(!visible);
  };

  const updateExpense = async (updatedExpense) => {
    try {
      if (updatedExpense.cron) {
        updatedExpense.cron = generateCron(updatedExpense.cron);
      }
      setErrorMessage(null);
      setLoading(true);
      await updateExpenseById(expense._id, updatedExpense);
      setLoading(false);
      if (isLoaded) {
        show();
      } else {
        navigation.goBack();
      }
    } catch (error) {
      setLoading(false);
      if (error?.response?.data) {
        setErrorMessage(error.response.data.Error);
      } else {
        setErrorMessage(error.message);
      }
    }
  };

  const deleteExpense = async () => {
    try {
      setErrorMessage(null);
      await deleteExpenseById(expense._id);
      toggleDialog()
      if (isLoaded) {
        show();
      } else {
        navigation.goBack();
      }
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
    getCategories();
    if (expense.cron) {
      const details = getCronDetails(expense.cron);
      setFrequency((prev) => details.frequency);
      setRepeat((prev) => details.repeat);
      setSelectedDays((prev) =>
        details.selectedDays.length ? details.selectedDays : [1]
      );
      setSelectedMonthDays((prev) =>
        details.selectedMonthDays.length ? details.selectedMonthDays : [1]
      );
    }
  }, []);

  return (
    <>
      {!expense || !categories ? (
        <LoadingScreen />
      ) : (
        <KeyboardAvoidingView>
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
                justifyContent: "center",
                minHeight: Dimensions.get("window").height,
                position: "relative",
                paddingTop: isCollapsedOpen ? 130 : 0,
                paddingBottom: isCollapsedOpen ? 50 : 0,
              }}
            >
              <GoBackButtonComponent />
              {!isCollapsedOpen && (
                <View style={{ position: "absolute", top: 70, left: 0 }}>
                  <BannerAd
                    unitId={"ca-app-pub-5123415331806704/4490138605"}
                    size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                  />
                </View>
              )}
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 23,
                      fontFamily: "Poppins_500Medium",
                      color: colors.text,
                    }}
                  >
                    {i18n.t("details")}
                  </Text>
                  <Icon
                    name="trash-alt"
                    type="font-awesome-5"
                    iconStyle={{ fontSize: 20, color: "#ed2139" }}
                    onPress={toggleDialog}
                  />
                </View>
                {expense ? (
                  <Text
                    style={{
                      color: colors.text,
                      fontSize: 12,
                      fontFamily: "Poppins_300Light",
                    }}
                  >
                    {formatDate(expense.createdAt)}
                  </Text>
                ) : null}
              </View>
              {errorMessage ? (
                <ErrorComponent errorMessage={errorMessage} />
              ) : null}
              <Foect.Form
                defaultValue={{
                  title: expense?.title,
                  amount: +expense?.amount?.toFixed(2),
                  description: expense?.description,
                  category_id: expense?.category_id,
                  isAutomaticallyCreated: expense?.isAutomaticallyCreated,
                  cron: expense.cron ? repeat : 1,
                }}
                onValidSubmit={async (model) => {
                  model.category_id = model.category_id?._id
                    ? model.category_id._id
                    : model.category_id;
                  await updateExpense({ ...model });
                }}
              >
                {(form) => (
                  <View>
                    <Foect.Control name={"title"} required>
                      {(control) => (
                        <View
                          style={{
                            rowGap: 10,
                            marginBottom: control.isInvalid ? 10 : 20,
                          }}
                        >
                          <View
                            style={{
                              width: "100%",
                              alignItems: "center",
                              backgroundColor: colors.card,
                              paddingVertical: 10,
                              paddingHorizontal: 15,
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
                              placeholder={i18n.t("writeExpenseTitle")}
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
                                {i18n.t("expenseTitleError")}
                              </Text>
                            )}
                        </View>
                      )}
                    </Foect.Control>
                    <Foect.Control
                      name="amount"
                      required
                      callback={(value, control) => {
                        return +value != 0;
                      }}
                    >
                      {(control) => (
                        <View
                          style={{
                            rowGap: 10,
                            marginBottom: control.isInvalid ? 10 : 20,
                          }}
                        >
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
                                backgroundColor: colors.card,
                                paddingVertical: 10,
                                paddingHorizontal: 15,
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
                                  paddingRight: 20,
                                }}
                                onChangeText={(text) => {
                                  control.onChange(+text);
                                  control.markAsTouched();
                                }}
                                value={control.value.toString()}
                                keyboardType="numeric"
                                name="amount"
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
                                {i18n.t("expenseAmountError")}
                              </Text>
                            )}
                          {control.isTouched &&
                            control.isInvalid &&
                            control.errors.callback && (
                              <Text
                                style={{
                                  color: "#ed2139",
                                  fontSize: 12,
                                  fontFamily: "Poppins_500Medium",
                                }}
                              >
                                {i18n.t("expenseZeroError")}
                              </Text>
                            )}
                        </View>
                      )}
                    </Foect.Control>
                    <ButtonComponent
                      label={i18n.t("save")}
                      loading={loading}
                      action={() => form.submit()}
                      disabled={form.isInvalid}
                    />
                    <Collapse
                      isExpanded={isCollapsedOpen}
                      onToggle={() => setIsCollapsedOpen(!isCollapsedOpen)}
                      style={{ paddingTop: 20 }}
                    >
                      <CollapseHeader>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            borderRadius: 5,
                            backgroundColor: colors.card,
                            elevation: 3,
                            paddingVertical: 12,
                            paddingHorizontal: 17,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 14,
                              fontFamily: "Poppins_300Light",
                              color: colors.text,
                            }}
                          >
                            {i18n.t("moreOptions")}
                          </Text>
                          <Icon
                            name={
                              isCollapsedOpen ? "chevron-up" : "chevron-down"
                            }
                            type="font-awesome-5"
                            iconStyle={{ fontSize: 15, color: colors.text }}
                          ></Icon>
                        </View>
                      </CollapseHeader>
                      <CollapseBody style={{ rowGap: 20, paddingTop: 20 }}>
                        <Foect.Control name="category_id">
                          {(control) => (
                            <SelectDropdown
                              data={categories}
                              onSelect={(selectedItem) => {
                                control.onChange(selectedItem._id);
                              }}
                              buttonTextAfterSelection={(selectedItem) => {
                                return selectedItem?.user_id
                                  ? selectedItem?.category_name
                                  : i18n.t(selectedItem?.category_name);
                              }}
                              rowTextForSelection={(item) => {
                                return item?.user_id
                                  ? item?.category_name
                                  : i18n.t(item?.category_name);
                              }}
                              defaultButtonText={i18n.t("selectCategory")}
                              defaultValue={control.value}
                              buttonStyle={{
                                borderRadius: 5,
                                backgroundColor: colors.card,
                                color: colors.text,
                                fontSize: 14,
                                elevation: 3,
                                width: "100%",
                              }}
                              buttonTextStyle={{
                                fontFamily: "Poppins_300Light",
                                color: colors.text,
                                fontSize: 14,
                                elevation: 3,
                                textAlign: "left",
                                paddingLeft: 1,
                              }}
                              rowTextStyle={{
                                fontFamily: "Poppins_300Light",
                                fontSize: 14,
                                elevation: 3,
                              }}
                            />
                          )}
                        </Foect.Control>
                        <View
                          style={{
                            backgroundColor: colors.card,
                            borderRadius: 5,
                            elevation: 3,
                            paddingBottom: 15,
                          }}
                        >
                          <Foect.Control name="isAutomaticallyCreated">
                            {(control) => (
                              <View
                                style={{
                                  flexDirection: "row",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  width: "100%",
                                  paddingHorizontal: 15,
                                  paddingTop: 15,
                                }}
                              >
                                <Text
                                  style={{
                                    fontSize: 14,
                                    fontFamily: "Poppins_300Light",
                                    color: colors.text,
                                  }}
                                >
                                  {i18n.t("repeatEvery")}
                                </Text>
                                <Switch
                                  circleSize={20}
                                  activeText={""}
                                  inActiveText={""}
                                  backgroundActive={colors.attention}
                                  backgroundInactive={"gray"}
                                  value={Boolean(control.value)}
                                  onValueChange={(value) => {
                                    control.onChange(value);
                                    setIsAutomaticallyCreated((prev) => value);
                                  }}
                                  barHeight={22}
                                  switchLeftPx={3}
                                  switchRightPx={3}
                                />
                              </View>
                            )}
                          </Foect.Control>
                          {isAutomaticallyCreated ? (
                            <Foect.Control
                              name="cron"
                              required={isAutomaticallyCreated}
                              greaterThanZero
                            >
                              {(control) => (
                                <View
                                  style={{
                                    rowGap: 10,
                                    marginBottom:
                                      frequency === 2 || frequency === 3
                                        ? 10
                                        : 0,
                                  }}
                                >
                                  <View
                                    style={{
                                      flexDirection: "row",
                                      alignItems: "center",
                                      padding: 15,
                                      justifyContent: "space-between",
                                      flexWrap: "wrap",
                                      rowGap: 10,
                                    }}
                                  >
                                    <View
                                      style={{
                                        backgroundColor: colors.softCard,
                                        paddingVertical: 7,
                                        borderRadius: 5,
                                        elevation: 3,
                                        paddingHorizontal: 15,
                                      }}
                                    >
                                      <TextInput
                                        style={{
                                          color: colors.text,
                                          fontFamily: "Poppins_300Light",
                                          fontSize: 15,
                                          textAlign: "right",
                                        }}
                                        onChangeText={(value) => {
                                          control.onChange(
                                            value <= 0 ? 1 : value
                                          );
                                          control.markAsTouched();
                                        }}
                                        value={control.value.toString()}
                                        keyboardType="numeric"
                                      />
                                    </View>
                                    <Badge
                                      textStyle={{
                                        fontFamily: "Poppins_300Light",
                                        fontSize: 12,
                                      }}
                                      value={i18n.t("days")}
                                      onPress={() => {
                                        setFrequency((prev) => 1);
                                      }}
                                      badgeStyle={{
                                        backgroundColor:
                                          frequency === 1
                                            ? colors.attention
                                            : colors.disabledBackground,
                                        height: 25,
                                        alignItems: "center",
                                        justifyContent: "center",
                                        paddingHorizontal: 5,
                                        borderRadius: 50,
                                        borderWidth: 0,
                                      }}
                                    />
                                    <Badge
                                      textStyle={{
                                        fontFamily: "Poppins_300Light",
                                        fontSize: 12,
                                      }}
                                      value={i18n.t("weeks")}
                                      onPress={() => {
                                        setFrequency((prev) => 2);
                                      }}
                                      badgeStyle={{
                                        backgroundColor:
                                          frequency === 2
                                            ? colors.attention
                                            : colors.disabledBackground,
                                        height: 25,
                                        alignItems: "center",
                                        justifyContent: "center",
                                        paddingHorizontal: 5,
                                        borderRadius: 50,
                                        borderWidth: 0,
                                      }}
                                    />
                                    <Badge
                                      textStyle={{
                                        fontFamily: "Poppins_300Light",
                                        fontSize: 12,
                                      }}
                                      containerStyle={{}}
                                      value={i18n.t("months")}
                                      onPress={() => {
                                        setFrequency((prev) => 3);
                                      }}
                                      badgeStyle={{
                                        backgroundColor:
                                          frequency === 3
                                            ? colors.attention
                                            : colors.disabledBackground,
                                        height: 25,
                                        alignItems: "center",
                                        justifyContent: "center",
                                        paddingHorizontal: 5,
                                        borderRadius: 50,
                                        borderWidth: 0,
                                      }}
                                    />
                                    <Badge
                                      textStyle={{
                                        fontFamily: "Poppins_300Light",
                                        fontSize: 12,
                                      }}
                                      containerStyle={{ borderWidth: 0 }}
                                      value={i18n.t("years")}
                                      onPress={() => {
                                        setFrequency((prev) => 4);
                                      }}
                                      badgeStyle={{
                                        backgroundColor:
                                          frequency === 4
                                            ? colors.attention
                                            : colors.disabledBackground,
                                        height: 25,
                                        alignItems: "center",
                                        justifyContent: "center",
                                        paddingHorizontal: 5,
                                        borderRadius: 50,
                                        borderWidth: 0,
                                      }}
                                    />
                                  </View>
                                  {frequency === 3 ? (
                                    <View
                                      style={{
                                        flexDirection: "row",
                                        width: "100%",
                                        alignItems: "center",
                                        flexWrap: "wrap",
                                        rowGap: 10,
                                        justifyContent: "center",
                                        columnGap: 10,
                                        paddingHorizontal: 15,
                                      }}
                                    >
                                      {getDaysOfTheMonth(
                                        new Date().getFullYear(),
                                        new Date().getMonth()
                                      ).map((element, index) => (
                                        <Badge
                                          key={index}
                                          textStyle={{
                                            fontFamily: "Poppins_300Light",
                                            fontSize: 15,
                                          }}
                                          containerStyle={{ borderWidth: 0 }}
                                          value={element}
                                          onPress={() => {
                                            if (
                                              !selectedMonthDays.includes(
                                                element
                                              )
                                            ) {
                                              setSelectedMonthDays((prev) => [
                                                ...prev,
                                                element,
                                              ]);
                                            } else if (
                                              selectedMonthDays.length > 1
                                            ) {
                                              setSelectedMonthDays((prev) =>
                                                prev.filter(
                                                  (item) => item !== element
                                                )
                                              );
                                            }
                                          }}
                                          badgeStyle={{
                                            backgroundColor:
                                              selectedMonthDays.includes(
                                                element
                                              )
                                                ? colors.attention
                                                : colors.disabledBackground,
                                            height: 30,
                                            width: 30,
                                            alignItems: "center",
                                            justifyContent: "center",
                                            borderRadius: 50,
                                            borderWidth: 0,
                                          }}
                                        />
                                      ))}
                                    </View>
                                  ) : null}
                                  {frequency === 2 ? (
                                    <View
                                      style={{
                                        flexDirection: "row",
                                        width: "100%",
                                        alignItems: "center",
                                        flexWrap: "wrap",
                                        paddingHorizontal: 15,
                                        rowGap: 10,
                                        columnGap: 10,
                                      }}
                                    >
                                      {daysOfTheWeek.map((element, index) => (
                                        <Badge
                                          key={index}
                                          textStyle={{
                                            fontFamily: "Poppins_300Light",
                                            fontSize: 12,
                                          }}
                                          containerStyle={{ borderWidth: 0 }}
                                          value={element.name}
                                          onPress={() => {
                                            if (
                                              !selectedDays.includes(
                                                element.value
                                              )
                                            ) {
                                              setSelectedDays((prev) => [
                                                ...prev,
                                                element.value,
                                              ]);
                                            } else if (
                                              selectedDays.length > 1
                                            ) {
                                              setSelectedDays((prev) =>
                                                prev.filter(
                                                  (item) =>
                                                    item !== element.value
                                                )
                                              );
                                            }
                                          }}
                                          badgeStyle={{
                                            backgroundColor:
                                              selectedDays.includes(
                                                element.value
                                              )
                                                ? colors.attention
                                                : colors.disabledBackground,
                                            height: 25,
                                            alignItems: "center",
                                            justifyContent: "center",
                                            paddingHorizontal: 5,
                                            borderRadius: 50,
                                            borderWidth: 0,
                                          }}
                                        />
                                      ))}
                                    </View>
                                  ) : null}
                                  {control.isTouched &&
                                    control.isInvalid &&
                                    control.errors.required && (
                                      <Text
                                        style={{
                                          color: "#ed2139",
                                          fontSize: 12,
                                          fontFamily: "Poppins_500Medium",
                                          paddingHorizontal: 20,
                                          marginBottom: 10,
                                        }}
                                      >
                                        {i18n.t("repeatRequiredError")}
                                      </Text>
                                    )}
                                </View>
                              )}
                            </Foect.Control>
                          ) : null}
                        </View>
                        <Foect.Control name="description">
                          {(control) => (
                            <TextInput
                              multiline
                              numberOfLines={5}
                              placeholderTextColor={colors.text}
                              style={{
                                width: "100%",
                                color: colors.text,
                                fontFamily: "Poppins_300Light",
                                fontSize: 14,
                                paddingVertical: 10,
                                paddingHorizontal: 14,
                                backgroundColor: colors.card,
                                borderRadius: 5,
                                elevation: 3,
                                textAlignVertical: "top",
                              }}
                              onChangeText={(value) => {
                                control.onChange(value);
                              }}
                              value={control.value}
                              placeholder={i18n.t("descriptionExpense")}
                              name="description"
                            />
                          )}
                        </Foect.Control>
                      </CollapseBody>
                    </Collapse>
                  </View>
                )}
              </Foect.Form>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
      <WarningDialogComponent
        dialogObject={{
          isVisible: visible,
          toggleDialog: () => toggleDialog(),
          title: i18n.t("deleteExpense"),
          description: i18n.t("deleteWarning"),
          cancel: () => setVisible(false),
          action: () => deleteExpense(),
        }}
      />
    </>
  );
}
