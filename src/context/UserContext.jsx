import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const UserContext = createContext();

export function UserContextProvider(props) {
  const [loading, setLoading] = useState(true);

  function initLoading() {
    setLoading((prev) => true);
  }

  function endLoading() {
    setLoading((prev) => false);
  }

  async function verifyCode(data) {
    await axios.post(
      "https://expense-record-production.up.railway.app/api/auth/verify",
      data
    );
  }

  async function resetPassword(data) {
    await axios.post(
      "https://expense-record-production.up.railway.app/api/auth/resetPassword",
      data
    );
    await AsyncStorage.removeItem("email");
  }

  async function register(data) {
    const response = await axios.post(
      "https://expense-record-production.up.railway.app/api/auth",
      data
    );
    await AsyncStorage.setItem("token", response.data.resource.token);
    await AsyncStorage.setItem(
      "user",
      JSON.stringify(response.data.resource.user)
    );
  }

  async function login(data) {
    const response = await axios.post(
      "https://expense-record-production.up.railway.app/api/auth/login",
      data
    );
    await AsyncStorage.setItem("token", response.data.resource.token);
    await AsyncStorage.setItem(
      "user",
      JSON.stringify(response.data.resource.user)
    );
  }

  async function forgotPassword(data) {
    await axios.post(
      "https://expense-record-production.up.railway.app/api/auth/forgotPassword",
      data
    );
    await AsyncStorage.setItem("email", data.email);
  }

  async function getCurrentUser() {
    const result = await axios.get(
      "https://expense-record-production.up.railway.app/api/users",
      {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
        },
      }
    );

    return result.data.resource;
  }

  async function updateCurrentUser(info) {
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
  }

  async function deleteCurrentUser() {
    const result = await axios.delete(
      `https://expense-record-production.up.railway.app/api/users`,
      {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
        },
      }
    );

    return result.data.message;
  }
  return (
    <UserContext.Provider
      value={{
        deleteCurrentUser,
        updateCurrentUser,
        getCurrentUser,
        forgotPassword,
        login,
        register,
        resetPassword,
        verifyCode,
        loading,
        initLoading,
        endLoading,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
