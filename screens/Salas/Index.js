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

const Salas = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [userdata, setUserdata] = React.useState({});
  const [visible, setVisible] = React.useState(false);
  const [salasdispo, setSalasdispo] = React.useState([]);
  const [allgames, setAllGames] = React.useState([]);

  /*React.useEffect(() => {
    usuario();
    salasDisponibles();
  }, []);*/
  React.useEffect(() => {
    if (isFocused == true) {
    fetchData()
  }
  }, [isFocused]);


  async function fetchData(params) {
    // console.log("fetg")
     await usuario();
     await juegostodos();
     //await juegoslista();
     await salasDisponibles();
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

  
  async function salasDisponibles() {
    //let user = await AsyncStorage.getItem("@user_data");
    //const obj = JSON.parse(user);
    //console.log('Estaparta ------> juegosguardados/'+obj.id);
    try {
      await mainApi('', 'salasdisonibles', 'GET')
        .then(res => {
          
          //console.log(res.data.detalle);
          if (res.data.status === 200) {
            setSalasdispo(res.data.detalle)
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
    return (
      <>
        <ImageBackground source={images.bgprofile} resizeMode="cover" style={styles.image}>
          <View style={{
            height: 120, flexDirection: 'row',
            marginHorizontal: SIZES.padding, marginTop: 20, marginBottom: 10, flex: 1.7
          }}>
            <View style={{ justifyContent: 'center', padding: 10, flex: 1, alignItems:'center' }}>
              <Text style={{ color: COLORS.white, fontSize: SIZES.body1 }}>{'Salas disponibles'}</Text>
              <Text style={{ color: COLORS.white, fontSize: SIZES.body3 }}>{'Partidas contra jugadores '}</Text>
            </View>
          </View>
        </ImageBackground>
      </>
    )
  }


  function MiniCard({ data, ...rest }) {
    
    var t
    allgames.forEach(e => {
      salasdispo.forEach(element => {
        if(e.id_game === element?.id_game){
          t = e
        }
      })
      /*if(element.id_game === salasdispo?.id_game){
        t = element
      }*/
    });


    return (
      <>
        <TouchableOpacity onPress={() => irasala(data)} style={{paddingVertical: 20, flexDirection:'row',
        borderBottomColor: '#23262D', borderBottomWidth: 1, alignItems:'center'}}>
          {/*<Ionicons name={t?.img} size={34} color={data?.color} style={{marginEnd: 20}} />*/}
          <View>
          <Image
                source={{ uri: t?.img }}
                resizeMode="cover"
                style={{ width: 50, height: 50, borderRadius: 80, marginHorizontal: 10 }}
              />
            
          </View>
          <View>
          <Text style={{color: data?.colorFinal ? COLORS.primary : COLORS.white, fontSize: SIZES.body1}}>{t?.name}</Text>
          <Text style={{color: data?.colorFinal ? COLORS.primary : COLORS.white, fontSize: SIZES.body1}}>{'Apuesta de ' + data?.price}</Text>

          </View>
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

              {salasdispo.map((item, index) => (
                <MiniCard data={item} />
              ))}
            </View>
          </View>


          <View style={{ marginHorizontal: SIZES.padding, paddingBottom: 200 }}>
         
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );

  async function irasala(params) {
    //console.log(params)
    let jsonValue = JSON.stringify(params)
    //console.log(jsonValue)
    await AsyncStorage.setItem('partida', jsonValue)
    
    navigation.navigate('Sala', {data: params})
  }
};

export default Salas;
