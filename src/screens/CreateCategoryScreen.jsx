import { Text, View, SafeAreaView, TextInput, Dimensions } from "react-native";
import ButtonComponent from "../components/ButtonComponent";
import { useState, useContext, useEffect } from "react";
import GoBackButtonComponent from "../components/GoBackButtonComponent";
import ErrorComponent from "../components/ErrorComponent";
import { CategoryContext } from "../context/CategoryContext";
import IconCarouselComponent from "../components/IconCarouselComponent";
import { useTheme } from "@react-navigation/native";
import Foect from "foect";
import i18n from "../utils/i18n";

export default function CreateCategoryScreen({ navigation }) {
  const { colors } = useTheme();
  const { getIcons, createCategory, icons } = useContext(CategoryContext);
  const [index, setIndex] = useState(0);
  const [categoryForm, setCategoryForm] = useState({
    category_name: "",
    icon_id: icons[index]?._id,
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [actualIcon, setActualIcon] = useState(icons[index]?.icon);

  const submitCreateCategory = async (form) => {
    try {
      setErrorMessage(null);
      setLoading(true);
      await createCategory(form);
      setLoading(false);
      navigation.navigate("Categories", );
    } catch (error) {
      setLoading(false);
      if (error?.response?.data) {
        setErrorMessage(error.response.data.Error);
      } else {
        setErrorMessage(error.message);
      }
    }
  };

  const next = () => {
    const i = index + 1 >= icons.length ? 0 : index + 1;
    setIndex(i);
    setActualIcon(icons[i].icon);
    setCategoryForm((prev) => ({
      ...prev,
      icon_id: icons ? icons[i]._id : null,
    }));
  };

  const prev = () => {
    const i = index - 1 < 0 ? icons.length - 1 : index - 1;
    setIndex(i);
    setActualIcon(icons[i].icon);
    setCategoryForm((prev) => ({
      ...prev,
      icon_id: icons ? icons[i]._id : null,
    }));
  };

  useEffect(() => {
    getIcons();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
          color: colors.text,
          paddingHorizontal: 30,
          justifyContent: "center",
          position: "relative",
          rowGap: 50,
          minHeight: Dimensions.get("window").height,
        }}
      >
        <GoBackButtonComponent />
        <Text
          style={{
            fontSize: 20,
            fontFamily: "Poppins_500Medium",
            color: colors.text,
          }}
        >
          {i18n.t("createCategory")}
        </Text>
        <Foect.Form
          onValidSubmit={async (model) => {
            model.icon_id = categoryForm.icon_id;
            await submitCreateCategory(model);
          }}
        >
          {(form) => (
            <View style={{ rowGap: 20 }}>
              <IconCarouselComponent
                icon={actualIcon}
                next={next}
                prev={prev}
              />
              <Foect.Control name="category_name" required>
                {(control) => (
                  <View style={{ rowGap: 10, marginTop: 10 }}>
                    <TextInput
                      style={{
                        width: "100%",
                        color: colors.text,
                        fontFamily: "Poppins_300Light",
                        fontSize: 12,
                        padding: 10,
                        backgroundColor: colors.card,
                        borderRadius: 5,
                        elevation: 3,
                      }}
                      onChangeText={(text) => control.onChange(text)}
                      value={control.value}
                      placeholder={i18n.t("writeCategoryTitle")}
                      placeholderTextColor={colors.text}
                    />
                    {control.isInvalid && control.errors.required && (
                      <Text
                        style={{
                          color: "#ed2139",
                          fontSize: 12,
                          fontFamily: "Poppins_500Medium",
                        }}
                      >
                        {i18n.t("expenseCategoryError")}
                      </Text>
                    )}
                  </View>
                )}
              </Foect.Control>

              {errorMessage ? (
                <ErrorComponent errorMessage={errorMessage} />
              ) : null}
              <ButtonComponent
                label={i18n.t("create")}
                action={() => form.submit()}
                loading={loading}
                disabled={form.isInvalid}
              />
            </View>
          )}
        </Foect.Form>
      </View>
    </SafeAreaView>
  );
}
