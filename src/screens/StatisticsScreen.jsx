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
import { PieChart, LineChart } from "react-native-chart-kit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "@react-navigation/native";
import AnnualBalanceComponent from "../components/AnnualBalanceComponent";
import { Icon } from "@rneui/themed";
import LoadingScreen from "./LoadingScreen";
import i18n from "../utils/i18n";

export default function StatisticsScreen() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [type, setType] = useState(1);
  const { getStatistics, getStatisticsByCategory } = useContext(ExpenseContext);
  const [statistics, setStatistics] = useState(null);
  const [categoryStatistics, setCategoryStatistics] = useState(null);
  const [monthStatistics, setMonthStatistics] = useState(null);
  const [firstYear, setFirstYear] = useState(null);
  const [dataPoint, setDataPoint] = useState(null);
  const { colors } = useTheme();

  const monthData = (index) => {
    const monthDataFound = statistics[0].months.find(
      (month) => month.month === index + 1
    );

    return monthDataFound;
  };

  const getTotal = (amounts) => {
    let total = 0;
    amounts.forEach((amount) => (total += amount));
    return total;
  };

  const getMonths = () => {
    const currentIndex = month ? month : new Date().getMonth();

    if (currentIndex >= 0 && currentIndex <= 5) {
      return months.map((month) => month.slice(0, 3)).slice(0, 6);
    } else {
      return months.map((month) => month.slice(0, 3)).slice(6);
    }
  };

  const getMonthsData = (data) => {
    const currentIndex = month !== undefined ? month : new Date().getMonth();

    const monthlyTotals = Array.from({ length: 12 }, (_, i) => {
      const monthData = data[0].months.find((item) => item.month === i + 1);
      return monthData ? monthData.total.toFixed(2) : 0;
    });

    if (currentIndex >= 0 && currentIndex <= 5) {
      return monthlyTotals.slice(0, 6);
    } else {
      return monthlyTotals.slice(6);
    }
  };

  const chartConfig = {
    backgroundColor: colors.background,
    backgroundGradientFrom: colors.card,
    backgroundGradientTo: colors.card,
    color: () => colors.text,
    propsForDots: {
      r: "6",
      strokeWidth: "0",
      stroke: colors.attention,
    },
    styles:{
      elevation:5
    }
  };

  useEffect(() => {
    AsyncStorage.getItem("user").then((result) => {
      const createdAt = JSON.parse(result).createdAt;
      setFirstYear(new Date(createdAt).getFullYear());
    });

    getStatistics(year).then((result) => {
      setStatistics(result);
      setMonthStatistics({
        labels: getMonths(),
        datasets: [
          {
            data: getMonthsData(result),
            color: (opacity = 0.5) => `rgba(215, 173, 87, ${opacity})`,
            strokeWidth: 5,
          },
        ],
      });
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
      {!statistics || !categoryStatistics || !monthStatistics ? (
        <LoadingScreen />
      ) : (
        <FlatList
          contentContainerStyle={[
            { backgroundColor: colors.background, paddingTop: 40 },
            !statistics ? { flex: 1 } : null,
          ]}
          ListHeaderComponent={
            <View
              style={{
                flex: 1,
                backgroundColor: colors.background,
                color: colors.text,
                paddingBottom: 120,
                alignItems: "center",
                position: "relative",
                paddingHorizontal: 20,
                overflow: "scroll",
                minHeight: Dimensions.get("window").height,
                rowGap: 10,
                paddingTop:10
              }}
            >
              <Text
                style={{
                  color: colors.text,
                  fontSize: 20,
                  fontFamily: "Poppins_500Medium",
                  alignSelf: "flex-start",
                }}
              >
                {i18n.t("statistics")}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  paddingVertical: 10,
                }}
              >
                <Text
                  style={{
                    color: colors.text,
                    fontSize: 16,
                    fontFamily: "Poppins_300Light",
                  }}
                >
                  {i18n.t("annualStatistics")}
                </Text>
                {firstYear && year ? (
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
                      elevation:5
                    }}
                    buttonTextStyle={{
                      fontFamily: "Poppins_300Light",
                      color: colors.text,
                      fontSize: 12,
                      elevation:5
                    }}
                    rowTextStyle={{
                      fontFamily: "Poppins_300Light",
                      fontSize: 12,
                      elevation:5
                    }}
                  />
                ) : null}
              </View>
              {statistics ? (
                <View
                  style={{
                    rowGap: 30,
                    width: "100%",
                  }}
                >
                  {statistics.length > 0 ? (
                    <AnnualBalanceComponent
                      balance={statistics[0].total}
                      income={statistics[0].totalIncome}
                      loss={statistics[0].totalLoss}
                      loading={
                        !statistics || !categoryStatistics || !monthStatistics
                      }
                    />
                  ) : (
                    <Text
                      style={{
                        color: colors.text,
                        fontSize: 25,
                        fontFamily: "Poppins_700Bold",
                        textAlign: "center",
                        padding: 20,
                        width: "100%",
                      }}
                    >
                      {i18n.t("noDataFound")}
                    </Text>
                  )}
                  {monthStatistics ? (
                    <View>
                      <Text
                        style={{
                          color: colors.text,
                          fontSize: 16,
                          fontFamily: "Poppins_300Light",
                          paddingBottom: 10,
                        }}
                      >
                        {i18n.t("monthStatistics")}
                      </Text>
                      <LineChart
                        data={monthStatistics}
                        width={Dimensions.get("screen").width - 40}
                        height={240}
                        chartConfig={chartConfig}
                        bezier
                        style={{
                          borderRadius: 20,
                          paddingTop: 20,
                          paddingRight: 50,
                          bottom: 12,
                          elevation:5
                        }}
                        getDotColor={(dataPoint, index) => {
                          return "#D7AD57";
                        }}
                        withHorizontalLabels={false}
                        withOuterLines={false}
                        decorator={() => {
                          return dataPoint ? (
                            <View
                              style={{
                                position: "absolute",
                                top: dataPoint.y - 50,
                                left: dataPoint.x + 10,
                                backgroundColor: colors.card,
                                borderColor: "#58eb34",
                                borderWidth: 1,
                                borderStyle: "solid",
                                borderRadius: 5,
                                padding: 10,
                                justifyContent: "center",
                                alignItems: "center",
                                rowGap: 10,
                              }}
                            >
                              <View
                                style={{
                                  flexDirection: "row",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  columnGap: 10,
                                }}
                              >
                                <Icon
                                  name="wallet"
                                  type="font-awesome-5"
                                  iconStyle={{
                                    color: colors.text,
                                    fontSize: 13,
                                  }}
                                ></Icon>
                                <Text
                                  style={{
                                    color: colors.text,
                                    fontSize: 13,
                                    fontFamily: "Poppins_300Light",
                                  }}
                                >
                                  {monthData(dataPoint.index)
                                    ? monthData(dataPoint.index)?.total > 0
                                      ? `$${(
                                          monthData(dataPoint.index)?.total /
                                          1000
                                        )?.toFixed(2)}K`
                                      : `-$${(
                                          (monthData(dataPoint.index)?.total /
                                            1000) *
                                          -1
                                        )?.toFixed(2)}K`
                                    : `$0.00K`}
                                </Text>
                              </View>

                              <View
                                style={{
                                  flexDirection: "row",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  columnGap: 10,
                                }}
                              >
                                <Icon
                                  name="arrow-up"
                                  type="font-awesome"
                                  iconStyle={[styles.profit, { fontSize: 13 }]}
                                ></Icon>
                                <Text
                                  style={{
                                    color: colors.text,
                                    fontSize: 13,
                                    fontFamily: "Poppins_300Light",
                                  }}
                                >
                                  {monthData(dataPoint.index)
                                    ? `$${(
                                        monthData(dataPoint.index)
                                          ?.totalIncome / 1000
                                      )?.toFixed(2)}K`
                                    : `$0.00K`}
                                </Text>
                              </View>
                              <View
                                style={{
                                  flexDirection: "row",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  columnGap: 10,
                                }}
                              >
                                <Icon
                                  name="arrow-down"
                                  type="font-awesome"
                                  iconStyle={[styles.loss, { fontSize: 13 }]}
                                ></Icon>
                                <Text
                                  style={{
                                    color: colors.text,
                                    fontSize: 13,
                                    fontFamily: "Poppins_300Light",
                                  }}
                                >
                                  {monthData(dataPoint.index)
                                    ? `-$${(
                                        (monthData(dataPoint.index)?.totalLoss /
                                          1000) *
                                        -1
                                      )?.toFixed(2)}K`
                                    : `$0.00K`}
                                </Text>
                              </View>
                            </View>
                          ) : null;
                        }}
                        onDataPointClick={(index) => {
                          dataPoint && index.index === dataPoint.index
                            ? setDataPoint((prev) => null)
                            : setDataPoint((prev) => ({
                                index: index.index,
                                x: index.x,
                                y: index.y,
                              }));
                        }}
                        withInnerLines={false}
                      />
                    </View>
                  ) : null}
                  <View
                    style={{
                      width: "100%",
                      rowGap: 30,
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
                        width: "100%",
                        paddingHorizontal: 20,
                      }}
                    >
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
                          elevation:5
                        }}
                        buttonTextStyle={{
                          fontFamily: "Poppins_300Light",
                          color: colors.text,
                          fontSize: 12,
                          elevation:5
                        }}
                        rowTextStyle={{
                          fontFamily: "Poppins_300Light",
                          fontSize: 12,
                          elevation:5
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
                          elevation:5
                        }}
                        buttonTextStyle={{
                          fontFamily: "Poppins_300Light",
                          color: colors.text,
                          fontSize: 12,
                          elevation:5
                        }}
                        rowTextStyle={{
                          fontFamily: "Poppins_300Light",
                          fontSize: 12,
                          elevation:5
                        }}
                      />
                    </View>
                  </View>
                </View>
              ) : null}
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
                      alignItems: "center",
                      justifyContent: "center",
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
                  {i18n.t("noDataFound")}
                </Text>
              )}
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  profit: {
    color: "#58eb34",
  },
  loss: {
    color: "#ed2139",
  },
});
