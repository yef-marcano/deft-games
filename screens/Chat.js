import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';

import { COLORS, FONTS, SIZES, icons, images } from "../constants";
const ChatScreen = () => {
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');

    useEffect(() => {

        const intervalId = setInterval(() => {

            const fetchData = async () => {
                const response = await axios.get('http://52.54.227.142/chat.php');
                console.log(response.data);
                setMessages(response.data);
            };
            fetchData();
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    const sendMessage = async () => {
        await axios.post('http://52.54.227.142/chat.php', { sender: text, message: text });
        setText('');
    };

    return (
        <View style={{backgroundColor: COLORS.theme, flex: 1, paddingTop: SIZES.radius,
        }}>
            <View style={{marginHorizontal: SIZES.padding}}>
            <FlatList
                data={messages}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <Text style={{ color: 'white' }}>{item.message}</Text>}
            />
            <View style={{backgroundColor: COLORS.white, borderRadius: 5,padding: 10, bottom: 0}}>
            <TextInput
                value={text}
                onChangeText={setText}
                placeholder="Escribe un mensaje"
            />
            <TouchableOpacity onPress={sendMessage}>
                <Text>Enviar</Text>
            </TouchableOpacity>
            </View>
</View>
        </View>
    );
};

export default ChatScreen;