import {
  Text,
  View,
  Dimensions,
  SafeAreaView,
  FlatList,
  StyleSheet,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { generateYearList, months, getRandomHexColor } from "../utils/utils";
import { ExpenseContext } from "../context/ExpenseContext";
import SelectDropdown from "react-native-select-dropdown";
import { PieChart, BarChart } from "react-native-chart-kit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "@react-navigation/native";
import LoadingScreen from "./LoadingScreen";
import i18n from "../utils/i18n";
export default function CategoriesStatisticsScreen() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [type, setType] = useState(1);
  const { getStatisticsByCategory } = useContext(ExpenseContext);
  const [categoryStatistics, setCategoryStatistics] = useState(null);
  const [firstYear, setFirstYear] = useState(null);
  const { colors } = useTheme();

  const getTotal = (amounts) => {
    let total = 0;
    amounts.forEach((amount) => (total += amount));
    return total;
  };

  const chartConfig = {
    backgroundColor: colors.background,
    backgroundGradientFrom: colors.card,
    backgroundGradientTo: colors.card,
    barRadius: 5,
    fillShadowGradientFromOpacity: 1,
    color: () => colors.attention,
    labelColor: () => colors.text,
    styles: {
      elevation: 3,
    },
  };

  useEffect(() => {
    AsyncStorage.getItem("user").then((result) => {
      const createdAt = JSON.parse(result).createdAt;
      setFirstYear(new Date(createdAt).getFullYear());
    });

    getStatisticsByCategory(year, month, type).then((result) => {
      setCategoryStatistics(
        result.map((category) => {
          return {
            name: category.categoryInfo[0]
              ? category.categoryInfo[0].user_id
                ? category.categoryInfo[0].category_name
                : i18n.t(category.categoryInfo[0].category_name)
              : i18n.t("withoutCategory"),
            total: category.total,
            color: getRandomHexColor(),
            legendFontSize: 15,
          };
        })
      );
    });
  }, [year, month, type]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {!categoryStatistics ? (
        <LoadingScreen />
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: colors.background,
            color: colors.text,
            alignItems: "center",
            position: "relative",
            paddingHorizontal: 20,
            minHeight: Dimensions.get("window").height,
            rowGap: 10,
            paddingTop: 130,
          }}
        >
          <Text
            style={{
              color: colors.text,
              fontSize: 16,
              fontFamily: "Poppins_300Light",
            }}
          >
            {i18n.t("categoryStatistics")}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "90%",
              paddingVertical: 10,
            }}
          >
            <SelectDropdown
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
              defaultButtonText={i18n.t("year")}
              defaultValue={year}
              buttonStyle={{
                borderRadius: 5,
                alignSelf: "center",
                backgroundColor: colors.card,
                color: colors.text,
                fontSize: 12,
                width: 80,
                height: 40,
                elevation: 3,
              }}
              buttonTextStyle={{
                fontFamily: "Poppins_300Light",
                color: colors.text,
                fontSize: 12,
                elevation: 3,
              }}
              rowTextStyle={{
                fontFamily: "Poppins_300Light",
                fontSize: 12,
                elevation: 3,
              }}
            />

            <SelectDropdown
              data={["None", ...months]}
              onSelect={(selectedItem, index) => {
                if (index === 0) {
                  setMonth(null);
                } else {
                  setMonth(index - 1);
                }
              }}
              buttonTextAfterSelection={(selectedItem) => {
                return i18n.t(selectedItem);
              }}
              rowTextForSelection={(item) => {
                return i18n.t(item);
              }}
              defaultButtonText={i18n.t("month")}
              defaultValue={
                month != null && month != undefined
                  ? i18n.t(months[month])
                  : i18n.t("none")
              }
              buttonStyle={{
                borderRadius: 5,
                alignSelf: "center",
                backgroundColor: colors.card,
                color: colors.text,
                fontSize: 12,
                width: 80,
                height: 40,
                elevation: 3,
              }}
              buttonTextStyle={{
                fontFamily: "Poppins_300Light",
                color: colors.text,
                fontSize: 12,
                elevation: 3,
              }}
              rowTextStyle={{
                fontFamily: "Poppins_300Light",
                fontSize: 12,
                elevation: 3,
              }}
            />
            <SelectDropdown
              data={["Loss", "Income"]}
              onSelect={(selectedItem, index) => {
                setType(index);
              }}
              buttonTextAfterSelection={(selectedItem) => {
                return i18n.t(selectedItem);
              }}
              rowTextForSelection={(item) => {
                return i18n.t(item);
              }}
              defaultButtonText={i18n.t("type")}
              defaultValue={"Income"}
              buttonStyle={{
                borderRadius: 5,
                alignSelf: "center",
                backgroundColor: colors.card,
                color: colors.text,
                fontSize: 12,
                width: 100,
                height: 40,
                elevation: 3,
              }}
              buttonTextStyle={{
                fontFamily: "Poppins_300Light",
                color: colors.text,
                fontSize: 12,
                elevation: 3,
              }}
              rowTextStyle={{
                fontFamily: "Poppins_300Light",
                fontSize: 12,
                elevation: 3,
              }}
            />
          </View>
          {categoryStatistics && categoryStatistics.length > 0 ? (
            <View
              style={{
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                rowGap: 10,
                paddingTop: 10,
              }}
            >
              <PieChart
                data={categoryStatistics}
                width={Dimensions.get("screen").width}
                height={220}
                accessor={"total"}
                backgroundColor={"transparent"}
                chartConfig={chartConfig}
                hasLegend={false}
                center={[Dimensions.get("screen").width / 4, 0]}
              />
              <FlatList
                style={{
                  width: "100%",
                }}
                data={categoryStatistics}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => (
                  <View
                    style={{
                      alignItems: "center",
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <View
                      style={{
                        width: "100%",
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingHorizontal: 20,
                      }}
                    >
                      <View
                        style={{
                          alignItems: "center",
                          flexDirection: "row",
                          justifyContent: "center",
                          columnGap: 10,
                        }}
                      >
                        <View
                          style={{
                            width: 20,
                            height: 20,
                            backgroundColor: item.color,
                            borderRadius: 5,
                          }}
                        ></View>
                        <Text
                          style={{
                            color: colors.text,
                            fontSize: 12,
                            fontFamily: "Poppins_300Light",
                          }}
                        >
                          {item.name} (${(item.total / 1000).toFixed(2)}K)
                        </Text>
                      </View>
                      <Text
                        style={{
                          color: colors.text,
                          fontSize: 12,
                          fontFamily: "Poppins_300Light",
                        }}
                      >
                        {(
                          (item.total /
                            getTotal(
                              categoryStatistics.map(
                                (category) => category.total
                              )
                            )) *
                          100
                        ).toFixed(2)}
                        %
                      </Text>
                    </View>
                  </View>
                )}
                ItemSeparatorComponent={() => (
                  <View style={{ height: 10, width: "100%" }}></View>
                )}
              />
            </View>
          ) : (
            <Text
              style={{
                color: colors.text,
                fontSize: 25,
                fontFamily: "Poppins_700Bold",
                textAlign: "center",
                width: "100%",
                paddingTop: 40,
              }}
            >
              {i18n.t("dataNotFound")}
            </Text>
          )}
        </View>
      )}
    </SafeAreaView>
  );
}
