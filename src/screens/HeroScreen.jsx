import { Text, View, ImageBackground } from "react-native";
import i18n from "../utils/i18n";
import { UserContext } from "../context/UserContext";
import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useTheme } from "@react-navigation/native";
import ButtonComponent from "../components/ButtonComponent";
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from "react-native-responsive-dimensions";

export default function HeroScreen({ navigation }) {
  const { loadConfiguration } = useContext(UserContext);
  const { isDarkTheme } = useContext(AppContext);
  const { colors } = useTheme();

  const splashScreen = isDarkTheme
    ? require("../../assets/dark_splash.png")
    : require("../../assets/splash.png");

  useEffect(() => {
    loadConfiguration();
  }, []);

  return (
    <ImageBackground
      source={splashScreen}
      resizeMode="contain"
      style={{ flex: 1 }}
    >
      <View
        style={{
          flex: 1,
          color: colors.text,
          padding: responsiveScreenWidth(6),
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontFamily: "Poppins_500Medium",
            fontSize: responsiveScreenFontSize(1.5),
            color: colors.text,
          }}
        >
          Fehu: Expense Tracker
        </Text>
        <View>
          <Text
            style={{
              fontFamily: "Poppins_300Light",
              fontSize: responsiveScreenFontSize(2.5),
              color: colors.text,
              paddingBottom: responsiveScreenHeight(2),
            }}
          >
            {i18n.t("phrase")}
          </Text>
          <ButtonComponent
            action={() => navigation.navigate("Login")}
            label={i18n.t("getStarted")}
          />
        </View>
      </View>
    </ImageBackground>
  );
}
