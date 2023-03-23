import React, { useState, useEffect } from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from "react-native";
import { Colors, DebugInstructions, Header, LearnMoreLinks, ReloadInstructions } from "react-native/Libraries/NewAppScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaskedView from "@react-native-masked-view/masked-view";

import LockersList from "./LockersList";
import Pairing from "./Pairing";
import Notifications from "./Notifications";

const icons = {
    lockIcon: require("../static/secure.png"),
};

const Dump = () => {
    return <View></View>;
};

const Tab = createBottomTabNavigator();

const Nav = (props) => {
    return (
        <View style={styles.nav}>
            <View
                style={{
                    paddingTop: 5,
                    paddingBottom: 5,
                    paddingLeft: 20,
                    paddingRight: 20,
                    borderRadius: 100,
                    backgroundColor: props.isFocused ? "#555555" : "",
                }}
            >
                <MaskedView maskElement={<Image style={{ width: 20, height: 20 }} source={icons[props.img]} />}>
                    <View style={{ width: 20, height: 20, backgroundColor: "white" }}></View>
                </MaskedView>
            </View>
            <Text style={{ textAlign: "center", fontWeight: props.isFocused ? 700 : 500 }}>{props.name}</Text>
        </View>
    );
};

const MainScreen = () => {
    const isDarkMode = useColorScheme() === "dark";
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    return (
        <ScrollView contentContainerStyle={{ height: "100%" }} contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
            <View style={styles.container}>
                <NavigationContainer>
                    <Tab.Navigator
                        screenOptions={({ route }) => ({
                            tabBarIcon: ({ focused, color, size }) => {
                                // console.log(route.name);
                                return <Nav name={route.name} img="lockIcon" isFocused={focused} />;
                            },
                            tabBarStyle: {
                                height: 70,
                                backgroundColor: "#323232",
                                borderTopWidth: 0,
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
                </NavigationContainer>
                {/* <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} /> */}
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
