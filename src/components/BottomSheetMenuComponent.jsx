import { Text, View, TouchableOpacity, Image } from "react-native";
import React, {
  useMemo,
  useContext,
  forwardRef,
  useEffect,
  useState,
} from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Icon, Badge } from "@rneui/themed";
import i18n from "../utils/i18n";
import { useNavigation, useTheme } from "@react-navigation/native";
import { AppContext } from "../context/AppContext";
import { UserContext } from "../context/UserContext";

const BottomSheetMenuComponent = forwardRef(({ toggleDialog, logout }, ref) => {
  const snapPoints = useMemo(() => ["90%"], []);
  const { colors } = useTheme();
  const navigation = useNavigation();
  const { unreadNotifications } = useContext(UserContext);
  const { isDarkTheme } = useContext(AppContext);
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
            paddingBottom: 3,
          }}
        >
          {i18n.t("options")}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
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
              {i18n.t("notifications")}
            </Text>
            <View style={{ position: "relative" }}>
              <Icon
                name="bell"
                type="font-awesome-5"
                iconStyle={{
                  color: colors.text,
                  fontSize: 20,
                  paddingBottom: 3,
                }}
              ></Icon>
              {unreadNotifications && unreadNotifications.length ? (
                <Badge
                  status="warning"
                  containerStyle={{ position: "absolute", top: 0, right: -2 }}
                />
              ) : null}
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Configuration")}>
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
              {i18n.t("settings")}
            </Text>
            <Icon
              name="wrench"
              type="font-awesome-5"
              iconStyle={{
                color: colors.text,
                fontSize: 20,
                paddingBottom: 3,
              }}
            ></Icon>
          </View>
        </TouchableOpacity>
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
                paddingBottom: 3,
                paddingRight: 2,
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
                paddingBottom: 3,
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
                marginBottom: 9,
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
                paddingBottom: 3,
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
                paddingBottom: 3,
                paddingRight: 3,
              }}
            ></Icon>
          </View>
        </TouchableOpacity>
      </BottomSheetView>
    </BottomSheet>
  );
});

export default BottomSheetMenuComponent;
