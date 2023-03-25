import React, { useState, useEffect } from "react";
import { Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, useColorScheme, View, Dimensions } from "react-native";
import { Colors, DebugInstructions, Header, LearnMoreLinks, ReloadInstructions } from "react-native/Libraries/NewAppScreen";
import { MaterialYouService, useMaterialYou, defaultPalette } from "@assembless/react-native-material-you";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MaskedView from "@react-native-masked-view/masked-view";
import NfcManager from "react-native-nfc-manager";

import MainScreen from "./components/MainScreen";
import ColorTest from "./components/Test/Color";
import NFC from "./components/NFC";
import Images from "./static/Images";

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

const CustomBackButton = () => {
    const { palette } = useMaterialYou({ fallbackPalette: defaultPalette });
    const { goBack } = useNavigation();
    return (
        <TouchableOpacity
            style={{
                // backgroundColor: "white",
                paddingHorizontal: 30
            }}
            onPress={() => {
                NfcManager.cancelTechnologyRequest();
                goBack();
            }}
        >
            <MaskedView maskElement={<Image style={{ width: 30, height: 30 }} resizeMode={"contain"} source={Images.back} />}>
                <View
                    style={{
                        width: 30,
                        height: 30,
                        backgroundColor: palette.system_accent2[2],
                    }}
                ></View>
            </MaskedView>
        </TouchableOpacity>
    );
};

function App() {
    const isDarkMode = useColorScheme() === "dark";
    const { palette } = useMaterialYou({ fallbackPalette: defaultPalette });

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    return (
        <>
            <NavigationContainer>
                <MaterialYouService fallbackPalette={defaultPalette}>
                    <SafeAreaView style={[backgroundStyle, { flex: 1 }]}>
                        <Stack.Navigator>
                            <Stack.Screen
                                name="MainScreen"
                                component={MainScreen}
                                options={{
                                    headerShown: false,
                                }}
                            />
                            <Stack.Screen name="Test" component={ColorTest} />
                            <Stack.Screen
                                name="NFC"
                                component={NFC}
                                options={{
                                    headerTitle: "",
                                    headerStyle: {
                                        height: 90,
                                        backgroundColor: palette.system_accent2[11],
                                        elevation: 0,
                                    },
                                    headerTransparent: true,
                                    headerLeft: () => <CustomBackButton />,
                                }}
                            />
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
