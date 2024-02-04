import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const UserContext = createContext();

export function UserContextProvider(props) {
  const [errorMessage, setErrorMessage] = useState(null);

  async function getCurrentUser() {
    try {
      const result = await axios.get("https://expense-record-production.up.railway.app/api/users", {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
        },
      });

      return result.data.resource;

      return result.data.resource;
    } catch (error) {
      if (error.response.data) {
        setErrorMessage(error.response.data.Error);
      } else {
        setErrorMessage(error.message);
      }
    }
  }

  async function updateCurrentUser(info) {
    try {
      const result = await axios.put(
        `https://expense-record-production.up.railway.app/api/users`,
        info,
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

  async function deleteCurrentUser() {
    try {
      const result = await axios.delete(`https://expense-record-production.up.railway.app/api/users`, {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
        },
      });

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
    <UserContext.Provider
      value={{
        errorMessage,
        deleteCurrentUser,
        updateCurrentUser,
        getCurrentUser
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
