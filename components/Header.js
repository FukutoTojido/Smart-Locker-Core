import React, { useState, useEffect } from "react";
import { Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from "react-native";
import { useMaterialYouPalette } from "@assembless/react-native-material-you";
import { useNavigation } from "@react-navigation/native";

import Images, { prefetchImage } from "../static/Images";

const User = () => {
    const palette = useMaterialYouPalette();
    const navigation = useNavigation();
    const [prefetchedAll, setPrefetchedAll] = useState(false);

    useEffect(() => {
        const waitPrefetchAll = async () => {
            const res = await prefetchImage();
            setPrefetchedAll(res);
        };

        waitPrefetchAll();
    }, []);

    return (
        <View style={styles.header}>
            <Text style={[styles.welcomeText, { color: palette.system_accent2[2] }]}>Welcome back, Mogami</Text>
            <TouchableOpacity
                style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: palette.system_accent3[4],
                    justifyContent: "center",
                    alignItems: "center",
                }}
                onPress={() => {
                    navigation.navigate("User Profile");
                }}
            >
                <View style={[styles.avatarContainer, { backgroundColor: palette.system_accent2[11] }]} key={prefetchedAll}>
                    <Image style={{ width: 30, height: 30, borderRadius: 15 }} source={Images.julie} />
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = {
    header: {
        width: "100%",
        height: 90,
        padding: 30,
        // backgroundColor: "blue",
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: 10,
    },
    welcomeText: {
        fontSize: 18,
        fontWeight: 700,
    },
    avatarContainer: {
        width: 36,
        height: 36,
        borderRadius: 18,
        outlineStyle: "solid",
        justifyContent: "center",
        alignItems: "center",
    },
};

export default User;
