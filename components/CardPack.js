import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Image,
    Linking, Alert} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SIZES, icons, images } from '../constants';

const CardPack = (item, index) => {
    const [itemSelect, setItemSelect] = useState(0);
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

    return (
        <TouchableOpacity style={{width: '33.3%'}} onPress={() => (item.setSelectedId(item.id === item.selectedId ? null : item.id, buy(item.data.price)))}   >
            <Text style={{ ...FONTS.h3, color: COLORS.white, marginHorizontal: 8 }}>Comprar</Text>
            <View>
                <LinearGradient
                    colors={item.id === item.selectedId ? [COLORS.background, COLORS.background] : [COLORS.background, COLORS.background]}
                    start={[1, 1]}
                    style={{
                margin: 5, borderWidth: 1, borderColor: COLORS.primary, borderRadius: 10,
                paddingHorizontal: 10, alignItems: 'center', paddingVertical: 25,
               
            }}>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ ...FONTS.h2, color: COLORS.white }}>{item.data.price}</Text>
                        <Image source={images.coindeft} />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ ...FONTS.h3, color: COLORS.white }}>{item.data.name}</Text>
                    </View>
                    {LineDivider()}
                    <Text style={{ ...FONTS.h3, color: COLORS.white }}>{item.data.priceFinal}</Text>

                    <View style={{ position: 'absolute', bottom: -25 }}>
                        <LinearGradient
                            colors={['#FEA800', '#FEA800']}
                            start={[1, 1]}
                            style={styles.buttonPack}>
                            <Text style={{ ...FONTS.h4, color: COLORS.theme}}>Comprar</Text>
                        </LinearGradient>
                    </View>
                </LinearGradient>
            </View>
        </TouchableOpacity >
    );

    async function openURI(direction) {
        const url = direction;
        const supported = await Linking.canOpenURL(url); //To check if URL is supported or not.
        if (supported) {
          await Linking.openURL(url); // It will open the URL on browser.
        } else {
          Alert.alert(`Don't know how to open this URL: ${url}`);
        }
    };

    async function buy(item) {
        console.log(item)
        if (item == 500) {
            openURI(`https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=ARJN7F7N3HASN`)
          } else if (item == 2000){
            openURI(`https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=R25ML7JM9JS4A`)
          } else if(item == 5000) {
            openURI(`https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=VCUTKBZ2R5DXU`)
          }
    }
    

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: 'red',
        width: 100,
        height: 100,
    },
    buttonPack: {
        width: '100%',
        borderRadius: 10,
        alignItems: "center",
        padding: 10,
        margin: 0,
    },
});

export default CardPack;