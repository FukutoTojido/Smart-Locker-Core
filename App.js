import React, { useState, useEffect, createContext } from "react";
import { Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, useColorScheme, View, Dimensions } from "react-native";
import { Colors, DebugInstructions, Header, LearnMoreLinks, ReloadInstructions } from "react-native/Libraries/NewAppScreen";
import { MaterialYouService, useMaterialYou, defaultPalette } from "@assembless/react-native-material-you";
import { NavigationContainer, useNavigation, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MaskedView from "@react-native-masked-view/masked-view";
import NfcManager from "react-native-nfc-manager";
import { Alert } from "react-native";
import messaging from "@react-native-firebase/messaging";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PushNotification from "react-native-push-notification";

import StartScreen from "./components/StartScreen";
import LoginScreen from "./components/LoginScreen";
import RegisterScreen from "./components/RegisterScreen";
import MainScreen from "./components/MainScreen";
import ColorTest from "./components/Test/Color";
import NFC from "./components/NFC";
import Images, { prefetchImage } from "./static/Images";
import Setup from "./components/Setup";
import Locker from "./components/Locker";
import Pairing from "./components/Pairing";
import User from "./components/User";
import Confirm from "./components/Confirm";

import NotiService from "./services/NotiService";
import Auth from "./services/AuthService";

const icons = {
    locker: require("./static/secure.png"),
    bluetooth: require("./static/bluetooth.png"),
    nfc: require("./static/nfc-logo.png"),
    pairing: require("./static/pairing.png"),
    notification: require("./static/notification.png"),
};

const Stack = createStackNavigator();

const Placeholder = () => {
    const { palette } = useMaterialYou({ fallbackPalette: defaultPalette });

    const backgroundStyle = {
        backgroundColor: palette.system_accent2[11],
        flex: 1,
    };

    return <View style={backgroundStyle}>{/* <Text>Hello</Text> */}</View>;
};

let NFC_SUPPORTED = false;

const CustomBackButton = (props) => {
    const { palette } = useMaterialYou({ fallbackPalette: defaultPalette });
    const { goBack, reset } = useNavigation();
    return (
        <TouchableOpacity
            style={{
                // backgroundColor: "white",
                paddingHorizontal: 30,
            }}
            onPress={() => {
                NfcManager.cancelTechnologyRequest();
                if (props.goHome)
                    reset({
                        index: 0,
                        routes: [
                            {
                                name: "MainScreen",
                            },
                        ],
                    });
                else goBack();
            }}
        >
            <MaskedView maskElement={<Image style={{ width: 30, height: 30 }} resizeMode={"contain"} source={Images.back} />}>
                <View
                    style={{
                        width: 30,
                        height: 30,
                        backgroundColor: palette.system_accent2[2],
                    }}
                ></View>
            </MaskedView>
        </TouchableOpacity>
    );
};

const AuthContext = createContext();
const LockerContext = createContext();
const UnlockOrPairingContext = createContext();
const AllLockersDataContext = createContext();

function App() {
    const isDarkMode = useColorScheme() === "dark";
    const { palette } = useMaterialYou({ fallbackPalette: defaultPalette });
    const [prefetchedAll, setPrefetchedAll] = useState(false);
    const [token, setToken] = useState("");
    const [lockerData, setLockerData] = useState(null);
    const [isPairing, setIsPairing] = useState(null);
    const [allLockersData, setAllLockersData] = useState([]);

    const feed = async () => {
        const res = await Auth.feedsAll();

        if (JSON.stringify(res) !== "{}") {
            setAllLockersData(
                res.lockers.map((locker) => {
                    return {
                        type: "locker",
                        ...locker,
                        name: `Locker ${locker.id}`,
                        enabled: true,
                        navName: "Locker",
                    };
                })
            );
        }

        console.log("Data fetched intervally");
        // console.log(lockersData);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            feed();
        }, 600000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        const checkToken = async () => {
            const currentToken = await AsyncStorage.getItem("userToken");

            if (currentToken !== token) setToken(currentToken);

            console.log(currentToken);
        };

        checkToken();

        const waitPrefetchAll = async () => {
            const res = await prefetchImage();
            setPrefetchedAll(res);
        };

        waitPrefetchAll();

        const checkNFC = async () => {
            const res = await NfcManager.isSupported();
            NFC_SUPPORTED = res;
        };

        checkNFC();
    }, []);

    const backgroundStyle = {
        backgroundColor: palette.system_accent2[11],
    };

    useEffect(() => {
        // subscribe to topic
        messaging()
            .subscribeToTopic("alert")
            .then(() => {
                console.log(`Subscribed to alert`);
            });

        const unsubscribe = messaging().onMessage(async (remoteMessage) => {
            // Alert.alert("Test Alert!", JSON.stringify(remoteMessage));
            // console.log("Message received: ", remoteMessage);
            NotiService.showNotification(remoteMessage.notification.title, remoteMessage.notification.body);
        });

        return unsubscribe;
    }, []);

    return (
        <>
            <AuthContext.Provider value={setToken}>
                <AllLockersDataContext.Provider value={{ val: allLockersData, setVal: setAllLockersData }}>
                    <LockerContext.Provider value={{ val: lockerData, setVal: setLockerData }}>
                        <UnlockOrPairingContext.Provider value={{ val: isPairing, setVal: setIsPairing }}>
                            <NavigationContainer
                                theme={{
                                    ...DefaultTheme,
                                    colors: {
                                        ...DefaultTheme.colors,
                                        background: backgroundStyle.backgroundColor,
                                    },
                                }}
                            >
                                <MaterialYouService fallbackPalette={defaultPalette}>
                                    <SafeAreaView style={[backgroundStyle, { flex: 1 }]} key={prefetchedAll}>
                                        <Stack.Navigator>
                                            {token === "" ? (
                                                <Stack.Screen
                                                    name="Placeholder"
                                                    component={Placeholder}
                                                    options={{
                                                        headerShown: false,
                                                    }}
                                                />
                                            ) : token === null ? (
                                                <>
                                                    <Stack.Screen
                                                        name="Start Screen"
                                                        component={StartScreen}
                                                        options={{
                                                            headerShown: false,
                                                        }}
                                                    />
                                                    <Stack.Screen
                                                        name="Login Screen"
                                                        component={LoginScreen}
                                                        options={{
                                                            headerShown: false,
                                                        }}
                                                    />
                                                    <Stack.Screen
                                                        name="Register Screen"
                                                        component={RegisterScreen}
                                                        options={{
                                                            headerShown: false,
                                                        }}
                                                    />
                                                    <Stack.Screen
                                                        name="Confirm"
                                                        component={Confirm}
                                                        options={{
                                                            headerShown: false,
                                                        }}
                                                    />
                                                </>
                                            ) : (
                                                <>
                                                    <Stack.Screen
                                                        name="MainScreen"
                                                        component={MainScreen}
                                                        options={{
                                                            headerShown: false,
                                                        }}
                                                    />
                                                    <Stack.Screen name="Test" component={ColorTest} />
                                                    <Stack.Screen
                                                        name="NFC"
                                                        component={NFC}
                                                        options={{
                                                            headerTitle: "",
                                                            headerStyle: {
                                                                height: 90,
                                                                backgroundColor: palette.system_accent2[11],
                                                                elevation: 0,
                                                            },
                                                            headerTransparent: true,
                                                            headerLeft: () => <CustomBackButton />,
                                                        }}
                                                    />
                                                    <Stack.Screen
                                                        name="Setup"
                                                        component={Setup}
                                                        options={{
                                                            headerTitle: "",
                                                            headerStyle: {
                                                                height: 90,
                                                                backgroundColor: palette.system_accent2[11],
                                                                elevation: 0,
                                                            },
                                                            headerTransparent: true,
                                                            headerLeft: () => <CustomBackButton goHome={true} />,
                                                        }}
                                                    />
                                                    <Stack.Screen
                                                        name="Locker"
                                                        component={Locker}
                                                        options={{
                                                            headerTitle: "",
                                                            headerStyle: {
                                                                height: 90,
                                                                backgroundColor: palette.system_accent2[11],
                                                                elevation: 0,
                                                            },
                                                            headerTransparent: true,
                                                            headerLeft: () => <CustomBackButton />,
                                                        }}
                                                    />
                                                    <Stack.Screen
                                                        name="Unlock"
                                                        component={Pairing}
                                                        options={{
                                                            headerTitle: "",
                                                            headerStyle: {
                                                                height: 90,
                                                                backgroundColor: palette.system_accent2[11],
                                                                elevation: 0,
                                                            },
                                                            headerTransparent: true,
                                                            headerLeft: () => <CustomBackButton />,
                                                        }}
                                                    />
                                                    <Stack.Screen
                                                        name="User Profile"
                                                        component={User}
                                                        options={{
                                                            headerTitle: "",
                                                            headerStyle: {
                                                                height: 90,
                                                                backgroundColor: palette.system_accent2[11],
                                                                elevation: 0,
                                                            },
                                                            headerTransparent: true,
                                                            headerLeft: () => <CustomBackButton />,
                                                        }}
                                                    />
                                                </>
                                            )}
                                        </Stack.Navigator>

                                        {/* <MainScreen /> */}
                                        {/* <ColorTest /> */}
                                    </SafeAreaView>
                                </MaterialYouService>
                            </NavigationContainer>
                        </UnlockOrPairingContext.Provider>
                    </LockerContext.Provider>
                </AllLockersDataContext.Provider>
            </AuthContext.Provider>
        </>
    );
}

export default App;
export { icons, NFC_SUPPORTED, AuthContext, LockerContext, UnlockOrPairingContext, AllLockersDataContext };
