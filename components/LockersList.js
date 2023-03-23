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

    const data = [
        {
            type: "locker",
            name: "12312329809138490102341461",
            location: "yo grandma house",
            lastAccess: "1677683725",
        },
        {
            type: "locker",
            name: "name",
            location: "yo grandma house",
            lastAccess: "1677683725",
        },
        {
            type: "locker",
            name: "name",
            location: "yo grandma house",
            lastAccess: "1677683725",
        },
        {
            type: "locker",
            name: "name",
            location: "yo grandma house",
            lastAccess: "1677683725",
        },
        {
            type: "locker",
            name: "name",
            location: "yo grandma house",
            lastAccess: "1677683725",
        },
        {
            type: "locker",
            name: "name",
            location: "yo grandma house",
            lastAccess: "1677683725",
        },
        {
            type: "locker",
            name: "name",
            location: "yo grandma house",
            lastAccess: "1677683725",
        },
        {
            type: "locker",
            name: "name",
            location: "yo grandma house",
            lastAccess: "1677683725",
        },
        {
            type: "locker",
            name: "name",
            location: "yo grandma house",
            lastAccess: "1677683725",
        },
    ];

    return (
        <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
            <User />
            <ListView listTitle="Lockers List" itemsList={data} />
        </ScrollView>
    );
};

export default LockersList;
