import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const ExpenseContext = createContext();

export function ExpenseContextProvider(props) {
  const [errorMessage, setErrorMessage] = useState(null);

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
    try {
      let url = "http://192.168.0.159:3000/api/expenses?";

      url = applySorting(sort, order, url);

      url = applyFiltering(filters, url);

      url = url.slice(0, -1);

      const result = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
        },
      });

      return result.data.resource;
    } catch (error) {
      if (error.response.data) {
        setErrorMessage(error.response.data.Error);
      } else {
        setErrorMessage(error.message);
      }
    }
  }

  async function getAmount(year, month) {
    try {
      let url = "http://192.168.0.159:3000/api/expenses/amount";

      if (
        year !== undefined &&
        month !== undefined &&
        year !== null &&
        month !== null
      ) {
        url = url + `?year=${year}&month=${month}`;
      }

      const result = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
        },
      });

      return result.data.resource;
    } catch (error) {
      if (error.response.data) {
        setErrorMessage(error.response.data.Error);
      } else {
        setErrorMessage(error.message);
      }
    }
  }

  async function getCurrentAmount() {
    try {
      const result = await axios.get(
        "http://192.168.0.159:3000/api/expenses/current",
        {
          headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
          },
        }
      );

      return result.data.resource;
    } catch (error) {
      if (error.response.data) {
        setErrorMessage(error.response.data.Error);
      } else {
        setErrorMessage(error.message);
      }
    }
  }

  async function getStatistics(
    year = new Date().getFullYear(),
    month = new Date().getMonth()
  ) {
    try {
      const result = await axios.get(
        `http://192.168.0.159:3000/api/expenses/statistics?year=${year}&month=${month}`,
        {
          headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
          },
        }
      );

      return result.data.resource;
    } catch (error) {
      if (error.response.data) {
        setErrorMessage(error.response.data.Error);
      } else {
        setErrorMessage(error.message);
      }
    }
  }

  async function getProfitPercentage(
    year = new Date().getFullYear(),
    month = new Date().getMonth()
  ) {
    try {
      const result = await axios.get(
        `http://192.168.0.159:3000/api/expenses/profitPercentage?year=${year}&month=${month}`,
        {
          headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
          },
        }
      );

      return result.data.resource;
    } catch (error) {
      if (error.response.data) {
        setErrorMessage(error.response.data.Error);
      } else {
        setErrorMessage(error.message);
      }
    }
  }

  async function getExpenseById(id) {
    try {
      const result = await axios.get(
        `http://192.168.0.159:3000/api/expenses/${id}`,
        {
          headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
          },
        }
      );

      return result.data.resource;
    } catch (error) {
      if (error.response.data) {
        setErrorMessage(error.response.data.Error);
      } else {
        setErrorMessage(error.message);
      }
    }
  }

  async function getIcons(keyword) {
    try {
      let url = "http://192.168.0.159:3000/api/icons";

      if(keyword){
        url = url + `?keyword=${keyword}`;
      }

      const result = await axios.get(url);

      return result.data.resource;
    } catch (error) {
      if (error.response.data) {
        setErrorMessage(error.response.data.Error);
      } else {
        setErrorMessage(error.message);
      }
    }
  }

  async function createExpense(expense) {
    try {
      const result = await axios.post(
        `http://192.168.0.159:3000/api/expenses`,
        expense,
        {
          headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
          },
        }
      );

      return result.data.resource;
    } catch (error) {
      if (error.response.data) {
        setErrorMessage(error.response.data.Error);
      } else {
        setErrorMessage(error.message);
      }
    }
  }

  async function updateExpenseById(id, expense) {
    try {
      const result = await axios.put(
        `http://192.168.0.159:3000/api/expenses/${id}`,
        expense,
        {
          headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
          },
        }
      );

      return result.data.resource;
    } catch (error) {
      if (error.response.data) {
        setErrorMessage(error.response.data.Error);
      } else {
        setErrorMessage(error.message);
      }
    }
  }

  async function deleteExpenseById(id) {
    try {
      const result = await axios.delete(
        `http://192.168.0.159:3000/api/expenses/${id}`,
        {
          headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
          },
        }
      );

      return result.data.message;
    } catch (error) {
      if (error.response.data) {
        setErrorMessage(error.response.data.Error);
      } else {
        setErrorMessage(error.message);
      }
    }
  }

  async function applyConversion(conversion) {
    try {
      const result = await axios.post(
        `http://192.168.0.159:3000/api/expenses/conversion`,
        conversion,
        {
          headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
          },
        }
      );

      return result.data.message;
    } catch (error) {
      if (error.response.data) {
        setErrorMessage(error.response.data.Error);
      } else {
        setErrorMessage(error.message);
      }
    }
  }

  return (
    <ExpenseContext.Provider
      value={{
        getIcons,
        applyConversion,
        createExpense,
        deleteExpenseById,
        getExpenseById,
        getExpenses,
        getAmount,
        getProfitPercentage,
        getStatistics,
        updateExpenseById,
        errorMessage,
        setErrorMessage,
        getCurrentAmount
      }}
    >
      {props.children}
    </ExpenseContext.Provider>
  );
}
