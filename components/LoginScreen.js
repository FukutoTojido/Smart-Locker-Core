import React, { useState, useEffect } from "react";
import { Image, View, StatusBar } from "react-native";
import { useMaterialYouPalette } from "@assembless/react-native-material-you";
import MaskedView from "@react-native-masked-view/masked-view";

import { Button, Input } from "./BasicComponents";
import Images, { prefetchImage } from "../static/Images";

const LoginScreen = ({ navigation }) => {
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

    return (
        <View style={backgroundStyle}>
            <StatusBar barStyle="light-content" backgroundColor={backgroundStyle.backgroundColor} />
            <MaskedView maskElement={<Image style={{ width: "100%" }} source={Images.logo} resizeMode={"contain"} />} key={prefetchedAll}>
                <View style={{ width: width, height: height, backgroundColor: palette.system_accent2[2] }}></View>
            </MaskedView>
            <Input label="Email" val={email} valChange={setEmail} />
            <Input label="Password" val={pwd} valChange={setPwd} pwd={true} />
            <Button onPress={() => {}} textColor={palette.system_accent2[2]} backgroundColor={palette.system_accent2[9]} text={"Login"} />
        </View>
    );
};

export default LoginScreen;
