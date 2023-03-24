import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  ImageBackground,
  StatusBar
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { NavBar } from "galio-framework";
import Menu from '../../components/Menu';
import { mainApi } from "../../services";
import { useIsFocused } from "@react-navigation/native";

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

const Sala = ({ route, navigation }) => {
  navigation.setOptions({ tabBarVisible: false })
  const { data } = route.params;
  console.log("@-------------> HOHOHOH")
  console.log(data)

  const isFocused = useIsFocused();
  const [userdata, setUserdata] = React.useState({});
  const [visible, setVisible] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [partida, setPartida] = React.useState(data);

  const [games, setGames] = React.useState([]);
  const [allgames, setAllGames] = React.useState([]);
  //console.log("sala")
  React.useEffect(() => {
    if (isFocused == true) {
    fetchData()
  }
  }, [isFocused]);

  async function fetchData(params) {
   // console.log("fetg")
    setPartida(data)
    await usuario();
    await juegostodos();
    await juegoslista();
    //await sala();
  }

  async function juegostodos() {
    //console.log("todos lso juegos")
    try {
      await mainApi('', 'juegos', 'GET')
        .then(res => {
         // console.log('todos los juegos');
          if (res.data.status === 200) {
            console.log(res.data)
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
          //console.log(res.data.detalle);
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


  async function sala() {
    //setVisible(true)
    let data = await AsyncStorage.getItem("@partida");
    const obj = JSON.parse(data);
    
    //console.log(obj)
    setPartida(obj)
    //navigation.navigate('Login')
    //setVisible(false)
  }


  async function usuario() {
  //  console.log("usuario")
    let user = await AsyncStorage.getItem("@user_data");
    const obj = JSON.parse(user);
    setUserdata(obj);
   // console.log("console de user data")
    //console.log(userdata);
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
    //console.log('----> Partida')
    //console.log(partida)


    return (
      <>
        <ImageBackground source={images.bgprofile} resizeMode="cover" style={styles.image}>
          <View style={{
            height: 120, flexDirection: 'column',
            marginHorizontal: SIZES.padding, marginTop: 20, marginBottom: 10, flex: 1.7
          }}>
            <View style={{ padding: 10, flex: 1.9, alignItems: 'center' }}>
              <Text style={{ color: COLORS.primary, fontSize: SIZES.body2 }}>{'Premio'}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>

                <Text style={{ color: COLORS.white, fontSize: SIZES.body1 }}>{partida?.price}</Text>
                <Image source={images.coindeft} style={{ height: 25, width: 30, }} />

              </View>
            </View>
          </View>
        </ImageBackground>
      </>
    )
  }

  function ComoJugar(params) {
    return (
      <>
        <View style={{ flexDirection: 'row', paddingHorizontal: SIZES.base, alignItems: 'center' }}>
          <Text style={{ color: COLORS.game, padding: 10, fontSize: SIZES.body2 }}>1</Text>
          <Text style={{ color: COLORS.white, width: '90%' }}>Entra en el Chat de Deft Games y agrega a tu rival como amigo en Rocket League Sideswipe.</Text>
        </View>
        <View style={{ flexDirection: 'row', paddingHorizontal: SIZES.base, alignItems: 'center' }}>
          <Text style={{ color: COLORS.game, padding: 10, fontSize: SIZES.body2 }}>2</Text>
          <Text style={{ color: COLORS.white, width: '90%' }}>Entra en partida de grupo invitando previamente a tu rival y elige la arena S.C. FIELD</Text>
        </View>
        <View style={{ flexDirection: 'row', paddingHorizontal: SIZES.base, alignItems: 'center' }}>
          <Text style={{ color: COLORS.game, padding: 10, fontSize: SIZES.body2 }}>3</Text>
          <Text style={{ color: COLORS.white, width: '90%' }}>El jugador que meta más goles gana.</Text>
        </View>
      </>
    )
  }

    var t
    allgames.forEach(element => {
      if(element.id_game === partida?.id_game){
        t = element
      }
    });
    
    console.log("juegos guarddos")
    //console.log(partida)
    var y
    games.forEach(element => {
      if(element.id_game === partida?.id_game){
        y = element
      }
    });
    //console.log(y)


    var name 
    console.log("nombre del contrario")
    



  return (
    <>
      <FullLoading visible={visible} text={"Cerrando sesión"} />
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.theme, paddingTop: 0 }}>
        {/*<Menu back />*/}
        <StatusBar backgroundColor='#000' />
        <ScrollView >
          {/* Categorstylies Section */}
          <View style={{ marginTop: SIZES.radius }}>
            <View>{headerUser()}</View>

            <View style={{ marginHorizontal: SIZES.padding, alignItems: 'center', marginTop: 50 }} >
              <Text style={{ fontSize: SIZES.body2, color: COLORS.white, justifyContent: 'center' }}>{t?.name}</Text>
            </View>
          </View>

          <View style={{ marginHorizontal: SIZES.padding, flexDirection:'row',marginVertical:30 }} >
           
          <View
            style={{
              flex:1,
              alignItems:'center'
            }}
          >
            {/* Book Cover */}
            <View style={{ flexDirection: 'column', backgroundColor: COLORS.lightGray, borderRadius: SIZES.radius, padding: 10,
            width:'100%' }}>
              <Image
                source={{ uri: 'http://clipart-library.com/images/ATbrxjpyc.jpg' }}
                resizeMode="cover"
                style={{
                  height: 120,
                  borderRadius: 20
                }}
              />
              <View  >
                <Text style={{ color: COLORS.white}}> {y?.nombre_eneljuego}</Text>
              </View>
            </View>
          </View>
              <View style={{width:'10%', alignItems:'center',justifyContent:'center'}}>
                <Text style={{ color: COLORS.white }}> {'VS'}</Text>
              </View>
          <View
            style={{
              flex:1,
              alignItems:'center'
            }}
          >
            {/* Book Cover */}
            <View style={{flexDirection: 'column', backgroundColor: COLORS.lightGray, borderRadius: SIZES.radius, padding: 10,
            width:'100%' }}>
              <Image
                source={{ uri: 'http://clipart-library.com/images/ATbrxjpyc.jpg' }}
                resizeMode="cover"
                style={{
                  height: 120,
                  borderRadius: 20
                }}
              />
              <View>
                <Text style={{ color: COLORS.white }}> {'nombre usuario'}</Text>
              </View>
            </View>
          </View>
            
          </View>



          <View style={{
            flexDirection: 'row', marginHorizontal: SIZES.padding,
            marginVertical: 20
          }}>
            <TouchableOpacity style={{
              flexDirection: 'row', alignItems: 'center',
              width: '100%', justifyContent: 'space-between'
            }} onPress={() => setExpanded(!expanded)}>
              <View>
                <Text style={{ fontSize: SIZES.body2, color: COLORS.white }}>{'¿Cómo jugar?'}</Text>
              </View>
              <View style={{ alignSelf: 'flex-end' }}>
                {expanded ?
                  <Feather name="arrow-up" size={31} color="white" /> :
                  <Feather name="arrow-down" size={31} color="white" />}

              </View>
              {/*<Image
              style={{ width: 20, height: 20 }}
              source={expanded ? require('./arrow-up.png') : require('./arrow-down.png')}
            />*/}
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'column' }}>
            {expanded && <ComoJugar />}
          </View>



          <View style={{ marginHorizontal: SIZES.padding, paddingBottom: 200 }}>


            <LinearGradient
              // Background Linear Gradient
              colors={['#0014FF', '#8901E9']}
              start={[2, 0.5]}
              style={{ borderRadius: 10, padding: 10, marginVertical: 30 }}
            >
              <TouchableOpacity onPress={() => navigation.navigate('Chat', {idsala: partida.id_sala})} >
                <View style={{ alignItems: 'center' }}>

                  <Text style={{ fontSize: SIZES.h3, color: COLORS.white }}>{'CHATEA CON TU RIVAL'}</Text>
                </View>
              </TouchableOpacity>

            </LinearGradient>


            <TouchableOpacity
              style={{
                width: "100%",
                borderRadius: 10,
                padding: 10,
                backgroundColor: '#FF5555', alignItems: 'center'
              }}
              onPress={() => calcelar()}
            >
              <Text style={{ fontSize: SIZES.h3, color: COLORS.white }}>
                {" "}
                CANCELAR SALA
              </Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );

  async function calcelar(params) {
    console.log("cancelar");
    navigation.navigate('Home')
  }

};

export default Sala;
