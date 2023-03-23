import React from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { ScrollView, useColorScheme } from "react-native";

import User from "./Header";
import ListView from "./ListView";

const LockersList = () => {
    const isDarkMode = useColorScheme() === "dark";
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    const listTitle = {
        locker: "Lockers list",
        pairing: "Pairing",
        noti: "Notifications",
    };

    return (
        <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
            <User />
            <ListView listTitle={listTitle.locker} />
        </ScrollView>
    );
};

export default LockersList