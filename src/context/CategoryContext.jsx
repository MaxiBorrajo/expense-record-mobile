import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const CategoryContext = createContext();

export function CategoryContextProvider(props) {
  
  async function getCategories(keyword) {
    let url =
      "https://expense-record-production.up.railway.app/api/categories?";

    url = keyword ? url + `&keyword=${keyword}` : url;

    const result = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      },
    });

    return result.data.resource;
  }

  async function getIcons() {
    let url = "https://expense-record-production.up.railway.app/api/icons?";

    const result = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      },
    });

    return result.data.resource;
  }

  async function getCategoryById(id) {
    const result = await axios.get(
      `https://expense-record-production.up.railway.app/api/categories/${id}`,
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
      `https://expense-record-production.up.railway.app/api/categories`,
      category,
      {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
        },
      }
    );

    return result.data.resource;
  }

  async function updateCategoryById(id, category) {
    const result = await axios.put(
      `https://expense-record-production.up.railway.app/api/categories/${id}`,
      category,
      {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
        },
      }
    );

    return result.data.resource;
  }

  async function deleteCategoryById(id) {
    const result = await axios.delete(
      `https://expense-record-production.up.railway.app/api/categories/${id}`,
      {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
        },
      }
    );

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
      }}
    >
      {props.children}
    </CategoryContext.Provider>
  );
}
