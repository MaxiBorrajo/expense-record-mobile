import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
export const NotificationContext = createContext();

export function NotificationContextProvider(props) {
  async function getNotifications() {
    const result = await axios.get(
      `${process.env.EXPO_PUBLIC_URL_BACKEND}/notifications?`,
      {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
        },
      }
    );

    return result.data.resource;
  }

  async function readNotifications(notificationsIds) {
    const result = await axios.put(
      `${process.env.EXPO_PUBLIC_URL_BACKEND}/notifications`,
      notificationsIds,
      {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
        },
      }
    );

    return result.data.resource;
  }

  async function deleteNotification(id) {
    const result = await axios.delete(
      `${process.env.EXPO_PUBLIC_URL_BACKEND}/notifications/${id}`,
      {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
        },
      }
    );

    return result.data.message;
  }
  return (
    <NotificationContext.Provider
      value={{
        deleteNotification,
        getNotifications,
        readNotifications,
      }}
    >
      {props.children}
    </NotificationContext.Provider>
  );
}
