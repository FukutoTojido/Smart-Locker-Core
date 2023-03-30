import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from "react-native";
import { useMaterialYouPalette } from "@assembless/react-native-material-you";
import { TextInput } from "react-native-paper";
import Dialog from "react-native-dialog";

const Button = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={[styles.button, { backgroundColor: props.backgroundColor }]}>
                <Text style={{ textAlign: "center", color: props.textColor, fontWeight: 700, fontSize: 18 }}>{props.text}</Text>
            </View>
        </TouchableOpacity>
    );
};

const Section = (props) => {
    const palette = useMaterialYouPalette();

    return (
        <View>
            <Text style={[styles.sectionHeader, { color: palette.system_accent2[2] }]}>{props.header}</Text>
            <Text style={[styles.sectionContent, { color: palette.system_accent2[5] }]}>{props.content}</Text>
        </View>
    );
};

const Locker = ({ navigation }) => {
    const palette = useMaterialYouPalette();
    const isDarkMode = useColorScheme() === "dark";
    const [lockerName, setLockerName] = useState("");
    const [dialog, setDialog] = useState(false);
    const [disposed, setDisposed] = useState(false);

    const backgroundStyle = {
        backgroundColor: palette.system_accent2[11],
    };

    const goHome = () => {
        navigation.reset({
            index: 0,
            routes: [
                {
                    name: "MainScreen",
                },
            ],
        });
    };

    const showDialog = () => {
        setDialog(true);
    };

    const hideDialog = () => {
        setDialog(false);
    };

    const toDispose = () => {
        setDialog(false);
        setDisposed(true);

        console.log("About to quit");
    };

    useEffect(() => {
        if (disposed) {
            console.log("I'm quitting");
            setTimeout(() => {
                goHome();
            }, 200);
        }
    }, [disposed]);

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
                    <Section header="Humidity" content={"20%"} />
                    <Section header="Temperature" content={"30°C"} />
                    <Button
                        onPress={() => {
                            navigation.navigate("Unlock");
                        }}
                        textColor={palette.system_accent2[2]}
                        backgroundColor={palette.system_accent2[10]}
                        text={"Unlock"}
                    />
                    <Button onPress={showDialog} textColor={palette.system_accent2[2]} backgroundColor={"#9A3030"} text={"Dispose"} />
                    <Dialog.Container
                        visible={dialog}
                        contentStyle={{
                            borderRadius: 10,
                            backgroundColor: palette.system_accent2[11],
                        }}
                        onBackdropPress={hideDialog}
                        onRequestClose={hideDialog}
                    >
                        <Dialog.Title>
                            <Text
                                style={{
                                    fontWeight: 700,
                                    color: palette.system_accent2[2],
                                }}
                            >
                                Locker dispose
                            </Text>
                        </Dialog.Title>
                        <Dialog.Description>
                            <Text style={{ color: palette.system_accent2[5] }}>Do you want to dispose this locker? You cannot undo this action.</Text>
                        </Dialog.Description>
                        <Dialog.Button label="Cancel" onPress={hideDialog} color={palette.system_accent2[2]} bold={true} />
                        <Dialog.Button label="Confirm" onPress={toDispose} color={palette.system_accent2[2]} bold={true} />
                    </Dialog.Container>
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

export default Locker;