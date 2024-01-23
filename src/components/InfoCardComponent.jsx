import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Icon } from "@rneui/themed";

export default function InfoCardComponent({ title, content, icon, iconColor, width }) {
  return (
    <View
      style={{
        width: width,
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#1c1917",
        elevation: 5,
        borderRadius: 5,
        padding: 10,
        rowGap: 10,
      }}
    >
      <Text
        style={{
          color: "white",
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
            width:'100%',
          }}
        >
          <Icon name={icon} color={iconColor ? iconColor : "white"} type="font-awesome-5" iconStyle={{fontSize: 15,}}/>
          <Text
            style={{
              color: "white",
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
            color: "white",
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

const styles = StyleSheet.create({});
