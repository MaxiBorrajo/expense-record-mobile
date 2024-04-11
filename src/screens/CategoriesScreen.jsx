import {
  Text,
  View,
  FlatList,
  SafeAreaView,
  Dimensions,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useEffect, useRef, useState, useContext } from "react";
import { SearchBar } from "@rneui/themed";
import { CategoryContext } from "../context/CategoryContext";
import CategoryComponent from "../components/CategoryComponent";
import CreateCategoryButtonComponent from "../components/CreateCategoryButtonComponent";
import ErrorComponent from "../components/ErrorComponent";
import { useTheme } from "@react-navigation/native";
import i18n from "../utils/i18n";
import GoBackButtonComponent from "../components/GoBackButtonComponent";

export default function CategoriesScreen({ navigation }) {
  const { colors } = useTheme();
  const { getCategories, categories, getIcons } = useContext(CategoryContext);
  const searchBar = useRef(null);
  const [keyword, setKeyword] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await getCategories(keyword);
    setRefreshing(false);
  };

  const cancelSearch = () => {
    if (searchBar.current) {
      searchBar.current.blur();
      setKeyword(null);
    }
  };

  useEffect(() => {
    getCategories(keyword);
    getIcons();
  }, [keyword]);

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
          minHeight: Dimensions.get("window").height,
          justifyContent: "center",
          paddingTop: 90,
        }}
      >
        <GoBackButtonComponent />
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
            borderRadius: 10,
            backgroundColor: colors.card,
            paddingHorizontal: 5,
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
          showsVerticalScrollIndicator={false}
          refreshing={refreshing}
          onRefresh={onRefresh}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              progressBackgroundColor={colors.background}
              tintColor={colors.attention}
              titleColor={colors.attention}
              colors={[colors.attention]}
            />
          }
          style={{ height: "100%" }}
          contentContainerStyle={{
            paddingBottom: 50,
            paddingTop: errorMessage ? 30 : 0,
          }}
          data={categories}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <CategoryComponent item={item} setErrorMessage={setErrorMessage} />
          )}
          ListEmptyComponent={() =>
            !categories ? (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "100%",
                  minWidth: "100%",
                }}
              >
                <ActivityIndicator color={colors.attention} size="large" />
              </View>
            ) : categories && categories.length === 0 ? (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "100%",
                  minWidth: "100%",
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: "Poppins_400Regular",
                    color: colors.text,
                  }}
                >
                  {i18n.t("dataNotFound")}
                </Text>
              </View>
            ) : null
          }
          ItemSeparatorComponent={() => (
            <View style={{ height: 20, width: "100%" }}></View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
