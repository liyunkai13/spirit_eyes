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
    },
    //TODO：put和patch请求
    //修改某一个病房的信息
    async updateWard(wardId,fields) {
        // try {
        //     const response = await axios.patch(`${BASE_URL}/wards/${wardId}`, fields, {
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //     });
        //     console.log('res',response.data);
        // } catch (error) {
        //     throw new Error('Failed to update Ward');
        // }
        try {
            const response = await axios.put(`${BASE_URL}/wards/${wardId}`, fields , {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('res',response.data);
        } catch (error) {
            throw new Error('Failed to update Ward');
        }
    },
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


