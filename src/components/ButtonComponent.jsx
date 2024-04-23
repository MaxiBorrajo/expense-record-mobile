import { Button } from "@rneui/themed";
import { useTheme } from "@react-navigation/native";
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize
} from "react-native-responsive-dimensions";
export default function ButtonComponent({ action, label, loading, disabled }) {
  const { colors } = useTheme();

  return (
    <Button
      title={label}
      buttonStyle={{
        backgroundColor: colors.attention,
        paddingVertical: responsiveScreenHeight(1),
        paddingHorizontal: responsiveScreenWidth(3),
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        elevation:3
      }}
      titleStyle={{
        color: colors.text,
        fontSize: responsiveScreenFontSize(1.7),
        fontFamily: "Poppins_500Medium",
      }}
      onPress={action}
      loading={loading}
      loadingProps={{
        size: "large",
        color: 'white',
      }}
      disabled={disabled}
      disabledStyle={{
        backgroundColor: colors.disabledBackground,
        color: colors.disabledColor,
        elevation:3
      }}
    />
  );
}
