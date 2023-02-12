import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { COLORS, FONTS, SIZES, icons, images } from "../constants";
const ChatScreen = ({ route, navigation }) => {
    const { idsala } = route.params;
    navigation.setOptions({ tabBarVisible: false })
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');

    const [userdata, setUserdata] = React.useState({});

    useEffect(() => {

        const intervalId = setInterval(() => {

            const fetchData = async () => {
                const response = await axios.get('http://52.54.227.142/chat.php?id_game='+idsala);
                //console.log(response.data);
                setMessages(response.data);
            };
            fetchData();
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    const sendMessage = async () => {
        
        let user = await AsyncStorage.getItem("@user_data");
        const obj = JSON.parse(user);
        console.log(obj)
        setUserdata(obj);
        await axios.post('http://52.54.227.142/chat.php', { sender: obj.id, message: text, id_sala: idsala });
        setText('');
    };

    return (
        <View style={{backgroundColor: COLORS.theme,  paddingTop: SIZES.radius,
        }}>
            <View style={{marginHorizontal: SIZES.padding, flexDirection:'column'}}>
            <View style={{height: '80%'}}>
            <FlatList
                data={messages}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => 
                <View style={{backgroundColor: '#fff', borderRadius:20, padding: 10, marginVertical: 5}}>
                <Text style={{ color: 'black' }}>{item.message}</Text>
                </View>}
            />
            </View>
            <View style={{height: '20%'}}>
            <View style={{
                backgroundColor: COLORS.white, borderRadius: 5,padding: 10, bottom: 0,
                flexDirection:'row'}}>
            <View style={{flex:2}}>
            <TextInput
                value={text}
                onChangeText={setText}
                placeholder="Escribe un mensaje"
            />
            </View>
            <View style={{flex:1, backgroundColor: '#00ff3b', justifyContent:'center',alignItems:'center',
            borderRadius: 20}}> 
            <TouchableOpacity onPress={sendMessage}>
                <Text>Enviar</Text>
            </TouchableOpacity>
            </View>
            </View>
            </View>
</View>
        </View>
    );
};

export default ChatScreen;