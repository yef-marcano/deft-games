import React from "react";
import {
    Image,
    View
} from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Profile, Monedero,CrearPartida,Addgame } from "../screens/";
import { icons, COLORS } from "../constants";
import { Feather, Entypo, MaterialCommunityIcons, Ionicons  } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const tabOptions = {
    showLabel: false,
    style: {
        height: "10%",
        backgroundColor: COLORS.black
    }
}

const Tabs = ({navigation}) => {
    return (
        <Tab.Navigator
            tabBarOptions={tabOptions}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    const tintColor = focused ? COLORS.white : COLORS.gray;

                    switch (route.name) {
                        case "Home":
                            return (
                                
                                <MaterialCommunityIcons name="axe-battle" size={44} color={tintColor} />    
                            )


                        case "Notification":
                            return (
                                <View style={{
                                        backgroundColor: COLORS.primary,
                                        borderRadius: 100,
                                        marginTop: -40,
                                        padding: 20
                                }}>
                                <Entypo name="plus" size={44} color={tintColor} />
                                </View>
                            )

                        case "Profile":
                            return (
                                <Ionicons name="person-circle-outline" size={44} color={tintColor} />
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