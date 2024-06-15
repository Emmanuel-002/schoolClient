import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    list: [],
    loading: false,
    error: null,
    response: null,
    statestatus: "idle",
};

const homepageSlice = createSlice({
    name: 'homepage',
    initialState,
    reducers: {
        getRequest: (state) => {
            state.loading = true;
        },
        doneSuccess: (state, action) => {
            state.list = action.payload;
            state.loading = false;
            state.error = null;
            state.response = null;
        },
        getSuccess: (state, action) => {
            state.list = action.payload;
            state.loading = false;
            state.error = null;
            state.response = true;
        },
        getFailed: (state, action) => {
            state.response = action.payload;
            state.loading = false;
            state.error = null;
        },
        getError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        underListControl: (state) => {
            state.loading = false;
            state.response = null;
            state.error = null;
            state.statestatus = "idle";
        }
    },
});

export const {
    getRequest,
    doneSuccess,
    getSuccess,
    getFailed,
    getError,
    underListControl,
} = homepageSlice.actions;

export const homepageReducer = homepageSlice.reducer;