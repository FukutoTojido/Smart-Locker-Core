import axios from "axios";
import React, { useContext } from "react";
import AuthService from "./AuthService";

const server = "https://smart-locker-backend-hcttee6c3a-uc.a.run.app";

const LockLocker = async (lockerSig) => {
    try {
        const res = (
            await axios.post(`${server}/api/lockers/lock`, {
                nfc_sig: lockerSig,
            })
        ).data;

        return res;
    } catch (e) {
        return { status: "Unallowed" };
    }
};

const UnlockLocker = async (lockerSig) => {
    try {
        const res = (
            await axios.post(`${server}/api/lockers/unlock`, {
                nfc_sig: lockerSig,
            })
        ).data;

        return res;
    } catch (e) {
        return { status: "Unallowed" };
    }
};

const PairLocker = async (lockerSig, location, num) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${await AuthService.getToken()}` },
        }
        const res = (
            await axios.post(`${server}/api/lockers/new`, {
                locker_num: num,
                location,
                nfc_sig: lockerSig,
            }, config)
        ).data;

        return res;
    } catch (e) {
        console.log("You fucked up something");
        return { status: "you fucked up" };
    }
};

export default { LockLocker, UnlockLocker, PairLocker };
