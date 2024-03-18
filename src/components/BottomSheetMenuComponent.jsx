import { Text, View, TouchableOpacity, Image } from "react-native";
import React, { useMemo, useContext, forwardRef } from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Switch } from "react-native-switch";
import SelectDropdown from "react-native-select-dropdown";
import { currencies } from "../utils/utils";
import { languages } from "../utils/utils";
import { Icon } from "@rneui/themed";
import { UserContext } from "../context/UserContext";
import i18n from "../utils/i18n";
import { useNavigation, useTheme } from "@react-navigation/native";

const BottomSheetMenuComponent = forwardRef(({ toggleDialog, logout }, ref) => {
  const snapPoints = useMemo(() => ["80%"], []);
  const { colors } = useTheme();
  const {
    translate,
    handleHideBalance,
    handleChangeTheme,
    updateCurrency,
    isDarkTheme,
    hideBalance,
    currency,
    language,
  } = useContext(UserContext);
  const navigation = useNavigation();
  const icon = isDarkTheme
    ? require("../../assets/images/fehu_light.png")
    : require("../../assets/images/fehu_dark.png");

  return (
    <BottomSheet
      ref={ref}
      snapPoints={snapPoints}
      index={-1}
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
              handleChangeTheme();
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
            onValueChange={(value) => {
              handleHideBalance(value);
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
        <TouchableOpacity onPress={() => navigation.navigate("Categories")}>
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
              {i18n.t("categories")}
            </Text>
            <Icon
              name="list-ul"
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
        <TouchableOpacity onPress={() => navigation.navigate("AboutUs")}>
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
              {i18n.t("aboutUs")}
            </Text>
            <Image
              source={icon}
              style={{
                height: 25,
                width: 25,
                resizeMode: "center",
                marginRight: 17,
                marginBottom: 7,
              }}
            />
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
                color: isDarkTheme ? "#f53333" : "#eb1717",
              }}
            >
              {i18n.t("deleteAccount")}
            </Text>
            <Icon
              name="trash-alt"
              type="font-awesome-5"
              iconStyle={{
                color: isDarkTheme ? "#f53333" : "#eb1717",
                fontSize: 20,
                paddingBottom: 5,
                paddingRight: 20,
              }}
            ></Icon>
          </View>
        </TouchableOpacity>
      </BottomSheetView>
    </BottomSheet>
  );
});

export default BottomSheetMenuComponent;
