import React, { useState, useEffect, useContext } from "react";
import { Image, Text, TouchableOpacity, ToastAndroid, View, ActivityIndicator } from "react-native";
import { useMaterialYouPalette } from "@assembless/react-native-material-you";
import MaskedView from "@react-native-masked-view/masked-view";
import { useNavigation } from "@react-navigation/native";
import Images, { prefetchImage } from "../static/Images";

import { LockerContext } from "../App";

const ListItem = (props) => {
    const palette = useMaterialYouPalette();
    const navigation = useNavigation();
    const lockerData = useContext(LockerContext);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        // console.log(props.data.last_accessed, props.data.last_accessed.Time);
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const cvDateToCurrent = (time) => {
        if (time === "") return;
        const timestamp = new Date(time);

        if (currentTime.getFullYear() - timestamp.getFullYear() > 0) return `${currentTime.getFullYear() - timestamp.getFullYear()} year(s) ago`;
        if (currentTime.getMonth() - timestamp.getMonth() !== 0) return `${currentTime.getMonth() - timestamp.getMonth()} month(s) ago`;
        if (currentTime.getDate() - timestamp.getDate() !== 0) return `${currentTime.getDate() - timestamp.getDate()} day(s) ago`;
        if (currentTime.getHours() - timestamp.getHours() !== 0) return `${currentTime.getHours() - timestamp.getHours()} hour(s) ago`;
        if (currentTime.getMinutes() - timestamp.getMinutes() !== 0) return `${currentTime.getMinutes() - timestamp.getMinutes()} minute(s) ago`;
        if (currentTime.getSeconds() - timestamp.getSeconds() !== 0) return `${currentTime.getSeconds() - timestamp.getSeconds()} second(s) ago`;
    };

    return (
        <TouchableOpacity
            style={[
                styles.listItem,
                {
                    borderColor: palette.system_accent2[2],
                },
                props.data.enabled !== false ? "" : styles.listItemDisabled,
            ]}
            onPress={() => {
                if (props.data.type === "locker") lockerData.setVal(props.data);
                if (props.data.enabled) navigation.navigate(props.data.navName);
            }}
        >
            <MaskedView
                maskElement={
                    <Image
                        style={{ width: 30, height: 30 }}
                        source={
                            props.data.type === "locker"
                                ? Images.locker
                                : props.data.mode === "bluetooth"
                                ? Images.bluetooth
                                : props.data.mode === "nfc"
                                ? Images.nfc
                                : ""
                        }
                    />
                }
            >
                <View
                    style={[
                        styles.listItemIcon,
                        {
                            backgroundColor: palette.system_accent2[2],
                        },
                    ]}
                ></View>
            </MaskedView>
            <View style={styles.listItemDetail}>
                <Text
                    style={[
                        styles.listItemHeader,
                        {
                            color: palette.system_accent2[2],
                        },
                    ]}
                    numberOfLines={1}
                >
                    {props.data.name}
                </Text>
                {props.data.type === "locker" ? (
                    <>
                        <Text style={[styles.listItemText, { color: palette.system_accent2[4] }]}>Location: {props.data.location}</Text>
                        {props.data.last_accessed !== undefined ? (
                            <Text style={[styles.listItemText, { color: palette.system_accent2[4] }]} currentTime={currentTime}>
                                Last access: {cvDateToCurrent(props.data.last_accessed.Time)}
                            </Text>
                        ) : (
                            ""
                        )}
                    </>
                ) : props.data.type === "pairing" ? (
                    <Text style={[styles.listItemText, { color: palette.system_accent2[4] }]}>{props.data.desc}</Text>
                ) : (
                    ""
                )}
            </View>
        </TouchableOpacity>
    );
};

const ListView = (props) => {
    const palette = useMaterialYouPalette();
    const [prefetchedAll, setPrefetchedAll] = useState(false);

    useEffect(() => {
        const waitPrefetchAll = async () => {
            const res = await prefetchImage();
            setPrefetchedAll(res);
        };

        waitPrefetchAll();
    }, []);

    return (
        <View style={styles.list} key={prefetchedAll}>
            <Text style={[styles.listTitle, { color: palette.system_accent2[2] }]}>{props.listTitle}</Text>
            {!props.isLoading ? (
                props.itemsList.map((item, idx) => <ListItem key={idx} data={item} />)
            ) : (
                <ActivityIndicator
                    size="large"
                    color={palette.system_accent2[2]}
                    style={{
                        padding: 20,
                    }}
                />
            )}
        </View>
    );
};

const styles = {
    list: {
        padding: 30,
        paddingTop: 10,
        flex: 1,
        flexDirection: "column",
        gap: 20,
    },
    listTitle: {
        fontSize: 48,
        fontWeight: 700,
    },
    listItem: {
        width: "100%",
        height: 100,
        padding: 20,
        borderStyle: "solid",
        borderWidth: 2,
        borderRadius: 15,
        flex: 1,
        flexGrow: 1,
        flexDirection: "row",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 20,
    },
    listItemDisabled: {
        opacity: 0.2,
    },
    listItemIcon: {
        width: 30,
        height: 30,
    },
    listItemDetail: {
        width: 284,
        height: "100%",
        flex: 1,
        justifyContent: "center",
    },
    listItemHeader: {
        fontWeight: 700,
        fontSize: 20,
    },
    listItemText: {
        fontWeight: 500,
    },
};

export default ListView;
