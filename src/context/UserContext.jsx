import { createContext, useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {
  Poppins_900Black,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_300Light,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { useFonts } from "expo-font";
import i18n from "../utils/i18n";
import { ExpenseContext } from "../context/ExpenseContext";

export const UserContext = createContext();

export function UserContextProvider(props) {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(null);
  const [user, setUser] = useState(null);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [hideBalance, setHideBalance] = useState(false);
  const [language, setLanguage] = useState(null);
  const [currency, setCurrency] = useState(null);
  const [reload, setReload] = useState(false);
  const { applyConversion } = useContext(ExpenseContext);

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
    AsyncStorage.getItem("language", (value) => {
      setLanguage(value ? value : i18n.locale);
    });
  };

  const getCurrency = async () => {
    setCurrency(user.currency);
  };

  const setActualUser = async () => {
    const user = await getCurrentUser();
    setUser(user);
  };

  const handleHideBalance = async (value) => {
    setHideBalance(value);
    await AsyncStorage.setItem("hideBalance", `${value}`);
    setReload(true);
  };

  const handleChangeTheme = async () => {
    setIsDarkTheme(!isDarkTheme);
    AsyncStorage.setItem("theme", !isDarkTheme ? "dark" : "light");
    setReload(true);
  };

  const translate = async (newLanguage) => {
    i18n.locale = newLanguage;
    setLanguage(newLanguage);
    await AsyncStorage.setItem("language", newLanguage);
    setReload(true);
  };

  const reloadAll = () => {
    setReload(true);
  };

  const loadConfiguration = async () => {
    loadFonts();
    await getAuth();
    await setTheme();
    await setActualUser();
    getLanguage();
    getCurrency();
    getHideBalance();
  };

  const getHideBalance = () => {
    AsyncStorage.getItem("hideBalance", (value) => {
      setHideBalance(Boolean(value));
    });
  };

  const loadFonts = () => {
    let [fontsLoaded] = useFonts({
      Poppins_900Black,
      Poppins_400Regular,
      Poppins_600SemiBold,
      Poppins_500Medium,
      Poppins_300Light,
      Poppins_700Bold,
    });

    if (!fontsLoaded) {
      return null;
    }
  };

  const getAuth = async () => {
    const authToken = await AsyncStorage.getItem("token");
    setAuth(authToken);
  };

  const setTheme = async () => {
    AsyncStorage.getItem("theme").then((theme) => {
      setIsDarkTheme(!theme || (theme && theme === "light"));
    });
  };

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
        setTheme,
        getAuth,
        isDarkTheme,
        auth,
        loadFonts,
        colors,
        getHideBalance,
        setHideBalance,
        hideBalance,
        loadConfiguration,
        reloadAll,
        translate,
        handleHideBalance,
        handleChangeTheme,
        updateCurrency,
        language,
        reload,
        currency,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
