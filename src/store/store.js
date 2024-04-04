import { configureStore } from '@reduxjs/toolkit'
import wardsReducer from './wardsSlice'
import devicesReducer from './devicesSlice'
export default configureStore({
    reducer: {
        wards: wardsReducer,
        devices: devicesReducer,
    }
})
