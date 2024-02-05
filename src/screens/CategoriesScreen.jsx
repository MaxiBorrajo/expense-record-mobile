import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  SafeAreaView,
  Dimensions
} from "react-native";
import React, { useEffect, useRef, useState, useContext, useMemo } from "react";
import { SearchBar } from "@rneui/themed";
import BottomSheet from "@gorhom/bottom-sheet";
import { CategoryContext } from "../context/CategoryContext";
import CategoryComponent from "../components/CategoryComponent";
import CreateCategoryButtonComponent from "../components/CreateCategoryButtonComponent";
import ButtonComponent from "../components/ButtonComponent";
import IconCarouselComponent from "../components/IconCarouselComponent";
import ErrorComponent from "../components/ErrorComponent";

export default function CategoriesScreen({ route, navigation }) {
  const { getCategories, createCategory, getIcons } =
    useContext(CategoryContext);
  const searchBar = useRef(null);
  const [keyword, setKeyword] = useState(null);
  const [categories, setCategories] = useState(null);
  const [icons, setIcons] = useState(null);
  const [index, setIndex] = useState(0);
  const [newCategory, setNewCategory] = useState({
    icon_id: null,
    category_name: null,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [errorCreateMessage, setErrorCreateMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);

  const next = () => {
    if (index + 1 >= icons.length) {
      setIndex(0);
      setNewCategory({
        ...newCategory,
        icon_id: icons ? icons[0]._id : null,
      });
    } else {
      setIndex(index + 1);
      setNewCategory({
        ...newCategory,
        icon_id: icons ? icons[index + 1]._id : null,
      });
    }
  };

  const prev = () => {
    if (index - 1 < 0) {
      setIndex(icons.length - 1);
      setNewCategory({
        ...newCategory,
        icon_id: icons ? icons[icons.length - 1]._id : null,
      });
    } else {
      setIndex(index - 1);
      setNewCategory({
        ...newCategory,
        icon_id: icons ? icons[index - 1]._id : null,
      });
    }
  };

  const createBottomSheet = useRef(null);

  const [openedCreate, setOpenedCreate] = useState(false);

  const snapPoints = useMemo(() => ["60%", "65%"], []);

  const openCreateBottomSheet = () => {
    setNewCategory({
      ...newCategory,
      category_name: null,
      icon_id: icons[0]._id,
    });

    setOpenedCreate(!openedCreate);

    if (openedCreate) {
      createBottomSheet.current.close();
    }

    createBottomSheet.current.snapToIndex(1);
  };

  useEffect(() => {
    setReload(false);
    getCategories(keyword).then((categories) => {
      setCategories(categories);
    });

    getIcons().then((icons) => {
      setIcons(icons);
      setNewCategory({
        ...newCategory,
        icon_id: icons[0]._id,
      });
    });
  }, [keyword, reload]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (route.params?.actionCompleted) {
        getCategories(keyword).then((categories) => {
          setCategories(categories);
        });

        getIcons().then((icons) => {
          setIcons(icons);
          setNewCategory({
            ...newCategory,
            icon_id: icons[0]._id,
          });
        });
      }
    });

    return unsubscribe;
  }, [navigation, route.params?.actionCompleted]);

  const cancelSearch = () => {
    if (searchBar.current) {
      searchBar.current.blur();
      setKeyword(null);
    }
  };

  const createNewCategory = async () => {
    setLoading(true);
    setErrorCreateMessage(null);

    const validation = validateNewCategory();

    if (validation) {
      await createCategory(newCategory);

      setNewCategory({
        ...newCategory,
        category_name: null,
        icon_id: null,
      });

      getCategories(keyword).then((categories) => {
        setCategories(categories);
        openCreateBottomSheet();
        setLoading(false);
      });
    }

    setLoading(false);
  };

  const validateNewCategory = () => {
    if (!newCategory.category_name) {
      setErrorCreateMessage("A category name is required");
      return false;
    }

    return true;
  };

  return (
    <SafeAreaView
      style={{ flex: 1, minHeight: Dimensions.get("window").height }}
    >
      <View style={styles.container}>
        <CreateCategoryButtonComponent action={openCreateBottomSheet} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 20,
              fontFamily: "Poppins_500Medium",
            }}
          >
            All categories
          </Text>
        </View>
        <SearchBar
          ref={searchBar}
          placeholder="Search by category name"
          onChangeText={(newValue) => setKeyword(newValue)}
          onClear={() => cancelSearch()}
          value={keyword}
          containerStyle={{
            width: "100%",
            borderRadius: 50,
            backgroundColor: "transparent",
          }}
          inputContainerStyle={{
            borderRadius: 50,
            backgroundColor: "white",
          }}
          inputStyle={{
            fontSize: 10,
            fontFamily: "Poppins_300Light",
            color: "black",
          }}
        />
        {errorMessage ? <ErrorComponent errorMessage={errorMessage} /> : null}
        <FlatList
          style={{ height: "100%" }}
          data={categories}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <CategoryComponent
              item={item}
              setErrorMessage={setErrorMessage}
              setReload={setReload}
            />
          )}
          ItemSeparatorComponent={() => (
            <View style={{ height: 20, width: "100%" }}></View>
          )}
        />
        <BottomSheet
          ref={createBottomSheet}
          index={-1}
          snapPoints={snapPoints}
          enablePanDownToClose
          animateOnMount
          backgroundStyle={{ backgroundColor: "#3f3f46", borderRadius: 30 }}
        >
          <View
            style={{
              flex: 1,
              paddingBottom: 30,
              rowGap: 50,
              paddingTop: 20,
              paddingHorizontal: 20,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 17,
                fontFamily: "Poppins_500Medium",
              }}
            >
              Create new category
            </Text>
            <IconCarouselComponent
              icons={icons}
              next={next}
              prev={prev}
              index={index}
            />
            <View
              style={{ flexDirection: "row", width: "100%", columnGap: 10 }}
            >
              <TextInput
                style={{
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
                  flexGrow: 1,
                }}
                onChangeText={(text) =>
                  setNewCategory({ ...newCategory, category_name: text })
                }
                value={newCategory.category_name}
                placeholder="Write a category name"
                placeholderTextColor="white"
              />
            </View>
            {errorCreateMessage ? (
              <ErrorComponent errorMessage={errorCreateMessage} />
            ) : null}
            <ButtonComponent
              label="Create"
              action={createNewCategory}
              loading={loading}
            />
          </View>
        </BottomSheet>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0c0a09",
    color: "fff",
    rowGap: 20,
    alignItems: "center",
    position: "relative",
    paddingHorizontal: 20,
    paddingBottom: 60,
    paddingTop: 20,
    minHeight: Dimensions.get("window").height,
  },
});
