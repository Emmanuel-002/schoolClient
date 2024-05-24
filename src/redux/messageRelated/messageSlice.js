import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    messageList: [],
    loading: false,
    error: null,
    response: null,
};

const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        getRequest: (state) => {
            state.loading = true;
        },
        getSuccess: (state, action) => {
            state.messageList = action.payload;
            state.loading = false;
            state.error = null;
            state.response = null;
        },
        getFailed: (state, action) => {
            state.response = action.payload;
            state.loading = false;
            state.error = null;
        },
        getError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    },
});

export const {
    getRequest,
    getSuccess,
    getFailed,
    getError
} = messageSlice.actions;

export const messageReducer = messageSlice.reducer;