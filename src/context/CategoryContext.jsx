import { createContext, useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "../utils/axiosInterceptor";
import { ExpenseContext } from "./ExpenseContext";

export const CategoryContext = createContext();

export function CategoryContextProvider(props) {
  const [categories, setCategories] = useState(null);
  const [icons, setIcons] = useState(null);
  const { getLastExpenses, getExpenses, getStatisticsByCategory } =
    useContext(ExpenseContext);

  function reloadInformation() {
    getLastExpenses();
    getExpenses();
    getStatisticsByCategory();
    getCategories();
  }

  async function getCategories(keyword) {
    let url = `${process.env.EXPO_PUBLIC_URL_BACKEND}/categories?`;

    url = keyword ? url + `&keyword=${keyword}` : url;

    const result = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      },
    });

    setCategories(() => result.data.resource);

    return result.data.resource;
  }

  async function getIcons() {
    let url = `${process.env.EXPO_PUBLIC_URL_BACKEND}/icons?`;

    const result = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      },
    });

    setIcons(() => result.data.resource);

    return result.data.resource;
  }

  async function getCategoryById(id) {
    const result = await axios.get(
      `${process.env.EXPO_PUBLIC_URL_BACKEND}/categories/${id}`,
      {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
        },
      }
    );

    return result.data.resource;
  }

  async function createCategory(category) {
    const result = await axios.post(
      `${process.env.EXPO_PUBLIC_URL_BACKEND}/categories`,
      category,
      {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
        },
      }
    );

    reloadInformation();

    return result.data.resource;
  }

  async function updateCategoryById(id, category) {
    const result = await axios.put(
      `${process.env.EXPO_PUBLIC_URL_BACKEND}/categories/${id}`,
      category,
      {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
        },
      }
    );

    await reloadInformation();

    return result.data.resource;
  }

  async function deleteCategoryById(id) {
    const result = await axios.delete(
      `${process.env.EXPO_PUBLIC_URL_BACKEND}/categories/${id}`,
      {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
        },
      }
    );

    await reloadInformation();

    return result.data.message;
  }
  return (
    <CategoryContext.Provider
      value={{
        createCategory,
        getCategories,
        getCategoryById,
        deleteCategoryById,
        updateCategoryById,
        getIcons,
        categories,
        icons,
      }}
    >
      {props.children}
    </CategoryContext.Provider>
  );
}
