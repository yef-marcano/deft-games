import React from "react";
import {
  SafeAreaView,
  View,
  TextInput,
  Image,
  ScrollView,
  FlatList,
  Text
} from "react-native";
import { NavBar, Button } from "galio-framework";

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

const Addgame = ({ navigation }) => {
  const [userdata, setUserdata] = React.useState({});
  const [visible, setVisible] = React.useState(false);



  const labels = ["Cart","Delivery Address","Order Summary","Payment Method","Track"];
  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize:30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#fe7013',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#fe7013',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#fe7013',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#fe7013',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#fe7013',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: '#fe7013'
  }


 
  /*function onPageChange(position){
    this.setState({currentPosition: position});
  }*/


  React.useEffect(() => {
    usuario();
  }, []);

  async function usuario() {
    let user = await AsyncStorage.getItem("@user_data");
    const obj = JSON.parse(user);
    setUserdata(obj);
    console.log(userdata);
  }
  
  const [player, setPlayer] = React.useState('');

  async function savegame() {
    console.log('');
    return
    try {
      let datos = { correo: usuario,password: password,}
      await mainApi(datos, 'usuario', 'POST')
      .then(res => {
        setVisible(false);
        console.log(res.data);
        if (res.data.status === 200) {
          //console.log(res.data.detalle[0].id);
          let jsonValue = JSON.stringify(res.data.detalle[0])
          AsyncStorage.setItem('@user_data', jsonValue)
          navigation.navigate("Home");
          return
        } else {
          AlertBug(res.data.detalle)
          console.log(res.data.detalle);
        }
      })
    } catch (error) {}
  }


  const [selectedCategory, setSelectedCategory] = React.useState(1);
  const [currentPosition, setCurrentPosition] = React.useState(0);
/*
  React.useEffect(() => {
    usuario();
  }, [currentPosition]);*/



  function renderCategoryHeader() {
    return (
      <View style={{ flex: 1, }}>
        <View style={{ justifyContent: "center" }}>

        <StepIndicator
         customStyles={customStyles}
         currentPosition={currentPosition}
         labels={labels}
    />


        <Text style={{ ...FONTS.h2, color: COLORS.white, marginVertical: 20 }}>Creacion de partida</Text>
          

        <TextInput
          style={styles.input}
          placeholderTextColor={COLORS.white}
          placeholder="juego"
          autoCorrect={false}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor={COLORS.white}
          placeholder="Nombre de player"
          onChangeText={setPlayer}
          value={player}
          autoCorrect={false}
        />
        <Button  color="success" onPress={() => savegame()}> Guardar </Button>
        </View>
      </View>
    );
  }

  //const navigation = useNavigation();

  return (
    <>
      <FullLoading visible={visible} text={"Cargando"} />
      <SafeAreaView style={{ flex: 1,  backgroundColor: COLORS.theme }} >
        <ScrollView style={{ marginTop: SIZES.radius }}>
          {/* Categories Section */}
          <View style={{ marginTop: SIZES.padding, marginHorizontal: SIZES.padding }}>
            <View>{renderCategoryHeader()}</View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Addgame;
