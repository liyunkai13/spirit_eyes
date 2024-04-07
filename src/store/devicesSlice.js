//TODO : 现在redux管理的状态没有满足不可变性的建议，
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
        deleteDevice: (state, action) => {
            const deviceId = action.payload;
            const index = state.value.findIndex(device => device.deviceId === deviceId);
            if (index !== -1) {
                state.value.splice(index, 1);
            }
        },
        setDevices: (state, action) => {
            state.value = action.payload;
        },
        updateDevice: (state, action) => {
            const newDevice = action.payload;
            console.log('redux收到的fullData',newDevice);
            const index = state.value.findIndex(device => device.deviceId === newDevice.deviceId);
            if (index !== -1) {
                //更新state
                const newValue = state.value.slice();
                newValue[index] = newDevice;
                console.log('要更新至的状态',newValue);
                const value = newValue;
                console.log('更新后的状态',value);
                return {
                    ...state,
                    value
                }
            } else {
                state.value.push(newDevice);
            }
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
export const { addDevice,deleteDevice, setDevices, updateDevice,setError, setStatus } = devicesSlice.actions


export const selectDevices = (state) => {
    console.log('selectDevices被调用');
    return state.devices.value};
export const selectDevicesStatus = state => state.devices.status;
export const selectDevicesError = state => state.devices.error;

export default devicesSlice.reducer
