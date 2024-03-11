import { Text, View, TextInput, SafeAreaView, Dimensions } from "react-native";
import ButtonComponent from "../components/ButtonComponent";
import { useState, useContext, useEffect, useRef } from "react";
import GoBackButtonComponent from "../components/GoBackButtonComponent";
import { Icon } from "@rneui/themed";
import ErrorComponent from "../components/ErrorComponent";
import { CategoryContext } from "../context/CategoryContext";
import SelectDropdown from "react-native-select-dropdown";
import { useNavigation } from "@react-navigation/native";
import IncomeOrLossComponent from "../components/IncomeOrLossComponent";
import { useTheme } from "@react-navigation/native";
import Foect from "foect";
import { ExpenseContext } from "../context/ExpenseContext";
import i18n from "../utils/i18n";

export default function CreateExpenseScreen() {
  const { getCategories } = useContext(CategoryContext);
  const firstCharge = useRef(true);
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

  const createNewExpense = async (form) => {
    setErrorMessage(null);
    setLoading(true);
    await createExpense(form);
    setLoading(false);
    navigation.navigate("Main", { actionCompleted: true });
  };

  useEffect(() => {
    getCategories().then((categories) => {
      setCategories(categories);
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
          color: colors.text,
          paddingHorizontal: 50,
          position: "relative",
          minHeight: Dimensions.get("window").height,
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 50,
        }}
      >
        <View
          style={{
            flex: 1,
            rowGap: expenseForm.category_id ? 30 : 20,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontFamily: "Poppins_500Medium",
              color: colors.text,
            }}
          >
            {i18n.t("createExpense")}
          </Text>
          {errorMessage ? <ErrorComponent errorMessage={errorMessage} /> : null}
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
                elevation: 5,
                borderColor: colors.border,
                borderWidth: 1,
                borderStyle: "solid",
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
              title: expenseForm?.title,
              amount: expenseForm?.amount,
              description: expenseForm?.description,
              category_id: expenseForm?.category_id,
            }}
            onValidSubmit={async (model) => {
              await createNewExpense(model);
            }}
          >
            {(form) => (
              <View
                style={{
                  rowGap: form.isInvalid ? 10 : 20,
                }}
              >
                <Foect.Control name="title" required>
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
                          elevation: 5,
                          borderColor: colors.border,
                          borderWidth: 1,
                          borderStyle: "solid",
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
                          onBlur={control.markAsTouched}
                          onChangeText={(text) => control.onChange(text)}
                          value={control.value}
                          placeholder={i18n.t("writeExpenseTitle")}
                          placeholderTextColor={colors.text}
                          name="title"
                        />
                      </View>
                      {control.isInvalid &&
                        control.isTouched &&
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
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          width: "100%",
                          alignItems: "center",
                          justifyContent: "center",
                          paddingHorizontal: 50,
                          columnGap: 10,
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            width: "90%",
                            alignItems: "center",
                            columnGap: 3,
                            backgroundColor: colors.card,
                            paddingVertical: 10,
                            paddingHorizontal: 20,
                            borderRadius: 5,
                            elevation: 5,
                            borderColor: colors.border,
                            borderWidth: 1,
                            borderStyle: "solid",
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
                              fontSize: 12,
                              width: "100%",
                              paddingRight: 25,
                            }}
                            onBlur={control.markAsTouched}
                            onChangeText={(text) => control.onChange(text)}
                            value={control.value.toString()}
                            keyboardType="decimal-pad"
                            name="amount"
                          />
                        </View>
                        <IncomeOrLossComponent
                          amount={control.value}
                          action={() =>
                            form.setValue("amount", control.value * -1)
                          }
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
                        fontSize: 12,
                        padding: 10,
                        backgroundColor: colors.card,
                        borderRadius: 5,
                        elevation: 5,
                        borderColor: colors.border,
                        borderWidth: 1,
                        borderStyle: "solid",
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
                          setIcon(selectedItem.icon_id.icon);
                          setExpenseForm((prev) => ({
                            ...prev,
                            category_id: selectedItem._id,
                          }));
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
                        defaultButtonText={i18n.t('selectCategory')}
                        defaultValue={control.value}
                        buttonStyle={{
                          borderRadius: 5,
                          alignSelf: "center",
                          height: "100%",
                          backgroundColor: colors.card,
                          color: colors.text,
                          borderColor: colors.border,
                          borderWidth: 1,
                          borderStyle: "solid",
                          fontSize: 12,
                          flexGrow: 1,
                        }}
                        buttonTextStyle={{
                          fontFamily: "Poppins_300Light",
                          color: colors.text,
                          fontSize: 12,
                        }}
                        rowTextStyle={{
                          fontFamily: "Poppins_300Light",
                          fontSize: 12,
                        }}
                      />
                    )}
                  </Foect.Control>
                  <ButtonComponent
                    label={i18n.t('create')}
                    loading={loading}
                    action={() => form.submit()}
                    disabled={form.isInvalid}
                  />
                </View>
              </View>
            )}
          </Foect.Form>
        </View>
      </View>
    </SafeAreaView>
  );
}
