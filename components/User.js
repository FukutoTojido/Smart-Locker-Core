import React, { useState, useEffect } from "react";
import { Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from "react-native";
import { useMaterialYouPalette } from "@assembless/react-native-material-you";
import { TextInput } from "react-native-paper";
import Images, { prefetchImage } from "../static/Images";

const Section = (props) => {
    const palette = useMaterialYouPalette();

    return (
        <View>
            <Text style={[styles.sectionHeader, { color: palette.system_accent2[2] }]}>{props.header}</Text>
            <Text style={[styles.sectionContent, { color: palette.system_accent2[5] }]}>{props.content}</Text>
        </View>
    );
};

const Input = (props) => {
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
        <TextInput
            label={props.label}
            value={props.val}
            onChangeText={(data) => props.valChange(data)}
            mode="outlined"
            outlineColor={palette.system_accent2[7]}
            outlineStyle={{
                borderRadius: 10,
            }}
            activeOutlineColor={palette.system_accent2[2]}
            textColor={palette.system_accent2[2]}
            selectionColor={palette.system_accent2[4]}
            style={{
                backgroundColor: palette.system_accent2[11],
            }}
            theme={{
                colors: {
                    onSurfaceVariant: palette.system_accent2[7],
                },
            }}
        />
    );
};

const Button = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={[styles.button, { backgroundColor: props.backgroundColor }]}>
                <Text style={{ textAlign: "center", color: props.textColor, fontWeight: 700, fontSize: 18 }}>{props.text}</Text>
            </View>
        </TouchableOpacity>
    );
};

const User = ({ navigation }) => {
    const palette = useMaterialYouPalette();
    const isDarkMode = useColorScheme() === "dark";
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [confirmPwd, setConfirmPwd] = useState("");

    const backgroundStyle = {
        backgroundColor: palette.system_accent2[11],
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
                    <Input label="Password" val={pwd} valChange={setPwd} />
                    <Input label="Confirm Password" val={confirmPwd} valChange={setConfirmPwd} />
                    <Button onPress={() => {}} textColor={palette.system_accent2[2]} backgroundColor={palette.system_accent2[10]} text={"Update"} />
                    <Button onPress={() => {}} textColor={palette.system_accent2[2]} backgroundColor={"#9A3030"} text={"Logout"} />
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
