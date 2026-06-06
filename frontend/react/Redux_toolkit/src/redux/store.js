import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/theme";
import counterReducer from "./slices/counterSlice"
export const store=configureStore({
    reducer:{
        counter:counterReducer,
        theme:themeReducer
    }
})


