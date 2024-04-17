import {
  Text,
  View,
  Dimensions,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { generateYearList, months } from "../utils/utils";
import { ExpenseContext } from "../context/ExpenseContext";
import { UserContext } from "../context/UserContext";
import SelectDropdown from "react-native-select-dropdown";
import { useTheme } from "@react-navigation/native";
import BalanceComponent from "../components/BalanceComponent";
import LoadingScreen from "./LoadingScreen";
import i18n from "../utils/i18n";

export default function ExpensesStatisticsScreen() {
  const [loading, setLoading] = useState(true);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const { getStatistics, statistics, monthStatistic } =
    useContext(ExpenseContext);
  const { user } = useContext(UserContext);
  const [firstYear, setFirstYear] = useState(
    new Date(user.createdAt).getFullYear()
  );
  const { colors } = useTheme();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await getStatistics(year, month);
    setRefreshing(false);
  };

  useEffect(() => {
    getStatistics(year, month).then(() => {
      setLoading((prev) => false);
    });
  }, [year, month]);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
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
              paddingTop: 120,
              alignItems: "center",
              position: "relative",
              paddingHorizontal: 20,
              minHeight: Dimensions.get("window").height,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                paddingBottom: 25,
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
                  <BalanceComponent
                    balance={statistics[0].total}
                    income={statistics[0].totalIncome}
                    loss={statistics[0].totalLoss}
                    loading={!statistics}
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
                    {i18n.t("dataNotFound")}
                  </Text>
                )}

                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                      paddingBottom: 25,
                    }}
                  >
                    <Text
                      style={{
                        color: colors.text,
                        fontSize: 16,
                        fontFamily: "Poppins_300Light",
                      }}
                    >
                      {i18n.t("monthStatistics")}
                    </Text>
                    <SelectDropdown
                      data={months}
                      onSelect={(selectedItem, index) => {
                        setMonth(index);
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
                  </View>
                  <BalanceComponent
                    balance={
                      monthStatistic && monthStatistic.total
                        ? monthStatistic.total
                        : 0
                    }
                    income={
                      monthStatistic && monthStatistic.totalIncome
                        ? monthStatistic.totalIncome
                        : 0
                    }
                    loss={
                      monthStatistic && monthStatistic.totalLoss
                        ? monthStatistic.totalLoss
                        : 0
                    }
                    loading={!monthStatistic}
                  />
                </View>
              </View>
            ) : null}
          </View>
        </ScrollView>
      )}
    </>
  );
}
