import React from "react";
import {
    Image,
    View,
    Text
} from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Profile, Monedero, CrearPartida, Addgame } from "../screens/";
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
                tabBarIcon: ({ focused }) => {
                    const tintColor = focused ? COLORS.white : COLORS.gray;

                    switch (route.name) {
                        case "Home":
                            return (
                                <>
                                    <Entypo name="game-controller" size={44} color={tintColor} />
                                    <Text>Competir</Text>
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
                                    <Text>Perfil</Text>
                                </>
                            )
                            {/*<Image
                                    source={icons.menu_icon}
                                    resizeMode="contain"
                                    style={{
                                        tintColor: tintColor,
                                        width: 25,
                                        height: 25
                                    }}
                                />*/}
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
        </Tab.Navigator>
    )
}

export default Tabs;