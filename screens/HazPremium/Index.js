import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Linking,
} from "react-native";
import { Button, Card } from "galio-framework";

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

  React.useEffect(() => {
    usuario();
  }, []);

  async function usuario() {
    let user = await AsyncStorage.getItem("@user_data");
    const obj = JSON.parse(user);
    setUserdata(obj);
    console.log(userdata);
  }

  function renderCategoryHeader() {
    return (
      <View style={{ flex: 1, paddingLeft: SIZES.padding }}>
        <Text style={{ color: COLORS.white, fontSize: SIZES.h1 }}>
          ¡Ventajas de ser premium!
        </Text>
        <View style={{ marginBottom: 20 }}></View>
        <Text style={{ color: COLORS.white, fontSize: SIZES.font }}>
          - Torneos exclusivos para usuarios premium.
        </Text>
        <Text style={{ color: COLORS.white, fontSize: SIZES.font }}>
          - Competir apostando para ganar criptomonedas.
        </Text>
        <Text style={{ color: COLORS.white, fontSize: SIZES.font }}>
          - Descuentos en recargas de los juegos y marcas asociadas.
        </Text>
        <Text style={{ color: COLORS.white, fontSize: SIZES.font }}>
          - Libre de publicidad.
        </Text>
        <Text style={{ color: COLORS.white, fontSize: SIZES.font }}>
          - Soporte prioritario 24/7.
        </Text>

        <TouchableOpacity>
          <Text
            style={{ color: COLORS.white, fontSize: SIZES.font, marginTop: 30 }}
          >
            1 mes: $5,99
          </Text>
        </TouchableOpacity>
        <Button color="success" onPress={() => openURI6()}>
          Comprar
        </Button>
        <TouchableOpacity>
          <Text
            style={{ color: COLORS.white, fontSize: SIZES.font, marginTop: 30 }}
          >
            6 meses: $3,99 = $23,94
          </Text>
        </TouchableOpacity>
        <Button color="success" onPress={() => openURI24()}>
          Comprar
        </Button>
      </View>
    );
  }

  function renderCategoryData() {
    return (
      <View style={{ backgroundColor: COLORS.white, alignItems: "center" }}>
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

  return (
    <>
      <FullLoading visible={visible} text={"Cerrando sesión"} />

      <SafeAreaView
        style={{ flex: 1, backgroundColor: COLORS.black, paddingTop: 0 }}
      >
        {/* Body Section */}
        <ScrollView style={{ marginTop: SIZES.radius, marginBottom: 30 }}>
          <View style={{ marginTop: SIZES.padding }}>
            <View>{renderCategoryHeader()}</View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default HazPremium;
