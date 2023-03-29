import React from "react";
import { useMaterialYouPalette } from "@assembless/react-native-material-you";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

import User from "./Header";
import ListView from "./ListView";
import { NFC_SUPPORTED } from "../App";

const Pairing = () => {
    const palette = useMaterialYouPalette();
    const navigation = useNavigation();

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
            <User />
            <ListView listTitle={navigation.getState().routes.at(-1).name === "Unlock" ? "Unlock" : "Pairing"} itemsList={data} />
        </ScrollView>
    );
};

export default Pairing;
