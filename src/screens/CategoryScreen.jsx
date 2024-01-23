import { StyleSheet, Text, View, SafeAreaView, TextInput } from "react-native";
import ButtonComponent from "../components/ButtonComponent";
import { useState, useContext, useEffect } from "react";
import GoBackButtonComponent from "../components/GoBackButtonComponent";
import ErrorComponent from "../components/ErrorComponent";
import { CategoryContext } from "../context/CategoryContext";
import IconCarouselComponent from "../components/IconCarouselComponent";

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

  const { getIcons, getCategoryById, updateCategoryById } =
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

  return (
    <View style={styles.container}>
      <GoBackButtonComponent />
      <Text style={styles.title}>Edit category</Text>
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
      <ButtonComponent label={"Edit"} action={editCategory} loading={loading} />
    </View>
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
