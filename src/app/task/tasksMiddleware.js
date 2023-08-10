import {updateTasks, taskDragged} from "./tasksSlice";

const updateTasksMiddleware = storeAPI => next => action => {
    let result = next(action);

    if (action.type === taskDragged.type) {
        storeAPI.dispatch(updateTasks(storeAPI.getState().tasks.data));
    }

    return result;
}

export default updateTasksMiddleware;