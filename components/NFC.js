import NfcManager, { NfcTech } from "react-native-nfc-manager";
import { Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, useColorScheme, View, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import { useMaterialYouPalette } from "@assembless/react-native-material-you";
import MaskedView from "@react-native-masked-view/masked-view";

import Images from "../static/Images";

const NFC = () => {
    const [hasNfc, setHasNFC] = useState(null);
    const [enabledState, setEnabledState] = useState(true);
    const [tagState, setTagState] = useState([]);

    const palette = useMaterialYouPalette();
    const isDarkMode = useColorScheme() === "dark";

    const backgroundStyle = {
        backgroundColor: palette.system_accent2[11],
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

            setTagState(sectorZeroData);
        } catch (ex) {
            console.log("Oops!", ex);
            // setTagState(JSON.stringify(ex));
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

                if (!(await NfcManager.isEnabled())) {
                    setEnabledState(false);
                } else {
                    setEnabledState(true);
                    await readTag();
                }
            }
        };

        checkIsSupported();
    }, []);

    if (!hasNfc) {
        return (
            <SafeAreaView style={backgroundStyle}>
                <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={backgroundStyle.backgroundColor} />
                <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
                    <View style={backgroundStyle}>
                        <Text style={{ fontSize: 24, padding: 20 }}>Device does not support NFC</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={([backgroundStyle], { flex: 1 })}>
            <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={backgroundStyle.backgroundColor} />
            <ScrollView contentInsetAdjustmentBehavior="automatic" style={[backgroundStyle]} contentContainerStyle={styles.container}>
                <View style={[backgroundStyle, styles.container]}>
                    <MaskedView maskElement={<Image style={{ width: 90, height: 90 }} resizeMode={"contain"} source={Images.nfc} />}>
                        <View
                            style={{
                                width: 90,
                                height: 90,
                                backgroundColor: enabledState ? palette.system_accent2[2] : palette.system_accent2[7],
                            }}
                        ></View>
                    </MaskedView>
                    {enabledState ? (
                        <>
                            <Text
                                style={{
                                    fontWeight: 600,
                                    fontSize: 18,
                                    textAlign: "center",
                                    color: enabledState ? palette.system_accent2[2] : palette.system_accent2[7],
                                }}
                            >
                                Please put your device at the locker's door
                            </Text>
                            <View
                                style={{
                                    margin: 20,
                                    padding: 20,
                                    borderRadius: 20,
                                    borderStyle: "solid",
                                    borderWidth: 2,
                                    borderColor: palette.system_accent2[4],
                                }}
                            >
                                {tagState.map((sector, idx) => (
                                    <Text
                                        key={idx}
                                        style={{
                                            fontWeight: 600,
                                            fontSize: 14,
                                            fontFamily: "monospace",
                                            color: palette.system_accent2[4],
                                            padding: 5,
                                        }}
                                    >
                                        {sector}
                                    </Text>
                                ))}
                            </View>
                        </>
                    ) : (
                        <>
                            <Text
                                style={{
                                    fontWeight: 600,
                                    fontSize: 18,
                                    textAlign: "center",
                                    color: palette.system_accent2[4],
                                    padding: 5,
                                }}
                            >
                                NFC doesn't seem to be enabled.
                            </Text>
                            <TouchableOpacity
                                style={{
                                    padding: 15,
                                    paddingHorizontal: 30,
                                    backgroundColor: palette.system_accent2[10],
                                    borderRadius: 10,
                                    margin: 10,
                                }}
                                onPress={async () => {
                                    if (await NfcManager.isEnabled()) {
                                        setEnabledState(true);
                                        await readTag();
                                    }
                                }}
                            >
                                <Text
                                    style={{
                                        fontWeight: 600,
                                        fontSize: 18,
                                        textAlign: "center",
                                        color: palette.system_accent2[4],
                                    }}
                                >
                                    Refresh
                                </Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
    },
});

export default NFC;
