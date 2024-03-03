import { Text, View, TextInput, SafeAreaView, Dimensions } from "react-native";
import { useEffect, useState, useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import SelectDropdown from "react-native-select-dropdown";
import { currencies } from "../utils/utils";
import { Button, Dialog } from "@rneui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../context/UserContext";
import { useNavigation, useTheme } from "@react-navigation/native";
import ErrorComponent from "../components/ErrorComponent";
import { AppContext } from "../context/AppContext";
import ToggleThemeComponent from "../components/ToggleThemeComponent";
import Foect from "foect";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [errorMessage, setErrorMessage] = useState(null);
  const [userForm, setUserForm] = useState(null);
  const [oldCurrency, setOldCurrency] = useState(null);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const { applyConversion } = useContext(ExpenseContext);
  const { deleteCurrentUser, updateCurrentUser, getCurrentUser } =
    useContext(UserContext);
  const toggleDialog = () => {
    setVisible(!visible);
  };
  const { isDarkTheme, setIsDarkTheme } = useContext(AppContext);

  useEffect(() => {
    getCurrentUser().then((user) => {
      setUserForm({
        ...userForm,
        firstName: user.firstName ? user.firstName : "",
        lastName: user.lastName ? user.lastName : "",
        currency: user.currency,
      });
    });
  }, []);

  const updateUser = async (form) => {
    setLoading(true);
    setErrorMessage(null);

    if (oldCurrency && oldCurrency != form.currency) {
      await updateCurrentUser(form);
      await applyConversion({
        old_currency: oldCurrency,
        new_currency: form.currency,
      });
      setLoading(false);
      navigation.navigate("Main");
    } else {
      await updateCurrentUser(form);
      setLoading(false);
      navigation.navigate("Main");
    }
    setLoading(false);
  };

  const logout = async () => {
    await AsyncStorage.clear();
    navigation.navigate("Hero");
  };

  const deleteAccount = async () => {
    setVisible(false);
    setLoading(true);
    setErrorMessage(null);

    await deleteCurrentUser();
    await logout();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
          color: colors.text,
          paddingHorizontal: 30,
          rowGap: 20,
          justifyContent: "center",
          minHeight: Dimensions.get("window").height,
          position: "relative",
        }}
      >
        <ToggleThemeComponent
          isDarkTheme={isDarkTheme}
          setIsDarkTheme={setIsDarkTheme}
        />
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
            Delete account
          </Text>
          <Text
            style={{
              fontFamily: "Poppins_300Light",
              color: colors.text,
              fontSize: 12,
            }}
          >
            Are you sure you want to delete your account? All information will
            be deleted and cannot be recovered
          </Text>
          <Dialog.Actions>
            <Button
              title="Delete"
              titleStyle={{
                color: "white",
                fontSize: 12,
                fontFamily: "Poppins_500Medium",
              }}
              buttonStyle={{
                backgroundColor: "#eb1717",
                borderRadius: 5,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={deleteAccount}
            />
            <View style={{ width: 15 }}></View>
            <Button
              title="Cancel"
              titleStyle={{
                color: colors.text,
                fontSize: 12,
                fontFamily: "Poppins_500Medium",
              }}
              buttonStyle={{
                backgroundColor: colors.background,
                borderRadius: 5,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => setVisible(false)}
            />
          </Dialog.Actions>
        </Dialog>
        <Text
          style={{
            fontSize: 20,
            fontFamily: "Poppins_500Medium",
            color: colors.text,
          }}
        >
          Configuration
        </Text>
        {errorMessage ? <ErrorComponent errorMessage={errorMessage} /> : null}
        {userForm ? (
          <Foect.Form
            onValidSubmit={async (model) => {
              await updateUser(model);
            }}
            defaultValue={{
              firstName: userForm.firstName,
              lastName: userForm.lastName,
              currency: userForm.currency,
            }}
          >
            {(form) => (
              <View
                style={{
                  rowGap: form.isInvalid ? 10 : 30,
                }}
              >
                <Foect.Control name="firstName" required>
                  {(control) => (
                    <View
                      style={{
                        rowGap: 10,
                      }}
                    >
                      <View
                        style={{
                          width: "100%",
                          alignItems: "center",
                          backgroundColor: colors.card,
                          paddingVertical: 10,
                          paddingHorizontal: 20,
                          borderRadius: 5,
                          elevation: 5,
                          borderColor: colors.border,
                          borderWidth: 1,
                          borderStyle: "solid",
                        }}
                      >
                        <TextInput
                          style={{
                            color: colors.text,
                            fontFamily: "Poppins_300Light",
                            fontSize: 12,
                            width: "100%",
                            paddingRight: 15,
                          }}
                          onChangeText={(value) => {
                            control.onChange(value);
                          }}
                          value={control.value}
                          placeholder="First Name"
                          placeholderTextColor={colors.text}
                        />
                      </View>
                      {control.isInvalid && control.errors.required && (
                        <Text
                          style={{
                            color: "#ed2139",
                            fontSize: 12,
                            fontFamily: "Poppins_500Medium",
                          }}
                        >
                          A first name is required.
                        </Text>
                      )}
                    </View>
                  )}
                </Foect.Control>
                <Foect.Control name="lastName" required>
                  {(control) => (
                    <View
                      style={{
                        rowGap: 10,
                      }}
                    >
                      <View
                        style={{
                          width: "100%",
                          alignItems: "center",
                          backgroundColor: colors.card,
                          paddingVertical: 10,
                          paddingHorizontal: 20,
                          borderRadius: 5,
                          elevation: 5,
                          borderColor: colors.border,
                          borderWidth: 1,
                          borderStyle: "solid",
                        }}
                      >
                        <TextInput
                          style={{
                            color: colors.text,
                            fontFamily: "Poppins_300Light",
                            fontSize: 12,
                            width: "100%",
                            paddingRight: 15,
                          }}
                          onChangeText={(value) => {
                            control.onChange(value);
                          }}
                          value={control.value}
                          placeholder="Last Name"
                          placeholderTextColor={colors.text}
                        />
                      </View>
                      {control.isInvalid && control.errors.required && (
                        <Text
                          style={{
                            color: "#ed2139",
                            fontSize: 12,
                            fontFamily: "Poppins_500Medium",
                          }}
                        >
                          A last name is required.
                        </Text>
                      )}
                    </View>
                  )}
                </Foect.Control>
                <Foect.Control name="currency">
                  {(control) => (
                    <View style={{ flexDirection: "row", columnGap: 10 }}>
                      <SelectDropdown
                        data={currencies}
                        onSelect={(selectedItem) => {
                          setOldCurrency(userForm.currency);
                          control.onChange(selectedItem);
                        }}
                        buttonTextAfterSelection={(selectedItem) => {
                          return selectedItem;
                        }}
                        rowTextForSelection={(item) => {
                          return item;
                        }}
                        defaultButtonText={
                          userForm.currency ? userForm.currency : "ARS"
                        }
                        defaultValue={userForm.currency}
                        buttonStyle={{
                          borderRadius: 5,
                          alignSelf: "center",
                          backgroundColor: colors.card,
                          color: colors.text,
                          borderColor: colors.border,
                          borderWidth: 1,
                          borderStyle: "solid",
                          fontSize: 12,
                          flexGrow: 1,
                        }}
                        buttonTextStyle={{
                          fontFamily: "Poppins_300Light",
                          color: colors.text,
                          fontSize: 12,
                        }}
                        rowTextStyle={{
                          fontFamily: "Poppins_300Light",
                          fontSize: 12,
                        }}
                      />
                      <Button
                        loading={loading}
                        loadingProps={{
                          size: "small",
                          color: colors.background,
                        }}
                        onPress={() => form.submit()}
                        title="Update"
                        titleStyle={{
                          color: colors.background,
                          fontSize: 15,
                          fontFamily: "Poppins_500Medium",
                        }}
                        buttonStyle={{
                          backgroundColor: colors.text,
                          paddingVertical: 11.5,
                          paddingHorizontal: 30,
                          borderRadius: 5,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        disabled={form.isInvalid}
                        disabledStyle={{
                          backgroundColor: colors.disabledColor,
                          color: colors.disabledBackground,
                        }}
                      />
                    </View>
                  )}
                </Foect.Control>

                <View
                  style={{
                    width: "100%",
                    rowGap: 20,
                    paddingTop: form.isInvalid ? 20 : 0,
                  }}
                >
                  <Button
                    title="Logout"
                    titleStyle={{
                      color: colors.background,
                      fontSize: 15,
                      fontFamily: "Poppins_500Medium",
                    }}
                    buttonStyle={{
                      backgroundColor: colors.text,
                      paddingVertical: 10,
                      paddingHorizontal: 30,
                      borderRadius: 5,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={logout}
                  />
                  <Button
                    title="Delete account"
                    titleStyle={{
                      color: "#fff",
                      fontSize: 15,
                      fontFamily: "Poppins_500Medium",
                    }}
                    buttonStyle={{
                      backgroundColor: "#eb1717",
                      paddingVertical: 10,
                      paddingHorizontal: 30,
                      borderRadius: 5,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={toggleDialog}
                  />
                </View>
              </View>
            )}
          </Foect.Form>
        ) : (
          <Text
            style={{
              fontSize: 30,
              fontFamily: "Poppins_500Medium",
              color: colors.text,
              textAlign: "center",
            }}
          >
            Loading ...
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
}
