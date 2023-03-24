import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  Linking,
  Modal,
  Pressable,
  FlatList
} from "react-native";
import { Button, Card } from "galio-framework";
import Menu from '../../components/Menu';
import { LinearGradient } from 'expo-linear-gradient';

import { AlertBug } from "../../helper/Alert";
const url = "https://www.paypal.com/paypalme/joalpm/5USD";

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

const HazPremium = ({ navigation }) => {

  navigation.setOptions({ tabBarVisible: false })


  const [selectedId, setSelectedId] = React.useState(null);

  const openURI = async () => {
    const url = "https://www.paypal.com/paypalme/joalpm/5USD";
    const supported = await Linking.canOpenURL(url); //To check if URL is supported or not.
    if (supported) {
      await Linking.openURL(url); // It will open the URL on browser.
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };

  const openURI6 = async () => {
    const url =
      "https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=4CYCAXDCU6EMY";
    const supported = await Linking.canOpenURL(url); //To check if URL is supported or not.
    if (supported) {
      await Linking.openURL(url); // It will open the URL on browser.
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };

  const openURI24 = async () => {
    const url =
      "https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=F7JKU8GAPF7DC";
    const supported = await Linking.canOpenURL(url); //To check if URL is supported or not.
    if (supported) {
      await Linking.openURL(url); // It will open the URL on browser.
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };

  const [userdata, setUserdata] = React.useState({});
  const [visible, setVisible] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);

  React.useEffect(() => {
    usuario();
  }, []);

  async function usuario() {
    let user = await AsyncStorage.getItem("@user_data");
    const obj = JSON.parse(user);
    setUserdata(obj);
    console.log(userdata);
  }

  const createTwoButtonAlert = () =>
    Alert.alert('Estas seguro que quieres ', 'mensaje de ayuda', [
      {
        text: 'Cancelar',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'Aceptar', onPress: () => console.log('OK Pressed') },
    ]);



  const TextNumber = (props) => {
    return (
      <>
        <View style={{ flexDirection: 'row', marginVertical: 10 }}>
          <LinearGradient
            colors={['#FEA800', '#FEA80091']}
            start={[1, 0.7]}
            style={styles.number}>
            <Text style={{ color: COLORS.white, fontSize: SIZES.h3, fontWeight: '500' }}>
              {props.number}
            </Text>
          </LinearGradient>
          <Text style={{ color: COLORS.white, fontSize: SIZES.h3, marginLeft: 10 }}>
            {props.text}
          </Text>
        </View>
      </>
    )
  }

  function renderCategoryHeader() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ marginBottom: 20 }}></View>
        <TextNumber number={'1'} text={'Torneos exclusivos para usuarios premium.'} />
        <TextNumber number={'2'} text={'Batallas PVP con recompensas en D-Coins.'} />
        <TextNumber number={'3'} text={'Descuentos en los juegos y productos a Deft Games.'} />
        <TextNumber number={'4'} text={'Libre de publicidad.'} />
        <TextNumber number={'5'} text={'Soporte prioritario 24/7.'} />
      </View>
    );
  }

  function renderCategoryData() {
    return (
      <View style={{ alignItems: "center" }}>
        <Button
          onPress={() => openURI()}
          round
          uppercase
          color={COLORS.primary}
        >
          HACERSE PREMIUM
        </Button>
      </View>
    );
  }
  //const navigation = useNavigation();

  const LineDivider = () => {
    return (
      <View style={{ width: 50, paddingVertical: 5 }}>
        <View
          style={{
            flex: 1,
            borderTopColor: COLORS.primary,
            borderTopWidth: 1,
          }}
        ></View>
      </View>
    );
  };

  const PlanCard = ({ item, index }) => {
    return (
      <View key={index} style={{ width: '50%' }}>

        <TouchableOpacity style={{ width: '100%', paddingVertical: 20 }} onPress={() => setSelectedId(item?.id === selectedId ? null : item?.id)} >


          <LinearGradient

            colors={item.id === selectedId ? ['#000', '#FEA800'] : ['#0C0E19', '#0C0E19']}
            start={[2, 0.5]}

            style={{
              margin: 5, borderWidth: 1, borderColor: COLORS.primary, borderRadius: 10,
              paddingHorizontal: 10, alignItems: 'center', paddingVertical: 25
            }}>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ ...FONTS.h2, color: item.id === selectedId ? COLORS.white : COLORS.primary }}>{item?.duracion}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ ...FONTS.h1, color: item.id === selectedId ? COLORS.white : COLORS.primary }}>{item?.precio}</Text>
            </View>
            <Text style={{ color: item.id === selectedId ? COLORS.white : COLORS.primary, fontSize: SIZES.h4 / 1.4 }}>{item?.mensaje}</Text>

            {item?.recomendado && <View style={{ position: 'absolute', top: -25 }}>
              <LinearGradient
                colors={['#FEA800', '#FEA800']}
                start={[1, 1]}
                style={styles.buttonPack}>
                <Text>RECOMENDADO</Text>
              </LinearGradient>
            </View>}
          </LinearGradient>
        </TouchableOpacity>
      </View>
    )
  }



  let data = [
    {
      'id': 0,
      'duracion': '1 MES',
      'precio': '5,99',
      'mensaje': 'MES DE PRUEBA'
    },
    {
      'id': 1,
      'duracion': '6 MES',
      'precio': '23,94',
      'mensaje': '$3,99 / MES - AHORRO 33%',
      'recomendado': true
    }
  ]
  return (
    <>
      <FullLoading visible={visible} text={"Cargando"} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <SafeAreaView
        style={{ flex: 1, backgroundColor: COLORS.black, paddingTop: 0 }}
      >
        <Menu back />
        <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: SIZES.padding, backgroundColor: COLORS.background }}>
          <View style={{ alignItems: 'center' }}>
            <Image source={images.logologin} />
          </View>
          <Text style={{ ...FONTS.h2, color: COLORS.primary, marginVertical: 20 }}>¡Beneficios de ser Premium!</Text>
          <View>
            <View>{renderCategoryHeader()}</View>
          </View>
          <Text style={{ ...FONTS.h2, color: COLORS.white, marginVertical: 20 }}>Elige tu plan</Text>
          <View style={{paddingBottom: 200}}>
            <View style={{ flexDirection: 'row' }}>
              <FlatList
                numColumns={2}
                data={data}
                renderItem={({ item }) => <PlanCard item={item} />}
                keyExtractor={(item, index) => index}
                showsVerticalScrollIndicator={false}
              />

            </View>
            <LinearGradient
              colors={['#000', '#FEA800']}
              start={[2, 0.5]}
              style={{ borderRadius: 10, padding: 10, marginVertical: 30 }}
            >
              <TouchableOpacity  onPress={() => comprar()}>
                <View style={{ alignItems: 'center' }}>
                  <Text style={{ fontSize: SIZES.h3, color: COLORS.white }}>{'QUIERO SER PREMIUM'}</Text>
                </View>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );

  function comprar(params) {
    if (selectedId === 0) {
        openURI6()
    } else if (selectedId === 1){
      openURI24()
    } else {
      AlertBug('Selecciona un monto')
    }
  }
};

export default HazPremium;
