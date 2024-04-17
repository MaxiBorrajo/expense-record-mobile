import { Text, View, Dimensions, ScrollView, FlatList } from "react-native";
import React, { useContext, useEffect } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import { UserContext } from "../context/UserContext";
import { PieChart } from "react-native-chart-kit";
import { useTheme } from "@react-navigation/native";
import LoadingScreen from "./LoadingScreen";
import i18n from "../utils/i18n";
import { Badge, Icon } from "@rneui/themed";
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";

export default function BudgetStatisticsScreen() {
  const {
    getMonthExpenses,
    monthExpenses,
    remainingBalance,
    budgetStatistics,
  } = useContext(ExpenseContext);
  const { setActualUser, budget, user } = useContext(UserContext);
  const { colors } = useTheme();
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
    setActualUser();
    getMonthExpenses();
  }, []);

  return (
    <ScrollView>
      {monthExpenses === null || monthExpenses === undefined ? (
        <LoadingScreen />
      ) : !budget ? (
        <View
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            padding: 20,
            textAlign: "center",
          }}
        >
          <Text
            style={{
              color: colors.text,
              fontSize: 16,
              fontFamily: "Poppins_300Light",
            }}
          >
            {i18n.t("noBudget")}
          </Text>
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: colors.background,
            color: colors.text,
            position: "relative",
            paddingHorizontal: 20,
            minHeight: Dimensions.get("window").height,
            rowGap: 10,
            paddingTop: 120,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                color: colors.text,
                fontSize: 16,
                fontFamily: "Poppins_300Light",
                paddingBottom: 0,
              }}
            >
              {i18n.t("budgetStatistics")}
            </Text>
            {monthExpenses > budget ? (
              <Badge
                textStyle={{ fontFamily: "Poppins_300Light" }}
                containerStyle={{ marginTop: 2 }}
                status="error"
                value={i18n.t("overbudget")}
                badgeStyle={{ borderWidth: 0 }}
              />
            ) : (monthExpenses / budget) * 100 > user.budgetWarning &&
              monthExpenses <= budget ? (
              <Badge
                textStyle={{ fontFamily: "Poppins_300Light" }}
                containerStyle={{ marginTop: 2 }}
                status="warning"
                value={i18n.t("almostOverbudget")}
                badgeStyle={{ borderWidth: 0 }}
              />
            ) : (
              <Badge
                textStyle={{ fontFamily: "Poppins_300Light" }}
                containerStyle={{ marginTop: 2 }}
                status="success"
                value={i18n.t("withinBudget")}
                badgeStyle={{ borderWidth: 0 }}
              />
            )}
          </View>
          <Text
            style={{
              color: colors.text,
              fontSize: 13,
              fontFamily: "Poppins_300Light",
              lineHeight: 30,
            }}
          >
            {i18n.t("yourMonthlyBudget")} (${budget ? budget.toFixed(2) : 0}{" "}
            {user.currency}
            ). {i18n.t("andYouExpent")} ($-
            {monthExpenses != 0 ? monthExpenses.toFixed(2) : 0} {user.currency}
            ). {i18n.t("yourRemainingBalance")} ($
            {remainingBalance > 0 ? remainingBalance.toFixed(2) : 0}{" "}
            {user.currency})
          </Text>
          {budgetStatistics ? (
            <View
              style={{
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                rowGap: 10,
              }}
            >
              {monthExpenses <= budget ? (
                <PieChart
                  data={budgetStatistics}
                  width={Dimensions.get("screen").width}
                  height={220}
                  accessor={"total"}
                  backgroundColor={"transparent"}
                  chartConfig={chartConfig}
                  hasLegend={false}
                  center={[Dimensions.get("screen").width / 4, 0]}
                />
              ) : (
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    rowGap: 30,
                    paddingBottom: 45,
                    paddingTop: 10,
                    textAlign: "center",
                  }}
                >
                  <Icon
                    name="exclamation-triangle"
                    type="font-awesome-5"
                    iconStyle={{ fontSize: 100, color: colors.attention }}
                  />
                  <Text
                    style={{
                      color: colors.text,
                      fontSize: 20,
                      fontFamily: "Poppins_300Light",
                    }}
                  >
                    {i18n.t("runOverBudget")}
                  </Text>
                </View>
              )}
              <FlatList
                style={{
                  width: "100%",
                }}
                data={budgetStatistics}
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
                          {item.name} ($
                          {item.total < 0 ? 0 : (item.total / 1000).toFixed(2)}
                          K)
                        </Text>
                      </View>
                      <Text
                        style={{
                          color: colors.text,
                          fontSize: 12,
                          fontFamily: "Poppins_300Light",
                        }}
                      >
                        {item.total < 0
                          ? 0
                          : ((item.total / budget) * 100).toFixed(2)}
                        %
                      </Text>
                    </View>
                  </View>
                )}
                ItemSeparatorComponent={() => (
                  <View style={{ height: 10, width: "100%" }}></View>
                )}
              />
              <Text
                style={{
                  fontSize: 10,
                  fontFamily: "Poppins_300Light",
                  color: colors.text,
                  alignSelf: "flex-start",
                  paddingTop: 15,
                }}
              >
                *{i18n.t("budgetHelp")}
              </Text>
              <View
                style={{
                  paddingTop: 30,
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  rowGap: 10,
                }}
              >
                <BannerAd
                  unitId={"ca-app-pub-5123415331806704/9550893595"}
                  size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                />
                <BannerAd
                  unitId={"ca-app-pub-5123415331806704/1264042171"}
                  size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                />
              </View>
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
    </ScrollView>
  );
}
