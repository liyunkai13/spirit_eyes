import { createSlice } from '@reduxjs/toolkit'
import WardsService from "../services/Service";

export const wardsSlice = createSlice({
    name: 'wards',
    initialState: {
        value: [],
        status: 'idle',
        error: null
    },
    reducers: {
        addWard: (state, action) => {
            state.value.push(action.payload);
        },
        setWards: (state, action) => {
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
export const { addWard, setWards, setError, setStatus } = wardsSlice.actions


//thunk 异步逻辑
export const fetchWards = () =>
    async dispatch => {
        dispatch(setStatus('loading'));
        try {
            const wards = await WardsService.fetchWards();
            dispatch(setWards(wards));
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
export const selectWards = state => state.wards.value;
export const selectWardsStatus = state => state.wards.status;
export const selectWardsError = state => state.wards.error;

export default wardsSlice.reducer
