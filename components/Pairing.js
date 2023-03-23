import React from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { ScrollView, useColorScheme } from "react-native";

import User from "./Header";
import ListView from "./ListView";

const Pairing = () => {
    const isDarkMode = useColorScheme() === "dark";
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    const data = [
        {
            type: "pairing",
            mode: "bluetooth",
            name: "Bluetooth",
            desc: "Use Bluetooth to search for nearby lockers",
            enabled: true,
        },
        {
            type: "pairing",
            mode: "nfc",
            name: "NFC",
            desc: "Put your device at the door of the locker you want to use",
            enabled: true,
        },
        {
            type: "pairing",
            mode: "nfc",
            name: "NFC",
            desc: "Your device does not support NFC technology",
            enabled: false,
        },
    ];

    return (
        <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
            <User />
            <ListView listTitle="Pairing" itemsList={data} />
        </ScrollView>
    );
};

export default Pairing;
