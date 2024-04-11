import { createContext, useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import i18n from "../utils/i18n";
import { getRandomHexColor } from "../utils/utils";
import { UserContext } from "./UserContext";
import { SavingGoalContext } from "./SavingGoalContext";
export const ExpenseContext = createContext();
export function ExpenseContextProvider(props) {
  const [lastExpenses, setLastExpenses] = useState(null);
  const [expenses, setExpenses] = useState(null);
  const [balance, setBalance] = useState(null);
  const [monthIncomeBalance, setMonthIncomeBalance] = useState(null);
  const [monthLossBalance, setMonthLossBalance] = useState(null);
  const [monthExpenses, setMonthExpenses] = useState(null);
  const [remainingBalance, setRemainingBalance] = useState(0);
  const [budgetStatistics, setBudgetStatistics] = useState(null);
  const [categoryStatistics, setCategoryStatistics] = useState(null);
  const [statistics, setStatistics] = useState(null);
  const [monthStatistic, setMonthStatistic] = useState([]);
  const { budget } = useContext(UserContext);
  const { getSavingGoal } = useContext(SavingGoalContext);

  const reloadInformation = async () => {
    getLastExpenses();
    getMonthLoss();
    getMonthIncome();
    getBalance();
    getExpenses(null, null, [
      {
        filter: "month",
        value: new Date().getMonth(),
      },
      {
        filter: "year",
        value: new Date().getFullYear(),
      },
    ]);
    getMonthExpenses();
    getStatistics();
    getStatisticsByCategory();
    getSavingGoal();
  };

  const getMonthLoss = async () => {
    const result = await getAmount(new Date().getMonth(), 0);
    setMonthLossBalance(() => result);
  };

  const getMonthIncome = async () => {
    const result = await getAmount(new Date().getMonth(), 1);
    setMonthIncomeBalance(() => result);
  };

  const getLastExpenses = async () => {
    const result = await axios.get(
      `${process.env.EXPO_PUBLIC_URL_BACKEND}/expenses/recent`,
      {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
        },
      }
    );

    setLastExpenses((prev) => [...result.data.resource]);

    return result.data.resource;
  };

  function applySorting(sort, order, url) {
    if (sort && sort.value && order && order.value) {
      url = url + `sort=${sort.value}&order=${order.value}&`;
    }

    return url;
  }

  function applyFiltering(filters, url) {
    if (filters && filters.length > 0) {
      filters.forEach((filter) => {
        if (filter.value != undefined || filter.value != null) {
          url = url + `${filter.filter}=${filter.value}&`;
        }
      });
    }

    return url;
  }

  async function getExpenses(sort, order, filters) {
    let url = `${process.env.EXPO_PUBLIC_URL_BACKEND}/expenses?`;

    url = applySorting(sort, order, url);

    url = applyFiltering(filters, url);

    url = url.slice(0, -1);

    const result = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      },
    });

    setExpenses((prev) => [...result.data.resource]);

    return result.data.resource;
  }

  async function getAmount(month, type) {
    let url = `${process.env.EXPO_PUBLIC_URL_BACKEND}/expenses/amount?`;

    if (month !== undefined && month !== null) {
      url = url + `month=${month}&`;
    }

    if (type !== undefined && type !== null) {
      url = url + `type=${type}&`;
    }

    url = url.slice(0, -1);

    const result = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      },
    });

    return result.data.resource;
  }

  async function getBalance() {
    const result = await axios.get(
      `${process.env.EXPO_PUBLIC_URL_BACKEND}/expenses/balance`,
      {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
        },
      }
    );

    setBalance(() => result.data.resource);

    return result.data.resource;
  }

  async function getMonthExpenses() {
    const result = await axios.get(
      `${process.env.EXPO_PUBLIC_URL_BACKEND}/expenses/monthExpenses`,
      {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
        },
      }
    );

    setMonthExpenses((prev) => result.data.resource * -1);
    setRemainingBalance((prev) => budget + result);
    setBudgetStatistics([
      {
        name: i18n.t("monthExpenses"),
        total: result.data.resource * -1,
        color: getRandomHexColor(),
        legendFontSize: 15,
      },
      {
        name: i18n.t("remainingBalance"),
        total: budget + result.data.resource,
        color: getRandomHexColor(),
        legendFontSize: 15,
      },
    ]);

    return result.data.resource;
  }

  async function getStatistics(
    year = new Date().getFullYear(),
    month = new Date().getMonth()
  ) {
    let url = `${process.env.EXPO_PUBLIC_URL_BACKEND}/expenses/statistics?`;

    if (year) {
      url = url + `year=${year}`;
    }

    const result = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      },
    });

    setStatistics((prev) => result.data.resource);

    const monthData = result.data.resource[0].months.find(
      (monthStatistic) => monthStatistic.month === month + 1
    );

    setMonthStatistic((prev) => monthData);

    return result.data.resource;
  }

  async function getStatisticsByCategory(
    year = new Date().getFullYear(),
    month = new Date().getMonth(),
    type = 1
  ) {
    let url = `${process.env.EXPO_PUBLIC_URL_BACKEND}/expenses/statisticsByCategory?`;

    if (year) {
      url = url + `year=${year}&`;
    }

    if (month) {
      url = url + `month=${month}&`;
    }

    if (type) {
      url = url + `type=${type}&`;
    }

    url = url.slice(0, -1);

    const result = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      },
    });

    setCategoryStatistics(
      result.data.resource.map((category) => {
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

    return result.data.resource;
  }

  async function getExpenseById(id) {
    const result = await axios.get(
      `${process.env.EXPO_PUBLIC_URL_BACKEND}/expenses/${id}`,
      {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
        },
      }
    );

    return result.data.resource;
  }

  async function createExpense(expense) {
    const result = await axios.post(
      `${process.env.EXPO_PUBLIC_URL_BACKEND}/expenses`,
      expense,
      {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
          NotificationToken: `${await AsyncStorage.getItem(
            "notificationToken"
          )}`,
        },
      }
    );
    reloadInformation();
    return result.data.resource;
  }

  async function updateExpenseById(id, expense) {
    const result = await axios.put(
      `${process.env.EXPO_PUBLIC_URL_BACKEND}/expenses/${id}`,
      expense,
      {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
          NotificationToken: `${await AsyncStorage.getItem(
            "notificationToken"
          )}`,
        },
      }
    );
    reloadInformation();
    return result.data.resource;
  }

  async function deleteExpenseById(id) {
    const result = await axios.delete(
      `${process.env.EXPO_PUBLIC_URL_BACKEND}/expenses/${id}`,
      {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
          NotificationToken: `${await AsyncStorage.getItem(
            "notificationToken"
          )}`,
        },
      }
    );
    reloadInformation();
    return result.data.message;
  }

  return (
    <ExpenseContext.Provider
      value={{
        createExpense,
        deleteExpenseById,
        getExpenseById,
        getExpenses,
        getAmount,
        getStatistics,
        getStatisticsByCategory,
        updateExpenseById,
        getBalance,
        getMonthExpenses,
        getLastExpenses,
        lastExpenses,
        balance,
        getMonthIncome,
        monthIncomeBalance,
        getMonthLoss,
        monthLossBalance,
        monthExpenses,
        remainingBalance,
        budgetStatistics,
        categoryStatistics,
        expenses,
        statistics,
        monthStatistic,
      }}
    >
      {props.children}
    </ExpenseContext.Provider>
  );
}
