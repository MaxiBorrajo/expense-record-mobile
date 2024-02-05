import { StyleSheet, Text, View, TextInput, SafeAreaView, Dimensions } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import SelectDropdown from "react-native-select-dropdown";
import { currencies } from "../utils/utils";
import { Button, Dialog } from "@rneui/themed";
import ButtonComponent from "../components/ButtonComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../context/UserContext";
import { useNavigation } from "@react-navigation/native";
import ErrorComponent from "../components/ErrorComponent";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [errorMessage, setErrorMessage] = useState(null);
  const [userForm, setUserForm] = useState({
    firstName: "",
    lastName: "",
    currency: "",
  });
  const [oldCurrency, setOldCurrency] = useState(null);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const { applyConversion } = useContext(ExpenseContext);
  const { deleteCurrentUser, updateCurrentUser, getCurrentUser } =
    useContext(UserContext);

  const toggleDialog = () => {
    setVisible(!visible);
  };

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

  const updateUser = async () => {
    setLoading(true);
    setErrorMessage(null);
    const validation = validateUserForm();

    if (validation && oldCurrency && oldCurrency != userForm.currency) {
      await updateCurrentUser(userForm);
      await applyConversion({
        old_currency: oldCurrency,
        new_currency: userForm.currency,
      });
      setLoading(false);
      navigation.navigate("Main");
    } else if (
      (validation && !oldCurrency) ||
      (validation && oldCurrency && oldCurrency === userForm.currency)
    ) {
      await updateCurrentUser(userForm);
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

  const validateUserForm = () => {
    if (!userForm.firstName) {
      setErrorMessage("A first name must be provided");
      return false;
    }

    if (!userForm.lastName) {
      setErrorMessage("A last name must be provided");
      return false;
    }

    return true;
  };

  return (
    <SafeAreaView style={{ flex: 1, minHeight: Dimensions.get("window").height }}>
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
            Delete account
          </Text>
          <Text
            style={{
              fontFamily: "Poppins_300Light",
              color: "white",
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
              onPress={() => deleteAccount()}
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
        <Text style={styles.title}>Profile</Text>
        {errorMessage ? <ErrorComponent errorMessage={errorMessage} /> : null}
        <View
          style={{
            width: "100%",
            alignItems: "center",
            backgroundColor: "#1c1917",
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 5,
            elevation: 5,
            borderColor: "white",
            borderWidth: 1,
            borderStyle: "solid",
          }}
        >
          <TextInput
            style={{
              color: "white",
              fontFamily: "Poppins_300Light",
              fontSize: 12,
              width: "100%",
              paddingRight: 15,
            }}
            onChangeText={(text) => {
              setUserForm({ ...userForm, firstName: text });
            }}
            value={userForm.firstName}
            placeholder="First Name"
            placeholderTextColor="white"
          />
        </View>
        <View
          style={{
            width: "100%",
            alignItems: "center",
            backgroundColor: "#1c1917",
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 5,
            elevation: 5,
            borderColor: "white",
            borderWidth: 1,
            borderStyle: "solid",
          }}
        >
          <TextInput
            style={{
              color: "white",
              fontFamily: "Poppins_300Light",
              fontSize: 12,
              width: "100%",
              paddingRight: 15,
            }}
            onChangeText={(text) => {
              setUserForm({ ...userForm, lastName: text });
            }}
            value={userForm.lastName}
            placeholder="Last Name"
            placeholderTextColor="white"
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            columnGap: 10,
            width: "100%",
          }}
        >
          <SelectDropdown
            data={currencies}
            onSelect={(selectedItem) => {
              setOldCurrency(userForm.currency);
              setUserForm({ ...userForm, currency: selectedItem });
            }}
            buttonTextAfterSelection={(selectedItem) => {
              return selectedItem;
            }}
            rowTextForSelection={(item) => {
              return item;
            }}
            defaultButtonText={userForm.currency ? userForm.currency : "ARS"}
            defaultValue={userForm.currency}
            buttonStyle={{
              borderRadius: 5,
              alignSelf: "center",
              height: "100%",
              backgroundColor: "#1c1917",
              color: "white",
              borderColor: "white",
              borderWidth: 1,
              borderStyle: "solid",
              flexGrow: 1,
            }}
            buttonTextStyle={{ fontFamily: "Poppins_300Light", color: "white" }}
            rowTextStyle={{ fontFamily: "Poppins_300Light" }}
          />
          <Button
            loading={loading}
            loadingProps={{
              size: "small",
              color: "black",
            }}
            onPress={updateUser}
            title="Update"
            titleStyle={{
              color: "#000",
              fontSize: 15,
              fontFamily: "Poppins_500Medium",
            }}
            buttonStyle={{
              backgroundColor: "#fff",
              paddingVertical: 10,
              paddingHorizontal: 30,
              borderRadius: 5,
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            columnGap: 10,
            width: "100%",
          }}
        >
          <Button
            title="Logout"
            titleStyle={{
              color: "#000",
              fontSize: 15,
              fontFamily: "Poppins_500Medium",
            }}
            buttonStyle={{
              backgroundColor: "#fff",
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    color: "fff",
    paddingHorizontal: 30,
    rowGap: 50,
    justifyContent: "center",
    minHeight: Dimensions.get("window").height
  },
  title: {
    fontSize: 20,
    fontFamily: "Poppins_500Medium",
    color: "#fff",
  },
});
