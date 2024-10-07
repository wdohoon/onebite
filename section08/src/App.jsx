import {useState,useRef} from 'react'
import './App.css'
import Header from './components/Header'
import Editor from './components/Editor'
import List from './components/List'

const mockData = [
    {
        id : 0,
        isDone : false,
        content : "React",
        date : new Date().getTime(),
    },
    {
        id : 1,
        isDone : false,
        content : "공부",
        date : new Date().getTime(),
    },
    {
        id : 2,
        isDone : false,
        content : "학습",
        date : new Date().getTime(),
    },
];

function App() {
    const [todos, setTodos] = useState(mockData);
    const idRef = useRef(3);

    const onCreate = (content) => {
        const newTodo = {
            id : idRef.current++,
            isDone: false,
            content : content,
            date : new Date().getTime(),
        }
        setTodos([newTodo,...todos]);
    }
    return (
        <div className="App">
            <Header/>
            <Editor onCreate={onCreate}/>
            <List/>
        </div>
    )
}

export default App
