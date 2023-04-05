import React, { useState, useEffect } from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, StatusBar, useColorScheme, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useMaterialYouPalette } from "@assembless/react-native-material-you";
import MaskedView from "@react-native-masked-view/masked-view";

import LockersList from "./LockersList";
import Pairing from "./Pairing";
import Notifications from "./Notifications";
import Images, { prefetchImage } from "../static/Images";

import { icons, Color } from "../App";
import User from "./Header";
import Auth from "../services/AuthService";

const Dump = () => {
    return <View></View>;
};

const Tab = createBottomTabNavigator();

const Nav = (props) => {
    // Background: Accent2 - 11
    // Background2: Accent2 - 10
    // Mid: Accent2 - 4
    // Highlight: Accent2 - 2
    const palette = useMaterialYouPalette();

    const navIcon = props.name === "Lockers List" ? Images.locker : props.name === "Pairing" ? Images.pairing : Images.notification;

    return (
        <View style={styles.nav}>
            <View
                style={{
                    paddingTop: 5,
                    paddingBottom: 5,
                    paddingLeft: 10,
                    paddingRight: 10,
                    borderRadius: 100,
                    backgroundColor: props.isFocused ? palette.system_accent2[9] : "",
                }}
            >
                <MaskedView maskElement={<Image style={{ width: 60, height: 25 }} resizeMode={"contain"} source={navIcon} />}>
                    <View
                        style={{ width: 60, height: 25, backgroundColor: props.isFocused ? palette.system_accent2[2] : palette.system_accent2[4] }}
                    ></View>
                </MaskedView>
            </View>
            <Text
                style={{
                    fontSize: 18,
                    textAlign: "center",
                    fontWeight: props.isFocused ? 700 : 500,
                    color: props.isFocused ? palette.system_accent2[2] : palette.system_accent2[4],
                }}
            >
                {props.name}
            </Text>
        </View>
    );
};

const MainScreen = ({ navigation }) => {
    // Background: Accent2 - 11
    // Background2: Accent2 - 10
    // Mid: Accent2 - 4
    // Highlight: Accent2 - 2
    const palette = useMaterialYouPalette();
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

    return (
        <ScrollView contentContainerStyle={{ height: "100%" }} contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
            <StatusBar barStyle="light-content" backgroundColor={backgroundStyle.backgroundColor} />
            <View style={styles.container} key={prefetchedAll}>
                {/* <NavigationContainer> */}
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            // console.log(route.name);
                            return <Nav name={route.name} img="locker" isFocused={focused} />;
                        },
                        tabBarStyle: {
                            height: 100,
                            backgroundColor: palette.system_accent2[10],
                            borderTopWidth: 0,
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                        },
                        tabBarShowLabel: false,
                        tabBarButton: (props) => <TouchableOpacity {...props}></TouchableOpacity>,
                    })}
                >
                    <Tab.Screen
                        name="Lockers List"
                        component={LockersList}
                        options={{
                            headerStyle: {
                                height: 0,
                            },
                        }}
                    ></Tab.Screen>
                    <Tab.Screen
                        name="Pairing"
                        component={Pairing}
                        options={{
                            headerStyle: {
                                height: 0,
                            },
                        }}
                    ></Tab.Screen>
                    <Tab.Screen
                        name="Notifications"
                        component={Notifications}
                        options={{
                            headerStyle: {
                                height: 0,
                            },
                        }}
                    ></Tab.Screen>
                </Tab.Navigator>
                {/* </NavigationContainer> */}
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
    nav: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
        gap: 5,
        // backgroundColor: "red"
    },
});

export default MainScreen;
