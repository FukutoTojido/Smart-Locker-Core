import React, { useEffect, useState, useCallback } from "react";
import { useMaterialYouPalette } from "@assembless/react-native-material-you";
import { ScrollView, RefreshControl } from "react-native";

import User from "./Header";
import ListView from "./ListView";

import Auth from "../services/AuthService";

const LockersList = () => {
    const palette = useMaterialYouPalette();
    const [refreshing, setRefreshing] = useState(false);
    const [lockersData, setLockersData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const backgroundStyle = {
        backgroundColor: palette.system_accent2[11],
    };

    const data = [
        {
            id: 0,
            type: "locker",
            name: "12312329809138490102341461",
            location: "yo grandma house",
            lastAccess: "1677683725",
            enabled: true,
            navName: "Locker",
        },
        {
            id: 1,
            type: "locker",
            name: "name",
            location: "yo grandma house",
            lastAccess: "1677683725",
            enabled: true,
            navName: "Locker",
        },
        {
            id: 1,
            type: "locker",
            name: "name",
            location: "yo grandma house",
            lastAccess: "1677683725",
            enabled: true,
            navName: "Locker",
        },
        {
            id: 1,
            type: "locker",
            name: "name",
            location: "yo grandma house",
            lastAccess: "1677683725",
            enabled: true,
            navName: "Locker",
        },
        {
            id: 1,
            type: "locker",
            name: "name",
            location: "yo grandma house",
            lastAccess: "1677683725",
            enabled: true,
            navName: "Locker",
        },
        {
            id: 1,
            type: "locker",
            name: "name",
            location: "yo grandma house",
            lastAccess: "1677683725",
            enabled: true,
            navName: "Locker",
        },
        {
            id: 1,
            type: "locker",
            name: "name",
            location: "yo grandma house",
            lastAccess: "1677683725",
            enabled: true,
            navName: "Locker",
        },
        {
            id: 1,
            type: "locker",
            name: "name",
            location: "yo grandma house",
            lastAccess: "1677683725",
            enabled: true,
            navName: "Locker",
        },
        {
            id: 1,
            type: "locker",
            name: "name",
            location: "yo grandma house",
            lastAccess: "1677683725",
            enabled: true,
            navName: "Locker",
        },
    ];

    const feed = async () => {
        const res = await Auth.feedsAll();

        if (JSON.stringify(res) !== "{}") {
            setIsLoading(false);
            setLockersData(
                res.lockers.map((locker) => {
                    return {
                        type: "locker",
                        ...locker,
                        name: `Locker ${locker.id}`,
                        location: "",
                        lastAccess: "",
                        enabled: true,
                        navName: "Locker",
                    };
                })
            );
        }

        console.log(res);
    };

    useEffect(() => {
        feed();
    }, []);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await feed();
        setRefreshing(false);
    }, []);

    return (
        <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={backgroundStyle}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
            <User />
            <ListView listTitle="Lockers List" itemsList={lockersData} isLoading={isLoading} />
        </ScrollView>
    );
};

export default LockersList;
