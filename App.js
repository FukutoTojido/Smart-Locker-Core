import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, useColorScheme, View, Dimensions } from "react-native";
import { Colors, DebugInstructions, Header, LearnMoreLinks, ReloadInstructions } from "react-native/Libraries/NewAppScreen";
import { MaterialYouService, useMaterialYouPalette, defaultPalette } from "@assembless/react-native-material-you";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import MainScreen from "./components/MainScreen";
import ColorTest from "./components/Test/Color";

const icons = {
    locker: require("./static/secure.png"),
    bluetooth: require("./static/bluetooth.png"),
    nfc: require("./static/nfc-logo.png"),
    pairing: require("./static/pairing.png"),
    notification: require("./static/notification.png"),
};

const Stack = createStackNavigator();

const Dump = () => {
    return (
        <View>
            <Text>Hello</Text>
        </View>
    );
};

function App() {
    const isDarkMode = useColorScheme() === "dark";

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    return (
        <>
            <NavigationContainer>
                <MaterialYouService fallbackPalette={defaultPalette}>
                    <SafeAreaView style={[backgroundStyle, { flex: 1 }]}>
                        <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={backgroundStyle.backgroundColor} />
                        <Stack.Navigator>
                            <Stack.Screen name="MainScreen" component={MainScreen} options={{
                                headerShown: false
                            }}/>
                            <Stack.Screen name="Test" component={ColorTest} />
                        </Stack.Navigator>

                        {/* <MainScreen /> */}
                        {/* <ColorTest /> */}
                    </SafeAreaView>
                </MaterialYouService>
            </NavigationContainer>
        </>
    );
}

export default App;
export { icons };
