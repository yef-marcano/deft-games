import React from "react";
import Appnavigator from "./navigation/navigation";
import { Root } from 'react-native-alert-notification';

export default function App(props) {

  return (
      <Root>
        <Appnavigator />
      </Root>
  );
}

/*import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

import { BookDetail, Login, Register } from "./screens/";
import Tabs from "./navigation/tabs";
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

const App = () => {
    const [loaded] = useFonts({
            "Roboto-Black" : require('./assets/fonts/Roboto-Black.ttf'),
            "Roboto-Bold" : require('./assets/fonts/Roboto-Bold.ttf'),
            "Roboto-Regular" : require('./assets/fonts/Roboto-Regular.ttf'),
        })

    if(!loaded){
        return null;
    }
    return (
        <Root>
        <NavigationContainer theme={theme}>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
                initialRouteName={'Login'}
            >
                <Stack.Screen name="Home" component={Tabs} />

                <Stack.Screen name="BookDetail" component={BookDetail} options={{ headerShown: false }} />

                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                
                <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />

            </Stack.Navigator>
        </NavigationContainer>
            </Root>
    )
}

export default App;*/