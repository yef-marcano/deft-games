import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
  TextInput,
  Alert,
  KeyboardAvoidingView
} from "react-native";
//var qs = require('qs');
import { mainApi } from "../../services";
import FullLoading from 'react-native-full-loading'
import { AlertBug } from "../../helper/Alert";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Input, Block } from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons'; 

import { COLORS, FONTS, SIZES, icons, images } from "../../constants";

import { styles } from "./styles";

const LineDivider = () => {
  return (
    <View style={{ width: 1, paddingVertical: 18 }}>
      <View
        style={{
          flex: 1,
          borderLeftColor: COLORS.white,
          borderLeftWidth: 1,
          width: 100
        }}
      ></View>
    </View>
  );
};


const Login = ({ navigation }) => {
  const profileData = {
    name: "Username",
    point: 200,
  };

  const [profile, setProfile] = React.useState(profileData);

  const [usuario, setUsuario] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [visible, setVisible] = React.useState(false);


  function Header() {
    return (
      <View style={{alignItems:'center', height: SIZES.height/4, justifyContent:'flex-end'}}>
            <Image source={images.logologin}/>
      </View>
    );
  };
  function renderForm() {
    return (
      <View style={{justifyContent: "center", height: SIZES.height/2, marginTop: 50}}>
        <Text
          style={{ textAlign: "center", ...FONTS.body1, color: COLORS.white }}
        >
          Iniciar sesión
        </Text>

        <TextInput
          style={styles.input}
          onChangeText={setUsuario}
          placeholder="Correo electrónico"
          placeholderTextColor={COLORS.white}
          value={usuario}
        />
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholderTextColor={COLORS.white}
          placeholder="Contraseña"
          autoCorrect={false}
          secureTextEntry={true}
        />

        <View style={{borderBottomColor: '#fff', alignItems: 'flex-end', paddingTop: 20}}>
          <Text style={styles.text}> Recuperar contraseña?</Text>
        </View>

        <View style={{ alignItems: "center", margin: 40 }}>
          <TouchableOpacity onPress={() => login()}>
            <LinearGradient
              onPress={() => login()}
              colors={['#0014FF', '#8020EF', '#FF2CDF']}
              start={[1, 0.7]}
              style={styles.button}>
              {/* <Text style={styles.text}>Iniciar sesión</Text> */}
              <Text style={styles.text}>Ingresar</Text>
            </LinearGradient>
          </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Register')} style={{paddingTop: 20, borderBottomColor: '#fff', borderBottomWidth: 1}}>
          <Text style={styles.text}> ¿No tengo una cuenta?</Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  }
  function Footer() {
    return (
      <View style={{ height: SIZES.height/5, justifyContent: 'center', alignItems:'center', borderTopColor: '#DFA1ED',
      borderTopWidth: 1 }}>
        <View style={{ borderBottomColor: '#DFA1ED'}}>
          <Text style={styles.text}> Síguenos</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <FontAwesome5 style={{margin:10}} name="instagram" size={34} color="white" />
          <FontAwesome5 style={{margin:10}} name="facebook" size={34} color="white" />
          <FontAwesome5 style={{margin:10}} name="linkedin" size={34} color="white" />
        </View>
        
      </View>
    );
  };


  return (
    <>
      <FullLoading visible={visible} />
      <SafeAreaView style={{ flex: 1, width: '100%', height: '100%',
      alignItems:'center' }}>
      <ImageBackground source={images.bglogin}  resizeMode="cover" style={styles.image}>
        <ScrollView style={{ paddingHorizontal: SIZES.padding }}>
          {Header()}
          {renderForm()}
          {Footer()}
        </ScrollView>
      </ImageBackground>
      </SafeAreaView>
    </>
  );

  async function login() {
    try {
      setVisible(true);
      let datos = { correo: usuario, password: password, }
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
    } catch (error) { }
  }
};

export default Login;
