import React from "react";
import {
    View,
    Text
} from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Profile, Monedero, CrearPartida, Addgame, Board, HazPremium,InvitarAmigo,Ayuda,Sala, ChatScreen, Salas } from "../screens/";
import { icons, COLORS, FONTS } from "../constants";
import { Feather, Entypo, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";

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
                    const tintColor = focused ? COLORS.game : COLORS.white;
                    const opa = focused ? 1 : 0.5;

                    switch (route.name) {
                        case "Home":
                            return (
                                <>
                                    <Entypo name="game-controller" size={44} color={tintColor} style={{opacity: opa}} />
                                    <Text style={{color:tintColor, opacity: opa}}>Competir</Text>
                                </>
                            )


                        case "Notification":
                            return (
                                <>
                                <LinearGradient
                                colors={['rgba(44, 243, 207, 1)', 'rgba(260, 21, 251, 1)']}
                                start={[-0.1, 0]}
                                style={{
                                    top:0,
                                    borderRadius: 10,
                                    marginTop: -70,
                                    paddingHorizontal: 0,
                                    transform: [
                                        { rotate: '45deg' }
                                    ]
                                      }
                                }>
                                <View style={{
                                    
                                    width: 70,
                                    height:70,
                                    marginVertical:10,
                                    marginHorizontal:10,
                                    transform: [
                                        { rotate: '-45deg' }
                                    ]}}>
                                    <View style={{marginTop: -12, alignItems:'center'}}>
                                    <Entypo name="plus" size={44} color={COLORS.theme} style={{opacity: opa}}  />
                                    <Text style={{ ...FONTS.h4, marginBottom: -5 }}>Crear</Text>
                                    <Text style={{ ...FONTS.h4, color:'#000' }}>Partida</Text>
                                    </View>
                                </View>
                                </LinearGradient>
                                </>
                            )

                        case "Profile":
                            return (
                                <>
                                    <Ionicons name="person-circle-outline" size={44} color={tintColor} style={{opacityopacity: opa}} />
                                    <Text style={{color:tintColor,opacity: opa}}>Perfil</Text>
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
                name="Monedero"
                component={Monedero}
                options={{
                    headerShown: false,
                    tabBarButton: () => null,
                }}
            />
            <Tab.Screen
                name="Salas"
                component={Salas}
                options={{
                    headerShown: false,
                    tabBarButton: () => null,
                }}
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
            <Tab.Screen
                name="HazPremium"
                component={HazPremium}
                options={{
                    headerShown: false,
                    tabBarButton: () => null,
                
                }}
            />
            <Tab.Screen
                name="InvitaAmigo"
                component={InvitarAmigo}
                options={{
                    headerShown: false,
                    tabBarButton: () => null,
                
                }}
            />
            <Tab.Screen
                name="Ayuda"
                component={Ayuda}
                options={{
                    headerShown: false,
                    tabBarButton: () => null,
              presentation: 'modal',
              animationTypeForReplace: 'push',
              animation:'slide_from_right'
                
                }}
            />
            <Tab.Screen
                name="Sala"
                component={Sala}
                options={{
                    headerShown: false,
                    tabBarButton: () => null,
                }}
            />
            <Tab.Screen
                name="Chat"
                component={ChatScreen}
                options={{
                    headerShown: false,
                    tabBarButton: () => null,
                }}
            />
        </Tab.Navigator>
    )
}

export default Tabs;