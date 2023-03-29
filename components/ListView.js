import React, { useState, useEffect, Fragment } from "react";
import { Image, Text, TouchableOpacity, ToastAndroid, View } from "react-native";
import { useMaterialYouPalette } from "@assembless/react-native-material-you";
import MaskedView from "@react-native-masked-view/masked-view";
import { useNavigation } from "@react-navigation/native";
import Images, { prefetchImage } from "../static/Images";

const ListItem = (props) => {
    const palette = useMaterialYouPalette();
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            style={[
                styles.listItem,
                {
                    borderColor: palette.system_accent2[2],
                },
                props.enabled !== false ? "" : styles.listItemDisabled,
            ]}
            onPress={() => {
                if (props.enabled) navigation.navigate(props.navName);
            }}
        >
            <MaskedView
                maskElement={
                    <Image
                        style={{ width: 30, height: 30 }}
                        source={
                            props.type === "locker"
                                ? Images.locker
                                : props.mode === "bluetooth"
                                ? Images.bluetooth
                                : props.mode === "nfc"
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
                    {props.type === "locker" ? `Locker: ${props.name}` : props.name}
                </Text>
                {props.type === "locker" ? (
                    <>
                        <Text style={[styles.listItemText, { color: palette.system_accent2[4] }]}>Location: {props.location}</Text>
                        {props.lastAccess !== undefined ? (
                            <Text style={[styles.listItemText, { color: palette.system_accent2[4] }]}>Last access: {props.lastAccess}</Text>
                        ) : (
                            ""
                        )}
                    </>
                ) : props.type === "pairing" ? (
                    <Text style={[styles.listItemText, { color: palette.system_accent2[4] }]}>{props.desc}</Text>
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
            {props.itemsList.map((item, idx) => (
                <ListItem
                    key={idx}
                    type={item.type}
                    name={item.name}
                    location={item.location}
                    lastAccess={item.lastAccess}
                    mode={item.mode}
                    desc={item.desc}
                    enabled={item.enabled}
                    navName={item.navName}
                />
            ))}
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
