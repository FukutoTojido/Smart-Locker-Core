import NfcManager, { NfcTech } from "react-native-nfc-manager";
import {
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View,
    Dimensions,
    ActivityIndicator,
    ToastAndroid,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { useMaterialYouPalette } from "@assembless/react-native-material-you";
import MaskedView from "@react-native-masked-view/masked-view";

import Images from "../static/Images";
import { UnlockOrPairingContext, LockerContext, AllLockersDataContext } from "../App";
import LockerService from "../services/LockerService";
import Auth from "../services/AuthService";

const NFC = ({ navigation }) => {
    const [enabledState, setEnabledState] = useState(true);
    // const [tagState, setTagState] = useState([]);
    const pairingObj = useContext(UnlockOrPairingContext);
    const lockerData = useContext(LockerContext);
    const allLockersData = useContext(AllLockersDataContext);
    const [isLoading, setIsLoading] = useState(false);

    const palette = useMaterialYouPalette();
    const isDarkMode = useColorScheme() === "dark";

    const backgroundStyle = {
        backgroundColor: palette.system_accent2[11],
    };

    useEffect(() => {
        return () => {
            NfcManager.cancelTechnologyRequest();
        };
    }, []);

    const feed = async () => {
        const res = await Auth.feedsAll();

        if (JSON.stringify(res) !== "{}") {
            allLockersData.setVal(
                res.lockers.map((locker) => {
                    return {
                        type: "locker",
                        ...locker,
                        name: `Locker ${locker.id}`,
                        enabled: true,
                        navName: "Locker",
                    };
                })
            );
        }

        // console.log(lockersData);
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

            const NFC_sig = sectorZeroData[2].replaceAll(" ", "").slice(12);

            console.log(`Locker NFC Signature Scanned: ${NFC_sig}`);
            // setTagState(sectorZeroData);

            if (pairingObj.val) {
                setIsLoading(true);
                await NfcManager.cancelTechnologyRequest();
                setIsLoading(false);

                // navigation.navigate("Setup");
                navigation.reset({
                    index: 1,
                    routes: [{ name: "MainScreen" }, { name: "Setup" }],
                });
            } else {
                setIsLoading(true);
                const res =
                    lockerData.val.lock_status === "locked" ? await LockerService.UnlockLocker(NFC_sig) : await LockerService.LockLocker(NFC_sig);
                console.log(res);
                await feed();
                setIsLoading(false);

                if (res.status !== "Unallowed") {
                    ToastAndroid.showWithGravity(res.status, ToastAndroid.SHORT, ToastAndroid.CENTER);
                    NfcManager.cancelTechnologyRequest();
                    navigation.pop(2);
                    return;
                }

                await NfcManager.cancelTechnologyRequest();
                await NfcManager.requestTechnology(NfcTech.MifareClassic);
            }
        } catch (ex) {
            console.log("Oops!", ex);
            await NfcManager.cancelTechnologyRequest();
            // setTagState(JSON.stringify(ex));
        }
    };

    useEffect(() => {
        const startNFC = async () => {
            await NfcManager.start();

            if (!(await NfcManager.isEnabled())) {
                setEnabledState(false);
            } else {
                setEnabledState(true);
                await readTag();
            }
        };

        startNFC();
    }, []);

    return (
        <SafeAreaView style={([backgroundStyle], { flex: 1 })}>
            <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={backgroundStyle.backgroundColor} />
            <ScrollView contentInsetAdjustmentBehavior="automatic" style={[backgroundStyle]} contentContainerStyle={styles.container}>
                <View style={[backgroundStyle, styles.container]}>
                    {!isLoading ? (
                        <MaskedView maskElement={<Image style={{ width: 90, height: 90 }} resizeMode={"contain"} source={Images.nfc} />}>
                            <View
                                style={{
                                    width: 90,
                                    height: 90,
                                    backgroundColor: enabledState ? palette.system_accent2[2] : palette.system_accent2[7],
                                }}
                            ></View>
                        </MaskedView>
                    ) : (
                        <ActivityIndicator
                            size="large"
                            color={palette.system_accent2[2]}
                            style={{
                                padding: 20,
                            }}
                        />
                    )}

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
                                {!isLoading ? "Please put your device at the locker's door" : "Please wait..."}
                            </Text>
                            {/* <View
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
                            </View> */}
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
