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
import { mainApi } from "../../services";

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

const CrearPartida = ({ navigation }) => {
  const [userdata, setUserdata] = React.useState({});
  const [juegos, setJuegos] = React.useState({});
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    calljuegos();
  }, []);

  async function calljuegos() {
    let user = await AsyncStorage.getItem("@user_data");
    let objuser = JSON.parse(user);
    console.log(objuser);
    console.log("juegos guardados por id juegosguardados/" + objuser.id);

    await mainApi("", "juegosguardados/" + objuser.id, "GET").then((res) => {
      //      setVisible(false);
      // console.log(res.data);
      if (res.data.status === 200) {
        console.log('jeegue');
        console.log(res.data);
        res.data.total_registros === 0 ? setJuegos(0) : setJuegos(res.data.detalle[0])
        //console.log(res.data.detalle);
        
        return;
      } else {
        AlertBug("error saldo");
      }
    });
    /*let user = await AsyncStorage.getItem('@user_data');
        const obj = JSON.parse(user);
        setUserdata(obj)
        console.log(userdata);*/
  }

  const [selectedCategory, setSelectedCategory] = React.useState(1);

  function renderCategoryHeader() {
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          style={{ flex: 1, marginRight: SIZES.padding }}
          onPress={() => setSelectedCategory(item.id)}
        >
          <Text style={{ ...FONTS.h2, color: COLORS.white }}>{item.name}</Text>
        </TouchableOpacity>
      );
    };

    return (
      <View>
    {juegos !== 0 &&
        <View style={{  padding: SIZES.padding }}>
          <Text style={{ ...FONTS.h2, color: COLORS.white }}>
            Juegos registrados
          </Text>
          <FlatList
            data={juegos}
            showsHorizontalScrollIndicator={false}
            renderItem={renderItem}
            keyExtractor={(item) => `${item.id}`}
            horizontal
          />
        </View>
    }
    {juegos === 0 &&
        <View style={{  padding: SIZES.padding }}>
          <Text style={{ ...FONTS.h2, color: COLORS.white }}>
            No tiene juegos registrado para crear partidas
          </Text>
        </View>
    }

      </View>
    );
  }

  return (
    <>
      <FullLoading visible={visible} text={"Cerrando sesión"} />
      <SafeAreaView
        style={{ flex: 1, backgroundColor: COLORS.black, paddingTop: 0 }}
      >
        {renderCategoryHeader()}
      </SafeAreaView>
    </>
  );
};

export default CrearPartida;
