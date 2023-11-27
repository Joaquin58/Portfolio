import { createSlice } from "@reduxjs/toolkit";

const users = createSlice({
    name: "user",
    initialState: {
        nickname: "",
        token: ""
    },
    reducers: {
        fetchusers: (state, action) => {
            state.nickname = action.payload
        }
    }
})