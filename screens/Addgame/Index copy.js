import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, ScrollView } from 'react-native';

import { COLORS, FONTS, SIZES, icons, images } from "../../constants";

import { LinearGradient } from 'expo-linear-gradient';

import { mainApi } from "../../services";

const steps = ['Selecciona el juego', 'Tipo de partida', '¿Nivelado?', '¿Cuanto quieres ganar?'];



const Addgame = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const [userdata, setUserdata] = React.useState({});
  const [visible, setVisible] = React.useState(false);

  const [games, setGames] = React.useState([]);


  

  React.useEffect(() => {
    usuario();
    juegoslista()
  }, []);


  const juegosCard = ({ item, index }) => {
    return (
      <View  key={index} style={{ marginVertical: SIZES.base, width: SIZES.width/3,
      flexDirection:'row', alignItems:'center' }}>
        <LinearGradient
          // Background Linear Gradient
          colors={['#31323B', '#fff']}
          start={[1, 0.7]}
          style={{ borderRadius: 20, padding: 10, paddingHorizontal: 20 }}
        >
          <TouchableOpacity onPress={() => paso1()} style={{ flex: 1, flexDirection: 'column' }}  >
            <View style={{ alignItems:'center'}}>
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


  const ModoList = ({ item, index }) => {
    return (
      <View  key={index} style={{ marginVertical: SIZES.base, width: SIZES.width/3,
      flexDirection:'row', alignItems:'center' }}>
        <LinearGradient
          // Background Linear Gradient
          colors={['#31323B', '#fff']}
          start={[1, 0.7]}
          style={{ borderRadius: 20, padding: 10, paddingHorizontal: 20 }}
        >
          <TouchableOpacity style={{ flex: 1, flexDirection: 'column' }} >
            <View style={{ alignItems:'center'}}>
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
    return(
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
    return(
    <View style={{ flexDirection: 'column', paddingHorizontal: 20, marginBottom: 20 }}>
    <Text style={{ fontSize: SIZES.h3, color: COLORS.white, marginVertical: SIZES.base }}>  Modo: </Text>
         <LinearGradient
          // Background Linear Gradient
          colors={['#31323B', '#fff']}
          start={[1, 0.7]}
          style={{ borderRadius: 20, padding: 10, paddingHorizontal: 20, flexDirection: 'row', width: 100 }}
        >
          <TouchableOpacity  onPress={() => paso2()} style={{ flex: 1, flexDirection: 'column' }} >
            <View style={{ alignItems:'center'}}>
                <Text style={{ fontSize: SIZES.h3, color: COLORS.white }}>{'1 vs 1'}</Text>
            </View>
          </TouchableOpacity>

        </LinearGradient>
      <View style={{marginVertical: 20, alignItems:'flex-start'}}>
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
    return(
    <View style={{ flexDirection: 'column', paddingHorizontal: 20, marginBottom: 20 }}>
    <Text style={{ fontSize: SIZES.h3, color: COLORS.white, marginVertical: SIZES.base }}>Si marcas NO, un rival de nivel superior podrá aceptar la partida. En caso contrario, la jugarás contra un rival de tu mismo nivel.</Text>
    <View style={{ flexDirection: 'row', marginVertical: 20}}>
          <TouchableOpacity  onPress={() => paso3()} style={{ flexDirection: 'row', padding: 20, 
          borderColor: '#FEA800', borderWidth: 2, borderRadius: 100,
          width: 90, height: 90, justifyContent:'center', alignItems: 'center', marginRight: 10 }} >
                <Text style={{ fontSize: SIZES.h3, color: COLORS.white }}>{'Si'}</Text>
          </TouchableOpacity>
          <TouchableOpacity   onPress={() => paso3()} style={{ flexDirection: 'row', padding: 20, 
          borderColor: '#FEA800', borderWidth: 2, borderRadius: 100,
          width: 90, height: 90, justifyContent:'center', alignItems: 'center' }} >
                <Text style={{ fontSize: SIZES.h3, color: COLORS.white }}>{'No'}</Text>
            
          </TouchableOpacity>
      </View>
    </View>
    )
  }
  const Ganar = () => {
    return(
    <View style={{ flexDirection: 'column', paddingHorizontal: 20, marginBottom: 20 }}>
    <View style={{ flexDirection: 'row', marginVertical: 20}}>
          <TouchableOpacity  onPress={() => paso3()} style={{ flexDirection: 'row', padding: 20, 
          borderColor: '#FEA800', borderWidth: 2, borderRadius: 100,
          width: 90, height: 90, justifyContent:'center', alignItems: 'center', marginRight: 10 }} >
                <Text style={{ fontSize: SIZES.h3, color: COLORS.white }}>{'Si'}</Text>
          </TouchableOpacity>
          <TouchableOpacity   onPress={() => paso3()} style={{ flexDirection: 'row', padding: 20, 
          borderColor: '#FEA800', borderWidth: 2, borderRadius: 100,
          width: 90, height: 90, justifyContent:'center', alignItems: 'center' }} >
                <Text style={{ fontSize: SIZES.h3, color: COLORS.white }}>{'No'}</Text>
            
          </TouchableOpacity>
      </View>
    </View>
    )
  }


  return (
    <ScrollView style={styles.container}>

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
          {(currentStep === 1 && index === currentStep) ?  <Modo /> : ''}
          {(currentStep === 2 && index === currentStep) ? <Nivelado />: ''}  
          {(currentStep === 3 && index === currentStep) ? <Ganar /> : '' }
        </View>
      ))}
      {/*<View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            setCurrentStep(currentStep - 1);
          }}
          disabled={currentStep === 0}
          style={[
            styles.button,
            { backgroundColor: currentStep === 0 ? '#ddd' : '#007aff' },
          ]}
        >
          <Text style={styles.buttonText}>Anterior</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setCurrentStep(currentStep + 1);
          }}
          disabled={currentStep === steps.length - 1}
          style={[
            styles.button,
            { backgroundColor: currentStep === steps.length - 1 ? '#ddd' : '#7C24BA' },
          ]}
        >
          <Text style={styles.buttonText}>Siguiente</Text>
        </TouchableOpacity>
      </View>*/}
    </ScrollView>
  );


  

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

  async function paso1(params) {
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding
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

export default Addgame;