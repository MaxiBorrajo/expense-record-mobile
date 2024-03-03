import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useRef, useContext } from "react";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { CategoryContext } from "../context/CategoryContext";
import { useTheme } from "@react-navigation/native";

export default function CategoryComponent({
  item,
  setErrorMessage,
  setReload,
}) {
  const navigation = useNavigation();
  const swipeableRef = useRef(null);
  const { deleteCategoryById } = useContext(CategoryContext);
  const { colors } = useTheme();

  const handleDelete = async () => {
    swipeableRef.current.close();
    await deleteCategory();
  };

  const deleteCategory = async () => {
    await deleteCategoryById(item._id);
    setReload(true);
  };

  const renderRightActions = (progress, dragX) => {
    return (
      <TouchableOpacity onPress={handleDelete}>
        <View style={styles.deleteButton}>
          <View style={styles.beforeComponent}></View>
          <Icon
            name="trash-alt"
            type="font-awesome-5"
            iconStyle={{ fontSize: 20, color: "white" }}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const handlePress = () => {
    if (item.user_id) {
      navigation.navigate({
        name: "Category",
        params: { id: item._id },
      });
    } else {
      setErrorMessage((prev) => "You can only edit categories created by you");
      setTimeout(() => {
        setErrorMessage((prev) => null);
      }, 3000);
    }
  };

  return (
    <Swipeable
      ref={swipeableRef}
      friction={1}
      renderRightActions={renderRightActions}
      overshootRight={false}
    >
      <TouchableOpacity
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 20,
          alignItems: "center",
          backgroundColor: colors.card,
          width: "100%",
          borderRadius: 5,
        }}
        onPress={handlePress}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            columnGap: 20,
          }}
        >
          <View
            style={{
              borderRadius: 5,
              backgroundColor: colors.softCard,
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              width: 60,
              height: 60,
            }}
          >
            <Icon
              name={item?.icon_id?.icon}
              type="font-awesome-5"
              iconStyle={{ fontSize: 20, color: colors.text }}
            ></Icon>
          </View>
          <Text
            style={{
              color: colors.text,
              fontSize: 15,
              fontFamily: "Poppins_500Medium",
            }}
          >
            {item?.category_name}
          </Text>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  deleteButton: {
    backgroundColor: "#ed2139",
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    position: "relative",
    height: "100%",
    width: 50,
  },
  beforeComponent: {
    position: "absolute",
    top: 0,
    left: -50,
    width: 50,
    height: "100%",
    backgroundColor: "#ed2139",
  },
});
