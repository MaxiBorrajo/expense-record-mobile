import { Text, View, FlatList, SafeAreaView, Dimensions } from "react-native";
import React, { useEffect, useRef, useState, useContext } from "react";
import { SearchBar } from "@rneui/themed";
import { CategoryContext } from "../context/CategoryContext";
import CategoryComponent from "../components/CategoryComponent";
import CreateCategoryButtonComponent from "../components/CreateCategoryButtonComponent";
import ErrorComponent from "../components/ErrorComponent";
import { useTheme } from "@react-navigation/native";
import { Skeleton } from "moti/skeleton";
import { AppContext } from "../context/AppContext";
import i18n from "../utils/i18n";

export default function CategoriesScreen({ route, navigation }) {
  const { colors } = useTheme();
  const { getCategories, getIcons } = useContext(CategoryContext);
  const searchBar = useRef(null);
  const [keyword, setKeyword] = useState(null);
  const [categories, setCategories] = useState(null);
  const [icons, setIcons] = useState(null);
  const [newCategory, setNewCategory] = useState({
    icon_id: null,
    category_name: null,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [reload, setReload] = useState(false);
  const [actualIcon, setActualIcon] = useState(null);
  const { isDarkTheme, setIsDarkTheme } = useContext(AppContext);

  const cancelSearch = () => {
    if (searchBar.current) {
      searchBar.current.blur();
      setKeyword(null);
    }
  };

  const categoriesSetUp = () => {
    getCategories(keyword).then((categories) => {
      setCategories(categories);
    });

    getIcons().then((icons) => {
      setIcons(icons);
      setActualIcon(icons[0].icon);
      setNewCategory((prev) => ({
        ...prev,
        icon_id: icons[0]._id,
      }));
    });
  };

  useEffect(() => {
    setReload(false);
    categoriesSetUp();
  }, [keyword, reload]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (route.params?.actionCompleted) {
        categoriesSetUp();
      }
    });

    return unsubscribe;
  }, [navigation, route.params?.actionCompleted]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
          color: colors.text,
          alignItems: "center",
          position: "relative",
          paddingHorizontal: 20,
          paddingVertical: 40,
          minHeight: Dimensions.get("window").height,
        }}
      >
        <CreateCategoryButtonComponent
          action={() => navigation.navigate("CreateCategory")}
        />
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
              color: colors.text,
              fontSize: 20,
              fontFamily: "Poppins_500Medium",
            }}
          >
            {i18n.t("allCategories")}
          </Text>
        </View>
        <SearchBar
          ref={searchBar}
          placeholder={i18n.t("searchCategory")}
          placeholderTextColor={colors.text}
          onChangeText={(newValue) => setKeyword(newValue)}
          onClear={cancelSearch}
          value={keyword}
          containerStyle={{
            width: "100%",
            borderRadius: 50,
            backgroundColor: "transparent",
            borderColor: "transparent",
            paddingTop: 20,
            paddingBottom: 30,
          }}
          inputContainerStyle={{
            borderRadius: 50,
            backgroundColor: colors.card,
          }}
          inputStyle={{
            fontSize: 10,
            fontFamily: "Poppins_300Light",
            color: colors.text,
            paddingHorizontal: 5,
          }}
        />
        {errorMessage ? <ErrorComponent errorMessage={errorMessage} /> : null}
        <FlatList
          style={{ height: "100%" }}
          contentContainerStyle={{
            paddingBottom: 50,
            paddingTop: errorMessage ? 30 : 0,
          }}
          data={categories}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <CategoryComponent
              item={item}
              setErrorMessage={setErrorMessage}
              setReload={setReload}
            />
          )}
          ListEmptyComponent={() => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                paddingBottom: 30,
                rowGap: 20,
                width: "100%",
                paddingRight: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  padding: 20,
                  alignItems: "center",
                  justifyContent: "flex-start",
                  backgroundColor: colors.card,
                  borderRadius: 5,
                  columnGap: 15,
                  width: "100%",
                }}
              >
                <Skeleton
                  show={!categories}
                  width={60}
                  height={60}
                  colorMode={isDarkTheme ? "dark" : "light"}
                  radius={5}
                  transition={{
                    type: "timing",
                    duration: 2000,
                    direction: "left",
                  }}
                ></Skeleton>
                <Skeleton
                  show={!categories}
                  width={"80%"}
                  height={40}
                  colorMode={isDarkTheme ? "dark" : "light"}
                  radius={5}
                  transition={{
                    type: "timing",
                    duration: 2000,
                  }}
                ></Skeleton>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  padding: 20,
                  alignItems: "center",
                  justifyContent: "flex-start",
                  backgroundColor: colors.card,
                  borderRadius: 5,
                  columnGap: 15,
                  width: "100%",
                }}
              >
                <Skeleton
                  show={!categories}
                  width={60}
                  height={60}
                  colorMode={isDarkTheme ? "dark" : "light"}
                  radius={5}
                  transition={{
                    type: "timing",
                    duration: 2000,
                  }}
                ></Skeleton>
                <Skeleton
                  show={!categories}
                  width={"80%"}
                  height={40}
                  colorMode={isDarkTheme ? "dark" : "light"}
                  radius={5}
                  transition={{
                    type: "timing",
                    duration: 2000,
                  }}
                ></Skeleton>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  padding: 20,
                  alignItems: "center",
                  justifyContent: "flex-start",
                  backgroundColor: colors.card,
                  borderRadius: 5,
                  columnGap: 15,
                  width: "100%",
                }}
              >
                <Skeleton
                  show={!categories}
                  width={60}
                  height={60}
                  colorMode={isDarkTheme ? "dark" : "light"}
                  radius={5}
                  transition={{
                    type: "timing",
                    duration: 2000,
                  }}
                ></Skeleton>
                <Skeleton
                  show={!categories}
                  width={"80%"}
                  height={40}
                  colorMode={isDarkTheme ? "dark" : "light"}
                  radius={5}
                  transition={{
                    type: "timing",
                    duration: 2000,
                  }}
                ></Skeleton>
              </View>
            </View>
          )}
          ItemSeparatorComponent={() => (
            <View style={{ height: 20, width: "100%" }}></View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
