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

const Menu = ({ navigation }) => {
  const [userdata, setUserdata] = React.useState({});
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    usuario();
  }, []);

  async function usuario() {
    let user = await AsyncStorage.getItem("@user_data");
    const obj = JSON.parse(user);
    setUserdata(obj);
    console.log(userdata);
  }

  const [selectedCategory, setSelectedCategory] = React.useState(1);

  function renderCategoryHeader() {
    return (
      <View style={{ flex: 1, paddingLeft: SIZES.padding }}>
        <Text style={{ ...FONTS.h2, color: COLORS.white }}> titulo </Text>
        <View style={{ justifyContent: "center" }}>
          <TouchableOpacity
            style={{
              width: "80%",
              borderRadius: 20,
              padding: 10,
              marginTop: 120
            }}
            onPress={() => navigation.navigate("Agregarjuego")}
          >
            <Text style={{ ...FONTS.h2, color: COLORS.game }}>
              {" "}
              + Añadir otro juego{" "}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <>
      <FullLoading visible={visible} text={"Cerrando sesión"} />

      <SafeAreaView
        style={{ flex: 1, backgroundColor: COLORS.black, paddingTop: 0 }}
      >
        <ScrollView style={{ marginTop: SIZES.radius }}>
          {/* Categories Section */}
          <View style={{ marginTop: SIZES.padding }}>
            <View>{renderCategoryHeader()}</View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Menu;
