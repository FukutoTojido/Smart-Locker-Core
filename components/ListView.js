import React, { useState, useEffect, Fragment } from "react";
import {
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    useColorScheme,
    ToastAndroid,
    View,
} from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";

const ListItem = (props) => {
    return (
        <TouchableOpacity style={styles.listItem} onPress={() => {}}>
            <MaskedView maskElement={<Image style={{ width: 30, height: 30 }} source={require("../static/secure.png")} />}>
                <View style={styles.listItemIcon}></View>
            </MaskedView>
            <View style={styles.listItemDetail}>
                <Text style={styles.listItemHeader} numberOfLines={1}>
                    {props.type === "locker" ? props.name : ""}
                </Text>
                {props.type === "locker" ? (
                    <>
                        <Text style={styles.listItemText}>Location: {props.location}</Text>
                        {props.lastAccess !== undefined ? <Text style={styles.listItemText}>Last access: {props.lastAccess}</Text> : ""}
                    </>
                ) : (
                    ""
                )}
            </View>
        </TouchableOpacity>
    );
};

const ListView = (props) => {
    return (
        <View style={styles.list}>
            <Text style={styles.listTitle}>{props.listTitle}</Text>
            <ListItem type="locker" name="Locker's name 12312329809138490102341461" location="yo grandma house" lastAccess="1677683725" />
            <ListItem type="locker" name="Locker's name 123123" location="yo grandma house" lastAccess="1677683725" />
            <ListItem type="locker" name="Locker's name 123123" location="yo grandma house" lastAccess="1677683725" />
            <ListItem type="locker" name="Locker's name 123123" location="yo grandma house" lastAccess="1677683725" />
            <ListItem type="locker" name="Locker's name 123123" location="yo grandma house" lastAccess="1677683725" />
            <ListItem type="locker" name="Locker's name 123123" location="yo grandma house" lastAccess="1677683725" />
            <ListItem type="locker" name="Locker's name 123123" location="yo grandma house" lastAccess="1677683725" />
            <ListItem type="locker" name="Locker's name 123123" location="yo grandma house" lastAccess="1677683725" />
            <ListItem type="locker" name="Locker's name 123123" location="yo grandma house" lastAccess="1677683725" />
        </View>
    );
};

const styles = {
    list: {
        padding: 30,
        paddingTop: 10,
        flex: 1,
        flexDirection: "column",
        gap: 15,
    },
    listTitle: {
        fontSize: 48,
        fontWeight: 700,
    },
    listItem: {
        width: "100%",
        height: 100,
        padding: 20,
        borderColor: "white",
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
    listItemIcon: {
        width: 30,
        height: 30,
        backgroundColor: "white",
    },
    listItemDetail: {
        width: 284,
        height: "100%",
        // backgroundColor: "white",
        flex: 1,
        justifyContent: "center",
    },
    listItemHeader: {
        fontWeight: 700,
        fontSize: 20,
        color: "white",
    },
    listItemText: {
        fontWeight: 500,
    },
};

export default ListView;
