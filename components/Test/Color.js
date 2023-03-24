import React from "react";
import { StyleSheet, View } from "react-native";
import { useMaterialYou, defaultPalette } from "@assembless/react-native-material-you";

const ColorTest = () => {
    const { palette } = useMaterialYou({ fallbackPalette: defaultPalette });

    return (
        <View style={{ position: "absolute", flex: 1, justifyContent: "flex-start" }}>
            <View style={styles.row}>
                {Object.keys([...Array(12)]).map((idx) => (
                    <View key={idx} style={[styles.cell, { backgroundColor: palette.system_accent1[idx] }]}></View>
                ))}
            </View>
            <View style={styles.row}>
                {Object.keys([...Array(12)]).map((idx) => (
                    <View key={idx} style={[styles.cell, { backgroundColor: palette.system_accent2[idx] }]}></View>
                ))}
            </View>
            <View style={styles.row}>
                {Object.keys([...Array(12)]).map((idx) => (
                    <View key={idx} style={[styles.cell, { backgroundColor: palette.system_accent3[idx] }]}></View>
                ))}
            </View>
            <View style={styles.row}>
                {Object.keys([...Array(12)]).map((idx) => (
                    <View key={idx} style={[styles.cell, { backgroundColor: palette.system_neutral1[idx] }]}></View>
                ))}
            </View>
            <View style={styles.row}>
                {Object.keys([...Array(12)]).map((idx) => (
                    <View key={idx} style={[styles.cell, { backgroundColor: palette.system_neutral2[idx] }]}></View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: "row",
    },
    cell: {
        width: 30,
        height: 30,
    },
});

export default ColorTest;
