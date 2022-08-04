import React from 'react'

const List = React.memo(({deleteClick, id, title, completed, todoData, setTodoData, provided, snapshot}) => {

    console.log("List component 실행");

    const handleCompleteChange = (id) => {
        // id에 대해 todoData의 completed 값을 변경시켜야 해요
        let newTodoData = todoData.map((data) => {
          if(data.id === id) {
            data.completed = !data.completed;
          }
          return data;
        });
    
        setTodoData(newTodoData);
    }

    return (
        <div key={id} {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps}>
            <div className={` ${snapshot.isDragging ? "bg-gray-300" : "bg-gray-100"} flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 border rounded`}>
                <div className='items-center'>
                    <input type="checkbox"
                        defaultChecked={false}
                        onChange={() => handleCompleteChange(id)} />
                    {" "}<span className={completed ? "line-through" : undefined}>{title}</span>
                </div>
                <div className='items-center'>
                    <button onClick={() => deleteClick(id)}>delete</button>
                </div>
            </div>
        </div>
   )
});

export default List;