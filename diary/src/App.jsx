import './App.css'
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import New from "./pages/New.jsx";
import Diary from "./pages/Diary.jsx";
import NotFound from "./pages/NotFound.jsx";
import Edit from "./pages/Edit.jsx";
import {useReducer, useRef} from "react";
// import {getEmotionImage} from "./util/get-emotion-image.js";

const mockData = [
  {
    id: 1,
    createDate: new Date().getTime(),
    emotionId: 1,
    content: "1번 내용",
  },
  {
    id: 2,
    createDate: new Date().getTime(),
    emotionId: 2,
    content: "2번 내용",
  },
]

function reducer(state, action) {
  switch (action.type) {
    case 'CREATE':
      return [action.data, ...state];
    case 'UPDATE':
      return state.map((item) => String(item.id) === String(action.data.id) ? action.data : item);
    case 'DELETE':
      return state.filter((item) => String(item.id) !== String(action.id));
    default:
      return state;
  }
}

function App() {
  const [data, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(3);

  const onCreate = (createdDate, emotionId, content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        createdDate: createdDate,
        emotionId: emotionId,
        content: content,
      }
    })
  }

  const onUpdate = (id, createdDate, emotionId, content) => {
    dispatch(
      {
        type: "UPDATE",
        data: {
          id,
          createdDate,
          emotionId,
          content,
        }
      }
    )
  }

  const onDelete = (id) => {
    dispatch({
      type: "DELETE",
      id,
    })
  }


  return (
    <>
      <button onClick={() => {
        onCreate(new Date().getTime(), 1, "Hello");
      }}>일기 추가 테스트
      </button>
      <button onClick={() => {
        onUpdate(1, new Date().getTime(), 3, "수정");
      }}>수정 테스트
      </button>
      <button onClick={()=>{
        onDelete(1)
      }}>삭제</button>
      <Routes>
        <Route path="/" component={<Home/>}/>
        <Route path="/new" component={<New/>}/>
        <Route path="/diary/:id" component={<Diary/>}/>
        <Route path="/edit/:id" component={<Edit/>}/>
        <Route path="*" component={<NotFound/>}/>
      </Routes>
    </>
  )
}

export default App
