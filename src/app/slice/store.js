import {configureStore} from "@reduxjs/toolkit";
import tasksReducer from '../task/tasksSlice';
import updateTasksMiddleware from "../task/tasksMiddleware";

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(updateTasksMiddleware),
});