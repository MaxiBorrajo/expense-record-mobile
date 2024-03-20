import {
  Text,
  View,
  FlatList,
  SafeAreaView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useRef, useState, useContext, useMemo } from "react";
import GoBackButtonComponent from "../components/GoBackButtonComponent";
import { Icon, SearchBar } from "@rneui/themed";
import { ExpenseContext } from "../context/ExpenseContext";
import { CategoryContext } from "../context/CategoryContext";
import ExpenseComponent from "../components/ExpenseComponent";
import SelectDropdown from "react-native-select-dropdown";
import { months, generateYearList, getDaysOfTheMonth } from "../utils/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "@react-navigation/native";
import { UserContext } from "../context/UserContext";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import i18n from "../utils/i18n";

export default function ExpensesScreen() {
  const { getExpenses } = useContext(ExpenseContext);
  const { getCategories } = useContext(CategoryContext);
  const [expenses, setExpenses] = useState(null);
  const searchBar = useRef(null);
  const [keyword, setKeyword] = useState(null);
  const [sort, setSort] = useState(null);
  const [order, setOrder] = useState(null);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [day, setDay] = useState(null);
  const [category, setCategory] = useState(null);
  const [type, setType] = useState(null);
  const [categories, setCategories] = useState(null);
  const {reload, setReload} = useContext(UserContext);
  const [firstYear, setFirstYear] = useState(null);
  const { colors } = useTheme();
  const sortSelect = useRef({});
  const orderSelect = useRef({});
  const yearSelect = useRef({});
  const monthSelect = useRef({});
  const daySelect = useRef({});
  const typeSelect = useRef({});
  const categorySelect = useRef({});
  const dataTypeSelect = [
    {
      type: "None",
      value: null,
    },
    {
      type: "Income",
      value: 1,
    },
    {
      type: "Loss",
      value: 0,
    },
  ];

  const cancelSearch = () => {
    if (searchBar.current) {
      searchBar.current.blur();
      setKeyword(null);
    }
  };

  const resetParameters = () => {
    yearSelect.current.reset();
    monthSelect.current.reset();
    daySelect.current.reset();
    sortSelect.current.reset();
    orderSelect.current.reset();
    categorySelect.current.reset();
    typeSelect.current.reset();
    setCategory(null);
    setDay(null);
    setKeyword(null);
    setYear(new Date().getFullYear());
    setMonth(new Date().getMonth());
    setSort(null);
    setOrder(null);
    setType(null);
  };

  useEffect(() => {
    setExpenses((prev) => null);
    setReload(false);
    AsyncStorage.getItem("user").then((result) => {
      const createdAt = JSON.parse(result).createdAt;
      setFirstYear(new Date(createdAt).getFullYear());
    });

    const filters = [
      {
        filter: "year",
        value: year,
      },
      {
        filter: "month",
        value: month,
      },
      {
        filter: "day",
        value: day,
      },
      {
        filter: "category",
        value: category,
      },
      {
        filter: "keyword",
        value: keyword,
      },
      {
        filter: "type",
        value: type,
      },
    ];

    getExpenses(sort, order, filters).then((expenses) => {
      setExpenses(expenses);
    });

    getCategories().then((categories) => {
      setCategories(categories);
    });
  }, [sort, order, category, keyword, year, month, day, type, reload]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
          color: colors.text,
          alignItems: "center",
          position: "relative",
          paddingHorizontal: 20,
          paddingTop: 70,
          minHeight: Dimensions.get("window").height,
        }}
      >
        <GoBackButtonComponent />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Text
            style={{
              color: colors.text,
              fontSize: 20,
              fontFamily: "Poppins_500Medium",
            }}
          >
            {i18n.t("allExpenses")}
          </Text>

          <Menu>
            <MenuTrigger>
              <Icon name="sliders" type="font-awesome" color={colors.text} />
            </MenuTrigger>
            <MenuOptions
              style={{ backgroundColor: colors.card, padding: 20, rowGap: 10 }}
            >
              {sort || order || type || category || year || month || day ? (
                <MenuOption
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    columnGap: 10,
                    width: "100%",
                    padding: 10,
                    borderColor: colors.border,
                    borderStyle: "solid",
                    borderWidth: 1,
                    borderRadius: 5,
                  }}
                  onSelect={resetParameters}
                >
                  <Text
                    style={{
                      color: colors.text,
                      fontFamily: "Poppins_300Light",
                      fontSize: 15,
                    }}
                  >
                    {i18n.t("reset")}
                  </Text>
                  <Icon
                    name="times"
                    color={colors.text}
                    type="font-awesome-5"
                    iconStyle={{ fontSize: 15 }}
                  />
                </MenuOption>
              ) : null}
              <Text
                style={{
                  color: colors.text,
                  fontFamily: "Poppins_500Medium",
                  fontSize: 17,
                  paddingTop: 5,
                }}
              >
                {i18n.t("filterByDate")}
              </Text>
              <MenuOption
                style={{
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <SelectDropdown
                  ref={yearSelect}
                  data={generateYearList(firstYear)}
                  onSelect={(selectedItem) => {
                    setYear(selectedItem);
                  }}
                  buttonTextAfterSelection={(selectedItem) => {
                    return selectedItem;
                  }}
                  rowTextForSelection={(item) => {
                    return item;
                  }}
                  defaultButtonText={i18n.t("selectYear")}
                  defaultValue={year}
                  buttonStyle={{
                    borderRadius: 5,
                    alignSelf: "center",
                    backgroundColor: colors.card,
                    color: colors.text,
                    borderColor: colors.border,
                    borderWidth: 1,
                    borderStyle: "solid",
                    fontSize: 15,
                    width: "105%",
                  }}
                  buttonTextStyle={{
                    fontFamily: "Poppins_300Light",
                    color: colors.text,
                    fontSize: 15,
                  }}
                  rowTextStyle={{
                    fontFamily: "Poppins_300Light",
                    fontSize: 15,
                  }}
                />
              </MenuOption>

              <MenuOption
                style={{
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <SelectDropdown
                  ref={monthSelect}
                  data={["None", ...months]}
                  onSelect={(selectedItem, index) => {
                    selectedItem === "None"
                      ? setMonth(null)
                      : setMonth(index - 1);
                  }}
                  buttonTextAfterSelection={(selectedItem) => {
                    return i18n.t(selectedItem);
                  }}
                  rowTextForSelection={(item) => {
                    return i18n.t(item);
                  }}
                  defaultButtonText={i18n.t("selectMonth")}
                  defaultValue={i18n.t(months[month])}
                  buttonStyle={{
                    borderRadius: 5,
                    alignSelf: "center",
                    backgroundColor: colors.card,
                    color: colors.text,
                    borderColor: colors.border,
                    borderWidth: 1,
                    borderStyle: "solid",
                    fontSize: 15,
                    width: "105%",
                  }}
                  buttonTextStyle={{
                    fontFamily: "Poppins_300Light",
                    color: colors.text,
                    fontSize: 15,
                  }}
                  rowTextStyle={{
                    fontFamily: "Poppins_300Light",
                    fontSize: 15,
                  }}
                />
              </MenuOption>
              <MenuOption
                style={{
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <SelectDropdown
                  ref={daySelect}
                  data={getDaysOfTheMonth(year, month)}
                  onSelect={(selectedItem) => {
                    setDay(selectedItem);
                  }}
                  buttonTextAfterSelection={(selectedItem) => {
                    return selectedItem;
                  }}
                  rowTextForSelection={(item) => {
                    return item;
                  }}
                  defaultButtonText={i18n.t("selectDate")}
                  defaultValue={day}
                  buttonStyle={{
                    borderRadius: 5,
                    alignSelf: "center",
                    backgroundColor: colors.card,
                    color: colors.text,
                    borderColor: colors.border,
                    borderWidth: 1,
                    borderStyle: "solid",
                    fontSize: 15,
                    width: "105%",
                  }}
                  buttonTextStyle={{
                    fontFamily: "Poppins_300Light",
                    color: colors.text,
                    fontSize: 15,
                  }}
                  rowTextStyle={{
                    fontFamily: "Poppins_300Light",
                    fontSize: 15,
                  }}
                />
              </MenuOption>
              <Text
                style={{
                  color: colors.text,
                  fontFamily: "Poppins_500Medium",
                  fontSize: 17,
                  paddingTop: 5,
                }}
              >
                {i18n.t("filterByCategory")}
              </Text>
              <MenuOption
                style={{
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <SelectDropdown
                  ref={categorySelect}
                  data={categories}
                  onSelect={(selectedItem) => {
                    setCategory(selectedItem._id);
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
                  defaultValue={category}
                  buttonStyle={{
                    borderRadius: 5,
                    alignSelf: "center",
                    backgroundColor: colors.card,
                    color: colors.text,
                    borderColor: colors.border,
                    borderWidth: 1,
                    borderStyle: "solid",
                    fontSize: 15,
                    width: "105%",
                  }}
                  buttonTextStyle={{
                    fontFamily: "Poppins_300Light",
                    color: colors.text,
                    fontSize: 15,
                  }}
                  rowTextStyle={{
                    fontFamily: "Poppins_300Light",
                    fontSize: 15,
                  }}
                />
              </MenuOption>
              <Text
                style={{
                  color: colors.text,
                  fontFamily: "Poppins_500Medium",
                  fontSize: 17,
                  paddingTop: 5,
                }}
              >
                {i18n.t("filterByType")}
              </Text>
              <MenuOption
                style={{
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <SelectDropdown
                  ref={typeSelect}
                  data={dataTypeSelect}
                  onSelect={(selectedItem) => {
                    setType(selectedItem.value);
                  }}
                  buttonTextAfterSelection={(selectedItem) => {
                    return i18n.t(selectedItem.type);
                  }}
                  rowTextForSelection={(item) => {
                    return i18n.t(item.type);
                  }}
                  defaultButtonText={i18n.t("selectAType")}
                  defaultValue={type}
                  buttonStyle={{
                    borderRadius: 5,
                    alignSelf: "center",
                    backgroundColor: colors.card,
                    color: colors.text,
                    borderColor: colors.border,
                    borderWidth: 1,
                    borderStyle: "solid",
                    fontSize: 15,
                    width: "105%",
                  }}
                  buttonTextStyle={{
                    fontFamily: "Poppins_300Light",
                    color: colors.text,
                    fontSize: 15,
                  }}
                  rowTextStyle={{
                    fontFamily: "Poppins_300Light",
                    fontSize: 15,
                  }}
                />
              </MenuOption>
              <Text
                style={{
                  color: colors.text,
                  fontFamily: "Poppins_500Medium",
                  fontSize: 17,
                  paddingTop: 5,
                }}
              >
                {i18n.t("sortBy")}
              </Text>
              <MenuOption
                style={{
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <SelectDropdown
                  data={[
                    { sort: i18n.t("creationDate"), value: "createdAt" },
                    { sort: i18n.t("title"), value: "title" },
                    { sort: i18n.t("amount"), value: "amount" },
                  ]}
                  onSelect={(selectedItem) => {
                    setSort(selectedItem);
                  }}
                  buttonTextAfterSelection={(selectedItem) => {
                    return selectedItem.sort;
                  }}
                  rowTextForSelection={(item) => {
                    return item.sort;
                  }}
                  defaultButtonText={i18n.t("sortBy")}
                  defaultValue={sort}
                  buttonStyle={{
                    borderRadius: 5,
                    alignSelf: "center",
                    backgroundColor: colors.card,
                    color: colors.text,
                    borderColor: colors.border,
                    borderWidth: 1,
                    borderStyle: "solid",
                    fontSize: 15,
                    width: "105%",
                  }}
                  buttonTextStyle={{
                    fontFamily: "Poppins_300Light",
                    color: colors.text,
                    fontSize: 15,
                  }}
                  rowTextStyle={{
                    fontFamily: "Poppins_300Light",
                    fontSize: 15,
                  }}
                  ref={sortSelect}
                />
              </MenuOption>
              <MenuOption
                style={{
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <SelectDropdown
                  data={[
                    { order: i18n.t("upward"), value: "asc" },
                    { order: i18n.t("downward"), value: "desc" },
                  ]}
                  onSelect={(selectedItem, index) => {
                    setOrder(selectedItem);
                  }}
                  buttonTextAfterSelection={(selectedItem) => {
                    return selectedItem.order;
                  }}
                  rowTextForSelection={(item) => {
                    return item.order;
                  }}
                  defaultButtonText={i18n.t("orderBy")}
                  defaultValue={order}
                  buttonStyle={{
                    borderRadius: 5,
                    alignSelf: "center",
                    backgroundColor: colors.card,
                    color: colors.text,
                    borderColor: colors.border,
                    borderWidth: 1,
                    borderStyle: "solid",
                    fontSize: 15,
                    width: "105%",
                  }}
                  buttonTextStyle={{
                    fontFamily: "Poppins_300Light",
                    color: colors.text,
                    fontSize: 15,
                  }}
                  rowTextStyle={{
                    fontFamily: "Poppins_300Light",
                    fontSize: 15,
                  }}
                  ref={orderSelect}
                />
              </MenuOption>
            </MenuOptions>
          </Menu>
        </View>
        <SearchBar
          ref={searchBar}
          placeholder={i18n.t("searchTitle")}
          onChangeText={(newValue) => setKeyword(newValue)}
          onClear={cancelSearch}
          value={keyword}
          containerStyle={{
            width: "100%",
            borderRadius: 50,
            backgroundColor: "transparent",
            borderColor: "transparent",
            paddingTop: 15,
            paddingBottom: 20,
          }}
          inputContainerStyle={{
            borderRadius: 10,
            backgroundColor: colors.card,
            paddingHorizontal: 5,
          }}
          inputStyle={{
            fontSize: 10,
            fontFamily: "Poppins_300Light",
            color: colors.text,
          }}
        />
        <FlatList
          style={{
            height: "100%",
          }}
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: 30,
          }}
          data={expenses}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <ExpenseComponent item={item} setReload={setReload} />
          )}
          ListEmptyComponent={() =>
            !expenses ? (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: '100%',
                  minWidth: '100%'
                }}
              >
                <ActivityIndicator color={colors.attention} size="large" />
              </View>
            ) : expenses && expenses.length === 0 ? (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: '100%',
                  minWidth: '100%'
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: "Poppins_400Regular",
                    color: colors.text,
                  }}
                >
                  {i18n.t("dataNotFound")}
                </Text>
              </View>
            ) : null
          }
          ItemSeparatorComponent={() => (
            <View style={{ height: 20, width: "100%" }}></View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
