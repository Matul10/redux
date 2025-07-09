import {configureStore} from '@reduxjs/toolkit'
import counterReducer from './playerSlice'
const store = configureStore({
    reducer:counterReducer
})

export default store;