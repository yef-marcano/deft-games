import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, StatusBar } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NavBar } from 'galio-framework';
import { COLORS, FONTS, SIZES, icons, images } from "../constants";

const STATUS_BAR_HEIGHT = StatusBar.currentHeight || 24;
export default function Menu({ back, ...props }) {
  const navigation = useNavigation();
  return (
    <View style={{ backgroundColor: COLORS.background }}>
      <View style={headerStyles.container}>
        <NavBar
          left={<View style={{ flexDirection: 'row', alignItems: 'center', height: 80, width: '20%' }}>
            {back ? <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={images.arrowback} style={headerStyles.iconm} />
            </TouchableOpacity> : <TouchableOpacity onPress={() => navigation.navigate('Board')}>
              <Image source={images.iconmenu} style={headerStyles.iconm} />
            </TouchableOpacity>}

          </View>}
          title={<View style={{ flexDirection: 'row', alignItems: 'center', height: 80, justifyContent: 'flex-end', width: '80%' }}>

            <TouchableOpacity style={{
              borderWidth: 2, borderColor: COLORS.primary, borderStyle: 'solid',
              borderRadius: 5, padding: 5, marginHorizontal: 10
            }}
              onPress={() => navigation.navigate('HazPremium')}>
              <Text style={{ fontSize: SIZES.body3, color: COLORS.primary }}> DEFT PREMIUM</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
              borderRadius: 5, padding: 5, marginHorizontal: 10
            }}>
              <Text style={{ fontSize: SIZES.body2, color: COLORS.white }}> 20</Text>
            </TouchableOpacity>
            <Image source={images.coindeft} style={headerStyles.iconb} />
            <TouchableOpacity onPress={() => navigation.navigate('Monedero')}>
              <Image source={images.cartera} style={headerStyles.iconc} />
            </TouchableOpacity>

          </View>}
          transparent={true}
          titleStyle={{ color: '#fff' }} />

      </View>
    </View>
  );
}

const headerStyles = StyleSheet.create({
  container: {
    height: 80,
    width: SIZES.width,
    marginTop: STATUS_BAR_HEIGHT,

  },
  iconm: {
    height: 30,
    width: 30,
    margin: 5,
  },
  iconb: {
    height: 30,
    width: 35,
    marginRight: 20,
  },
  iconc: {
    height: 25,
    width: 30,
  },
});
