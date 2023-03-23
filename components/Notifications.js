import React from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { ScrollView, useColorScheme } from "react-native";

import User from "./Header";
import ListView from "./ListView";

const Notifications = () => {
    const isDarkMode = useColorScheme() === "dark";
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    const data = [];

    return (
        <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
            <User />
            <ListView listTitle="Notifications" itemsList={data}/>
        </ScrollView>
    );
};

export default Notifications;
