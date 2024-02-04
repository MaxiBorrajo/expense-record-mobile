import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useRef, useContext } from "react";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { CategoryContext } from "../context/CategoryContext";

export default function CategoryComponent({
  item,
  setErrorMessage,
  setReload,
}) {
  const navigation = useNavigation();
  const swipeableRef = useRef(null);
  const { deleteCategoryById } = useContext(CategoryContext);

  async function handleDelete() {
    swipeableRef.current.close();
    await deleteCategory();
  }

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
          backgroundColor: "#1c1917",
          width: "100%",
          elevation: 5,
          borderRadius: 5,
        }}
        onPress={() => {
          if (item.user_id) {
            navigation.navigate({
              name: "Category",
              params: { id: item._id },
            });
          } else {
            setErrorMessage("You can only edit categories created by you");
            setTimeout(() => {
              setErrorMessage(null);
            }, 3000);
          }
        }}
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
              backgroundColor: "#78716c",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              width: 60,
              height: 60,
            }}
          >
            <Icon
              name={item.icon_id.icon}
              type="font-awesome-5"
              iconStyle={{ fontSize: 20, color: "white" }}
            ></Icon>
          </View>
          <Text
            style={{
              color: "white",
              fontSize: 15,
              fontFamily: "Poppins_500Medium",
            }}
          >
            {item.category_name}
          </Text>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  deleteButton: {
    backgroundColor: "red",
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
    backgroundColor: "red",
  },
});
