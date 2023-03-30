import React, { useState, useEffect, useContext } from "react";
import { Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from "react-native";
import { useMaterialYouPalette } from "@assembless/react-native-material-you";
import { TextInput } from "react-native-paper";
import Images, { prefetchImage } from "../static/Images";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Button, Input } from "./BasicComponents";
import { AuthContext } from "../App";

import Auth from "../services/AuthService";

const User = ({ navigation }) => {
    const setToken = useContext(AuthContext);
    const palette = useMaterialYouPalette();
    const isDarkMode = useColorScheme() === "dark";
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [confirmPwd, setConfirmPwd] = useState("");

    const backgroundStyle = {
        backgroundColor: palette.system_accent2[11],
    };

    const Logout = async () => {
        await Auth.signOut();
        const token = await AsyncStorage.getItem("userToken");

        setToken(token);
    };

    return (
        <SafeAreaView style={([backgroundStyle], { flex: 1 })}>
            <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={backgroundStyle.backgroundColor} />
            <ScrollView contentInsetAdjustmentBehavior="automatic" style={[backgroundStyle]} contentContainerStyle={[styles.container, styles.list]}>
                <View style={[backgroundStyle, styles.container]}>
                    <Text style={[styles.listTitle, { color: palette.system_accent2[2] }]}>User Profile</Text>
                    <View style={styles.user}>
                        <TouchableOpacity
                            style={{
                                width: 68,
                                height: 68,
                                backgroundColor: palette.system_accent3[4],
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: 35,
                            }}
                        >
                            <View
                                style={{
                                    width: 64,
                                    height: 64,
                                    backgroundColor: palette.system_accent2[11],
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: 34,
                                }}
                            >
                                <Image style={{ width: 60, height: 60, borderRadius: 30 }} source={Images.julie} />
                            </View>
                        </TouchableOpacity>
                        <View>
                            <Text style={{ fontSize: 20, fontWeight: 700, color: palette.system_accent2[2] }}>Mogami Shizuka</Text>
                            <Text style={{ fontSize: 16, color: palette.system_accent2[7] }}>fukutotojidoosu@gmail.com</Text>
                        </View>
                    </View>
                    <Input label="Username" val={username} valChange={setUsername} />
                    <Input label="Email" val={email} valChange={setEmail} />
                    <Input label="Password" val={pwd} valChange={setPwd} pwd={true} />
                    <Input label="Confirm Password" val={confirmPwd} valChange={setConfirmPwd} pwd={true} />
                    <Button onPress={() => {}} textColor={palette.system_accent2[2]} backgroundColor={palette.system_accent2[10]} text={"Update"} />
                    <Button onPress={Logout} textColor={palette.system_accent2[2]} backgroundColor={"#9A3030"} text={"Logout"} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 20,
        // justifyContent: "center",
        // alignContent: "center",
        // alignItems: "center",
    },
    list: {
        padding: 30,
        paddingTop: 100,
    },
    listTitle: {
        fontSize: 48,
        fontWeight: 700,
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: 700,
    },
    sectionContent: {
        fontSize: 18,
    },
    button: {
        padding: 20,
        borderRadius: 10,
    },
    user: {
        flexDirection: "row",
        height: 80,
        padding: 10,
        // backgroundColor: "black",
        alignItems: "center",
        alignContent: "center",
        gap: 30,
    },
});

export default User;
