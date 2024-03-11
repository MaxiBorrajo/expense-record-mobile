import {
  View,
  SafeAreaView,
  Dimensions,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useRef, useMemo, useContext } from "react";
import InfoComponent from "../components/InfoComponent";
import ExpensesComponent from "../components/ExpensesComponent";
import { useTheme } from "@react-navigation/native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Switch } from "react-native-switch";
import { AppContext } from "../context/AppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ExpenseContext } from "../context/ExpenseContext";
import SelectDropdown from "react-native-select-dropdown";
import { currencies } from "../utils/utils";
import { languages } from "../utils/utils";
import { UserContext } from "../context/UserContext";
import { Icon, Dialog, Button } from "@rneui/themed";
import i18n from "../utils/i18n";

export default function MainScreen({ route, navigation }) {
  const [reload, setReload] = useState(false);
  const { colors } = useTheme();
  const [opened, setOpened] = useState(false);
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["65%"], []);
  const { isDarkTheme, setIsDarkTheme } = useContext(AppContext);
  const { applyConversion } = useContext(ExpenseContext);
  const [currency, setCurrency] = useState(null);
  const { getCurrentUser, updateCurrentUser, deleteCurrentUser } =
    useContext(UserContext);
  const [hideBalance, setHideBalance] = useState(false);
  const [language, setLanguage] = useState(null);
  const [visible, setVisible] = useState(false);
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

  const translate = async (newLanguage) => {
    i18n.locale = newLanguage;
    setLanguage(newLanguage);
    AsyncStorage.setItem("language", newLanguage);
  };

  useEffect(() => {
    getCurrentUser().then((user) => {
      setCurrency(user.currency);
    });

    AsyncStorage.getItem("hideBalance", (value) => {
      setHideBalance(Boolean(value));
    });

    AsyncStorage.getItem("language", (value) => {
      setLanguage(value ? value : i18n.locale);
    });
  }, []);

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

  const logout = async () => {
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("email");
    navigation.navigate("Hero");
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
        }}
      >
        <InfoComponent
          route={route}
          navigation={navigation}
          reload={reload}
          openBottomSheet={() => openBottomSheet()}
          hideBalance={hideBalance}
        />
        <ExpensesComponent
          route={route}
          navigation={navigation}
          reload={reload}
        />
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          index={0}
          enablePanDownToClose
          animateOnMount
          handleStyle={{
            backgroundColor: colors.softCard,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
          }}
          handleIndicatorStyle={{ backgroundColor: colors.text }}
          backgroundStyle={{ backgroundColor: colors.softCard }}
        >
          <BottomSheetView
            style={{
              flex: 1,
              padding: 20,
              rowGap: 10,
              backgroundColor: colors.softCard,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontFamily: "Poppins_400Regular",
                color: colors.text,
                paddingBottom: 5,
              }}
            >
              {i18n.t("configuration")}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: "Poppins_300Light",
                  color: colors.text,
                }}
              >
                {i18n.t("darkMode")}
              </Text>
              <Switch
                circleSize={25}
                activeText={""}
                inActiveText={""}
                backgroundActive={"gray"}
                backgroundInactive={"gray"}
                value={isDarkTheme}
                onValueChange={() => {
                  AsyncStorage.setItem(
                    "theme",
                    !isDarkTheme ? "dark" : "light",
                    () => {
                      setIsDarkTheme(!isDarkTheme);
                    }
                  );
                }}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: "Poppins_300Light",
                  color: colors.text,
                }}
              >
                {i18n.t("hideBalance")}
              </Text>
              <Switch
                circleSize={25}
                activeText={""}
                inActiveText={""}
                backgroundActive={"gray"}
                backgroundInactive={"gray"}
                value={hideBalance}
                onValueChange={() => {
                  AsyncStorage.setItem(
                    "hideBalance",
                    (!hideBalance).toString(),
                    () => {
                      setHideBalance(!hideBalance);
                    }
                  );
                }}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: "Poppins_300Light",
                  color: colors.text,
                }}
              >
                {i18n.t("currency")}
              </Text>
              <SelectDropdown
                search={true}
                searchInputTxtStyle={{
                  fontSize: 14,
                  fontFamily: "Poppins_300Light",
                  textAlign: "center",
                }}
                data={currencies}
                onSelect={(selectedItem) => {
                  updateCurrency(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item) => {
                  return item;
                }}
                defaultButtonText={currency ? currency : "ARS"}
                defaultValue={currency}
                buttonStyle={{
                  color: colors.text,
                  fontSize: 12,
                  padding: 0,
                  margin: 0,
                  width: 60,
                  height: 20,
                  backgroundColor: "transparent",
                }}
                buttonTextStyle={{
                  fontFamily: "Poppins_300Light",
                  color: colors.text,
                  fontSize: 14,
                }}
                rowTextStyle={{
                  fontFamily: "Poppins_300Light",
                  fontSize: 14,
                }}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: "Poppins_300Light",
                  color: colors.text,
                }}
              >
                {i18n.t("language")}
              </Text>
              <SelectDropdown
                data={languages}
                onSelect={(selectedItem) => {
                  translate(selectedItem.toLowerCase());
                }}
                buttonTextAfterSelection={(selectedItem) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item) => {
                  return item;
                }}
                defaultButtonText={language ? language.toUpperCase() : "EN"}
                defaultValue={language ? language.toUpperCase() : "EN"}
                buttonStyle={{
                  color: colors.text,
                  fontSize: 12,
                  padding: 0,
                  margin: 0,
                  width: 60,
                  height: 20,
                  backgroundColor: "transparent",
                }}
                buttonTextStyle={{
                  fontFamily: "Poppins_300Light",
                  color: colors.text,
                  fontSize: 14,
                }}
                rowTextStyle={{
                  fontFamily: "Poppins_300Light",
                  fontSize: 14,
                }}
              />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: "Poppins_300Light",
                    color: colors.text,
                  }}
                >
                  {i18n.t("profile")}
                </Text>
                <Icon
                  name="user"
                  type="font-awesome-5"
                  iconStyle={{
                    color: colors.text,
                    fontSize: 20,
                    paddingBottom: 5,
                    paddingRight: 21,
                  }}
                ></Icon>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={logout}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: "Poppins_300Light",
                    color: colors.text,
                  }}
                >
                  {i18n.t("logOut")}
                </Text>
                <Icon
                  name="sign-out-alt"
                  type="font-awesome-5"
                  iconStyle={{
                    color: colors.text,
                    fontSize: 20,
                    paddingBottom: 5,
                    paddingRight: 18,
                  }}
                ></Icon>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleDialog}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: "Poppins_300Light",
                    color: "#eb1717",
                  }}
                >
                  {i18n.t("deleteAccount")}
                </Text>
                <Icon
                  name="trash-alt"
                  type="font-awesome-5"
                  iconStyle={{
                    color: "#eb1717",
                    fontSize: 20,
                    paddingBottom: 5,
                    paddingRight: 20,
                  }}
                ></Icon>
              </View>
            </TouchableOpacity>
          </BottomSheetView>
        </BottomSheet>
      </View>
      <Dialog
        isVisible={visible}
        onBackdropPress={toggleDialog}
        overlayStyle={{
          borderRadius: 5,
          elevation: 5,
          backgroundColor: colors.card,
          borderColor: colors.border,
          borderWidth: 1,
          borderStyle: "solid",
        }}
      >
        <Text
          style={{
            fontFamily: "Poppins_500Medium",
            color: colors.text,
            fontSize: 20,
          }}
        >
          {i18n.t("deleteAccount")}
        </Text>
        <Text
          style={{
            fontFamily: "Poppins_300Light",
            color: colors.text,
            fontSize: 12,
          }}
        >
          {i18n.t("deleteAccountWarning")}
        </Text>
        <Dialog.Actions>
          <Button
            title={i18n.t("delete")}
            titleStyle={{
              color: "white",
              fontSize: 12,
              fontFamily: "Poppins_500Medium",
            }}
            buttonStyle={{
              backgroundColor: "#eb1717",
              borderRadius: 5,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={deleteAccount}
          />
          <View style={{ width: 15 }}></View>
          <Button
            title={i18n.t("cancel")}
            titleStyle={{
              color: colors.background,
              fontSize: 12,
              fontFamily: "Poppins_500Medium",
            }}
            buttonStyle={{
              backgroundColor: colors.text,
              borderRadius: 5,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => setVisible(false)}
          />
        </Dialog.Actions>
      </Dialog>
    </SafeAreaView>
  );
}
