import { View } from "react-native";
import { Icon } from "@rneui/themed";
import { useTheme } from "@react-navigation/native";

export default function IconCarouselComponent({ icon, next, prev }) {
  const { colors } = useTheme();
  return (
    <View
      style={{
        flexDirection: "row",
        columnGap: 10,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Icon
        name="chevron-left"
        type="font-awesome-5"
        iconStyle={{ fontSize: 40, color: colors.text, padding: 10 }}
        onPress={prev}
      />
      <View
        style={{
          borderRadius: 5,
          backgroundColor: colors.softCard,
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          width: 14,
          height: 7,
        }}
      >
        <Icon
          name={icon}
          type="font-awesome-5"
          iconStyle={{ fontSize: 20, color: colors.text }}
        />
      </View>
      <Icon
        name="chevron-right"
        type="font-awesome-5"
        iconStyle={{ fontSize: 40, color: colors.text, padding: 10 }}
        onPress={next}
      />
    </View>
  );
}
