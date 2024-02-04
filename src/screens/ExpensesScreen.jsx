import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState, useContext, useMemo } from "react";
import GoBackButtonComponent from "../components/GoBackButtonComponent";
import { Icon, SearchBar } from "@rneui/themed";
import { ExpenseContext } from "../context/ExpenseContext";
import { CategoryContext } from "../context/CategoryContext";
import ExpenseComponent from "../components/ExpenseComponent";
import BottomSheet from "@gorhom/bottom-sheet";
import SelectDropdown from "react-native-select-dropdown";
import { months, generateYearList, getDaysOfTheMonth } from "../utils/utils";

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
  const [reload, setReload] = useState(false);

  const bottomSheetParameters = useRef(null);

  const [openedParameters, setOpenedParameters] = useState(false);

  const snapPoints = useMemo(() => ["50%", "50%"], []);

  const openParameteres = () => {
    setOpenedParameters(!openedParameters);

    if (openedParameters) {
      bottomSheetParameters.current.close();
    }

    bottomSheetParameters.current.snapToIndex(1);
  };

  const sortSelect = useRef({});
  const orderSelect = useRef({});
  const yearSelect = useRef({});
  const monthSelect = useRef({});
  const daySelect = useRef({});
  const typeSelect = useRef({});
  const categorySelect = useRef({});

  useEffect(() => {
    setReload(false);

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

  return (
    <View style={styles.container}>
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
            color: "white",
            fontSize: 20,
            fontFamily: "Poppins_500Medium",
          }}
        >
          All expenses
        </Text>
        <Icon
          name="sliders"
          type="font-awesome"
          color="white"
          onPress={() => openParameteres()}
        />
      </View>
      <SearchBar
        ref={searchBar}
        placeholder="Search by title"
        onChangeText={(newValue) => setKeyword(newValue)}
        onClear={() => cancelSearch()}
        value={keyword}
        containerStyle={{
          width: "100%",
          borderRadius: 50,
          backgroundColor: "transparent",
        }}
        inputContainerStyle={{
          borderRadius: 50,
          backgroundColor: "white",
        }}
        inputStyle={{
          fontSize: 10,
          fontFamily: "Poppins_300Light",
          color: "black",
        }}
      />
      <FlatList
        style={{ height: "100%" }}
        data={expenses}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <ExpenseComponent item={item} setReload={setReload} />
        )}
        ListEmptyComponent={() => (
          <Text
            style={{
              color: "white",
              fontSize: 25,
              fontFamily: "Poppins_700Bold",
              textAlign: "center",
              padding: 20,
            }}
          >
            Nothing added yet
          </Text>
        )}
        ItemSeparatorComponent={() => (
          <View style={{ height: 20, width: "100%" }}></View>
        )}
      />
      <BottomSheet
        ref={bottomSheetParameters}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        animateOnMount
        backgroundStyle={{ backgroundColor: "#3f3f46", borderRadius: 30 }}
      >
        <View style={{ flex: 1, paddingBottom: 30, rowGap: 20 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",

              paddingTop: 20,
              paddingHorizontal: 20,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 17,
                fontFamily: "Poppins_500Medium",
              }}
            >
              Configure parameters
            </Text>
            {sort || order || type || category || year || month || day ? (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  columnGap: 10,
                }}
                onPress={() => resetParameters()}
              >
                <Text
                  style={{
                    color: "white",
                    fontFamily: "Poppins_300Light",
                    fontSize: 12,
                  }}
                >
                  Reset
                </Text>
                <Icon
                  name="times"
                  color="white"
                  type="font-awesome-5"
                  iconStyle={{ fontSize: 12 }}
                />
              </TouchableOpacity>
            ) : null}
          </View>
          <View
            style={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              rowGap: 20,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 15,
                fontFamily: "Poppins_300Light",
                alignSelf: "flex-start",
                paddingHorizontal: 20,
              }}
            >
              Filter by
            </Text>
            <View style={{ flexDirection: "row", columnGap: 20 }}>
              <SelectDropdown
                ref={yearSelect}
                data={generateYearList(2002)}
                onSelect={(selectedItem) => {
                  setYear(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item) => {
                  return item;
                }}
                defaultButtonText="Select a year"
                defaultValue={year}
                buttonStyle={{ borderRadius: 5, width: 100 }}
                buttonTextStyle={{ fontFamily: "Poppins_300Light" }}
                rowTextStyle={{ fontFamily: "Poppins_300Light" }}
              />
              <SelectDropdown
                ref={monthSelect}
                data={["None", ...months]}
                onSelect={(selectedItem, index) => {
                  selectedItem === "None"
                    ? setMonth(null)
                    : setMonth(index - 1);
                }}
                buttonTextAfterSelection={(selectedItem) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item) => {
                  return item;
                }}
                defaultButtonText="Select month"
                defaultValue={months[month]}
                buttonStyle={{ borderRadius: 5, width: 100 }}
                buttonTextStyle={{ fontFamily: "Poppins_300Light" }}
                rowTextStyle={{ fontFamily: "Poppins_300Light" }}
              />
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
                defaultButtonText="Select date"
                defaultValue={day}
                buttonStyle={{ borderRadius: 5, width: 100 }}
                buttonTextStyle={{ fontFamily: "Poppins_300Light" }}
                rowTextStyle={{ fontFamily: "Poppins_300Light" }}
              />
            </View>
            <View style={{ flexDirection: "row", columnGap: 20 }}>
              <SelectDropdown
                ref={categorySelect}
                data={categories}
                onSelect={(selectedItem) => {
                  setCategory(selectedItem._id);
                }}
                buttonTextAfterSelection={(selectedItem) => {
                  return selectedItem.category_name;
                }}
                rowTextForSelection={(item) => {
                  return item.category_name;
                }}
                defaultButtonText="Select a category"
                defaultValue={category}
                buttonStyle={{ borderRadius: 5, width: 200 }}
                buttonTextStyle={{ fontFamily: "Poppins_300Light" }}
                rowTextStyle={{ fontFamily: "Poppins_300Light" }}
              />
              <SelectDropdown
                ref={typeSelect}
                data={[
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
                ]}
                onSelect={(selectedItem) => {
                  setType(selectedItem.value);
                }}
                buttonTextAfterSelection={(selectedItem) => {
                  return selectedItem.type;
                }}
                rowTextForSelection={(item) => {
                  return item.type;
                }}
                defaultButtonText="Select a type"
                defaultValue={type}
                buttonStyle={{ borderRadius: 5, width: 170 }}
                buttonTextStyle={{ fontFamily: "Poppins_300Light" }}
                rowTextStyle={{ fontFamily: "Poppins_300Light" }}
              />
            </View>
          </View>
          <View
            style={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              rowGap: 20,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 15,
                fontFamily: "Poppins_300Light",
                alignSelf: "flex-start",
                paddingHorizontal: 20,
              }}
            >
              Sort by
            </Text>
            <View style={{ flexDirection: "row", columnGap: 20 }}>
              <SelectDropdown
                data={[
                  { sort: "Creation date", value: "createdAt" },
                  { sort: "Title", value: "title" },
                  { sort: "Amount", value: "amount" },
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
                defaultButtonText="Sort by"
                defaultValue={sort}
                buttonStyle={{ borderRadius: 5, width: 170 }}
                buttonTextStyle={{ fontFamily: "Poppins_300Light" }}
                rowTextStyle={{ fontFamily: "Poppins_300Light" }}
                ref={sortSelect}
              />
              <SelectDropdown
                data={[
                  { order: "Upward", value: "asc" },
                  { order: "Downward", value: "desc" },
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
                defaultButtonText="Order by"
                defaultValue={order}
                buttonStyle={{ borderRadius: 5, width: 170 }}
                buttonTextStyle={{ fontFamily: "Poppins_300Light" }}
                rowTextStyle={{ fontFamily: "Poppins_300Light" }}
                ref={orderSelect}
              />
            </View>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0c0a09",
    color: "fff",
    paddingTop: 100,
    rowGap: 20,
    alignItems: "center",
    position: "relative",
    paddingHorizontal: 20,
  },
});