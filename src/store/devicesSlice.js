import { createSlice } from '@reduxjs/toolkit'
export const devicesSlice = createSlice({
    name: 'devices',
    initialState: {
        value: [
            {
                userId: 1,
                wardId: 1,
                deviceId: 1,
                deviceName: "Device 1",
                deviceType: "Monitor",
                deviceStatus: "Active",
                deviceUrl: "https://img.qunliao.info:443/4oEGX68t_9505974551.mp4"
            },
            {
                userId: 1,
                wardId: 1,
                deviceId: 2,
                deviceName: "Device 2",
                deviceType: "Monitor",
                deviceStatus: "Active",
                deviceUrl: "https://img.qunliao.info:443/4oEGX68t_9505974551.mp4"
            },
            {
                userId: 1,
                wardId: 1,
                deviceId: 3,
                deviceName: "Device 3",
                deviceType: "Monitor",
                deviceStatus: "Active",
                deviceUrl: "https://img.qunliao.info:443/4oEGX68t_9505974551.mp4"
            },
            {
                userId: 1,
                wardId: 2,
                deviceId: 4,
                deviceName: "Device 4",
                deviceType: "Monitor",
                deviceStatus: "Active",
                deviceUrl: "https://img.qunliao.info:443/4oEGX68t_9505974551.mp4"
            },
            {
                userId: 1,
                wardId: 1,
                deviceId: 5,
                deviceName: "Device 5",
                deviceType: "Monitor",
                deviceStatus: "Active",
                deviceUrl: "https://img.qunliao.info:443/4oEGX68t_9505974551.mp4"
            },
        ],
        status: 'idle',
        error: null
    },
    reducers: {
        addDevice: (state, action) => {
            state.value.push(action.payload);
        },
        setDevices: (state, action) => {
            state.value = action.payload;
        },
        setError: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        },
        setStatus: (state, action) => {
            state.status = action.payload;
        }
    }
})
// 每个 case reducer 函数会生成对应的 Action creators
export const { addDevice, setDevices, setError, setStatus } = devicesSlice.actions


export const selectDevices = state => state.devices.value;
export const selectDevicesStatus = state => state.devices.status;
export const selectDevicesError = state => state.devices.error;

export default devicesSlice.reducer
