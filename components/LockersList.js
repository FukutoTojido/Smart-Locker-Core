import React, { useEffect, useState, useCallback, useContext } from "react";
import { useMaterialYouPalette } from "@assembless/react-native-material-you";
import { ScrollView, RefreshControl } from "react-native";

import User from "./Header";
import ListView from "./ListView";

import Auth from "../services/AuthService";
import { AllLockersDataContext } from "../App";

const LockersList = () => {
    const palette = useMaterialYouPalette();
    const [refreshing, setRefreshing] = useState(false);
    const [lockersData, setLockersData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const allLockersData = useContext(AllLockersDataContext);

    const backgroundStyle = {
        backgroundColor: palette.system_accent2[11],
    };

    const feed = async () => {
        const res = await Auth.feedsAll();

        if (JSON.stringify(res) !== "{}") {
            setIsLoading(false);
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

        console.log("Data fetched");

        // console.log(lockersData);
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
            <ListView listTitle="Lockers List" itemsList={allLockersData.val} isLoading={isLoading} />
        </ScrollView>
    );
};

export default LockersList;
