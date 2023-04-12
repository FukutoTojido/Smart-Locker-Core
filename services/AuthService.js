import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const server = "https://smart-locker-backend-hcttee6c3a-uc.a.run.app";

// TEST ACCOUNT
//{
//    "email": "test3@gmail.com",
//    "password": "123455688"
//}

const signIn = async (email, password) => {

	try {
		const res = (await axios.post(`${server}/api/users/login`, {
			email,
			password,
		})).data;
		if (res.token) {
			await AsyncStorage.setItem("userToken", res.token);
		}
		return res;
	}
	catch (e) {
		console.error(e);
		return {};
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
		const res = (await axios.post(`${server}/api/users/register`, {
			email,
			password,
		})).data;
		if (res.token) {
			await AsyncStorage.setItem("userToken", res.token);
		}
		return res;
	}
	catch (e) {
		console.error(e);
		return {};
	}
};

const feedsAll = async () => {
    try {
        const token = await AsyncStorage.getItem("userToken");
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };

        const res = (await axios.get(`${server}/api/feeds/all`, config)).data;
        return res;
    } catch (e) {
        console.error(e);
        return {};
    }
};

export default {
    signIn,
    signOut,
    getToken,
    register,
    feedsAll,
};
