import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginAcc: (state, action) => {
            state.user = action.payload.user;
        },
        logout: (state) => {
            state.user = null;
        },
        updateUser: (state, action) => {
            state.user = action.payload.user;
        },
    },
});

export const { loginAcc, logout, updateUser } = authSlice.actions;

export default authSlice.reducer;
