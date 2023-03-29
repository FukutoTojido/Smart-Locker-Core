import { Image } from "react-native";

const imageObj = {
    locker: require("./secure.png"),
    bluetooth: require("./bluetooth.png"),
    nfc: require("./nfc-logo.png"),
    pairing: require("./pairing.png"),
    notification: require("./notification.png"),
    back: require("./left-arrow.png"),
};

const prefetchImage = async () => {
    for (const img in imageObj) {
        await Image.prefetch(Image.resolveAssetSource(imageObj[img]).uri);
        // console.log(img);
    }

    return true;
};

export default imageObj;
export { prefetchImage };
