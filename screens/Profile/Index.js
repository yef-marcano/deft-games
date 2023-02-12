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
import { useIsFocused } from "@react-navigation/native";

import { LinearGradient } from 'expo-linear-gradient';
import { mainApi } from "../../services";
import AsyncStorage from "@react-native-async-storage/async-storage";

import FullLoading from "react-native-full-loading";
import { AlertBug } from "../../helper/Alert";

import { COLORS, FONTS, SIZES, icons, images } from "../../constants";
import { Feather, Ionicons } from "@expo/vector-icons";

import Header from "../../components/Header";

import { styles } from "./styles";


const Profile = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [userdata, setUserdata] = React.useState({});
  const [visible, setVisible] = React.useState(false);

  const [games, setGames] = React.useState([]);
  const [allgames, setAllGames] = React.useState([]);



  React.useEffect(() => {
    if (isFocused == true) {
    fetchData()
    }
  }, [isFocused]);

  async function fetchData(params) {
    await usuario();
    await juegostodos();
    await juegoslista();
    
  }

  async function juegostodos() {
    try {
      await mainApi('', 'juegos', 'GET')
        .then(res => {
          //console.log(res.data);
          if (res.data.status === 200) {
            setAllGames(res.data.detalle)
            return
          } else {
            //console.log('error llamando a todos los juegos')
            AlertBug(res.data.detalle)
          }
        })
    } catch (error) {
      console.log('-----> Error');
      console.log(error);
     }
  }

  async function juegoslista() {
    let user = await AsyncStorage.getItem("@user_data");
    const obj = JSON.parse(user);
    //console.log('Estaparta ------> juegosguardados/'+obj.id);
    try {
      await mainApi('', 'juegosguardados/'+obj.id, 'GET')
        .then(res => {
          console.log(res.data.detalle);
          if (res.data.status === 200) {
            setGames(res.data.detalle)
            return
          } else {
            console.log('error de juegos guardados')
            AlertBug(res.data.detalle)
          }
        })
    } catch (error) {
      console.log('-----> Error');
      console.log(error); }
  }

  async function usuario() {
    let user = await AsyncStorage.getItem("@user_data");
    const obj = JSON.parse(user);
    setUserdata(obj);
  }

  const [selectedCategory, setSelectedCategory] = React.useState(1);



  const juegos = ({ item, index }) => {
    var t
    allgames.forEach(element => {
      if(element.id_game === item.id_game){
        t = element
      }
    });

    return (
      <View  key={index} style={{ marginVertical: SIZES.base }}>
        <LinearGradient
          // Background Linear Gradient
          colors={['#31323B', '#fff', '#31323B']}
          start={[-1, -10]}
          style={{ borderRadius: 20, padding: 10, paddingHorizontal: 20 }}
        >
          <View style={{ flex: 1, flexDirection: 'row' }} >
            {<View>
              <Image
                source={{ uri: t?.img }}
                resizeMode="cover"
                style={{ width: 80, height: 80, borderRadius: 10, marginHorizontal: -10 }}
              />
            </View>}

            <View style={{ flex: 5, marginLeft: SIZES.padding, height: '100%', justifyContent: 'center'}}>
              <View>
                <Text style={{ ...FONTS.h3, color: COLORS.white }}>{t?.name}</Text>
                <Text style={{ fontSize: SIZES.body4 / 1.1, color: COLORS.white }}>{item?.partidas_ganadas + ' Partidas ganadas'}</Text>
                <Text style={{ fontSize: SIZES.body4 / 1.1, color: COLORS.white }}>{item?.torneos_ganados + ' Torneos ganados'}</Text>
              </View>
            </View>
            <View style={{ ...FONTS.h4, color: COLORS.game, justifyContent: 'flex-end', flex: 3 }} onPress={() => console.log("Bookmark")}>
              <Text style={{ ...FONTS.h8, color: COLORS.game}}>70% VICTORIAS</Text>
            </View>
          </View>

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
          keyExtractor={(item, index) => index}
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
