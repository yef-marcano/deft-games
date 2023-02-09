import React from "react";
import {
    Image,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Profile, Monedero, CrearPartida, Addgame, Board, HazPremium } from "../screens/";
import { icons, COLORS } from "../constants";
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
                    const tintColor = focused ? COLORS.white : COLORS.game;

                    switch (route.name) {
                        case "Home":
                            return (
                                <>
                                    <Entypo name="game-controller" size={44} color={tintColor} />
                                    <Text style={{color:tintColor}}>Competir</Text>
                                </>
                            )


                        case "Notification":
                            return (
                                <>
                                <LinearGradient
                                colors={['#FF2CDF', '#FF2CDF', '#00DBDE']}
                                start={[1.8, 0.7]}
                                style={{
                                    borderRadius: 10,
                                    marginTop: -70,
                                    padding: 20,
                                    transform: [
                                        { rotate: '45deg' }
                                    ]
                                      }
                                }>
                                <View>
                                    <Entypo name="plus" size={44} color={COLORS.theme} />
                                    {/* <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']}> <Text> Your Text Here </Text> </LinearGradient>  */}
                                </View>
                                </LinearGradient>
                                </>
                            )

                        case "Profile":
                            return (
                                <>
                                    <Ionicons name="person-circle-outline" size={44} color={tintColor} />
                                    <Text style={{color:tintColor}}>Perfil</Text>
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
        </Tab.Navigator>
    )
}

export default Tabs;