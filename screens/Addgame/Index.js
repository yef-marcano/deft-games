import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, FlatList, Image, ScrollView,
  TextInput
} from 'react-native';

import Menu from '../../components/Menu';
import { COLORS, FONTS, SIZES, icons, images } from "../../constants";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from 'expo-linear-gradient';

import { useIsFocused } from "@react-navigation/native";
import { AlertBug, AlertSuccess } from "../../helper/Alert";
import { mainApi } from "../../services";

const steps = ['Selecciona el juego', 'Agrega tu usuario'];

const Addgame = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [currentStep, setCurrentStep] = useState(0);
  const [userdata, setUserdata] = React.useState({});
  const [visible, setVisible] = React.useState(false);
  const [games, setGames] = React.useState([]);
  const [game, setGame] = useState(0);
  const [usuarioName, setUsuarioName] = React.useState('');

  navigation.setOptions({ tabBarVisible: false })

  React.useEffect(() => {
    usuario();
    juegoslista()
  }, []);



  React.useEffect(() => {
    if (isFocused == true) {
      setCurrentStep(0)
      setUsuarioName('')
    }
  }, [isFocused]);



  const juegosCard = ({ item, index }) => {
    return (
      <View key={index} style={{
        marginVertical: SIZES.base, width: SIZES.width / 3,
        flexDirection: 'row', alignItems: 'center'
      }}>
        <LinearGradient
          // Background Linear Gradient
          colors={['#31323B', '#fff']}
          start={[1, 0.7]}
          style={{ borderRadius: 20, padding: 10, paddingHorizontal: 20 }}
        >
          <TouchableOpacity onPress={() => paso1(item?.id_game)} style={{ flex: 1, flexDirection: 'column' }}  >
            <View style={{ alignItems: 'center' }}>
              <Image
                source={{ uri: item?.img }}
                resizeMode="cover"
                style={{ width: 80, height: 80, borderRadius: 10 }}
              />
              <Text style={{ fontSize: SIZES.h3, color: COLORS.white }}>{item?.name}</Text>
            </View>
          </TouchableOpacity>

        </LinearGradient>
      </View>
    )
  }


  const ModoList = ({ item, index }) => {
    return (
      <View key={index} style={{
        marginVertical: SIZES.base, width: SIZES.width / 3,
        flexDirection: 'row', alignItems: 'center'
      }}>
        <LinearGradient
          // Background Linear Gradient
          colors={['#31323B', '#fff']}
          start={[1, 0.7]}
          style={{ borderRadius: 20, padding: 10, paddingHorizontal: 20 }}
        >
          <TouchableOpacity style={{ flex: 1, flexDirection: 'column' }} >
            <View style={{ alignItems: 'center' }}>
              <Image
                source={{ uri: item.img }}
                resizeMode="cover"
                style={{ width: 80, height: 80, borderRadius: 10 }}
              />
              <Text style={{ fontSize: SIZES.h3, color: COLORS.white }}>{item.name}</Text>
            </View>
          </TouchableOpacity>

        </LinearGradient>
      </View>
    )
  }



  const Juegos = () => {
    return (
      <View style={{ flexDirection: 'row', paddingHorizontal: 20, marginBottom: 20 }}>
        <FlatList
          numColumns={3}
          data={games}
          renderItem={juegosCard}
          keyExtractor={(item, index) => item.key}
          showsVerticalScrollIndicator={false}
        />
      </View>
    )
  }


  const Modo = () => {
    return (
      <View style={{ flexDirection: 'column', paddingHorizontal: 20, marginBottom: 20 }}>
        <Text style={{ fontSize: SIZES.h3, color: COLORS.white, marginVertical: SIZES.base }}>  Nombre de usuario dentro del juego: </Text>


        <TextInput
          style={styles.input}
          onChangeText={setUsuarioName}
          placeholder="Ingrese el nombre"
          placeholderTextColor={COLORS.white}
          value={usuarioName}
        />
        <View style={{ flexDirection: 'row' }}>

          <View style={{ marginVertical: 20, alignItems: 'flex-start' }}>
            <TouchableOpacity
              onPress={() => {
                save()
              }}
              disabled={currentStep === 0}
              style={[
                styles.button,
                { backgroundColor: currentStep === 0 ? '#ddd' : '#7C24BA' },
              ]}
            >
              <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
          </View>

          <View style={{ marginVertical: 20, alignItems: 'flex-start' }}>
            <TouchableOpacity
              onPress={() => {
                setCurrentStep(currentStep - 1);
              }}
              disabled={currentStep === 0}
              style={[
                styles.button,
                { backgroundColor: currentStep === 0 ? '#ddd' : '#fff' },
              ]}
            >
              <Text style={styles.buttonBack}>Anterior</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    )
  }
  const Nivelado = () => {
    return (
      <View style={{ flexDirection: 'column', paddingHorizontal: 20, marginBottom: 20 }}>
        <Text style={{ fontSize: SIZES.h3, color: COLORS.white, marginVertical: SIZES.base }}>Si marcas NO, un rival de nivel superior podrá aceptar la partida. En caso contrario, la jugarás contra un rival de tu mismo nivel.</Text>
        <View style={{ flexDirection: 'row', marginVertical: 20 }}>
          <TouchableOpacity onPress={() => paso3()} style={{
            flexDirection: 'row', padding: 20,
            borderColor: '#FEA800', borderWidth: 2, borderRadius: 100,
            width: 90, height: 90, justifyContent: 'center', alignItems: 'center', marginRight: 10
          }} >
            <Text style={{ fontSize: SIZES.h3, color: COLORS.white }}>{'Si'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => paso3()} style={{
            flexDirection: 'row', padding: 20,
            borderColor: '#FEA800', borderWidth: 2, borderRadius: 100,
            width: 90, height: 90, justifyContent: 'center', alignItems: 'center'
          }} >
            <Text style={{ fontSize: SIZES.h3, color: COLORS.white }}>{'No'}</Text>

          </TouchableOpacity>
        </View>
      </View>
    )
  }
  const Ganar = () => {
    return (
      <View style={{ flexDirection: 'column', paddingHorizontal: 20, marginBottom: 20 }}>
        <View style={{ flexDirection: 'row', marginVertical: 20 }}>
          <TouchableOpacity onPress={() => paso3()} style={{
            flexDirection: 'row', padding: 20,
            borderColor: '#FEA800', borderWidth: 2, borderRadius: 100,
            width: 90, height: 90, justifyContent: 'center', alignItems: 'center', marginRight: 10
          }} >
            <Text style={{ fontSize: SIZES.h3, color: COLORS.white }}>{'Si'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => paso3()} style={{
            flexDirection: 'row', padding: 20,
            borderColor: '#FEA800', borderWidth: 2, borderRadius: 100,
            width: 90, height: 90, justifyContent: 'center', alignItems: 'center'
          }} >
            <Text style={{ fontSize: SIZES.h3, color: COLORS.white }}>{'No'}</Text>

          </TouchableOpacity>
        </View>
      </View>
    )
  }


  return (
    <>

      <Menu back />
      <View style={styles.container}>

        <Text style={{ ...FONTS.h2, color: COLORS.white, marginVertical: 20 }}>Agregar juego</Text>

        {steps.map((step, index) => (
          <View key={step}>
            <View style={styles.stepContainer}>
              <View
                style={[
                  styles.stepNumberContainer,
                  { backgroundColor: index === currentStep ? '#7C24BA' : '#ddd' },
                ]}
              >
                <Text style={styles.stepNumberText}>{index + 1}</Text>

              </View>
              <Text style={styles.stepText}>{step}</Text>

            </View>
            {(currentStep === 0 && index === currentStep) ? <Juegos /> : ''}
            {(currentStep === 1 && index === currentStep) ? Modo() : ''}
            {(currentStep === 2 && index === currentStep) ? <Nivelado /> : ''}
            {(currentStep === 3 && index === currentStep) ? <Ganar /> : ''}
          </View>
        ))}
      </View>
    </>
  );




  async function juegoslista() {
    try {
      await mainApi('', 'juegos', 'GET')
        .then(res => {
          if (res.data.status === 200) {
            setGames(res.data.detalle)
            return
          } else {
            AlertBug(res.data.detalle)
          }
        })
    } catch (error) { }
  }

  async function paso1(idgame) {
    setCurrentStep(currentStep + 1);
    setGame(idgame)
  }
  async function paso2(params) {
    setCurrentStep(currentStep + 1);
  }
  async function paso3(params) {
    setCurrentStep(currentStep + 1);
  }

  async function save() {
    let user = await AsyncStorage.getItem("@user_data");
    const obj = JSON.parse(user);

    let data = { usuario: obj.id, idgame: game, nombrejuego: usuarioName }

    try {
      await mainApi(data, 'juegosguardados', 'POST')
        .then(res => {
          console.log(res.data);
          if (res.data.status === 200) {
            AlertSuccess(res.usuario, 'Home', navigation)
            return
          } else {
            AlertBug(res.data.usuario)
          }
        })
    } catch (error) {
      console.log(error);
    }
  }
  async function usuario() {
    let user = await AsyncStorage.getItem("@user_data");
    const obj = JSON.parse(user);
    setUserdata(obj);
  }
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    borderColor: COLORS.white,
    color: COLORS.white,

  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding,
    justifyContent: 'center'
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  stepText: {
    fontSize: 18,
    marginLeft: 20,
    marginRight: 10,
    color: COLORS.white
  },
  stepNumberContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: {
    fontSize: 18,
    color: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
  buttonBack: {
    fontSize: 18,
    color: '#000',
  },
});

export default Addgame;