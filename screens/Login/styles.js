
import { SafeAreaView, StyleSheet, TextInput } from "react-native";

import { COLORS, FONTS, SIZES, icons, images } from '../../constants';

export const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      borderRadius: 20,
      padding: 10,
      borderColor: COLORS.white,
      color: COLORS.white,
      
    },
    button: {
      width: 200,
      borderRadius: 10,
      alignItems: "center",
      padding: 10,
    },
    text:{
      color: '#fff',
      fontSize: SIZES.body3
    },
    
  image: {
    flex: 1,
    width:'100%'
  },
  container: {
    flex: 1
  },
  });