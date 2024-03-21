import { Text, View, TextInput, SafeAreaView, Dimensions } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import { CategoryContext } from "../context/CategoryContext";
import SelectDropdown from "react-native-select-dropdown";
import GoBackButtonComponent from "../components/GoBackButtonComponent";
import ButtonComponent from "../components/ButtonComponent";
import ErrorComponent from "../components/ErrorComponent";
import { Icon } from "@rneui/themed";
import { formatDate } from "../utils/utils";
import { useTheme } from "@react-navigation/native";
import Foect from "foect";
import LoadingScreen from "./LoadingScreen";
import i18n from "../utils/i18n";
import WarningDialogComponent from "../components/WarningDialogComponent";

export default function ExpenseScreen({ route, navigation }) {
  const { deleteExpenseById, updateExpenseById } =
    useContext(ExpenseContext);
  const { getCategories } = useContext(CategoryContext);
  const { expense } = route.params;
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState(null);
  const [visible, setVisible] = useState(false);
  const { colors } = useTheme();
  const [errorMessage, setErrorMessage] = useState(null);

  const toggleDialog = () => {
    setVisible(!visible);
  };

  const updateExpense = async (updatedExpense) => {
    setLoading(true);
    await updateExpenseById(expense._id, updatedExpense);
    setLoading(false);
    navigation.navigate("Expenses", { actionCompleted: true });
  };

  const deleteExpense = async () => {
    await deleteExpenseById(expense._id);
    navigation.navigate("Expenses", { actionCompleted: true });
  };

  useEffect(() => {
    getCategories().then((categories) => {
      setCategories(categories);
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {!expense || !categories ? (
        <LoadingScreen />
      ) : (
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
          {errorMessage ? <ErrorComponent errorMessage={errorMessage} /> : null}
          <Foect.Form
            defaultValue={{
              title: expense?.title,
              amount: +expense?.amount?.toFixed(2),
              description: expense?.description,
              category_id: expense?.category_id,
            }}
            onValidSubmit={async (model) => {
              model.category_id = model.category_id._id
                ? model.category_id._id
                : model.category_id;
              await updateExpense(model);
            }}
          >
            {(form) => (
              <View
                style={{
                  rowGap: 20,
                }}
              >
                <Foect.Control name={"title"} required>
                  {(control) => (
                    <View
                      style={{
                        rowGap: 10,
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
                          onBlur={control.markAsTouched}
                          onChangeText={(text) => control.onChange(text)}
                          value={control.value}
                          placeholder={i18n.t("writeExpenseTitle")}
                          placeholderTextColor={colors.text}
                          name="title"
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
                            onBlur={control.markAsTouched}
                            onChangeText={(text) => control.onChange(+text)}
                            value={control.value.toString()}
                            keyboardType="numeric"
                            name="amount"
                          />
                        </View>
                      </View>
                      {control.isInvalid && control.errors.required && (
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
                      {control.isInvalid && control.errors.callback && (
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
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    columnGap: 10,
                    width: "100%",
                  }}
                >
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
                          alignSelf: "center",
                          height: "100%",
                          backgroundColor: colors.card,
                          color: colors.text,
                          fontSize: 14,
                          flexGrow: 1,
                          elevation:5
                        }}
                        buttonTextStyle={{
                          fontFamily: "Poppins_300Light",
                          color: colors.text,
                          fontSize: 14,
                          elevation:5
                        }}
                        rowTextStyle={{
                          fontFamily: "Poppins_300Light",
                          fontSize: 14,
                          elevation:5
                        }}
                      />
                    )}
                  </Foect.Control>
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
    </SafeAreaView>
  );
}
