import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import _ from "lodash";

const TASK_URL = "/api/tasks/64d65713dd1d1f1e74fb8a97";

const initialState = {
    data: {},
    status: 'idle', /* 'idle' | 'loading' | 'succeeded' | 'failed' */
    error: null

}

export const fetchTasks = createAsyncThunk('task/fetchTasks', async () => {
    const response = await axios.get(TASK_URL);
    return response.data;
});

export const updateTasks = createAsyncThunk('task/updateTasks', async (data) => {
    const response = await axios.put(TASK_URL, data);
    return response.data;
});

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        taskDragged: {
            reducer(state, action) {
                const source = action.payload.source;
                const destination = action.payload.destination;

                if (!_.isEmpty(destination) ||
                    (_.isEqual(source, destination) && !_.isEqual(source.index, destination.index))) {

                    const item = state.data[source.droppableId].list.splice(source.index, 1);
                    state.data[destination.droppableId].list.splice(destination.index, 0, ...item);
                }
            },
            prepare(source, destination) {
                return {
                    payload: {
                        source,
                        destination
                    }
                }
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchTasks.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const payload = action.payload;
                delete payload._id;
                state.data = payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export const tasksData = (state) => state.tasks.data;
export const tasksStatus = (state) => state.tasks.status;
export const tasksError = (state) => state.tasks.error;
export const {taskDragged} = tasksSlice.actions;
export default tasksSlice.reducer;