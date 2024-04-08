import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
export const SavingGoalContext = createContext();

export function SavingGoalContextProvider(props) {
  const [savingGoal, setSavingGoal] = useState(null);

  async function getSavingGoal() {
    const result = await axios.get(
      `${process.env.EXPO_PUBLIC_URL_BACKEND}/savingGoals?`,
      {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
        },
      }
    );

    setSavingGoal(() => result.data.resource);
  }

  async function createSavingGoal(data) {
    const result = await axios.post(
      `${process.env.EXPO_PUBLIC_URL_BACKEND}/savingGoals`,
      data,
      {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
        },
      }
    );

    await getSavingGoal();

    return result.data.resource;
  }

  async function updateSavingGoal(data) {
    const result = await axios.put(
      `${process.env.EXPO_PUBLIC_URL_BACKEND}/savingGoals`,
      data,
      {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
        },
      }
    );

    await getSavingGoal();

    return result.data.resource;
  }

  async function deleteSavingGoal() {
    const result = await axios.delete(
      `${process.env.EXPO_PUBLIC_URL_BACKEND}/savingGoals`,
      {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
        },
      }
    );

    await getSavingGoal();

    return result.data.message;
  }
  return (
    <SavingGoalContext.Provider
      value={{
        createSavingGoal,
        deleteSavingGoal,
        updateSavingGoal,
        getSavingGoal,
        savingGoal,
      }}
    >
      {props.children}
    </SavingGoalContext.Provider>
  );
}
