import React, { useEffect, useState, useCallback, useContext } from "react";
import { useMaterialYouPalette } from "@assembless/react-native-material-you";
import { ScrollView, RefreshControl } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import User from "./Header";
import ListView from "./ListView";

import Auth from "../services/AuthService";
import { AuthContext, AllLockersDataContext, LoadingContext } from "../App";

const LockersList = () => {
    const palette = useMaterialYouPalette();
    const [refreshing, setRefreshing] = useState(false);
    const [lockersData, setLockersData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const setToken = useContext(AuthContext);
    const allLockersData = useContext(AllLockersDataContext);
    const loadingCtx = useContext(LoadingContext);

    const backgroundStyle = {
        backgroundColor: palette.system_accent2[11],
    };

    const feed = async () => {
        const res = await Auth.feedsAll();

        if (res && JSON.stringify(res) !== "{}") {
            loadingCtx.setVal(false);
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

        if (!res) {
            const token = await AsyncStorage.getItem("userToken");
            setToken(token);
        }

        console.log("Data fetched");

        // console.log(lockersData);
    };

    useEffect(() => {
        feed();
    }, []);

    const onRefresh = useCallback(async () => {
        loadingCtx.setVal(true);
        await feed();
        loadingCtx.setVal(false);
    }, []);

    return (
        <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={backgroundStyle}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
            <User />
            <ListView listTitle="Lockers List" itemsList={allLockersData.val} isLoading={loadingCtx.val} />
        </ScrollView>
    );
};

export default LockersList;
