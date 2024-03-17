import { configureStore } from '@reduxjs/toolkit'
import wardsReducer from './wardsSlice'
export default configureStore({
    reducer: {
        wards: wardsReducer
    }
})
