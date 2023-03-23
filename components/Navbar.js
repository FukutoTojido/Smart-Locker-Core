import React, { useState, useEffect } from "react";
import { Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";

const Nav = (props) => {
    return (
        <TouchableOpacity
            style={styles.nav}
            onPress={() => {
                props.setCurrentPage(props.page);
            }}
        >
            <MaskedView maskElement={<Image style={{ width: 30, height: 30 }} source={require("../static/secure.png")} />}>
                <View style={{ width: 30, height: 30, backgroundColor: "white" }}></View>
            </MaskedView>
            <Text style={{ textAlign: "center", fontWeight: props.isSelected ? 700 : 500 }}>{props.name}</Text>
        </TouchableOpacity>
    );
};

const Navbar = (props) => {
    return (
        <View style={styles.navbar}>
            <Nav name="Lockers list" page="locker" isSelected={props.currentPage === "locker"} setCurrentPage={props.setCurrentPage} />
            <Nav name="Pairing" page="pairing" isSelected={props.currentPage === "pairing"} setCurrentPage={props.setCurrentPage} />
            <Nav name="Notifications" page="noti" isSelected={props.currentPage === "noti"} setCurrentPage={props.setCurrentPage} />
        </View>
    );
};

const styles = {
    navbar: {
        position: "absolute",
        bottom: 0,
        // marginTop: "auto",
        width: "100%",
        height: 70,
        backgroundColor: "#323232",
        // backgroundColor: "red",
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "space-evenly",
    },
    nav: {
        flex: 1,
        alignItems: "center",
        alignContent: "center",
    },
};

export default Navbar;
