import React, { useContext, useEffect } from 'react';
import { View, Image, Text, StyleSheet, ImageBackground } from 'react-native';
import { images } from "../constants/";
import { SIZES } from "../constants/";
import { mainApi } from "../services";
import { AlertBug } from "../helper/Alert";
import AsyncStorage from '@react-native-async-storage/async-storage';




export default function SplashScreen(props) {

  useEffect(() => {
    fetchSesion()
  }, [])

  return (
    <View style={styles.container}>
      <ImageBackground source={images.splashbg}  resizeMode="cover" style={styles.image}> 
      <View style={{alignItems:'center'}}>
        <Image source={images.logosplash}/>
        <Image source={images.titlelogo}/>
      </View>
      </ImageBackground>
    </View>
  )

  async function fetchSesion() {
    
    let user = await AsyncStorage.getItem('@user_data');
    //console.log(user);
    //console.log(user);
    if (user == null) {
        goToScreen('Login');
    } else{
      setTimeout(() => {
        goToScreen('Home');
      }, 500)
    }
    /*let response = await getUsuario();
    if (response == null) {
      setTimeout(() => {
        goToScreen('Inicio')
        loginAction({
          type: 'sing-out',
          data: {}
        })
      }, 3000)
      return
    }
    await userActive();
    await getCoins()
    setTimeout(() => {
      props.navigation.navigate('Tabs', {
        data: coins,
      });
    }, 500)*/
  }


  function goToScreen(routeName) {
    props.navigation.replace(routeName)
  }


  
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
});
