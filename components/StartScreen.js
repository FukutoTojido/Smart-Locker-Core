import React, { useState, useEffect } from "react";
import { Image, View, StatusBar } from "react-native";
import { useMaterialYouPalette } from "@assembless/react-native-material-you";
import MaskedView from "@react-native-masked-view/masked-view";

import { Button } from "./BasicComponents";
import Images, { prefetchImage } from "../static/Images";

const StartScreen = ({ navigation }) => {
    const palette = useMaterialYouPalette();
    const [prefetchedAll, setPrefetchedAll] = useState(false);
    const [width, setW] = useState(0);
    const [height, setH] = useState(0);

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
            <MaskedView maskElement={<Image style={{ width: 340, height: 87 }} source={Images.logo} resizeMode={"contain"} />} key={prefetchedAll}>
                <View style={{ width: 340, height: 120, backgroundColor: palette.system_accent2[2] }}></View>
            </MaskedView>
            <Button
                onPress={() => {
                    navigation.navigate("Login Screen");
                }}
                textColor={palette.system_accent2[2]}
                backgroundColor={palette.system_accent2[10]}
                text={"Login with Email"}
            />
            <Button
                onPress={() => {
                    navigation.navigate("Register Screen");
                }}
                textColor={palette.system_accent2[2]}
                backgroundColor={palette.system_accent2[9]}
                text={"Create an account"}
            />
        </View>
    );
};

export default StartScreen;
