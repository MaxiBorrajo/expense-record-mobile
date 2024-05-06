import { Button } from "@rneui/themed";
import { useTheme } from "@react-navigation/native";
export default function ButtonComponent({ action, label, loading, disabled }) {
  const { colors } = useTheme();

  return (
    <Button
      title={label}
      buttonStyle={{
        backgroundColor: colors.attention,
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        elevation:3
      }}
      titleStyle={{
        color: colors.text,
        fontSize: 17,
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
