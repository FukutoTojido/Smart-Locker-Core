import AsyncStorage from "@react-native-async-storage/async-storage";

const server = "https://smart-locker-backend-hcttee6c3a-uc.a.run.app";

// TEST ACCOUNT
//{
//    "email": "test3@gmail.com",
//    "password": "123455688"
//}

const signIn = async (email, password) => {
    try {
        const response = await fetch(`${server}/api/users/login`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });
        const json = await response.json();
        if (json.token) {
            await AsyncStorage.setItem("userToken", json.token);
        }
        return json;
    } catch (error) {
        console.error(error);
    }
};

const signOut = async () => {
    try {
        await AsyncStorage.removeItem("userToken");
    } catch (error) {
        console.error(error);
    }
};

const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem("userToken");
        return token;
    } catch (error) {
        console.error(error);
    }
};

const register = async (email, password) => {
    try {
        const response = await fetch(`${server}/api/users/register`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });
        const json = await response.json();
        if (json.token) {
            await AsyncStorage.setItem("userToken", json.token);
        }
        return { res: json, status: response.status };
    } catch (error) {
        console.error(error);
    }
};

export default {
    signIn,
    signOut,
    getToken,
    register,
};
