import { createSlice } from '@reduxjs/toolkit'
import {DevicesService} from "../services/Service";

export const devicesSlice = createSlice({
    name: 'devices',
    initialState: {
        value: [],
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


//thunk 异步逻辑
export const fetchDevices = (wardId) =>
    async dispatch => {
        dispatch(setStatus('loading'));
        try {
            const devices = await DevicesService.fetchDevices(wardId);
            dispatch(setDevices(devices));
            dispatch(setStatus('succeeded'));
        } catch (error) {
            dispatch(setError(error.message));
            dispatch(setStatus('failed'));
        }
    };

// // 外部的 thunk creator 函数
// const fetchUserById = userId => {
//     // 内部的 thunk 函数
//     return async (dispatch, getState) => {
//         try {
//             // thunk 内发起异步数据请求
//             const user = await userAPI.fetchById(userId)
//             // 但数据响应完成后 dispatch 一个 action
//             dispatch(userLoaded(user))
//         } catch (err) {
//             // 如果过程出错，在这里处理
//         }
//     }
// }
export const selectDevices = state => state.devices.value;
export const selectDevicesStatus = state => state.devices.status;
export const selectDevicesError = state => state.devices.error;

export default devicesSlice.reducer
