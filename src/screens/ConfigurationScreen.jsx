import { Text, View, SafeAreaView, Dimensions } from "react-native";
import React, { useContext } from "react";
import { Switch } from "react-native-switch";
import SelectDropdown from "react-native-select-dropdown";
import { currencies } from "../utils/utils";
import { languages } from "../utils/utils";
import { UserContext } from "../context/UserContext";
import i18n from "../utils/i18n";
import { useTheme } from "@react-navigation/native";
import { AppContext } from "../context/AppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GoBackButtonComponent from "../components/GoBackButtonComponent";
export default function ConfigurationScreen() {
  const { colors } = useTheme();
  const {
    translate,
    handleHideBalance,
    updateCurrency,
    hideBalance,
    currency,
    language,
    blockNotifications,
    handleBlockNotifications,
  } = useContext(UserContext);
  const { isDarkTheme, setIsDarkTheme } = useContext(AppContext);

  const handleChangeTheme = async () => {
    setIsDarkTheme(!isDarkTheme);
    AsyncStorage.setItem("theme", !isDarkTheme ? "dark" : "light");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          justifyContent: "center",
          rowGap: 20,
          paddingHorizontal: 30,
          minHeight: Dimensions.get("window").height,
          position: "relative",
        }}
      >
        <GoBackButtonComponent />
        <Text
          style={{
            fontSize: 20,
            fontFamily: "Poppins_500Medium",
            color: colors.text,
          }}
        >
          {i18n.t("settings")}
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
            backgroundActive={colors.attention}
            backgroundInactive={"gray"}
            value={isDarkTheme}
            onValueChange={() => {
              handleChangeTheme();
            }}
            barHeight={28}
            switchLeftPx={3}
            switchRightPx={3}
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
            backgroundActive={colors.attention}
            backgroundInactive={"gray"}
            value={hideBalance}
            onValueChange={async (value) => {
              await handleHideBalance(value);
            }}
            barHeight={28}
            switchLeftPx={3}
            switchRightPx={3}
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
            {i18n.t("blockNotifications")}
          </Text>
          <Switch
            circleSize={25}
            activeText={""}
            inActiveText={""}
            backgroundActive={colors.attention}
            backgroundInactive={"gray"}
            value={blockNotifications}
            onValueChange={async (value) => {
              await handleBlockNotifications(value);
            }}
            barHeight={28}
            switchLeftPx={3}
            switchRightPx={3}
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
      </View>
    </SafeAreaView>
  );
}
