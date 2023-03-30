import React from "react";
import { Text, TouchableOpacity, useColorScheme, View, StyleSheet } from "react-native";
import { useMaterialYouPalette } from "@assembless/react-native-material-you";
import { TextInput } from "react-native-paper";

const Button = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={[styles.button, { backgroundColor: props.backgroundColor }]}>
                <Text style={{ textAlign: "center", color: props.textColor, fontWeight: 700, fontSize: 18 }}>{props.text}</Text>
            </View>
        </TouchableOpacity>
    );
};

const Input = (props) => {
    const palette = useMaterialYouPalette();

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

const Section = (props) => {
    const palette = useMaterialYouPalette();

    return (
        <View>
            <Text style={[styles.sectionHeader, { color: palette.system_accent2[2] }]}>{props.header}</Text>
            <Text style={[styles.sectionContent, { color: palette.system_accent2[5] }]}>{props.content}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
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

export { Button, Input, Section };
