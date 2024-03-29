/**
 * @format
 */

import { AppRegistry } from "react-native";
import messaging from "@react-native-firebase/messaging";

import App from "./App";
import { name as appName } from "./app.json";
import NotiService from "./services/NotiService";

// Register background handler
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log("Message handled in the background!", remoteMessage);
    // NotiService.showNotification()
});

AppRegistry.registerComponent(appName, () => App);
