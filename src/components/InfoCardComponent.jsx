import { Text, View } from "react-native";
import { Icon } from "@rneui/themed";
import { useTheme } from "@react-navigation/native";

export default function InfoCardComponent({
  title,
  content,
  icon,
  iconColor,
  width,
  height,
}) {
  const { colors } = useTheme();

  return (
    <View
      style={{
        width: width,
        height: height ? height : "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.card,
        elevation: 5,
        borderRadius: 5,
        padding: 10,
        rowGap: 10,
      }}
    >
      <Text
        style={{
          color: colors.text,
          fontFamily: "Poppins_300Light",
          fontSize: 12,
          textAlign: "center",
        }}
      >
        {title}
      </Text>
      {icon ? (
        <View
          style={{
            flexDirection: "row",
            columnGap: 10,
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Icon
            name={icon}
            color={iconColor ? iconColor : colors.text}
            type="font-awesome-5"
            iconStyle={{ fontSize: 15 }}
          />
          <Text
            style={{
              color: colors.text,
              fontFamily: "Poppins_500Medium",
              fontSize: 12,
              textAlign: "center",
            }}
          >
            $ {content ? content : 0}
          </Text>
        </View>
      ) : (
        <Text
          style={{
            color: colors.text,
            fontFamily: "Poppins_500Medium",
            fontSize: 12,
            textAlign: "center",
          }}
        >
          $ {content ? content : 0}
        </Text>
      )}
    </View>
  );
}
