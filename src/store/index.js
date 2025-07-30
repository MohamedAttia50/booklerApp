import { configureStore } from "@reduxjs/toolkit";
import { uiReducer } from "./uiSlice";
import { hotelReducer } from "./hotelSlice";
import { searchReducer } from "./searchSlice";
import { authReducer, loginSuccess } from "./authSlice";

export const store =configureStore({
    reducer:{
        ui:uiReducer,
        hotels:hotelReducer,
        search:searchReducer,
        auth:authReducer
    }
});

const savedUser =localStorage.getItem("authUser");
if(savedUser){
    store.dispatch(loginSuccess(JSON.parse(savedUser)));
}