import React, { useContext, useEffect } from "react";
import { useMaterialYouPalette } from "@assembless/react-native-material-you";
import { ScrollView, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import User from "./Header";
import ListView from "./ListView";
import { NFC_SUPPORTED, UnlockOrPairingContext } from "../App";

const Dump = () => {
    return (
        <View
            style={{
                width: "100%",
                height: 90,
            }}
        ></View>
    );
};

const Pairing = () => {
    const palette = useMaterialYouPalette();
    const navigation = useNavigation();
    const pairingObj = useContext(UnlockOrPairingContext);

    useEffect(() => {
        if (navigation.getState().routes.at(-1).name === "Unlock") pairingObj.setVal(false);
        else pairingObj.setVal(true);
    }, []);

    // console.log(navigation.getState());

    const backgroundStyle = {
        backgroundColor: palette.system_accent2[11],
    };

    const data = [
        {
            type: "pairing",
            mode: "bluetooth",
            name: "Bluetooth",
            desc: "Use Bluetooth to search for nearby lockers",
            enabled: true,
            navName: "Test",
        },
        {
            type: "pairing",
            mode: "nfc",
            name: "NFC",
            desc: "Put your device at the door of the locker you want to use",
            enabled: NFC_SUPPORTED,
            navName: "NFC",
        },
        // {
        //     type: "pairing",
        //     mode: "nfc",
        //     name: "NFC",
        //     desc: "Your device does not support NFC technology",
        //     enabled: false,
        // },
    ];

    return (
        <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
            {navigation.getState().routes.at(-1).name === "Unlock" ? <Dump /> : <User />}
            <ListView listTitle={navigation.getState().routes.at(-1).name === "Unlock" ? "Unlock" : "Pairing"} itemsList={data} />
        </ScrollView>
    );
};

export default Pairing;
