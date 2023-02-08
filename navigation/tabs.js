import React from "react";
import {
    Image,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Profile, Monedero, CrearPartida, Addgame, Board } from "../screens/";
import { icons, COLORS } from "../constants";
import { Feather, Entypo, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const tabOptions = {
    showLabel: false,
    style: {
        height: "10%",
        backgroundColor: COLORS.black
    }
}
const Tabs = ({ navigation }) => {
    return (
        <Tab.Navigator
            tabBarOptions={tabOptions}

            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused }) => {
                    const tintColor = focused ? COLORS.white : COLORS.gray;

                    switch (route.name) {
                        case "Home":
                            return (
                                <>
                                    <Entypo name="game-controller" size={44} color={tintColor} />
                                    <Text style={{color:'#fff'}}>Competir</Text>
                                </>
                            )


                        case "Notification":
                            return (
                                <View style={{
                                    // width: 80,
                                    // height: 80,
                                    backgroundColor: COLORS.primary,
                                    borderRadius: 10,
                                    marginTop: -70,
                                    padding: 20,
                                    transform: [
                                        { rotate: '45deg' }
                                    ]
                                }}>
                                    <Entypo name="plus" size={44} color={tintColor} />
                                </View>
                            )

                        case "Profile":
                            return (
                                <>
                                    <Ionicons name="person-circle-outline" size={44} color={tintColor} />
                                    <Text style={{color:'#fff'}}>Perfil</Text>
                                </>
                            )
                    }
                }
            })}
        >
            <Tab.Screen



            
                name="Home"
                component={Home}
            />
            <Tab.Screen
                name="Notification"
                component={CrearPartida}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
            />

            <Tab.Screen
                name="Agregarjuego"
                component={Addgame}
                options={{
                    headerShown: false,
                    tabBarButton: () => null,
                }}
            />
            <Tab.Screen
                name="Board"
                component={Board}
                options={{
                    headerShown: false,
                    tabBarButton: () => null,
                }}
            />
        </Tab.Navigator>
    )
}

export default Tabs;