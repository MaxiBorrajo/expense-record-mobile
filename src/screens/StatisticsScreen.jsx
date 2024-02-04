import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { generateYearList, months, getRandomHexColor } from "../utils/utils";
import { ExpenseContext } from "../context/ExpenseContext";
import SelectDropdown from "react-native-select-dropdown";
import { PieChart } from "react-native-chart-kit";
import InfoCardComponent from "../components/InfoCardComponent";
import MonthsCarouselComponent from "../components/MonthsCarouselComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function StatisticsScreen() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [type, setType] = useState(1);
  const { getStatistics, getStatisticsByCategory } = useContext(ExpenseContext);
  const [statistics, setStatistics] = useState(null);
  const [categoryStatistics, setCategoryStatistics] = useState(null);
  const [firstYear, setFirstYear] = useState(null);

  function getTotal(amounts) {
    let total = 0;
    amounts.forEach((amount) => (total += amount));
    return total;
  }

  useEffect(() => {
    AsyncStorage.getItem("user").then((result) => {
      const createdAt = JSON.parse(result).createdAt;
      setFirstYear(new Date(createdAt).getFullYear());
    });

    getStatistics(year).then((result) => {
      setStatistics(result);
    });

    getStatisticsByCategory(year, month, type).then((result) => {
      setCategoryStatistics(
        result.map((category) => {
          return {
            name: category.categoryInfo[0]
              ? category.categoryInfo[0].category_name
              : "Without category",
            total: category.total,
            color: getRandomHexColor(),
            legendFontColor: "white",
            legendFontSize: 15,
          };
        })
      );
    });
  }, [year, month, type]);

  const chartConfig = {
    backgroundColor: "#26872a",
    backgroundGradientFrom: "#43a047",
    backgroundGradientTo: "#66bb6a",
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

  return (
    <FlatList
      contentContainerStyle={[
        { backgroundColor: "black" },
        !statistics ? { flex: 1 } : null,
      ]}
      ListHeaderComponent={
        <View style={styles.container}>
          <Text
            style={{
              color: "white",
              fontSize: 20,
              fontFamily: "Poppins_500Medium",
              alignSelf: "flex-start",
            }}
          >
            Your statistics
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              paddingTop: 10,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontFamily: "Poppins_300Light",
              }}
            >
              Annual statistics
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
                defaultButtonText="Year"
                defaultValue={year}
                buttonStyle={{
                  borderRadius: 5,
                  width: 80,
                  height: 40,
                  alignSelf: "flex-start",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                buttonTextStyle={{ fontFamily: "Poppins_300Light" }}
                rowTextStyle={{ fontFamily: "Poppins_300Light" }}
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
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <InfoCardComponent
                    title={"Total annual balance"}
                    content={statistics[0].total.toFixed(2)}
                    width={"32%"}
                    height={150}
                  />
                  <InfoCardComponent
                    title={"Total annual income"}
                    content={statistics[0].totalIncome.toFixed(2)}
                    width={"32%"}
                    icon="arrow-up"
                    iconColor="#58eb34"
                    height={150}
                  />
                  <InfoCardComponent
                    title={"Total annual loss"}
                    content={statistics[0].totalLoss.toFixed(2)}
                    width={"32%"}
                    icon="arrow-down"
                    iconColor="red"
                    height={150}
                  />
                </View>
              ) : (
                <Text
                  style={{
                    color: "white",
                    fontSize: 25,
                    fontFamily: "Poppins_700Bold",
                    textAlign: "center",
                    padding: 20,
                    width: "100%",
                  }}
                >
                  No data found
                </Text>
              )}
              <View
                style={{
                  rowGap: 20,
                  width: "100%",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 16,
                    fontFamily: "Poppins_300Light",
                  }}
                >
                  Months statistics
                </Text>
                {statistics.length > 0 ? (
                  <MonthsCarouselComponent
                    months={months}
                    monthsInfo={
                      statistics.length > 0
                        ? statistics[0].months.sort((a, b) => a.month - b.month)
                        : []
                    }
                  />
                ) : (
                  <Text
                    style={{
                      color: "white",
                      fontSize: 25,
                      fontFamily: "Poppins_700Bold",
                      textAlign: "center",
                      padding: 20,
                      width: "100%",
                    }}
                  >
                    No data found
                  </Text>
                )}
              </View>
              <View
                style={{
                  width: "100%",
                  rowGap: 30,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 16,
                    fontFamily: "Poppins_300Light",
                  }}
                >
                  Category statistics
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
                      return selectedItem;
                    }}
                    rowTextForSelection={(item) => {
                      return item;
                    }}
                    defaultButtonText="Month"
                    defaultValue={
                      month != null && month != undefined
                        ? months[month]
                        : "None"
                    }
                    buttonStyle={{
                      borderRadius: 5,
                      width: 120,
                      height: 40,
                      alignSelf: "flex-start",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    buttonTextStyle={{ fontFamily: "Poppins_300Light" }}
                    rowTextStyle={{ fontFamily: "Poppins_300Light" }}
                  />
                  <SelectDropdown
                    data={["Loss", "Income"]}
                    onSelect={(selectedItem, index) => {
                      setType(index);
                    }}
                    buttonTextAfterSelection={(selectedItem) => {
                      return selectedItem;
                    }}
                    rowTextForSelection={(item) => {
                      return item;
                    }}
                    defaultButtonText="Type"
                    defaultValue={"Income"}
                    buttonStyle={{
                      borderRadius: 5,
                      width: 120,
                      height: 40,
                      alignSelf: "flex-start",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    buttonTextStyle={{ fontFamily: "Poppins_300Light" }}
                    rowTextStyle={{ fontFamily: "Poppins_300Light" }}
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
                            color: "white",
                            fontSize: 12,
                            fontFamily: "Poppins_300Light",
                          }}
                        >
                          {item.name} (${item.total.toFixed(2)})
                        </Text>
                      </View>
                      <Text
                        style={{
                          color: "white",
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
                color: "white",
                fontSize: 25,
                fontFamily: "Poppins_700Bold",
                textAlign: "center",
                width: "100%",
                paddingTop: 40,
              }}
            >
              No data found
            </Text>
          )}
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    height: "auto",
    backgroundColor: "#0c0a09",
    color: "fff",
    paddingTop: 60,
    paddingBottom: 100,
    rowGap: 20,
    alignItems: "center",
    position: "relative",
    paddingHorizontal: 20,
    overflow: "scroll",
  },
});
