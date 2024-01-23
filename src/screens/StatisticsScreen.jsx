import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { generateYearList, months } from "../utils/utils";
import { ExpenseContext } from "../context/ExpenseContext";
import SelectDropdown from "react-native-select-dropdown";
import { PieChart } from "react-native-chart-kit";
import InfoCardComponent from "../components/InfoCardComponent";
import { Icon } from "@rneui/themed";

export default function StatisticsScreen() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [type, setType] = useState(1);
  const { getStatistics, getStatisticsByCategory } = useContext(ExpenseContext);
  const [statistics, setStatistics] = useState(null);
  const [categoryStatistics, setCategoryStatistics] = useState(null);

  useEffect(() => {
    getStatistics(year).then((result) => {
      setStatistics(result);
    });

    getStatisticsByCategory(year, month, type).then((result) => {
      setCategoryStatistics(result);
    });
  }, [year, month, type]);

  return (
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
        <SelectDropdown
          data={generateYearList(2022)}
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
      </View>
      {statistics ? (
        <View
          style={{
            rowGap: 20,
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
                height: "17%",
              }}
            >
              <InfoCardComponent
                title={"Total annual balance"}
                content={statistics[0].total}
                width={"32%"}
              />
              <InfoCardComponent
                title={"Total annual income"}
                content={statistics[0].totalIncome}
                width={"32%"}
                icon="arrow-up"
                iconColor="green"
              />
              <InfoCardComponent
                title={"Total annual loss"}
                content={statistics[0].totalLoss}
                width={"32%"}
                icon="arrow-down"
                iconColor="red"
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
              Month statistics
            </Text>
            <FlatList
              style={{ height: "80%", width: "100%" }}
              data={statistics.length > 0 ? statistics[0].months : []}
              keyExtractor={(item) => item.month}
              renderItem={({ item }) => (
                <View
                  style={{
                    width: "100%",
                    backgroundColor: "#1c1917",
                    elevation: 5,
                    borderRadius: 5,
                    padding: 20,
                    rowGap: 15,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 15,
                      fontFamily: "Poppins_300Light",
                      justifyContent: "flex-start",
                    }}
                  >
                    {months[item.month - 1]}
                  </Text>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 12,
                      fontFamily: "Poppins_300Light",
                      paddingHorizontal: 10,
                    }}
                  >
                    Total balance: ${item.total}
                  </Text>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      width: "100%",
                      paddingHorizontal: 10,
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 12,
                        fontFamily: "Poppins_300Light",
                        paddingRight: 5,
                      }}
                    >
                      Total Income:
                    </Text>
                    <Icon
                      name="arrow-up"
                      color="green"
                      type="font-awesome-5"
                      iconStyle={{ fontSize: 12, paddingHorizontal: 5 }}
                    />
                    <Text
                      style={{
                        color: "white",
                        fontSize: 12,
                        fontFamily: "Poppins_300Light",
                        color: "green",
                      }}
                    >
                      ${item.totalIncome}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      width: "100%",
                      paddingHorizontal: 10,
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 12,
                        fontFamily: "Poppins_300Light",
                        paddingRight: 5,
                      }}
                    >
                      Total loss:
                    </Text>
                    <Icon
                      name="arrow-down"
                      color="red"
                      type="font-awesome-5"
                      iconStyle={{ fontSize: 12, paddingHorizontal: 5 }}
                    />
                    <Text
                      style={{
                        color: "white",
                        fontSize: 12,
                        fontFamily: "Poppins_300Light",
                        color: "red",
                      }}
                    >
                      ${item.totalLoss}
                    </Text>
                  </View>
                </View>
              )}
              ListEmptyComponent={() => (
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
              ItemSeparatorComponent={() => (
                <View style={{ height: 20, width: "100%" }}></View>
              )}
            />
          </View>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0c0a09",
    color: "fff",
    paddingVertical: 60,
    rowGap: 20,
    alignItems: "center",
    position: "relative",
    paddingHorizontal: 20,
  },
});
