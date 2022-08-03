import React, { useState } from 'react';
import "./App.css";

// render() method가 존재하지 않아요!
// 우리 함수의 return 값이 JSX
export default function App() {
  
  const [todoData, setTodoData] = useState([
    {
      id: "1",
      title: "운동하기",
      completed: false
    }
  ]);  // 초기에 가지는 값을 넣어준다.

  const [value, setValue] = useState("");

  const btnStyle = {
    color: "red",
    border: "none",
    padding: "5px 9px",
    borderRadius: "50%",
    cursor: "pointer",
    float: "right"
  }

  const getStyle = (completed) => {
    return {
      padding: "20px",
      borderBottom: "1px #ccc dotted",
      textDecoration: completed ? "line-through" : "none"
    }
  }

  const deleteClick = (id) => {
    const newTodoData = todoData.filter(data => data.id !== id);
    setTodoData(newTodoData);
  }

  const handleChange = (e) => {
    setValue(e.target.value);
  }

  const handleSubmit = (e) => {
    // 현재 submit event가 발생해서 처리하고 있어요!
    // 이런 default event 처리를 안할래요
    e.preventDefault();

    let newTodo = {
      id: Date.now(),  // unique한 값을 표현하기 위해.
      title: value,
      completed: false
    }

    setTodoData([...todoData, newTodo]);
    setValue("");
  }

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
    <div className="container">
      <div className="todoBlock">
        <div>
          <h1>오늘의 할 일</h1>
        </div>

        {todoData.map(data => (
          <div style={getStyle(data.completed)} key={data.id}>
            <input type="checkbox" 
                   defaultChecked={false}
                   onChange={() => handleCompleteChange(data.id)} />
            {data.title}
            <button style={btnStyle} onClick={() => deleteClick(data.id)}>delete</button>
          </div>
        ))}

        <form style={{ display: 'flex' }} onSubmit={handleSubmit}>
          <input type="text"
                 name="todoInput"
                 style={{ flex: '10', padding: '5px' }} 
                 placeholder="새로운 할 일을 입력하세요"
                 value={value}
                 onChange={handleChange} />
          <input type="submit"
                 value="입력"
                 className="btn"
                 style={{ flex: '1' }} />
        </form>
      </div>
    </div>
  )
}