import React from "react";
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    ImageBackground,
    TextInput,
} from 'react-native';
import { mainApi } from "../../services";
import FullLoading from 'react-native-full-loading'
import { AlertBug, AlertSuccess } from "../../helper/Alert";
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { COLORS, FONTS, SIZES, icons, images } from '../../constants';

import {
    styles
} from './styles';

const Register = ({ navigation }) => {
    navigation.setOptions({
        headerTransparent: true,
      });
    const profileData = {
        name: 'Username',
        point: 200
    }

    const [profile, setProfile] = React.useState(profileData);

    const [correo, setCorreo] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [nombre, setNombre] = React.useState("");
    const [apellido, setApellido] = React.useState("");
    const [celular, setCelular] = React.useState("");
    const [visible, setVisible] = React.useState(false);


    const [number, onChangeNumber] = React.useState(null);


    function Header() {
        return (
            <View style={{
                height: SIZES.height / 5, justifyContent: 'center', alignItems: 'center',
                borderTopWidth: 1
            }}>
                <View style={{ borderBottomColor: '#DFA1ED', flex: 2, flexDirection: 'row', alignContent:'center' }}>
                    <View><Text style={styles.title}> <FontAwesome5 style={{ margin: 10 }} name="instagram" size={34} color="white" /> </Text></View>
                    <View><Text style={styles.title}> Crear cuenta</Text></View>
                </View>
            </View>
        );
    };
    function renderForm() {
        return (
            <View style={{ justifyContent: 'flex-end', height: SIZES.height/1.3 }}>
                <TextInput
                    style={styles.input}
                    onChangeText={setCorreo}
                    placeholder="Correo electonico"
                    placeholderTextColor={COLORS.white}
                    value={correo}
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
                <TextInput
                    style={styles.input}
                    onChangeText={setNombre}
                    value={nombre}
                    placeholderTextColor={COLORS.white}
                    placeholder="Nombre"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setApellido}
                    value={apellido}
                    placeholderTextColor={COLORS.white}
                    placeholder="Apellido"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setCelular}
                    value={celular}
                    placeholderTextColor={COLORS.white}
                    placeholder="Celular"
                    keyboardType="numeric"
                />

                <View style={{ alignItems: "center", margin: 40 }}>
                    <TouchableOpacity onPress={() => registro()}>
                        <LinearGradient
                            colors={['#0014FF', '#8020EF', '#FF2CDF']}
                            start={[1, 0.7]}
                            style={styles.button}>
                            <Text style={styles.text}>Registrarme</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{ paddingTop: 20, borderBottomColor: '#fff', borderBottomWidth: 1 }}>
                        <Text style={styles.text}> Ya estoy registrado</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    function Footer() {
        return (
            <View style={{
                height: SIZES.height / 4, justifyContent: 'center', alignItems: 'center', borderTopColor: '#DFA1ED',
                borderTopWidth: 1, 
            }}>
                <View style={{ borderBottomColor: '#DFA1ED' }}>
                    <Text style={styles.text}> Síguenos</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <FontAwesome5 style={{ margin: 10 }} name="instagram" size={34} color="white" />
                    <FontAwesome5 style={{ margin: 10 }} name="facebook" size={34} color="white" />
                    <FontAwesome5 style={{ margin: 10 }} name="linkedin" size={34} color="white" />
                </View>

            </View>
        );
    };

    return (
        <>
            <FullLoading visible={visible} />
            <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.black, width: '100%', height: '100%' }}>
                <ImageBackground source={images.bglogin} resizeMode="cover" style={styles.image}>
                    <ScrollView style={{ paddingHorizontal: SIZES.padding }} >
                        {renderForm()}
                        {Footer()}
                    </ScrollView>
                </ImageBackground>

            </SafeAreaView>
        </>
    )



    async function registro() {
        try {
            setVisible(true);
            let datos = { correo: correo, pass: password, nombre: nombre, apellidos: apellido, celular: celular }
            await mainApi(datos, 'registro', 'POST')
                .then(res => {
                    setVisible(false);
                    console.log(res.data);
                    if (res.data.status === 200) {
                        navigation.navigate("Login");
                        AlertSuccess('Registro exitoso', 'Login', navigation)
                        //navegar al login y limpiar los datoss}
                        return
                    } else {
                        AlertBug(res.data.detalle)
                    }
                })
        } catch (error) { }
    }
}

export default Register;