
import { SafeAreaView, StyleSheet, TextInput } from "react-native";

import { COLORS, FONTS, SIZES, icons, images } from '../../constants';

export const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      borderRadius: 10,
      padding: 10,
      borderColor: COLORS.white,
      color: COLORS.white,
      
    },
    number:{
      height: 30,
      padding: 1,
      alignItems:'center',
      borderRadius: 30,
      width:30
    },
    buttonReclamo: {
      width: 200,
      borderRadius: 10,
      alignItems: "center",
      padding: 10,
      margin: 20
    },
    buttonPack: {
      width: '100%',
      borderRadius: 10,
      alignItems: "center",
      padding: 10,
      margin: 0,
    },
  });