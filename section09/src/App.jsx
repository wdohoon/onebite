import {useState, useRef, useReducer} from 'react'
import './App.css'
import Header from './components/Header'
import Editor from './components/Editor'
import List from './components/List'
import Exam from "./components/Exam.jsx";

const mockData = [
  {
    id: 0,
    isDone: false,
    content: "React",
    date: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    content: "공부",
    date: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: "학습",
    date: new Date().getTime(),
  },
];

function reducer(state, action) {
  switch (action.type) {
    case 'CREATE':
      return [action.data, ...state];
    case 'UPDATE':
      return state.map((item) =>
        item.id === action.targetId
          ? {...item, isDone: !item.isDone}
          : item);
  }
}

function App() {
  const [todos, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(3);

  const onCreate = (content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        isDone: false,
        content: content,
        date: new Date().getTime(),
      }
    })
  }

  const onUpdate = (targetId) => {
    dispatch({
      type: "UPDATE",
      targetId: targetId,
    })
  }

  const onDelete = (targetId) => {
    // 인수 : todos 배열에서 targetId와 일치하는 id를 갖는 요소만 삭제한 새로운 배열
    setTodos(todos.filter((todo) => todo.id !== targetId));
  };

  return (
    <div className="App">
      {/*<Exam />*/}
      {/*            <Header/>
            <Editor onCreate={onCreate}
            />
            <List
                todos={todos}
                onUpdate={onUpdate}
                onDelete={onDelete}
            />*/}
    </div>
  )
}

export default App
