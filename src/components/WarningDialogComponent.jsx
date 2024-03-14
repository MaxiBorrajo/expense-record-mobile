import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Icon, Dialog, Button } from "@rneui/themed";
import { useTheme } from "@react-navigation/native";
import i18n from "../utils/i18n";

export default function WarningDialogComponent({dialogObject}) {
const { colors } = useTheme();

  return (
    <Dialog
        isVisible={dialogObject.isVisible}
        onBackdropPress={dialogObject.toggleDialog}
        overlayStyle={{
          borderRadius: 20,
          elevation: 5,
          backgroundColor: colors.card,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          padding: 20,
          width: "90%",
          height: "50%",
          rowGap: 30,
        }}
      >
        <Text
          style={{
            fontFamily: "Poppins_500Medium",
            color: colors.text,
            fontSize: 37,
          }}
        >
          {dialogObject.title}
        </Text>
        <Text
          style={{
            fontFamily: "Poppins_300Light",
            color: colors.text,
            fontSize: 18,
            textAlign: "center",
            lineHeight: 35,
          }}
        >
          {dialogObject.description}
        </Text>
        <Dialog.Actions>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <Button
              title={i18n.t("cancel")}
              titleStyle={{
                color: colors.background,
                fontSize: 15,
                fontFamily: "Poppins_500Medium",
              }}
              buttonStyle={{
                backgroundColor: colors.text,
                borderRadius: 5,
                alignItems: "center",
                justifyContent: "center",
                width: 130,
                padding: 10,
              }}
              onPress={dialogObject.cancel}
            />
            <Button
              title={i18n.t("delete")}
              titleStyle={{
                color: "#fff",
                fontSize: 15,
                fontFamily: "Poppins_500Medium",
              }}
              buttonStyle={{
                backgroundColor: "#eb1717",
                borderRadius: 5,
                alignItems: "center",
                justifyContent: "center",
                width: 130,
                padding: 10,
              }}
              
              onPress={dialogObject.action}
            />
          </View>
        </Dialog.Actions>
      </Dialog>
  )
}

const styles = StyleSheet.create({})