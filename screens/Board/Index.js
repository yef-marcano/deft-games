import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import { NavBar } from "galio-framework";
import Menu from '../../components/Menu';

import AsyncStorage from "@react-native-async-storage/async-storage";

import FullLoading from "react-native-full-loading";

import { COLORS, FONTS, SIZES, icons, images } from "../../constants";
import { Feather, FontAwesome5 } from "@expo/vector-icons";

import Header from "../../components/Header";

import { styles } from "./styles";

const LineDivider = () => {
  return (
    <View style={{ width: 1, paddingVertical: 18 }}>
      <View
        style={{
          flex: 1,
          borderLeftColor: COLORS.lightGray,
          borderLeftWidth: 1,
        }}
      ></View>
    </View>
  );
};

const Board = ({ navigation }) => {
  const [userdata, setUserdata] = React.useState({});
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    usuario();
  }, []);



  async function logout() {
    setVisible(true)
    await AsyncStorage.removeItem('@user_data');
    navigation.navigate('Login')
    setVisible(false)
}


  async function usuario() {
    let user = await AsyncStorage.getItem("@user_data");
    const obj = JSON.parse(user);
    setUserdata(obj);
    console.log(userdata);
  }

  const [selectedCategory, setSelectedCategory] = React.useState(1);

  function renderCategoryHeader() {
    return (
      <View style={{ flex: 1, }}>
        <Text style={{ ...FONTS.h2, color: COLORS.white }}> titulo </Text>
        <View style={{ justifyContent: "center" }}>
        </View>
      </View>
    );
  }

  return (
    <>
      <FullLoading visible={visible} text={"Cerrando sesión"} />
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.theme, paddingTop: 0 }}>
        <Menu back />
        <ScrollView style={{ marginHorizontal: SIZES.padding}} >
          {/* Categorstylies Section */}
          <View style={{ marginTop: SIZES.padding }}>
            <View>{renderCategoryHeader()}</View>
          </View>
            <TouchableOpacity
              style={{
                width: "100%",
                borderRadius: 10,
                padding: 10,
                marginTop: 120,
                backgroundColor: '#FF5555', alignItems:'center'
              }}
              onPress={() => logout()}
            >
              <Text style={{ ...FONTS.h2, color: COLORS.white }}>
                {" "}
                Cerrar sesion
              </Text>
            </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Board;
