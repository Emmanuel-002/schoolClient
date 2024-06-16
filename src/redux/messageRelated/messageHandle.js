import axios from 'axios';
import {
    getRequest,
    getSuccess,
    stuffAdded,
    getFailed,
    getError
} from './messageSlice';

export const getAllMessages = (id, address) => async (dispatch) => {
    dispatch(getRequest());
    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/${address}List/${id}`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
}

export const replyMessage = (fields, address, id) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.put(`${process.env.REACT_APP_BASE_URL}/${address}/${id}`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });
        if (result) {
            dispatch(stuffAdded());
        }else{
            dispatch(getFailed)
        }
    } catch (error) {
        dispatch(getError(error));
    }
}