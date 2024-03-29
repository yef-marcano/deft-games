import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Monedero, HazPremium, InvitarAmigo, Ayuda } from "../screens/";
import Tabs from "../navigation/tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { mainApi } from "../services";
import { useIsFocused } from "@react-navigation/native";

import { COLORS, FONTS, SIZES, icons, images, dummyData } from "../constants";

export const Drawer = createDrawerNavigator();

function CustomDrawerContent(props, user) {
  async function logout() {
    await AsyncStorage.removeItem("@user_data");
    props.navigation.navigate("Login");
  }

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.lightGray3 }}>
      <DrawerContentScrollView {...props}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 20,
            backgroundColor: "#f6f6f6",
            marginBottom: 20,
          }}
        >
          <View>
            <Text>{props.user.nombre}</Text>
            <Text>{props.user.email}</Text>
          </View>
          <Image
            source={{
              uri: "https://meups.com.br/wp-content/uploads/2021/12/Battlefield-2042-ao-lado-de-Fortnite-e-Warzone.jpg",
            }}
            style={{ width: 60, height: 60, borderRadius: 30 }}
          />
        </View>
        <DrawerItemList style={{ backgroundColor: COLORS.black }} {...props} />
      </DrawerContentScrollView>
      <TouchableOpacity
        style={{
          position: "absolute",
          right: 0,
          left: 0,
          bottom: 50,
          backgroundColor: "#f6f6f6",
          padding: 20,
        }}
        onPress={() => logout()}
      >
        <Text>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}
function Menu({ navigation }) {
  return (
    <View style={{ marginLeft: 15, flexDirection: "row" }}>
      <TouchableOpacity
        style={{
          height: 40,
          paddingLeft: 3,
          paddingRight: SIZES.radius,
        }}
        onPress={() => {
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            paddingLeft: 10,
          }}
        >
          <Ionicons name="menu" size={34} color="white" />
        </View>
      </TouchableOpacity>
    </View>
  );
}
function CancelButton(props) {
  return (
    <View style={{ marginRight: 15, flexDirection: "row" }}>
      <TouchableOpacity
        style={{
          backgroundColor: COLORS.black,
          height: 40,
          paddingLeft: 3,
          paddingRight: SIZES.radius,
          borderRadius: 20,
        }}
        onPress={() => {
          console.log("Point");
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              marginLeft: SIZES.base,
              color: COLORS.white,
              ...FONTS.body3,
            }}
          >
            {props.saldoData.saldo} DEFT
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: COLORS.white,
          height: 40,
          paddingRight: SIZES.radius,
          borderRadius: 20,
          marginLeft: 20,
        }}
        onPress={() => {
          props.navigate.navigation("Monedero");
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            paddingLeft: 10,
          }}
        >
          <FontAwesome5 name="piggy-bank" size={24} color="black" />
        </View>
      </TouchableOpacity>
    </View>
  );
}
export default function DrawerNavigator({ navigation }) {
  const isFocused = useIsFocused();

  const [userdata, setUserdata] = React.useState({});

  const [saldoData, setsaldoData] = React.useState({});

  React.useEffect(() => {
    usuario();
  }, []);

  React.useEffect(() => {
    if (isFocused == true) {
      saldo();
    }
  }, [isFocused]);

  async function usuario() {
    let user = await AsyncStorage.getItem("@user_data");
    const obj = JSON.parse(user);
    setUserdata(obj);
  }

  async function saldo() {
    try {
      let user = await AsyncStorage.getItem("@user_data");
      let objuser = JSON.parse(user);
      console.log(objuser);
      console.log("saldo por id -- saldo/" + objuser.id);

      await mainApi("", "saldo/" + objuser.id, "GET").then((res) => {
        if (res.data.status === 200) {
          console.log(res.data.detalle);
          setsaldoData(res.data.detalle[0]);
          return;
        } else {
          AlertBug("error saldo");
        }
      });
    } catch (error) {}
  }

  return (
    <Drawer.Navigator
      screenOptions={(navigation) => ({
        headerShow: true,
        headerStyle: {
          backgroundColor: COLORS.primary,
          elevation: 10,
        },
        headerTitle: userdata.nombre,
        headerLeft: () => <Menu navigation={navigation} />,
        headerRight: () => <CancelButton saldoData={saldoData} />,
      })}
      drawerContent={(props) => (
        <CustomDrawerContent {...props} user={userdata} />
      )}
    >
      <Drawer.Screen name="Inicio" component={Tabs} />
      <Drawer.Screen name="Últimos ganadores" component={Tabs} />
      <Drawer.Screen name="Invita a un amigo" component={InvitarAmigo} />
      <Drawer.Screen name="Hazte Premium" component={HazPremium} />
      <Drawer.Screen name="Ayuda" component={Ayuda} />
      <Drawer.Screen name="Monedero" component={Monedero} />
    </Drawer.Navigator>
  );
}
