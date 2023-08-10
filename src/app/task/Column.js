import React from 'react';
import {Droppable} from '@hello-pangea/dnd';
import Item from "./Item";


const Column = ({col: {list, id}}) => {
    return (
        <Droppable droppableId={id}>
            {(provided) => (
                <div className="flex flex-col basis-1/3 bg-gray-600 p-2 rounded shadow-xl">
                    <div className="text-xl text-white mb-4 text-center">
                        {id.toUpperCase()}
                    </div>
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {list.map((text, index) => <Item key={text.title} content={text} index={index}/>)}
                        {provided.placeholder}
                    </div>
                    <button className="py-2 px-4 font-extrabold text-center text-gray-500 rounded-md border-dashed border border-gray-400">
                        +
                    </button>
                </div>
            )}
        </Droppable>
    );
};

export default Column;