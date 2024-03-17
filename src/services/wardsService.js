import axios from 'axios';

const BASE_URL = 'https://api.example.com'; // 假设这是你的后端API地址

const WardsService = {
    async fetchWards() {
        try {
            const response = await axios.get(`${BASE_URL}/wards`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch users');
        }
    }
};

export default WardsService;
