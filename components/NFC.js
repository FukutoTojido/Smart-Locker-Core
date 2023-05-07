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
import { UnlockOrPairingContext, LockerContext, AllLockersDataContext, LoadingContext, PairingContext } from "../App";
import LockerService from "../services/LockerService";
import Auth from "../services/AuthService";

const timeout = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

const NFC = ({ navigation }) => {
    const [enabledState, setEnabledState] = useState(true);
    // const [tagState, setTagState] = useState([]);
    const pairingObj = useContext(UnlockOrPairingContext);
    const lockerData = useContext(LockerContext);
    const allLockersData = useContext(AllLockersDataContext);
    const loadingCtx = useContext(LoadingContext);
    const pairingCtx = useContext(PairingContext);
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
        loadingCtx.setVal(true);
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
        loadingCtx.setVal(false);

        // console.log(lockersData);
    };

    const readTag = async () => {
        try {
            await NfcManager.requestTechnology(NfcTech.MifareClassic);

            // await NfcManager.mifareClassicHandlerAndroid.mifareClassicAuthenticateA(0, [0x60, 0x90, 0xd0, 0x06, 0x32, 0xf5]);
            await NfcManager.mifareClassicHandlerAndroid.mifareClassicAuthenticateA(1, [0xa9, 0x91, 0x64, 0x40, 0x07, 0x48]);
            console.log("Read");

            const blockData = (await NfcManager.mifareClassicHandlerAndroid.mifareClassicReadBlock(4))
                .map((byte) => byte.toString(16).padStart(2, "0").toUpperCase())
                .join(" ");

            console.log(blockData);

            const NFC_sig = blockData.replaceAll(" ", "").slice(12);

            console.log(`Locker NFC Signature Scanned: ${NFC_sig}`);
            // setTagState(sectorZeroData);

            if (pairingObj.val) {
                setIsLoading(true);
                await NfcManager.cancelTechnologyRequest();
                setIsLoading(false);

                // navigation.navigate("Setup");

                if (allLockersData.val.map((l) => l.nfc_sig).includes(NFC_sig)) {
                    ToastAndroid.showWithGravity("You have already paired with this locker?!", ToastAndroid.LONG, ToastAndroid.CENTER);
                    navigation.reset({
                        index: 0,
                        routes: [
                            {
                                name: "MainScreen",
                            },
                        ],
                    });
                } else {
                    pairingCtx.setVal(NFC_sig);
                    const res = await LockerService.PairLocker(NFC_sig);

                    ToastAndroid.showWithGravity(res.status, ToastAndroid.LONG, ToastAndroid.CENTER);
                    // navigation.reset({
                    //     index: 1,
                    //     routes: [{ name: "MainScreen" }, { name: "Setup" }],
                    // });
                    navigation.reset({
                        index: 0,
                        routes: [
                            {
                                name: "MainScreen",
                            },
                        ],
                    });

                    feed();
                }
            } else {
                setIsLoading(true);

                // console.log(lockerData.val);
                let res;
                if (NFC_sig === lockerData.val.nfc_sig) {
                    res =
                        lockerData.val.lock_status === "locked" ? await LockerService.UnlockLocker(NFC_sig) : await LockerService.LockLocker(NFC_sig);
                    console.log(res);
                    await NfcManager.cancelTechnologyRequest();
                    feed();
                    const newCurrentData = allLockersData.val.filter((f) => f.id === lockerData.val.id)[0];
                    lockerData.setVal({ ...newCurrentData, type: "locker", name: `Locker ${newCurrentData.id}`, enabled: true, navName: "Locker" });
                } else {
                    res = {
                        status: "Mismatch",
                    };
                    ToastAndroid.showWithGravity("Locker Mismatch!!", ToastAndroid.SHORT, ToastAndroid.CENTER);
                }

                setIsLoading(false);

                if (!["Unallowed", "Mismatch"].includes(res.status)) {
                    ToastAndroid.showWithGravity(res.status, ToastAndroid.LONG, ToastAndroid.CENTER);
                    NfcManager.cancelTechnologyRequest();
                    navigation.pop(3);
                    return;
                }

                await NfcManager.requestTechnology(NfcTech.MifareClassic);
            }
        } catch (ex) {
            console.log("Oops!", ex);
            await NfcManager.cancelTechnologyRequest();
            navigation.pop(3);
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
