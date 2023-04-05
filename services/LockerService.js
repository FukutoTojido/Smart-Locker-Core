import axios from "axios";
import React, { useContext } from "react";

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

export default { LockLocker, UnlockLocker };
