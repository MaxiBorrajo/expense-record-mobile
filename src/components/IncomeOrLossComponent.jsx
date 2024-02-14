import { View, TouchableOpacity } from "react-native";
import { Icon } from "@rneui/themed";
import { useTheme } from "@react-navigation/native";

export default function IncomeOrLossComponent({ amount, action }) {
  const { colors } = useTheme();

  return (
    <View
      style={{
        height: 54.5,
        width: 115,
        flexDirection: "row",
        borderRadius: 5,
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: colors.border,
      }}
    >
      <TouchableOpacity
        style={{
          height: "100%",
          width: "50%",
          backgroundColor: amount > 0 ? "#22c55e" : "#012b03",
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={action}
      >
        <Icon
          name="plus"
          type="font-awesome-5"
          iconStyle={{ color: "white", fontSize: 17 }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          height: "100%",
          width: "50%",
          backgroundColor: amount < 0 ? "#ff0019" : "#450007",
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={action}
      >
        <Icon
          name="minus"
          type="font-awesome-5"
          iconStyle={{ color: "white", fontSize: 17 }}
        />
      </TouchableOpacity>
    </View>
  );
}
