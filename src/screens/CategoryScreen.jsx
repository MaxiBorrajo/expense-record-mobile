import { StyleSheet, Text, View, SafeAreaView, TextInput } from "react-native";
import ButtonComponent from "../components/ButtonComponent";
import { useState, useContext, useEffect } from "react";
import GoBackButtonComponent from "../components/GoBackButtonComponent";
import ErrorComponent from "../components/ErrorComponent";
import { CategoryContext } from "../context/CategoryContext";
import IconCarouselComponent from "../components/IconCarouselComponent";
import { Icon, Dialog, Button } from "@rneui/themed";

export default function CategoryScreen({ route, navigation }) {
  const { id } = route.params;

  useEffect(() => {
    getCategoryById(id).then((category) => {
      setCategoryForm({
        category_name: category.category_name,
        icon_id: category.icon_id._id,
      });

      getIcons().then((icons) => {
        setIcons(icons);

        let i = icons.findIndex((icon) => icon._id === category.icon_id._id);

        setIndex(i);
      });
    });
  }, []);

  const { getIcons, getCategoryById, updateCategoryById, deleteCategoryById } =
    useContext(CategoryContext);

  const [categoryForm, setCategoryForm] = useState({
    category_name: "",
    icon_id: "",
  });

  const [icons, setIcons] = useState(null);
  const [index, setIndex] = useState(0);

  const editCategory = async () => {
    setErrorMessage(null);
    setLoading(true);

    const validation = validateCategoryForm();

    if (validation) {
      await updateCategoryById(id, categoryForm);
      navigation.navigate("Categories", { actionCompleted: true });
    }

    setLoading(false);
  };

  const deleteCategory = async () => {
    await deleteCategoryById(id);
    navigation.navigate("Categories", { actionCompleted: true });
  };

  const validateCategoryForm = () => {
    if (!categoryForm.category_name) {
      setErrorMessage("A category name is required");
      return false;
    }

    return true;
  };

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const next = () => {
    if (index + 1 >= icons.length) {
      setIndex(0);
      setCategoryForm((prevState) => ({
        ...prevState,
        icon_id: icons[0]._id,
      }));
    } else {
      setIndex(index + 1);
      setCategoryForm((prevState) => ({
        ...prevState,
        icon_id: icons[index + 1]._id,
      }));
    }
  };

  const prev = () => {
    if (index - 1 < 0) {
      setIndex(icons.length - 1);
      setCategoryForm((prevState) => ({
        ...prevState,
        icon_id: icons[icons.length - 1]._id,
      }));
    } else {
      setIndex(index - 1);
      setCategoryForm((prevState) => ({
        ...prevState,
        icon_id: icons[index - 1]._id,
      }));
    }
  };

  const toggleDialog = () => {
    setVisible(!visible);
  };
  const [visible, setVisible] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Dialog
          isVisible={visible}
          onBackdropPress={toggleDialog}
          overlayStyle={{
            borderRadius: 5,
            elevation: 5,
            backgroundColor: "#1c1917",
            borderColor: "white",
            borderWidth: 1,
            borderStyle: "solid",
          }}
        >
          <Text
            style={{
              fontFamily: "Poppins_500Medium",
              color: "white",
              fontSize: 20,
            }}
          >
            Delete category
          </Text>
          <Text
            style={{
              fontFamily: "Poppins_300Light",
              color: "white",
              fontSize: 12,
            }}
          >
            Are you sure you want to delete this category? All information will
            be deleted and cannot be recovered
          </Text>
          <Dialog.Actions>
            <Button
              title="Delete"
              titleStyle={{
                color: "#fff",
                fontSize: 12,
                fontFamily: "Poppins_500Medium",
              }}
              buttonStyle={{
                backgroundColor: "#eb1717",
                borderRadius: 5,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => deleteCategory()}
            />
            <View style={{ width: 15 }}></View>
            <Button
              title="Cancel"
              titleStyle={{
                color: "#000",
                fontSize: 12,
                fontFamily: "Poppins_500Medium",
              }}
              buttonStyle={{
                backgroundColor: "#fff",
                borderRadius: 5,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => setVisible(false)}
            />
          </Dialog.Actions>
        </Dialog>
        <GoBackButtonComponent />
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.title}>Edit category</Text>
          <Icon
            name="trash-alt"
            type="font-awesome-5"
            iconStyle={{ fontSize: 20, color: "red", paddingBottom: 7 }}
            onPress={toggleDialog}
          />
        </View>

        <IconCarouselComponent
          icons={icons}
          index={index}
          next={next}
          prev={prev}
        />
        <TextInput
          style={{
            width: "100%",
            color: "white",
            fontFamily: "Poppins_300Light",
            fontSize: 12,
            padding: 10,
            backgroundColor: "#1c1917",
            borderRadius: 5,
            elevation: 5,
            borderColor: "white",
            borderWidth: 1,
            borderStyle: "solid",
          }}
          onChangeText={(text) =>
            setCategoryForm({ ...categoryForm, category_name: text })
          }
          value={categoryForm.category_name ? categoryForm.category_name : ""}
          placeholder="Write a category name"
          placeholderTextColor="white"
        />

        {errorMessage ? <ErrorComponent errorMessage={errorMessage} /> : null}
        <ButtonComponent
          label={"Edit"}
          action={editCategory}
          loading={loading}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    color: "fff",
    paddingHorizontal: 30,
    justifyContent: "center",
    position: "relative",
    rowGap: 50,
  },
  title: {
    fontSize: 20,
    fontFamily: "Poppins_500Medium",
    color: "#fff",
  },
});
