import React from 'react';
import {Draggable} from '@hello-pangea/dnd';

const Item = ({content, index}) => {
    return (
        <Draggable draggableId={content.title} index={index}>
            {provided => (
                <div
                    className="mb-2 py-2 px-4 bg-gray-700 rounded-lg text-white flex flex-col border border-gray-500"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <div className="mx-2 font-bold hr">{content.title.toUpperCase()}</div>
                    <div className="mx-4 text-gray-400">{content.details}</div>
                </div>
            )}
        </Draggable>
    )
}

export default Item;
