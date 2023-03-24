import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, useColorScheme, View, Dimensions } from "react-native";
import { Colors, DebugInstructions, Header, LearnMoreLinks, ReloadInstructions } from "react-native/Libraries/NewAppScreen";
import NfcManager, { NfcTech, MifareClassicHandlerAndroid } from "react-native-nfc-manager";
import { MaterialYouService, useMaterialYouPalette, defaultPalette } from "@assembless/react-native-material-you";

import MainScreen from "./components/MainScreen";
import ColorTest from "./components/Test/Color";

const icons = {
    locker: require("./static/secure.png"),
    bluetooth: require("./static/bluetooth.png"),
    nfc: require("./static/nfc-logo.png"),
    pairing: require("./static/pairing.png"),
    notification: require("./static/notification.png"),
};

const Color = {
    background0: "#161616",
    background1: "#282828",
    accent1: "#ffffff",
    accent2: "#888888",
    accent3: "#555555",
};

function App() {
    const isDarkMode = useColorScheme() === "dark";
    const [hasNfc, setHasNFC] = useState(null);
    const [tagState, setTagState] = useState("");

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    const readTag = async () => {
        try {
            const sectorZeroData = [];
            await NfcManager.requestTechnology(NfcTech.MifareClassic);

            await NfcManager.mifareClassicHandlerAndroid.mifareClassicAuthenticateA(0, [0x60, 0x90, 0xd0, 0x06, 0x32, 0xf5]);

            for (let i = 0; i < 4; i++) {
                const blockData = (await NfcManager.mifareClassicHandlerAndroid.mifareClassicReadBlock(i))
                    .map((byte) => byte.toString(16).padStart(2, "0").toUpperCase())
                    .join(" ");

                sectorZeroData.push(blockData);
            }

            console.log(`MiFARE Classic 1K found: `);
            sectorZeroData.forEach((block, idx) => {
                console.log(`\tBlock ${idx}: ${block}`);
            });

            setTagState(JSON.stringify(sectorZeroData));
        } catch (ex) {
            // console.warn("Oops!", ex);
            setTagState(JSON.stringify(ex));
        } finally {
            NfcManager.cancelTechnologyRequest();
        }
    };

    useEffect(() => {
        const checkIsSupported = async () => {
            const deviceIsSupported = await NfcManager.isSupported();

            setHasNFC(deviceIsSupported);
            if (deviceIsSupported) {
                await NfcManager.start();
            }
        };

        checkIsSupported();
    }, []);

    if (!hasNfc) {
        return (
            <SafeAreaView style={backgroundStyle}>
                <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={backgroundStyle.backgroundColor} />
                <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
                    <View
                        style={{
                            backgroundColor: isDarkMode ? Colors.black : Colors.white,
                        }}
                    >
                        <Text style={{ fontSize: 24, padding: 20 }}>Device does not support NFC</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }

    return (
        // <SafeAreaView style={backgroundStyle}>
        //     <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={backgroundStyle.backgroundColor} />
        //     <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
        //         <View
        //             style={{
        //                 backgroundColor: isDarkMode ? Colors.black : Colors.white,
        //             }}
        //         >
        //             <Text style={{ fontSize: 24, padding: 20 }}>Device supports NFC</Text>
        //             <TouchableOpacity onPress={readTag}>
        //                 <Text style={{ fontSize: 24, padding: 20, margin: 10 }}>Start scanning here</Text>
        //             </TouchableOpacity>
        //             <Text>{JSON.stringify(tagState)}</Text>
        //         </View>
        //     </ScrollView>
        // </SafeAreaView>
        <MaterialYouService fallbackPalette={defaultPalette}>
            <SafeAreaView style={backgroundStyle}>
                <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={backgroundStyle.backgroundColor} />
                <MainScreen />
                {/* <ColorTest /> */}
            </SafeAreaView>
        </MaterialYouService>
    );
}

export default App;
export { icons, Color };
