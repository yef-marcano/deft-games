import React from "react";
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    FlatList,
    Share
} from 'react-native';
import { Button } from 'galio-framework';
import Menu from '../../components/Menu';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FullLoading from 'react-native-full-loading'
import { COLORS, FONTS, SIZES, icons, images } from '../../constants';
import { Feather, FontAwesome5, Entypo } from '@expo/vector-icons';

import Header from '../../components/Header';

const LineDivider = () => {
    return (
        <View style={{ width: 1, paddingVertical: 18 }}>
            <View style={{ flex: 1, borderLeftWidth: 1, height: 10, width: 100 }}></View>
        </View>
    )
}

const InvitarAmigo = ({ navigation }) => {

    const [userdata, setUserdata] = React.useState({});
    const [visible, setVisible] = React.useState(false);

    const shareMessage = () => {
        Share.share({
            message: 'El mensaje',
        })
            .then((result) => console.log(result))
            .catch((errorMsg) => console.log(errorMsg));
    };

    React.useEffect(() => {
        usuario()
    }, [])

    async function usuario() {
        let user = await AsyncStorage.getItem('@user_data');
        const obj = JSON.parse(user);
        setUserdata(obj)
        console.log(userdata);
    }

    function renderCategoryHeader() {

        return (
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={{ color: COLORS.white, fontSize: SIZES.h1 }}>Invita a un amigo</Text>
                <LineDivider />
                <Button capitalize color={COLORS.primary} shadowColor={COLORS.white} >
                    {userdata.nombre}
                </Button>

                <Text style={{ color: COLORS.white, fontSize: SIZES.font }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since.</Text>
                <TouchableOpacity onPress={() => shareMessage()} style={{ backgroundColor: COLORS.white, padding: 10, borderRadius: 50, marginTop: 20 }} >
                    <Entypo name="share" size={44} color="black" />
                </TouchableOpacity>

            </View>
        )
    }

    return (
        <>
            <FullLoading visible={visible} text={'Cerrando sesión'} />
            <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background, paddingTop: 0 }}>
                <Menu back />
                <ScrollView style={{ marginTop: SIZES.radius }}>
                    {/* Categories Section */}
                    <View style={{ marginTop: SIZES.padding }}>
                        <View>
                            {renderCategoryHeader()}
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}

export default InvitarAmigo;