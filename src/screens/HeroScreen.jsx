import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  Dimensions,
  Platform,
} from "react-native";
import { Button } from "@rneui/themed";
import i18n from "../utils/i18n";
import { UserContext } from "../context/UserContext";
import { useContext, useEffect, useState, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HeroScreen({navigation}) {
  const { loadConfiguration, handleNotifications } = useContext(UserContext);

  useEffect(() => {
  }, []);

  useEffect(() => {
    loadConfiguration();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../assets/images/pexels-todd-trapani-1461996.jpg")}
        resizeMode="cover"
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Fehu: Expense Tracker</Text>
          <View>
            <Text style={styles.subtitle}>{i18n.t("phrase")}</Text>
            <Button
              title={i18n.t("getStarted")}
              buttonStyle={{
                backgroundColor: "white",
                paddingVertical: 10,
                paddingHorizontal: 30,
                borderRadius: 5,
                alignItems: "center",
                justifyContent: "center",
              }}
              titleStyle={{
                color: "black",
                fontSize: 15,
                fontFamily: "Poppins_500Medium",
              }}
              onPress={() => navigation.navigate("Login")}
            />
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: "fff",
    padding: 30,
    justifyContent: "space-between",
    rowGap: 150,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    minHeight: Dimensions.get("window").height,
    paddingTop: 50,
  },
  safeArea: {
    flex: 1,
  },
  title: {
    fontFamily: "Poppins_500Medium",
    fontSize: 15,
    color: "#fff",
  },
  subtitle: {
    fontFamily: "Poppins_300Light",
    fontSize: 30,
    color: "#fff",
    paddingBottom: 30,
  },
});