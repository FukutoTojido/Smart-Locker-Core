import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from "react-native";
import { Colors, DebugInstructions, Header, LearnMoreLinks, ReloadInstructions } from "react-native/Libraries/NewAppScreen";

import Navbar from "./Navbar";
import User from "./Header";
import ListView from "./ListView";

const MainScreen = () => {
    const [currentPage, setCurrentPage] = useState("locker");
    const isDarkMode = useColorScheme() === "dark";
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    const listTitle = {
        locker: "Lockers list",
        pairing: "Pairing",
        noti: "Notifications",
    };

    return (
        <ScrollView contentContainerStyle={{ height: "100%" }} contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
            <View style={styles.container}>
                <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
                    <User />
                    <ListView listTitle={listTitle[currentPage]} />
                </ScrollView>
                <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 1,
        height: "100%",
    },
});

export default MainScreen;
