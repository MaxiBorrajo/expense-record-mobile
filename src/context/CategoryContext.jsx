import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const CategoryContext = createContext();

export function CategoryContextProvider(props) {
  const [errorMessage, setErrorMessage] = useState(null);

  async function getCategories(keyword) {
    try {
      let url = "http://192.168.0.159:3000/api/categories?";

      url = keyword ? url + `&keyword=${keyword}` : url;

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

  async function getIcons() {
    try {
      let url = "http://192.168.0.159:3000/api/icons?";

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

  async function getCategoryById(id) {
    try {
      const result = await axios.get(
        `http://192.168.0.159:3000/api/categories/${id}`,
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

  async function createCategory(category) {
    try {
      const result = await axios.post(
        `http://192.168.0.159:3000/api/categories`,
        category,
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

  async function updateCategoryById(id, category) {
    try {
      const result = await axios.put(
        `http://192.168.0.159:3000/api/categories/${id}`,
        category,
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

  async function deleteCategoryById(id) {
    try {
      const result = await axios.delete(
        `http://192.168.0.159:3000/api/categories/${id}`,
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
    <CategoryContext.Provider
      value={{
        createCategory,
        errorMessage,
        getCategories,
        getCategoryById,
        deleteCategoryById,
        updateCategoryById,
        getIcons
      }}
    >
      {props.children}
    </CategoryContext.Provider>
  );
}
