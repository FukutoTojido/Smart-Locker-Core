import React, { useState, useEffect, useContext } from "react";
import { Image, View, StatusBar } from "react-native";
import { useMaterialYouPalette } from "@assembless/react-native-material-you";
import MaskedView from "@react-native-masked-view/masked-view";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Button, Input } from "./BasicComponents";
import Images, { prefetchImage } from "../static/Images";

import Auth from "../services/AuthService";
import { AuthContext } from "../App";

const LoginScreen = ({ navigation }) => {
    const setToken = useContext(AuthContext);
    const palette = useMaterialYouPalette();
    const [prefetchedAll, setPrefetchedAll] = useState(false);
    const [width, setW] = useState(0);
    const [height, setH] = useState(0);
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");

    const backgroundStyle = {
        flex: 1,
        backgroundColor: palette.system_accent2[11],
        justifyContent: "center",
        padding: 30,
        gap: 10,
    };

    useEffect(() => {
        Image.getSize(Image.resolveAssetSource(Images.logo).uri, (width, height) => {
            // console.log(width, height);
            setW(width);
            setH(height);
        });

        const waitPrefetchAll = async () => {
            const res = await prefetchImage();
            setPrefetchedAll(res);
        };

        waitPrefetchAll();
    }, []);

    const Login = async () => {
        try {
            await Auth.signIn(email.trim(), pwd.trim());
            const token = await Auth.getToken();

            setToken(token);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <View style={backgroundStyle}>
            <StatusBar barStyle="light-content" backgroundColor={backgroundStyle.backgroundColor} />
            <MaskedView maskElement={<Image style={{ width: "100%" }} source={Images.logo} resizeMode={"contain"} />} key={prefetchedAll}>
                <View style={{ width: width, height: height, backgroundColor: palette.system_accent2[2] }}></View>
            </MaskedView>
            <Input label="Email" val={email} valChange={setEmail} />
            <Input label="Password" val={pwd} valChange={setPwd} pwd={true} />
            <Button onPress={Login} textColor={palette.system_accent2[2]} backgroundColor={palette.system_accent2[9]} text={"Login"} />
        </View>
    );
};

export default LoginScreen;
