import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useRef, useMemo, useState, useEffect } from "react";
import HeaderComponent from "../components/HeaderComponent";
import AmountComponent from "../components/AmountComponent";
import ExpensesComponent from "../components/ExpensesComponent";
import CreateExpenseButtonComponent from "../components/CreateExpenseButtonComponent";
import BottomSheet from "@gorhom/bottom-sheet";
import SelectDropdown from "react-native-select-dropdown";
import { Icon } from "@rneui/themed";
import { months, generateYearList } from "../utils/utils";
export default function HomeScreen() {
  const bottomSheetParameters = useRef(null);
  const bottomSheetYearMonth = useRef(null);
  const [openedParameters, setOpenedParameters] = useState(false);
  const [openedYearMonth, setOpenedYearMonth] = useState(false);

  const snapPoints = useMemo(() => ["25%", "25%"], []);
  const openParameteres = () => {
    setOpenedParameters(!openedParameters);

    if (openedParameters) {
      bottomSheetParameters.current.close();
    }

    bottomSheetParameters.current.snapToIndex(1);
  };

  const openYearMonth = () => {
    setOpenedYearMonth(!openedYearMonth);

    if (openedYearMonth) {
      bottomSheetYearMonth.current.close();
    }
    bottomSheetYearMonth.current.snapToIndex(1);
  };

  const [sort, setSort] = useState(null);
  const [order, setOrder] = useState(null);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [keyword, setKeyword] = useState(null);
  const sortSelect = React.createRef();
  const orderSelect = React.createRef();

  function resetParameters() {
    sortSelect.current.reset();
    orderSelect.current.reset();
    setSort(null);
    setOrder(null);
  }

  return (
    <View style={styles.container}>
      <CreateExpenseButtonComponent />
      <HeaderComponent keyword={keyword} setKeyword={setKeyword} />
      <AmountComponent
        openYearMonth={openYearMonth}
        year={year}
        month={month}
      />
      <ExpensesComponent
        sort={sort}
        order={order}
        openParameteres={openParameteres}
        year={year}
        month={month}
        keyword={keyword}
      />
      <BottomSheet
        ref={bottomSheetParameters}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        animateOnMount
        backgroundStyle={{ backgroundColor: "#3f3f46", borderRadius: 30 }}
      >
        <View
          style={{
            rowGap: 20,
            flex: 1,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",

              paddingTop: 30,
              paddingHorizontal: 20,
              paddingBottom: 10,
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
            {sort || order ? (
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
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              columnGap: 40,
            }}
          >
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
              buttonStyle={{ borderRadius: 10, width: 170 }}
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
              buttonStyle={{ borderRadius: 10, width: 170 }}
              buttonTextStyle={{ fontFamily: "Poppins_300Light" }}
              rowTextStyle={{ fontFamily: "Poppins_300Light" }}
              ref={orderSelect}
            />
          </View>
        </View>
      </BottomSheet>
      <BottomSheet
        ref={bottomSheetYearMonth}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        animateOnMount
        backgroundStyle={{ backgroundColor: "#3f3f46", borderRadius: 30 }}
      >
        <View
          style={{
            rowGap: 20,
            flex: 1,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",

              paddingTop: 30,
              paddingHorizontal: 20,
              paddingBottom: 10,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 17,
                fontFamily: "Poppins_500Medium",
              }}
            >
              Configure year and month
            </Text>
            {sort || order ? (
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
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              columnGap: 40,
            }}
          >
            <SelectDropdown
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
              buttonStyle={{ borderRadius: 10, width: 170 }}
              buttonTextStyle={{ fontFamily: "Poppins_300Light" }}
              rowTextStyle={{ fontFamily: "Poppins_300Light" }}
            />
            <SelectDropdown
              data={months}
              onSelect={(selectedItem, index) => {
                setMonth(index);
              }}
              buttonTextAfterSelection={(selectedItem) => {
                return selectedItem;
              }}
              rowTextForSelection={(item) => {
                return item;
              }}
              defaultButtonText="Select month"
              defaultValue={months[month]}
              buttonStyle={{ borderRadius: 10, width: 170 }}
              buttonTextStyle={{ fontFamily: "Poppins_300Light" }}
              rowTextStyle={{ fontFamily: "Poppins_300Light" }}
            />
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
    paddingTop: 50,
    rowGap: 10,
    alignItems: "center",
    position:'relative'
  },
  safeArea: {
    flex: 1,
  },
});
