import {DragDropContext} from '@hello-pangea/dnd';
import Column from "./Column";
import {useDispatch, useSelector} from "react-redux";
import {fetchTasks, taskDragged, tasksData, tasksError, tasksStatus} from "./tasksSlice";
import {useEffect} from "react";


function Tasks() {
    const dispatch = useDispatch();
    const data = useSelector(tasksData);
    const status = useSelector(tasksStatus);
    const error = useSelector(tasksError);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchTasks())
        }
    }, [status, dispatch]);

    let content;

    function getOnDragEnd() {
        return ({source, destination}) => dispatch(taskDragged(source, destination));
    }

    if (status === 'loading') {
        content = <p className="text-white">"Loading..."</p>;
    } else if (status === 'failed') {
        content = <p className="text-white">{error}</p>;
    } else if (status === 'succeeded') {
        content =
            <DragDropContext onDragEnd={getOnDragEnd()}>
                <div className="h-screen flex gap-3 justify-center ml-3 my-3 mr-2">
                    {Object.values(data).map(col => <Column col={col} key={col.id}/>)}
                </div>
            </DragDropContext>;
    }

    return (<>{content}</>)
}

export default Tasks;
