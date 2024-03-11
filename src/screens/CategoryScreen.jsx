import { Text, View, SafeAreaView, TextInput, Dimensions } from "react-native";
import ButtonComponent from "../components/ButtonComponent";
import { useState, useContext, useEffect } from "react";
import GoBackButtonComponent from "../components/GoBackButtonComponent";
import ErrorComponent from "../components/ErrorComponent";
import { CategoryContext } from "../context/CategoryContext";
import IconCarouselComponent from "../components/IconCarouselComponent";
import { Icon, Dialog, Button } from "@rneui/themed";
import { useTheme } from "@react-navigation/native";
import Foect from "foect";
import LoadingScreen from "./LoadingScreen";
import i18n from "../utils/i18n";

export default function CategoryScreen({ route, navigation }) {
  const { id } = route.params;
  const { colors } = useTheme();
  const { getIcons, getCategoryById, updateCategoryById, deleteCategoryById } =
    useContext(CategoryContext);
  const [categoryForm, setCategoryForm] = useState({
    category_name: "",
    icon_id: "",
  });
  const [icons, setIcons] = useState(null);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [actualIcon, setActualIcon] = useState(null);

  const editCategory = async (form) => {
    setErrorMessage(null);
    setLoading(true);
    await updateCategoryById(id, form);
    setLoading(false);
    navigation.navigate("Categories", { actionCompleted: true });
  };

  const deleteCategory = async () => {
    await deleteCategoryById(id);
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

  const toggleDialog = () => {
    setVisible(!visible);
  };

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
        setActualIcon(icons[i].icon);
      });
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {!categoryForm || !icons ? (
        <LoadingScreen />
      ) : (
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
          <Dialog
            isVisible={visible}
            onBackdropPress={toggleDialog}
            overlayStyle={{
              borderRadius: 5,
              elevation: 5,
              backgroundColor: colors.card,
              borderColor: colors.border,
              borderWidth: 1,
              borderStyle: "solid",
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins_500Medium",
                color: colors.text,
                fontSize: 20,
              }}
            >
              {i18n.t('deleteCategory')}
            </Text>
            <Text
              style={{
                fontFamily: "Poppins_300Light",
                color: colors.text,
                fontSize: 12,
              }}
            >
              {i18n.t('deleteCategoryWarning')}
            </Text>
            <Dialog.Actions>
              <Button
                title={i18n.t('delete')}
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
                onPress={deleteCategory}
              />
              <View style={{ width: 15 }}></View>
              <Button
                title={i18n.t('cancel')}
                titleStyle={{
                  color: colors.background,
                  fontSize: 12,
                  fontFamily: "Poppins_500Medium",
                }}
                buttonStyle={{
                  backgroundColor: colors.text,
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
            <Text
              style={{
                fontSize: 20,
                fontFamily: "Poppins_500Medium",
                color: colors.text,
              }}
            >
              {i18n.t('editCategory')}
            </Text>
            <Icon
              name="trash-alt"
              type="font-awesome-5"
              iconStyle={{ fontSize: 20, color: "#ed2139", paddingBottom: 7 }}
              onPress={toggleDialog}
            />
          </View>
          <Foect.Form
            defaultValue={{
              category_name: categoryForm?.category_name,
            }}
            onValidSubmit={async (model) => {
              model.icon_id = categoryForm.icon_id;
              await editCategory(model);
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
                        placeholder={i18n.t('writeCategoryTitle')}
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
                          {i18n.t('expenseCategoryError')}
                        </Text>
                      )}
                    </View>
                  )}
                </Foect.Control>

                {errorMessage ? (
                  <ErrorComponent errorMessage={errorMessage} />
                ) : null}
                <ButtonComponent
                  label={i18n.t('save')}
                  action={() => form.submit()}
                  loading={loading}
                  disabled={form.isInvalid}
                />
              </View>
            )}
          </Foect.Form>
        </View>
      )}
    </SafeAreaView>
  );
}
