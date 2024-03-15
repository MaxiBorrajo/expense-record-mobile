import { View, TouchableOpacity } from "react-native";
import { Icon } from "@rneui/themed";
import { useTheme } from "@react-navigation/native";
import { Switch } from "react-native-switch";
export default function IncomeOrLossComponent({ amount, action }) {

  return (
    <Switch
      circleSize={25}
      activeText={""}
      inActiveText={""}
      backgroundActive={"#22c55e"}
      backgroundInactive={"#ff0019"}
      value={amount > 0}
      onValueChange={() => action()}
    />
    // <View
    //   style={{
    //     height: 53,
    //     width: 115,
    //     flexDirection: "row",
    //   }}
    // >
    //   <TouchableOpacity
    //     style={{
    //       height: "100%",
    //       width: "50%",
    //       backgroundColor: amount > 0 ? "#22c55e" : "#012b03",
    //       alignItems: "center",
    //       justifyContent: "center",
    //       borderTopStartRadius:5,
    //       borderBottomStartRadius:5
    //     }}
    //     onPress={action}
    //   >
    //     <Icon
    //       name="plus"
    //       type="font-awesome-5"
    //       iconStyle={{ color: "white", fontSize: 17 }}
    //     />
    //   </TouchableOpacity>
    //   <TouchableOpacity
    //     style={{
    //       height: "100%",
    //       width: "50%",
    //       backgroundColor: amount < 0 ? "#ff0019" : "#450007",
    //       alignItems: "center",
    //       justifyContent: "center",
    //       borderTopEndRadius:5,
    //       borderBottomEndRadius:5
    //     }}
    //     onPress={action}
    //   >
    //     <Icon
    //       name="minus"
    //       type="font-awesome-5"
    //       iconStyle={{ color: "white", fontSize: 17 }}
    //     />
    //   </TouchableOpacity>
    // </View>
  );
}
