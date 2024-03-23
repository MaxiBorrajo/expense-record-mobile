import { createContext, useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import i18n from "../utils/i18n";
import { ExpenseContext } from "../context/ExpenseContext";

export const UserContext = createContext();

export function UserContextProvider(props) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [hideBalance, setHideBalance] = useState(false);
  const [language, setLanguage] = useState(null);
  const [currency, setCurrency] = useState(null);
  const [reload, setReload] = useState(false);
  const { applyConversion } = useContext(ExpenseContext);

  const getUserGoogle = async (token) => {
    if(!token) return;
    const result = await axios.get(`https://www.googleapis.com/userinfo/v2/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(result.data)
  }

  const updateCurrency = async (newCurrency) => {
    if (currency && newCurrency) {
      await updateCurrentUser({
        currency: newCurrency,
      });
      await applyConversion({
        old_currency: currency,
        new_currency: newCurrency,
      });

      setReload(true);
      setCurrency(newCurrency);
    }
  };

  const getLanguage = () => {
    AsyncStorage.getItem("language").then((value) => {
      i18n.locale = value ? value : i18n.locale;
      setLanguage(value ? value : i18n.locale);
    });
  };

  const setActualUser = async () => {
    const user = await getCurrentUser();
    setUser((prev) => user);
    setCurrency(user.currency);
  };

  const handleHideBalance = async (value) => {
    setHideBalance(value);
    await AsyncStorage.setItem("hideBalance", `${value}`);
    setReload(true);
  };

  const translate = async (newLanguage) => {
    i18n.locale = newLanguage;
    setLanguage(newLanguage);
    await AsyncStorage.setItem("language", newLanguage);
    setReload(true);
  };

  const loadConfiguration = async () => {
    await setActualUser();
    getLanguage();
    getHideBalance();
  };

  const getHideBalance = () => {
    AsyncStorage.getItem("hideBalance").then((value) => {
      setHideBalance(value === "true" ? true : false);
    });
  };

  function initLoading() {
    setLoading((prev) => true);
  }

  function endLoading() {
    setLoading((prev) => false);
  }

  async function verifyCode(data) {
    await axios.post(`${process.env.EXPO_PUBLIC_URL_BACKEND}/auth/verify`, data);
  }

  async function resetPassword(data) {
    await axios.post(`${process.env.EXPO_PUBLIC_URL_BACKEND}/auth/resetPassword`, data);
    await AsyncStorage.removeItem("email");
  }

  async function register(data) {
    const response = await axios.post(`${process.env.EXPO_PUBLIC_URL_BACKEND}/auth`, data);
    await AsyncStorage.setItem("token", response.data.resource.token);
    await AsyncStorage.setItem(
      "user",
      JSON.stringify(response.data.resource.user)
    );
  }

  async function login(data) {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_URL_BACKEND}/auth/login`,
      data
    );
    await AsyncStorage.setItem("token", response.data.resource.token);
    await AsyncStorage.setItem(
      "user",
      JSON.stringify(response.data.resource.user)
    );
  }

  async function forgotPassword(data) {
    await axios.post(`${process.env.EXPO_PUBLIC_URL_BACKEND}/auth/forgotPassword`, data);
    await AsyncStorage.setItem("email", data.email);
  }

  async function getCurrentUser() {
    const result = await axios.get(`${process.env.process.env.EXPO_PUBLIC_URL_BACKEND}/users`, {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      },
    });

    return result.data.resource;
  }

  async function updateCurrentUser(info) {
    const result = await axios.put(`${process.env.EXPO_PUBLIC_URL_BACKEND}/users`, info, {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      },
    });

    return result.data.resource;
  }

  async function deleteCurrentUser() {
    const result = await axios.delete(`${process.env.EXPO_PUBLIC_URL_BACKEND}/users`, {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      },
    });

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
        isDarkTheme,
        getHideBalance,
        setHideBalance,
        hideBalance,
        loadConfiguration,
        translate,
        handleHideBalance,
        updateCurrency,
        language,
        reload,
        setReload,
        currency,
        user,
        getUserGoogle
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
