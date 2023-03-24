import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, ScrollView } from 'react-native';
import { COLORS, FONTS, SIZES, icons, images } from "../../constants";
import { LinearGradient } from 'expo-linear-gradient';
import { mainApi } from "../../services";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Menu from '../../components/Menu';

const steps = ['Selecciona el juego', 'Tipo de partida', '¿Nivelado?', '¿Cuanto quieres ganar?'];

const CrearPartida = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [currentStep, setCurrentStep] = useState(0);

  const [userdata, setUserdata] = React.useState({});
  const [visible, setVisible] = React.useState(false);

  const [games, setGames] = React.useState([]);

  const [selectedId, setSelectedId] = useState(null);
  const [idgame, setIdgame] = useState(0);
  const [price, setPrice] = useState(0);

  let data = [
    {
      'id': 0,
      'price': 9,
      'cuota': 5
    },
    {
      'id': 1,
      'price': 18,
      'cuota': 10
    },
    {
      'id': 2,
      'price': 45,
      'cuota': 25
    },
    {
      'id': 3,
      'price': 90,
      'cuota': 50
    },
    {
      'id': 4,
      'price': 180,
      'cuota': 100
    },
    {
      'id': 5,
      'price': 450,
      'cuota': 250
    }
  ]



  React.useEffect(() => {
    usuario();
    juegoslista()
  }, []);

  React.useEffect(() => {
    if (isFocused == true) {
      setCurrentStep(0)
      // setUsuarioName('')
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


  const ganarCard = ({ item, index }) => {
    return (
      <View key={index} style={{
        marginVertical: SIZES.base, width: '30%',
        flexDirection: 'row', alignItems: 'center', padding: 2,
        margin: 5
      }}>
        <LinearGradient
          // Background Linear Gradient
          colors={item.id === selectedId ? ['#2E004EA6', '#8901E9'] : ['#fff', '#000']}
          start={[2, 0.5]}
          style={{ borderRadius: 20, padding: 10, paddingHorizontal: 10, width: '100%' }}
        >
          <TouchableOpacity onPress={() => {setSelectedId(item.id === selectedId ? null : item.id), setPrice(item?.price)}}  style={{ flex: 1, flexDirection: 'column' }}  >
            <View style={{ alignItems: 'center', justifyContent:'center', flexDirection: 'row', alignItems: 'center' }}>

              <Text style={{ fontSize: SIZES.h1, color: COLORS.white }}>{item?.price}</Text>
              <Image source={images.coindeft} />
            </View>
            <View style={{ alignItems: 'center' }}>

              <Text style={{ fontSize: SIZES.h3, color: COLORS.white }}>{'Cuota ' + item?.cuota}</Text>
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
        <Text style={{ fontSize: SIZES.h3, color: COLORS.white, marginVertical: SIZES.base }}>  Modo: </Text>
        <LinearGradient
          // Background Linear Gradient
          colors={['#31323B', '#fff']}
          start={[1, 0.7]}
          style={{ borderRadius: 20, padding: 10, paddingHorizontal: 20, flexDirection: 'row', width: 100 }}
        >
          <TouchableOpacity onPress={() => paso2()} style={{ flex: 1, flexDirection: 'column' }} >
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: SIZES.h3, color: COLORS.white }}>{'1 vs 1'}</Text>
            </View>
          </TouchableOpacity>

        </LinearGradient>
        <View style={{ marginVertical: 20, alignItems: 'flex-start' }}>
          <TouchableOpacity
            onPress={() => {
              setCurrentStep(currentStep - 1);
            }}
            disabled={currentStep === 0}
            style={[
              styles.button,
              { backgroundColor: currentStep === 0 ? '#ddd' : '#7C24BA' },
            ]}
          >
            <Text style={styles.buttonText}>Anterior</Text>
          </TouchableOpacity>
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
      <View style={{  marginBottom: 20 }}>
        <View style={{flexDirection: 'row'}}>
        <FlatList
          numColumns={3}
          data={data}
          renderItem={ganarCard}
          keyExtractor={(item, index) => item.key}
          showsVerticalScrollIndicator={false}
        />
        </View>
        <LinearGradient
          // Background Linear Gradient
          colors={['#0014FF', '#8901E9']}
          start={[2, 0.5]}
          style={{ borderRadius: 10, padding: 10, marginVertical: 30 }}
        >
          <TouchableOpacity onPress={() => crearPartida()} >
            <View style={{ alignItems: 'center' }}>

              <Text style={{ fontSize: SIZES.h1, color: COLORS.white }}>{'CREAR PARTIDA'}</Text>
            </View>
          </TouchableOpacity>

        </LinearGradient>

      </View>
    )
  }


  return (
    <>
      <Menu back />
      <ScrollView style={styles.container}>

        <Text style={{ ...FONTS.h2, color: COLORS.white, marginVertical: 20 }}>Creación de partida</Text>
        <View style={{paddingBottom: 200}}>
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
            {(currentStep === 1 && index === currentStep) ? <Modo /> : ''}
            {(currentStep === 2 && index === currentStep) ? <Nivelado /> : ''}
            {(currentStep === 3 && index === currentStep) ? <Ganar /> : ''}


          </View>
        ))}
        <View style={{ alignItems: 'center' }}>
        <TouchableOpacity onPress={() => navigation.navigate('Ayuda')}>
          <Text style={{ ...FONTS.h2, color: COLORS.primary, marginVertical: 10 }}>CONOCE LAS REGLAS</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Text style={{ ...FONTS.h2, color: COLORS.lightRed, marginVertical: 10 }}>CANCELAR CREACION</Text>
          </TouchableOpacity>
        </View>
        </View>
      </ScrollView>

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

  async function paso1(params) {
    setIdgame(params)
    setCurrentStep(currentStep + 1);
  }
  async function paso2(params) {
    setCurrentStep(currentStep + 1);
  }
  async function paso3(params) {
    setCurrentStep(currentStep + 1);
  }

  async function usuario() {
    let user = await AsyncStorage.getItem("@user_data");
    const obj = JSON.parse(user);
    setUserdata(obj);
    console.log(userdata);
  }
  
  async function crearPartida() {
    try {
      let user = await AsyncStorage.getItem("@user_data");
      const obj = JSON.parse(user);
      let id = obj.id
      let datos = { idusuario: id, idgame: idgame, price: price }
      await mainApi(datos, 'salas', 'POST')
        .then(res => {
          //  setVisible(false);
          if (res.data.status === 200) {
            let jsonValue = JSON.stringify(res.data.detalle[0])
            console.log(jsonValue)
            AsyncStorage.setItem('partida', jsonValue)
            navigation.navigate('Sala', {data:res.data.detalle[0]})
            return
          } else {
            AlertBug(res.data.detalle)
          }
        })
    } catch (error) { }
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding,
    
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
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default CrearPartida;