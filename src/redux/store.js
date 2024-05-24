import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './userRelated/userSlice';
import { studentReducer } from './studentRelated/studentSlice';
import { noticeReducer } from './noticeRelated/noticeSlice';
import { sclassReducer } from './sclassRelated/sclassSlice';
import { teacherReducer } from './teacherRelated/teacherSlice';
import { parentReducer } from './parentRelated/parentSlice';
import { messageReducer } from './messageRelated/messageSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        student: studentReducer,
        teacher: teacherReducer,
        parent: parentReducer,
        notice: noticeReducer,
        message: messageReducer,
        sclass: sclassReducer,
    },
});

export default store;
