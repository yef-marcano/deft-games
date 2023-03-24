import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  ImageBackground
} from "react-native";
import { NavBar } from "galio-framework";
import Menu from '../../components/Menu';
import { mainApi } from "../../services";

import AsyncStorage from "@react-native-async-storage/async-storage";

import FullLoading from "react-native-full-loading";

import { COLORS, FONTS, SIZES, icons, images } from "../../constants";
import { Feather, Ionicons } from "@expo/vector-icons";

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


  function headerUser(params) {
    return (
      <>
        <ImageBackground source={images.bgprofile} resizeMode="cover" style={styles.image}>
          <View style={{
            height: 120, flexDirection: 'row',
            marginHorizontal: SIZES.padding, marginTop: 20, marginBottom: 10, flex: 1.7
          }}>
            <View style={{ padding: 10, flex: 1, alignItems: 'flex-end', height: '100%' }}>
              <Image
                source={{ uri: 'http://clipart-library.com/images/ATbrxjpyc.jpg' }}
                resizeMode="cover"
                style={{ position: 'absolute', bottom: 10, width: 70, height: 70, borderRadius: 10, borderRadius: 100, justifyContent: 'flex-end' }}
              />
            </View>
            <View style={{ justifyContent: 'flex-end', padding: 10, flex: 1.9 }}>
              <Text style={{ color: COLORS.white }}>{userdata.nombre}</Text>
            </View>
            <View style={{ justifyContent: 'flex-end', padding: 10, flex: 1.4 }}>
            </View>
            <View style={{ justifyContent: 'flex-end', padding: 10, alignItems: 'center', flex: 0.5 }}>

            </View>
          </View>
        </ImageBackground>
      </>
    )
  }


  function MiniCard({ data, ...rest }) {
    return (
      <>
        <TouchableOpacity onPress={() => navigation.navigate(data?.navigate)} style={{
          paddingVertical: 20, flexDirection: 'row',
          borderBottomColor: '#23262D', borderBottomWidth: 1
        }}>
          <Ionicons name={data?.icon} size={34} color={data?.color} style={{ marginEnd: 20 }} />
          <Text style={{ color: data?.colorFinal ? COLORS.primary : COLORS.white, fontSize: SIZES.body1 }}>{data?.title}</Text>
        </TouchableOpacity>
      </>
    )

  }

  let imenu = [
    {
      title: 'Últimos ganadores',
      icon: 'flag-outline',
      color: '#4B87FF',
      navigate: 'Home'
    }, {
      title: 'Invita a un amigo',
      icon: 'send',
      color: '#7C24BA',
      navigate: 'InvitaAmigo'
    }, {
      title: '¡Hazte Premium!',
      icon: 'ios-cash-outline',
      colorFinal: true,
      color: '#FEA800',
      navigate: 'HazPremium'
    }, {
      title: 'Ayuda',
      icon: 'search',
      color: '#7C24BA',
      navigate: 'Ayuda'
    }
  ]

  return (
    <>
      <FullLoading visible={visible} text={"Cerrando sesión"} />
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.theme, paddingTop: 0 }}>
        <Menu back />
        <ScrollView >
          {/* Categorstylies Section */}
          <View style={{ marginTop: SIZES.radius }}>
            <View>{headerUser()}</View>
            <View style={{ marginHorizontal: SIZES.padding }} >

              {imenu.map((item, index) => (
                <MiniCard data={item} />
              ))}
            </View>
          </View>


          <View style={{ marginHorizontal: SIZES.padding, paddingBottom: 200 }}>
            <TouchableOpacity
              style={{
                width: "100%",
                borderRadius: 10,
                padding: 10,
                marginTop: 50,
                backgroundColor: '#FF5555', alignItems: 'center'
              }}
              onPress={() => logout()}
            >
              <Text style={{ ...FONTS.h2, color: COLORS.white }}>
                {" "}
                Cerrar sesión
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Board;
