import { Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, useColorScheme, View, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import { useMaterialYouPalette } from "@assembless/react-native-material-you";
import MaskedView from "@react-native-masked-view/masked-view";

import Images, { prefetchImage } from "../static/Images";

const Confirm = ({ navigation }) => {
    const palette = useMaterialYouPalette();
    const isDarkMode = useColorScheme() === "dark";
    const [prefetchedAll, setPrefetchedAll] = useState(false);

    const backgroundStyle = {
        backgroundColor: palette.system_accent2[11],
    };

    useEffect(() => {
        const waitPrefetchAll = async () => {
            const res = await prefetchImage();
            setPrefetchedAll(res);
        };

        waitPrefetchAll();
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            navigation.reset({
                index: 1,
                routes: [{ name: "Start Screen" }, { name: "Login Screen" }],
            });
        }, 2000);

        return () => {
            clearTimeout(timeout);
        };
    }, []);

    return (
        <SafeAreaView style={([backgroundStyle], { flex: 1 })}>
            <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={backgroundStyle.backgroundColor} />
            <ScrollView contentInsetAdjustmentBehavior="automatic" style={[backgroundStyle]} contentContainerStyle={styles.container}>
                <View style={[backgroundStyle, styles.container]}>
                    <MaskedView
                        maskElement={<Image style={{ width: 90, height: 90 }} resizeMode={"contain"} source={Images.ok} />}
                        key={prefetchedAll}
                    >
                        <View
                            style={{
                                width: 90,
                                height: 90,
                                backgroundColor: palette.system_accent2[2],
                            }}
                        ></View>
                    </MaskedView>
                    {
                        <>
                            <Text
                                style={{
                                    fontWeight: 700,
                                    fontSize: 18,
                                    textAlign: "center",
                                    color: palette.system_accent2[2],
                                }}
                            >
                                Your account has been registered
                            </Text>
                            <Text
                                style={{
                                    fontWeight: 700,
                                    fontSize: 18,
                                    textAlign: "center",
                                    color: palette.system_accent2[2],
                                }}
                            >
                                Returning to Login page
                            </Text>
                        </>
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
    },
});

export default Confirm;
