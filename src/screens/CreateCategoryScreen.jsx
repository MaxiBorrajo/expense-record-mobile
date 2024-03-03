import { Text, View, SafeAreaView, TextInput, Dimensions } from "react-native";
import ButtonComponent from "../components/ButtonComponent";
import { useState, useContext, useEffect } from "react";
import GoBackButtonComponent from "../components/GoBackButtonComponent";
import ErrorComponent from "../components/ErrorComponent";
import { CategoryContext } from "../context/CategoryContext";
import IconCarouselComponent from "../components/IconCarouselComponent";
import { useTheme } from "@react-navigation/native";
import Foect from "foect";

export default function CreateCategoryScreen({ navigation }) {
  const { colors } = useTheme();
  const { getIcons, createCategory } = useContext(CategoryContext);
  const [categoryForm, setCategoryForm] = useState({
    category_name: "",
    icon_id: "",
  });
  const [icons, setIcons] = useState(null);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [actualIcon, setActualIcon] = useState(null);

  const submitCreateCategory = async (form) => {
    setErrorMessage(null);
    setLoading(true);
    await createCategory(form);
    setLoading(false);
    navigation.navigate("Categories", { actionCompleted: true });
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
    getIcons().then((icons) => {
      setIcons(icons);
      setActualIcon(icons[index].icon);
    });
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
          Create category
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
                        elevation: 5,
                        borderColor: colors.border,
                        borderWidth: 1,
                        borderStyle: "solid",
                      }}
                      onBlur={control.markAsTouched}
                      onChangeText={(text) => control.onChange(text)}
                      value={control.value}
                      placeholder="Write a category name"
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
                        Please enter a category name.
                      </Text>
                    )}
                  </View>
                )}
              </Foect.Control>

              {errorMessage ? (
                <ErrorComponent errorMessage={errorMessage} />
              ) : null}
              <ButtonComponent
                label={"Create"}
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