import axios from 'axios';

const BASE_URL = 'http://localhost:3001'; // 假设这是你的后端API地址

// const userService = {
//     async fetchUsers() {
//         try {
//             const response = await axios.get(`${BASE_URL}/users`);
//             return response.data;
//         } catch (error) {
//             throw new Error('Failed to fetch users');
//         }
//     }
// };
const WardsService = {
    async fetchWards() {
        try {
            const response = await axios.get(`${BASE_URL}/wards`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch Wards');
        }
    }
};
const DevicesService = {
    async fetchDevices(wardId) {
        try {
            const response = await axios.get(`${BASE_URL}/devices?wardId=${wardId}`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch Devices');
        }
    }
};
export { WardsService, DevicesService };


