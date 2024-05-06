import { Text, View } from "react-native";
import { Icon } from "@rneui/themed";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation, useTheme } from "@react-navigation/native";
import i18n from "../utils/i18n";

export default function ExpensesHeaderComponent() {
  const navigation = useNavigation();
  const { colors } = useTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: 10,
      }}
    >
      <Text
        style={{
          fontSize: 15,
          fontFamily: "Poppins_500Medium",
          color: colors.text,
        }}
      >
        {i18n.t("recentExpenses")}
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("Expenses")}
        style={{
          alignItems: "center",
          justifyContent: "center",
          columnGap: 10,
          flexDirection: "row",
        }}
      >
        <Text
          style={{
            fontSize: 12,
            fontFamily: "Poppins_300Light",
            color: colors.text,
          }}
        >
          {i18n.t("seeAll")}
        </Text>
        <Icon
          name="arrow-right"
          type="font-awesome-5"
          iconStyle={{
            fontSize: 12,
            color: colors.text,
          }}
        />
      </TouchableOpacity>
    </View>
  );
}
