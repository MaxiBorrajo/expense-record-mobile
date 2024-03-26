import { View, SafeAreaView, Dimensions } from "react-native";
import React, { useState, useEffect, useContext, useRef } from "react";
import InfoComponent from "../components/InfoComponent";
import ExpensesComponent from "../components/ExpensesComponent";
import { useTheme } from "@react-navigation/native";
import i18n from "../utils/i18n";
import WarningDialogComponent from "../components/WarningDialogComponent";
import BottomSheetMenuComponent from "../components/BottomSheetMenuComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../context/UserContext";

export default function MainScreen({ route, navigation }) {
  const { colors } = useTheme();
  const [visible, setVisible] = useState(false);
  const [opened, setOpened] = useState(false);
  const bottomSheetRef = useRef(null);
  const { deleteCurrentUser, reload, setReload } = useContext(UserContext);

  const toggleDialog = () => {
    setVisible(!visible);
  };

  const deleteAccount = async () => {
    setVisible(false);
    setLoading(true);
    setErrorMessage(null);
    await deleteCurrentUser();
    await logout();
  };

  const logout = async () => {
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("email");
    await AsyncStorage.removeItem("token");
    navigation.navigate("Hero");
  };

  useEffect(() => {
    setReload(false);
  }, [reload]);

  const openBottomSheet = () => {
    setOpened(!opened);

    if (opened) {
      bottomSheetRef.current.close();
    }

    bottomSheetRef.current.snapToIndex(0);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
          color: colors.text,
          alignItems: "center",
          position: "relative",
          minHeight: Dimensions.get("window").height,
          rowGap: 5,
        }}
      >
        <InfoComponent
          route={route}
          navigation={navigation}
          openBottomSheet={() => openBottomSheet()}
        />
        <ExpensesComponent
          route={route}
          navigation={navigation}
        />
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
    </SafeAreaView>
  );
}
