import {createSlice} from '@reduxjs/toolkit'

export const wardsSlice = createSlice({
    name: 'wards',
    initialState: {
        //TODO :选中的ward的详细信息
        //selectedWard:{},
        value: [
            {
                userId: 1,
                wardId: 1,
                wardName: "Ward 1",
                wardGender: "male",
                wardAge: 20,
                emContact: "1234567890",
                notes: "This is a general ward"
            },
            {
                userId: 1,
                wardId: 2,
                wardName: "Ward 2",
                wardGender: "male",
                wardAge: 18,
                emContact: "1234567890",
                notes: "This is a general ward"

            },
            {
                userId: 1,
                wardId: 3,
                wardName: "Ward 3",
                wardGender: "male",
                wardAge: 50,
                emContact: "1234567890",
                notes: "This is a general ward"
            }
        ],
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
        updateWard: (state, action) => {
            const {wardId, newWard} = action.payload;
            console.log("wardId: ", wardId);
            console.log("newWard: ", newWard);
            const index = state.value.findIndex(ward => ward.wardId == wardId);
            if (index !== -1) {
                //解构newWard
                const userId = state.value[index].userId;
                console.log("userId: ", userId);
                const tmp = {
                    ...newWard,
                    wardId: wardId,
                    userId: userId,
                };
                //更新state
                console.log("tmp: ", tmp);
                state.value[index] = tmp;
            } else {
                console.log("ward not found,something wrong!");
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
export const { addWard, setWards, updateWard,setError, setStatus } = wardsSlice.actions
export const selectWards = state => state.wards.value;
export const selectWardsStatus = state => state.wards.status;
export const selectWardsError = state => state.wards.error;

export default wardsSlice.reducer
