import { Button } from "@rneui/themed";
import { useTheme } from "@react-navigation/native";

export default function ButtonComponent({ action, label, loading, disabled }) {
  const { colors } = useTheme();

  return (
    <Button
      title={label}
      buttonStyle={{
        backgroundColor: colors.text,
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        elevation:5
      }}
      titleStyle={{
        color: colors.background,
        fontSize: 15,
        fontFamily: "Poppins_500Medium",
      }}
      onPress={action}
      loading={loading}
      loadingProps={{
        size: "large",
        color: colors.background,
      }}
      disabled={disabled}
      disabledStyle={{
        backgroundColor: colors.disabledColor,
        color: colors.disabledBackground,
        elevation:5
      }}
    />
  );
}
