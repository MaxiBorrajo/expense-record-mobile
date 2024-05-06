import { View } from "react-native";
import React, { useState, useContext, useRef, useEffect } from "react";
import InfoComponent from "../components/InfoComponent";
import ExpensesComponent from "../components/ExpensesComponent";
import { useTheme } from "@react-navigation/native";
import i18n from "../utils/i18n";
import WarningDialogComponent from "../components/WarningDialogComponent";
import BottomSheetMenuComponent from "../components/BottomSheetMenuComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../context/UserContext";
import { useAuth } from "../context/AuthContext";
import ErrorComponent from "../components/ErrorComponent";

export default function MainScreen({ route, navigation }) {
  const { colors } = useTheme();
  const [visible, setVisible] = useState(false);
  const [opened, setOpened] = useState(false);
  const bottomSheetRef = useRef(null);
  const { deleteCurrentUser, handleNotifications } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState(null);
  const { setAuth, notification, setNotification } = useAuth();

  useEffect(() => {
    if (notification) {
      handleNotifications();
      setNotification(null);
    }
  }, [notification]);

  const toggleDialog = () => {
    setVisible(!visible);
  };

  const deleteAccount = async () => {
    try {
      toggleDialog();
      await deleteCurrentUser();
      await logout();
    } catch (error) {
      setLoading(false);
      if (error?.response?.data) {
        setErrorMessage(error.response.data.Error);
      } else {
        setErrorMessage(error.message);
      }
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("email");
    await AsyncStorage.removeItem("token");
    setAuth(() => null);
  };

  const openBottomSheet = () => {
    setOpened(!opened);

    if (opened) {
      bottomSheetRef.current.close();
    }

    bottomSheetRef.current.snapToIndex(0);
  };

  return (
    <>
      <View
        style={{
          backgroundColor: colors.background,
          color: colors.text,
          alignItems: "center",
          position: "relative",
          rowGap: 10,
        }}
      >
        <InfoComponent
          route={route}
          navigation={navigation}
          openBottomSheet={() => openBottomSheet()}
        />
        {errorMessage && <ErrorComponent errorMessage={errorMessage} />}
        <ExpensesComponent route={route} navigation={navigation} />
      </View>
      <BottomSheetMenuComponent
        ref={bottomSheetRef}
        logout={() => logout()}
        toggleDialog={toggleDialog}
      />
      <WarningDialogComponent
        dialogObject={{
          isVisible: visible,
          toggleDialog: () => toggleDialog(),
          title: i18n.t("deleteAccount"),
          description: i18n.t("deleteAccountWarning"),
          cancel: () => setVisible(false),
          action: () => deleteAccount(),
        }}
      />
    </>
  );
}
