import { Text, View } from "react-native";
import { SearchBar, Icon } from "@rneui/themed";
import { useState, useRef } from "react";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from "react-native-popup-menu";
import { useTheme } from "@react-navigation/native";
const { Popover } = renderers;
export default function HeaderComponent({ keyword, setKeyword }) {
  // const [search, setSearch] = useState('')
  const [opened, setOpened] = useState(false);
  const searchBar = useRef(null);

  const cancelSearch = () => {
    if (searchBar.current) {
      searchBar.current.blur();
    }
  };

  function onTriggerPress() {
    setOpened(true);
  }

  function onBackdropPress() {
    setOpened(false);
  }

  const { colors } = useTheme();

  return (
    <View
      style={{
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        columnGap: 35,
        height: "10%",
        paddingHorizontal: 5,
      }}
    >
      <SearchBar
        ref={searchBar}
        placeholder="Search by title"
        onChangeText={(newValue) => setKeyword(newValue)}
        onClear={() => cancelSearch()}
        value={keyword}
        containerStyle={{
          flex: 1,
          borderRadius: 50,
          backgroundColor: "transparent",
        }}
        inputContainerStyle={{
          borderRadius: 50,
          backgroundColor: colors.text,
        }}
        inputStyle={{
          fontSize: 10,
          fontFamily: "Poppins_300Light",
          color: colors.background,
        }}
      />
      <Menu
        opened={opened}
        onBackdropPress={() => onBackdropPress()}
        renderer={Popover}
        rendererProps={{ placement: "bottom", width: 150 }}
      >
        <MenuTrigger onPress={() => onTriggerPress()}>
          <View
            style={{ flexDirection: "row", alignItems: "center", columnGap: 3 }}
          >
            <Icon
              name={opened ? "chevron-up" : "chevron-down"}
              type="font-awesome"
              color={colors.text}
              iconStyle={{ fontSize: 12, marginBottom: 3 }}
            ></Icon>
            <Text
              style={{
                color: colors.text,
                fontSize: 12,
                fontFamily: "Poppins_300Light",
              }}
            >
              More options
            </Text>
          </View>
        </MenuTrigger>
        <MenuOptions>
          <MenuOption>
            <Text>Profile</Text>
          </MenuOption>
          <MenuOption>
            <Text>Logout</Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </View>
  );
}
