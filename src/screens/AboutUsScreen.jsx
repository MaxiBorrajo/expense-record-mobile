import {
  StyleSheet,
  Text,
  View,
  Linking,
  Image,
  SafeAreaView,
  Dimensions,
  ScrollView,
} from "react-native";
import React from "react";
import GoBackButtonComponent from "../components/GoBackButtonComponent";
import i18n from "../utils/i18n";
import { useTheme } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
export default function AboutUsScreen() {
  const { colors } = useTheme();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View
          style={{
            flex: 1,
            backgroundColor: colors.background,
            color: colors.text,
            paddingHorizontal: 30,
            rowGap: 80,
            minHeight: Dimensions.get("window").height,
            position: "relative",
            paddingBottom: 50,
          }}
        >
          <GoBackButtonComponent />
          <Image
            source={require("../../assets/images/fehu_gold.png")}
            style={{
              height: 70,
              width: 70,
              resizeMode: "center",
              alignSelf: "center",
              marginTop: 130,
            }}
          />
          <View style={{ rowGap: 20 }}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: "Poppins_500Medium",
                color: colors.text,
              }}
            >
              {i18n.t("aboutUs")}
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontFamily: "Poppins_300Light",
                color: colors.text,
              }}
            >
              {i18n.t("aboutUsDescription")}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                paddingTop: 20,
              }}
            >
              <Icon
                name="github"
                type="font-awesome-5"
                iconStyle={{
                  color: colors.text,
                  fontSize: 50,
                }}
                onPress={() => {
                  Linking.openURL("https://github.com/MaxiBorrajo");
                }}
              ></Icon>
              <Icon
                name="coffee"
                type="font-awesome-5"
                iconStyle={{
                  color: colors.text,
                  fontSize: 50,
                }}
                onPress={() => {
                  Linking.openURL("https://cafecito.app/maxiborrajo");
                }}
              ></Icon>
              <Icon
                name="linkedin"
                type="font-awesome-5"
                iconStyle={{
                  color: "#0e76a8",
                  fontSize: 50,
                }}
                onPress={() => {
                  Linking.openURL(
                    "https://linkedin.com/in/maximilianoborrajoprojects"
                  );
                }}
              ></Icon>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
