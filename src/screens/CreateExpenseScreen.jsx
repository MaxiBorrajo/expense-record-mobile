import {
  Text,
  View,
  TextInput,
  SafeAreaView,
  Dimensions,
  FlatList,
} from "react-native";
import ButtonComponent from "../components/ButtonComponent";
import { useState, useContext, useEffect } from "react";
import { Icon, Badge } from "@rneui/themed";
import ErrorComponent from "../components/ErrorComponent";
import { CategoryContext } from "../context/CategoryContext";
import SelectDropdown from "react-native-select-dropdown";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@react-navigation/native";
import Foect from "foect";
import { ExpenseContext } from "../context/ExpenseContext";
import i18n from "../utils/i18n";
import { Switch } from "react-native-switch";
import { getDaysOfTheMonth } from "../utils/utils";

Foect.Validators.add("greaterThanZero", (val, controlName, control) => {
  if (val > 0) {
    return null;
  }

  return val === control.form.getValue(controlName)
    ? null
    : { greaterThanZero: true };
});

export default function CreateExpenseScreen() {
  const { getCategories } = useContext(CategoryContext);
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [expenseForm, setExpenseForm] = useState({
    amount: 100,
  });
  const [icon, setIcon] = useState(null);
  const [categories, setCategories] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { createExpense } = useContext(ExpenseContext);
  const [frequency, setFrequency] = useState(1);
  const [selectedDays, setSelectedDays] = useState([1]);
  const [selectedMonthDays, setSelectedMonthDays] = useState([1]);
  const [isAutomaticallyCreated, setIsAutomaticallyCreated] = useState(false);

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

  const createNewExpense = async (form) => {
    try {
      setErrorMessage(null);
      setLoading(true);
      await createExpense(form);
      setLoading(false);
      navigation.navigate("Main", { actionCompleted: true });
    } catch (error) {
      setLoading(false);
      if (error.response.data) {
        setErrorMessage(error.response.data.Error);
      } else {
        setErrorMessage(error.message);
      }
    }
  };

  useEffect(() => {
    getCategories().then((categories) => {
      setCategories(categories);
    });
  }, []);

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
              position: "relative",
              paddingVertical: isAutomaticallyCreated ? 100 : 0,

            }}
          >
            <View
              style={{
                flex: 1,
                rowGap: 20,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "Poppins_500Medium",
                  color: colors.text,
                  paddingBottom: 10,
                }}
              >
                {i18n.t("createExpense")}
              </Text>
              {errorMessage ? (
                <ErrorComponent errorMessage={errorMessage} />
              ) : null}
              {expenseForm.category_id ? (
                <View
                  style={{
                    borderRadius: 5,
                    backgroundColor: colors.card,
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    width: 70,
                    height: 70,
                    elevation: 3,
                    alignSelf: "center",
                  }}
                >
                  <Icon
                    name={icon}
                    type="font-awesome-5"
                    iconStyle={{ fontSize: 20, color: colors.text }}
                  ></Icon>
                </View>
              ) : null}
              <Foect.Form
                defaultValue={{
                  title: "",
                  amount: expenseForm?.amount,
                  description: null,
                  isAutomaticallyCreated: false,
                  cron: 1,
                  category_id: null,
                }}
                onValidSubmit={async (model) => {
                  if (model.cron) {
                    model.cron = generateCron(model.cron);
                  }
                  await createNewExpense(model);
                }}
              >
                {(form) => (
                  <View>
                    <Foect.Control name="title" required>
                      {(control) => (
                        <View
                          style={{
                            rowGap: 10,
                            marginBottom:
                              control.isValid || control.isUntouched ? 20 : 10,
                          }}
                        >
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
                            marginBottom: control.isValid ? 20 : 0,
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
                                  control.onChange(text);
                                  control.markAsTouched();
                                }}
                                value={control.value.toString()}
                                keyboardType="decimal-pad"
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
                            padding: 10,
                            backgroundColor: colors.card,
                            borderRadius: 5,
                            elevation: 3,
                            textAlignVertical: "top",
                            paddingRight: 15,
                            marginBottom: control.isValid ? 20 : 0,
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
                    <Foect.Control name="category_id">
                      {(control) => (
                        <SelectDropdown
                          data={categories}
                          onSelect={(selectedItem) => {
                            setExpenseForm((prev) => ({
                              ...prev,
                              category_id: selectedItem._id,
                            }));
                            setIcon((prev) => selectedItem.icon_id.icon);
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
                            marginBottom: 20,
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
                        marginBottom: 20,
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
                              circleSize={25}
                              activeText={""}
                              inActiveText={""}
                              backgroundActive={colors.attention}
                              backgroundInactive={"gray"}
                              value={Boolean(control.value)}
                              onValueChange={(value) => {
                                control.onChange(value);
                                setIsAutomaticallyCreated((prev) => value);
                              }}
                              barHeight={28}
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
                                  frequency === 2 || frequency === 3 ? 10 : 0,
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
                                      control.onChange(value <= 0 ? 1 : value);
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
                                          !selectedMonthDays.includes(element)
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
                                          selectedMonthDays.includes(element)
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
                                          !selectedDays.includes(element.value)
                                        ) {
                                          setSelectedDays((prev) => [
                                            ...prev,
                                            element.value,
                                          ]);
                                        } else if (selectedDays.length > 1) {
                                          setSelectedDays((prev) =>
                                            prev.filter(
                                              (item) => item !== element.value
                                            )
                                          );
                                        }
                                      }}
                                      badgeStyle={{
                                        backgroundColor: selectedDays.includes(
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
                    <ButtonComponent
                      label={i18n.t("save")}
                      loading={loading}
                      action={() => form.submit()}
                      disabled={form.isInvalid}
                    />
                  </View>
                )}
              </Foect.Form>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
}
