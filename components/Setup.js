import React, { useState } from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from "react-native";
import { useMaterialYouPalette } from "@assembless/react-native-material-you";
import { TextInput } from "react-native-paper";

const Section = (props) => {
    const palette = useMaterialYouPalette();

    return (
        <View>
            <Text style={[styles.sectionHeader, { color: palette.system_accent2[2] }]}>{props.header}</Text>
            <Text style={[styles.sectionContent, { color: palette.system_accent2[5] }]}>{props.content}</Text>
        </View>
    );
};

const Setup = ({ navigation }) => {
    const palette = useMaterialYouPalette();
    const isDarkMode = useColorScheme() === "dark";
    const [lockerName, setLockerName] = useState("");

    const backgroundStyle = {
        backgroundColor: palette.system_accent2[11],
    };

    return (
        <SafeAreaView style={([backgroundStyle], { flex: 1 })}>
            <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={backgroundStyle.backgroundColor} />
            <ScrollView contentInsetAdjustmentBehavior="automatic" style={[backgroundStyle]} contentContainerStyle={[styles.container, styles.list]}>
                <View style={[backgroundStyle, styles.container]}>
                    <Text style={[styles.listTitle, { color: palette.system_accent2[2] }]}>Locker Number 28</Text>
                    <TextInput
                        label="Locker's Nickname"
                        value={lockerName}
                        onChangeText={(data) => setLockerName(data)}
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
                    <Section header="Locker Number" content={28} />
                    <Section header="Location" content={"your grandma house"} />
                    <TouchableOpacity
                        onPress={() => {
                            navigation.reset({
                                index: 0,
                                routes: [
                                    {
                                        name: "MainScreen",
                                    },
                                ],
                            });
                        }}
                    >
                        <View style={[styles.button, { backgroundColor: palette.system_accent2[10] }]}>
                            <Text style={{ textAlign: "center", color: palette.system_accent2[2], fontWeight: 700, fontSize: 18 }}>
                                Confirm Connection
                            </Text>
                        </View>
                    </TouchableOpacity>
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
});

export default Setup;
