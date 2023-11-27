import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
    name: "users",
    initialState: [],
    reducers: {
        getall: (state, action) => {
            state = action.payload
        }
    }
})


export const { getall } = user.actions

export default user.reducer