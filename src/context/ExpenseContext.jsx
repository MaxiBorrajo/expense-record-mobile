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

  async function getAmount(month, type) {
    try {
      let url = "http://192.168.0.159:3000/api/expenses/amount?";

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
    } catch (error) {
      if (error.response.data) {
        setErrorMessage(error.response.data.Error);
      } else {
        setErrorMessage(error.message);
      }
    }
  }

  async function getBalance() {
    try {
      const result = await axios.get(
        "http://192.168.0.159:3000/api/expenses/balance",
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

  async function getStatistics(year = new Date().getFullYear()) {
    try {
      let url = `http://192.168.0.159:3000/api/expenses/statistics?`;

      if (year) {
        url = url + `year=${year}`;
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

  async function getStatisticsByCategory(
    year = new Date().getFullYear(),
    month = new Date().getMonth(),
    type = 1
  ) {
    try {
      let url = `http://192.168.0.159:3000/api/expenses/statisticsByCategory?`;

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
    } catch (error) {
      if (error.response.data) {
        setErrorMessage(error.response.data.Error);
      } else {
        setErrorMessage(error.message);
      }
    }
  }

  async function getChange() {
    try {
      const result = await axios.get(
        `http://192.168.0.159:3000/api/expenses/change`,
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
      const result = await axios.put(
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
        applyConversion,
        createExpense,
        deleteExpenseById,
        getExpenseById,
        getExpenses,
        getAmount,
        getChange,
        getStatistics,
        getStatisticsByCategory,
        updateExpenseById,
        errorMessage,
        setErrorMessage,
        getBalance,
      }}
    >
      {props.children}
    </ExpenseContext.Provider>
  );
}
