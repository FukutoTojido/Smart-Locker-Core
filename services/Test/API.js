import axios from "axios";

const server = "https://smart-locker-backend-hcttee6c3a-uc.a.run.app";

const testPing = async () => {
    try {
        const res = (await axios.post(`${server}/api/tester/fcm/ping`)).data;
    } catch (e) {
        console.log(e);
    }
};

export default {
    testPing,
};
