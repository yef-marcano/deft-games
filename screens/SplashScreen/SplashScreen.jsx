import React, { useEffect } from 'react';
import { View, Image, StyleSheet, ImageBackground } from 'react-native';
import { images } from "../../constants/";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from "./styles";

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
    if (user == null) {
        goToScreen('Login');
    } else{
      setTimeout(() => {
        goToScreen('Home');
      }, 500)
    }
  }
  function goToScreen(routeName) {
    props.navigation.replace(routeName)
  }
}
