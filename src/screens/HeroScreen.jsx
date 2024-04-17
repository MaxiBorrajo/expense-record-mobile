import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  Dimensions,
} from "react-native";
import { Button } from "@rneui/themed";
import i18n from "../utils/i18n";
import { UserContext } from "../context/UserContext";
import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useTheme } from "@react-navigation/native";
import ButtonComponent from "../components/ButtonComponent";
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
            padding: 30,
            justifyContent: "space-between",
            rowGap: 150,
            minHeight: Dimensions.get("window").height,
            paddingTop: 50,
          }}
        >
          <Text
            style={{
              fontFamily: "Poppins_500Medium",
              fontSize: 15,
              color: colors.text,
            }}
          >
            Fehu: Expense Tracker
          </Text>
          <View>
            <Text
              style={{
                fontFamily: "Poppins_300Light",
                fontSize: 25,
                color: colors.text,
                paddingBottom: 20,
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
