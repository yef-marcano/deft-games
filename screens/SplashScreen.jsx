import React, { useContext, useEffect, useState, useRef } from 'react';
import { View, Image, Text } from 'react-native';
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
    <View>
      <Image source={images.splash} style={{
        width: SIZES.width,
        height: "100%"
      }}
      />
    </View>
  )

  async function fetchSesion() {
    
    let user = await AsyncStorage.getItem('@user_data');
    //console.log(user);
    console.log(user);
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