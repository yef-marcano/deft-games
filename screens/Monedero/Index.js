import React from "react";
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    FlatList,
    TouchableHighlight
} from 'react-native';
import Menu from '../../components/Menu';
import CardPack from '../../components/CardPack';

import AsyncStorage from '@react-native-async-storage/async-storage';

import FullLoading from 'react-native-full-loading'
import { LinearGradient } from 'expo-linear-gradient';

import { COLORS, FONTS, SIZES, icons, images } from '../../constants';
import { Feather, FontAwesome5 } from '@expo/vector-icons';

import { useIsFocused } from "@react-navigation/native";
import { AlertBug } from "../../helper/Alert";

import { mainApi } from "../../services";

import {
    styles
} from './styles';




const Monedero = ({ navigation }) => {

    const isFocused = useIsFocused();
    const [userdata, setUserdata] = React.useState({});
    const [visible, setVisible] = React.useState(false);


    //const [selectedId, setSelectedId] = React.useState(null);


    React.useEffect(() => {
        usuario()
    }, [])


    const [saldo, setSaldo] = React.useState(0);
 
    React.useEffect(() => {
      if (isFocused == true) {
        usuarioCall()
      }
    }, [isFocused])

    async function usuarioCall() {
        let user = await AsyncStorage.getItem('@user_data');
        const obj = JSON.parse(user);
        try {
          await mainApi('', 'saldo/'+obj.id, 'GET')
            .then(res => {
             // console.log('todos los juegos');
              if (res.data.status === 200) {
                console.log(res.data.detalle[0].saldo)
                setSaldo(res.data.detalle[0].saldo)
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

    async function usuario() {
        let user = await AsyncStorage.getItem('@user_data');
        const obj = JSON.parse(user);
        setUserdata(obj)
        console.log(userdata);
    }

    async function logout() {
        setVisible(true)
        await AsyncStorage.removeItem('@user_data');
        navigation.navigate('Login')
        setVisible(false)
    }

    const Packs = {
        "simple": {
            id: 1,
            price: 500,
            name: 'D-Coins',
            priceFinal: '$4,99',
            link: 'google.com',
        },
        "medio": {
            id: 2,
            price: 2000,
            name: 'D-Coins',
            priceFinal: '$19,99',
            link: 'google.com',
        },
        "pro": {
            id: 3,
            price: 5000,
            name: 'D-Coins',
            priceFinal: '$49,99',
            link: 'google.com',
        }
    }
    

    const [selectedId, setSelectedId] = React.useState(null);

    return (
        <>
            <FullLoading visible={visible} text={'Cargando...s'} />
            <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.theme }}>

                <Menu back />
                <ScrollView showsVerticalScrollIndicator={false} style={{ marginHorizontal: SIZES.padding, }}>
                    <View style={{ alignItems: 'center' }}>
                        <Image source={images.logologin} />
                    </View>
                    <View>
                        <View>
                            <Text style={{ ...FONTS.h2, color: COLORS.white }}>Reclama tus recompensas</Text>
                            {/*renderCategoryHeader()*/}
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <LinearGradient
                                colors={['#26073D', '#7522B0']}
                                start={[1, 0.7]}
                                style={styles.button}>
                                <Text style={{ ...FONTS.h1, color: COLORS.white }}>Deft Coins</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ ...FONTS.h1, color: COLORS.white }}>{saldo}</Text>
                                    <Image source={images.coindeft} />
                                </View>

                                <TouchableOpacity >
                                    <LinearGradient
                                        colors={['#FEA800', '#FEA80091']}
                                        start={[1, 0.7]}
                                        style={styles.buttonReclamo}>
                                        <Text>Reclamar</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                                <TouchableOpacity >
                                    <Text style={{ color: '#979797' }}> MAS INFO ?</Text>
                                </TouchableOpacity>


                            </LinearGradient>

                            <Text style={{ ...FONTS.h2, color: COLORS.primary, marginVertical: 20 }}>¡Consigue tu pack y compite!</Text>
                            
                            <View style={{ flexDirection: 'row', paddingBottom: 100 }}>
                            {Object.entries(Packs).map(([key, value]) => (
                                <CardPack  data={value} key={key} setSelectedId={setSelectedId} selectedId={selectedId}/>
                            ))}
                            </View>

                            {/*renderCategoryData()*/}
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )

}

export default Monedero;