import React from "react";
import { useMaterialYouPalette } from "@assembless/react-native-material-you";
import { ScrollView } from "react-native";

import User from "./Header";
import ListView from "./ListView";

const LockersList = () => {
    const palette = useMaterialYouPalette();

    const backgroundStyle = {
        backgroundColor: palette.system_accent2[11],
    };

    const data = [
        {
            type: "locker",
            name: "12312329809138490102341461",
            location: "yo grandma house",
            lastAccess: "1677683725",
            enabled: true,
            navName: "Locker",
        },
        {
            type: "locker",
            name: "name",
            location: "yo grandma house",
            lastAccess: "1677683725",
            enabled: true,
            navName: "Locker",
        },
        {
            type: "locker",
            name: "name",
            location: "yo grandma house",
            lastAccess: "1677683725",
            enabled: true,
            navName: "Locker",
        },
        {
            type: "locker",
            name: "name",
            location: "yo grandma house",
            lastAccess: "1677683725",
            enabled: true,
            navName: "Locker",
        },
        {
            type: "locker",
            name: "name",
            location: "yo grandma house",
            lastAccess: "1677683725",
            enabled: true,
            navName: "Locker",
        },
        {
            type: "locker",
            name: "name",
            location: "yo grandma house",
            lastAccess: "1677683725",
            enabled: true,
            navName: "Locker",
        },
        {
            type: "locker",
            name: "name",
            location: "yo grandma house",
            lastAccess: "1677683725",
            enabled: true,
            navName: "Locker",
        },
        {
            type: "locker",
            name: "name",
            location: "yo grandma house",
            lastAccess: "1677683725",
            enabled: true,
            navName: "Locker",
        },
        {
            type: "locker",
            name: "name",
            location: "yo grandma house",
            lastAccess: "1677683725",
            enabled: true,
            navName: "Locker",
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
