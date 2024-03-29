import React, { useEffect, useState, useContext } from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, useColorScheme, View, ToastAndroid } from "react-native";
import { useMaterialYouPalette } from "@assembless/react-native-material-you";
import { TextInput } from "react-native-paper";
import Dialog from "react-native-dialog";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Button, Input, Section } from "./BasicComponents";
import { LockerContext, LoadingContext, AllLockersDataContext } from "../App";
import LockerService from "../services/LockerService";
import Auth from "../services/AuthService";

const Locker = ({ navigation }) => {
    const palette = useMaterialYouPalette();
    const isDarkMode = useColorScheme() === "dark";
    const [lockerName, setLockerName] = useState("");
    const [dialog, setDialog] = useState(false);
    const [disposed, setDisposed] = useState(false);
    const lockerData = useContext(LockerContext);
    const loadingCtx = useContext(LoadingContext);
    const allLockersData = useContext(AllLockersDataContext)

    const backgroundStyle = {
        backgroundColor: palette.system_accent2[11],
    };

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

    const goHome = () => {
        navigation.reset({
            index: 0,
            routes: [
                {
                    name: "MainScreen",
                },
            ],
        });
    };

    const showDialog = () => {
        setDialog(true);
    };

    const hideDialog = () => {
        setDialog(false);
    };

    const toDispose = async () => {
        const res = await LockerService.UnpairLocker(lockerData.val.nfc_sig);
        feed();
        ToastAndroid.showWithGravity(res.status, ToastAndroid.LONG, ToastAndroid.CENTER);
        setDialog(false);
        setDisposed(true);

        console.log("About to quit");
    };

    useEffect(() => {
        if (disposed) {
            console.log("I'm quitting");
            setTimeout(() => {
                goHome();
            }, 200);
        }
    }, [disposed]);

    return (
        <ScrollView contentInsetAdjustmentBehavior="automatic" style={[backgroundStyle]} contentContainerStyle={[styles.list]}>
            <View style={[backgroundStyle, styles.container]}>
                <Text style={[styles.listTitle, { color: palette.system_accent2[2] }]}>{lockerData.val.name}</Text>
                <Input label="Locker's Nickname" val={lockerName} valChange={setLockerName} />
                <Section header="Locker Number" content={lockerData.val.id} />
                <Section header="Location" content={lockerData.val.location} />
                <Section
                    header="Humidity"
                    content={`${Object.values(lockerData.val.feeds.filter((f) => f.feed_type === "moisture")[0]?.feed_data ?? { tmp: 0 }).at(-1)}%`}
                />
                <Section
                    header="Temperature"
                    content={`${Object.values(lockerData.val.feeds.filter((f) => f.feed_type === "temperature")[0]?.feed_data ?? { tmp: 0 }).at(
                        -1
                    )}°C`}
                />
                <Button
                    onPress={() => {
                        navigation.navigate("Unlock");
                    }}
                    textColor={palette.system_accent2[2]}
                    backgroundColor={palette.system_accent2[10]}
                    text={lockerData.val.lock_status === "locked" ? "Unlock" : "Lock"}
                />
                <Button onPress={showDialog} textColor={palette.system_accent2[2]} backgroundColor={"#9A3030"} text={"Dispose"} />
                <Dialog.Container
                    visible={dialog}
                    contentStyle={{
                        borderRadius: 10,
                        backgroundColor: palette.system_accent2[11],
                    }}
                    onBackdropPress={hideDialog}
                    onRequestClose={hideDialog}
                >
                    <Dialog.Title>
                        <Text
                            style={{
                                fontWeight: 700,
                                color: palette.system_accent2[2],
                            }}
                        >
                            Locker dispose
                        </Text>
                    </Dialog.Title>
                    <Dialog.Description>
                        <Text style={{ color: palette.system_accent2[5] }}>Do you want to dispose this locker? You cannot undo this action.</Text>
                    </Dialog.Description>
                    <Dialog.Button label="Cancel" onPress={hideDialog} color={palette.system_accent2[2]} bold={true} />
                    <Dialog.Button label="Confirm" onPress={toDispose} color={palette.system_accent2[2]} bold={true} />
                </Dialog.Container>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 20,
        height: "100%",
        // justifyContent: "center",
        // alignContent: "center",
        // alignItems: "center",
    },
    list: {
        padding: 30,
        paddingTop: 100,
    },
    listTitle: {
        fontSize: 48,
        fontWeight: 700,
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: 700,
    },
    sectionContent: {
        fontSize: 18,
    },
    button: {
        padding: 20,
        borderRadius: 10,
    },
});

export default Locker;
