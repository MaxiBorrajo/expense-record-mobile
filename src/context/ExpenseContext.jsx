import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
export const ExpenseContext = createContext();

export function ExpenseContextProvider(props) {
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

    return result.data.resource;
  }

  async function getAmount(month, type) {
    let url =
      `${process.env.EXPO_PUBLIC_URL_BACKEND}/expenses/amount?`;

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

    return result.data.resource;
  }

  async function getStatistics(year = new Date().getFullYear()) {
    let url = `${process.env.EXPO_PUBLIC_URL_BACKEND}/expenses/statistics?`;

    if (year) {
      url = url + `year=${year}`;
    }

    const result = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      },
    });

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
      `${process.env.EXPO_PUBLIC_URL_BACKEND}/api/expenses`,
      expense,
      {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
        },
      }
    );

    return result.data.resource;
  }

  async function updateExpenseById(id, expense) {
    const result = await axios.put(
      `${process.env.EXPO_PUBLIC_URL_BACKEND}/expenses/${id}`,
      expense,
      {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
        },
      }
    );

    return result.data.resource;
  }

  async function deleteExpenseById(id) {
    const result = await axios.delete(
      `${process.env.EXPO_PUBLIC_URL_BACKEND}/expenses/${id}`,
      {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
        },
      }
    );

    return result.data.message;
  }

  async function applyConversion(conversion) {
    const result = await axios.put(
      `${process.env.EXPO_PUBLIC_URL_BACKEND}/expenses/conversion`,
      conversion,
      {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
        },
      }
    );

    return result.data.message;
  }

  return (
    <ExpenseContext.Provider
      value={{
        applyConversion,
        createExpense,
        deleteExpenseById,
        getExpenseById,
        getExpenses,
        getAmount,
        getStatistics,
        getStatisticsByCategory,
        updateExpenseById,
        getBalance,
      }}
    >
      {props.children}
    </ExpenseContext.Provider>
  );
}
