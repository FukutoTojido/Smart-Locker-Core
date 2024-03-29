import React from "react";
import { useMaterialYouPalette } from "@assembless/react-native-material-you";
import { ScrollView, View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import User from "./Header";
import ListView from "./ListView";

const Dump = () => {
    return (
        <View>
            <Text>Hello</Text>
        </View>
    );
};

const Stack = createStackNavigator();

const Notifications = () => {
    const palette = useMaterialYouPalette();

    const backgroundStyle = {
        backgroundColor: palette.system_accent2[11],
    };

    const data = [];

    return (
        <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
            <User />
            <ListView listTitle="Notifications" itemsList={data}/>
        </ScrollView>
    );
};

export default Notifications;
