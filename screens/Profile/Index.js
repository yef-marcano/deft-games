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
import Menu from '../../components/Menu';

import { LinearGradient } from 'expo-linear-gradient';
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

const Profile = ({ navigation }) => {
  const [userdata, setUserdata] = React.useState({});
  const [visible, setVisible] = React.useState(false);

  const [games, setGames] = React.useState([]);


  React.useEffect(() => {
    usuario();
    juegoslista()
  }, []);



  async function juegoslista() {
    try {
      //setVisible(true);
      console.log("HOALALALAL");
      //let datos = { correo: usuario, password: password, }
      await mainApi('', 'juegos', 'GET')
        .then(res => {
          console.log(res.data);
          //      setVisible(false);
          // console.log(res.data);
          if (res.data.status === 200) {
            //console.log(res.data.detalle);
            setGames(res.data.detalle)
            return
          } else {
            AlertBug(res.data.detalle)
          }
        })
    } catch (error) { }
  }

  async function usuario() {
    let user = await AsyncStorage.getItem("@user_data");
    const obj = JSON.parse(user);
    setUserdata(obj);
    console.log(userdata);
  }

  const [selectedCategory, setSelectedCategory] = React.useState(1);



  const juegos = ({ item }) => {
    return (
      <View style={{ marginVertical: SIZES.base }}>
        <LinearGradient
          // Background Linear Gradient
          colors={['#31323B', '#fff']}
          start={[1, 0.7]}
          style={{ borderRadius: 20, padding: 10, paddingHorizontal: 20 }}
        >
          <TouchableOpacity style={{ flex: 1, flexDirection: 'row' }} >
            <View>
              <Image
                source={{ uri: item.img }}
                resizeMode="cover"
                style={{ width: 80, height: 80, borderRadius: 10 }}
              />
            </View>

            <View style={{ flex: 5, marginLeft: SIZES.radius, height: '100%', justifyContent: 'center', }}>
              <View>
                <Text style={{ fontSize: SIZES.h3, color: COLORS.white }}>{item.name}</Text>
                <Text style={{ fontSize: SIZES.body4 / 1.1, color: COLORS.white }}>{'5 PARTIDAS GANADAS'}</Text>
                <Text style={{ fontSize: SIZES.body4 / 1.1, color: COLORS.white }}>{'0 TORNEOS GANADOS'}</Text>
              </View>
            </View>
            <View style={{ color: '#fff', justifyContent: 'flex-end', flex: 2 }} onPress={() => console.log("Bookmark")}>
              <Text style={{ color: '#fff', fontSize: 7 }}>70% VICTORIAS</Text>
            </View>
          </TouchableOpacity>

        </LinearGradient>
      </View>
    )
  }


  function renderCategoryHeader() {
    return (
      <View style={{ flex: 1 }}>


        <FlatList
          data={games}
          renderItem={juegos}
          keyExtractor={item => `${item.id}`}
          showsVerticalScrollIndicator={false}
        />


        <View style={{ justifyContent: "center" }}>
          <TouchableOpacity
            style={{
              width: "80%",
              borderRadius: 20,
              padding: 10,
              marginTop: 10
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

  function headerUser(params) {
    return (
      <>
        <ImageBackground source={images.bgprofile} resizeMode="cover" style={styles.image}>
          <View style={{ height: 120, flexDirection: 'row',
           marginHorizontal: SIZES.padding, marginTop: 20, marginBottom: 10, flex: 1.7 }}>
            <View style={{ padding: 10, flex: 1, alignItems:'flex-end', height: '100%' }}>
              <Image
                source={{ uri: 'http://clipart-library.com/images/ATbrxjpyc.jpg' }}
                resizeMode="cover"
                style={{ position: 'absolute', bottom: 10,width: 70, height: 70, borderRadius: 10, borderRadius: 100, justifyContent: 'flex-end' }}
              />
            </View>
            <View style={{ justifyContent: 'flex-end', padding: 10, flex: 1.4 }}>
              <Text style={{ color: COLORS.white }}>{userdata.nombre}</Text>
              <Text style={{ color: COLORS.white, fontSize: SIZES.h4 }}>Seguidores</Text>
              <Text style={{ color: COLORS.primary }}>0</Text>
            </View>
            <View style={{ justifyContent: 'flex-end', padding: 10, flex: 1.4 }}>
              <Text style={{ color: COLORS.white, fontSize: SIZES.h4 }}>Seguidos</Text>
              <Text style={{ color: COLORS.primary }}>0</Text>
            </View>
            <View style={{ justifyContent: 'flex-end', padding: 10, alignItems: 'center', flex: 0.5 }}>
              <Ionicons name="settings-sharp" size={34} color={COLORS.primary} />
            </View>
          </View>
        </ImageBackground>
      </>
    )
  }

  return (
    <>
      <FullLoading visible={visible} text={"Cerrando sesión"} />
      <SafeAreaView
        style={{ flex: 1, backgroundColor: COLORS.theme, paddingTop: 0 }}
      >
        <Menu />
        <ScrollView style={{ marginTop: SIZES.radius }}>
          {/* Categories Section */}
          <View>{headerUser()}</View>
          <View style={{ marginTop: SIZES.padding, marginHorizontal: SIZES.padding }}>
            <View>{renderCategoryHeader()}</View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Profile;
