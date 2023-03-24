import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

import { BookDetail, Login, Register, SplashScreen } from "../screens/";
import Tabs from "../navigation/tabs";
import DrawerNavigator from "../navigation/Drawer";
import { useFonts } from 'expo-font';
import { Root } from 'react-native-alert-notification';

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        border: "transparent"
    }
}

const Stack = createStackNavigator();

const Appnavigator = () => {
    const [loaded] = useFonts({
        "Roboto-Black": require('../assets/fonts/Roboto-Black.ttf'),
        "Roboto-Bold": require('../assets/fonts/Roboto-Bold.ttf'),
        "Roboto-Regular": require('../assets/fonts/Roboto-Regular.ttf'),
    })

    if (!loaded) {
        return null;
    }
    return (
        <Root>
            <NavigationContainer theme={theme}>
                <Stack.Navigator initialRouteName={'Splash'} >
                    {/* Tabs */}
                    <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Home" component={Tabs} options={{ headerShown: false }} />
                    <Stack.Screen name="BookDetail" component={BookDetail} options={{ headerShown: false }} />
                    <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                    <Stack.Screen name="Register" component={Register}
                        options={{
                            title: 'Registro',
                            headerStyle: {
                                backgroundColor: '#fff0',
                            },
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                            },
                        }} />
                </Stack.Navigator>
            </NavigationContainer>
        </Root>
    )

}


export default Appnavigator;