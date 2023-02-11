import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SIZES, icons, images } from '../constants';

const CardPack = (item, index) => {
    const [backgroundColor, setBackgroundColor] = useState(['#0C0E19', '#0C0E19']);
    const [itemSelect, setItemSelect] = useState(0);

    const handlePress = () => {
        if(itemSelect === index){     
            setBackgroundColor(['#fff', '#FEA800'])
            //setBackgroundColor(backgroundColor === ['#0C0E19', '#0C0E19'] ? ['#FFF', '#FEA800'] : ['#FFF', '#FEA800']);
        }else {
            setBackgroundColor(['#0C0E19', '#0C0E19'])
        }
    };

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
        <TouchableOpacity onPress={() => {
            itemSelect === index ?
            setBackgroundColor(['#fff', '#FEA800']):
            setBackgroundColor(['#FEA800', '#FEA800'])
            //handlePress;
            //setItemSelect(index);
           }}  >
            {/*<TouchableOpacity onPress={handlePress} style={styles.button}>
        <View />
      </TouchableOpacity>*/}
            {/*<View style={[styles.container, { backgroundColor }]}>*/}

            <Text>Comprar</Text>
            <View>
                <LinearGradient
                    colors={backgroundColor}
                    start={[1, 1]}
                    style={{
                margin: 5, borderWidth: 1, borderColor: COLORS.primary, borderRadius: 10,
                paddingHorizontal: 10, alignItems: 'center', paddingVertical: 25
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
                            <Text>Comprar</Text>
                        </LinearGradient>
                    </View>
                </LinearGradient>
            </View>
        </TouchableOpacity >
    );
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