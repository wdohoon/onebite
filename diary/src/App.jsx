import './App.css'
import {Link, Route, Routes, useNavigate} from "react-router-dom";
import Home from "./pages/Home.jsx";
import New from "./pages/New.jsx";
import Diary from "./pages/Diary.jsx";

import {getEmotionImage} from "./util/get-emotion-image.js";

function App() {
  const nav = useNavigate();

  const onClickButton = (value) => {
    nav('/new')
  }

  return (
    <>
      <div>
        <img src={getEmotionImage(1)} alt="emotion1" />
        <img src={getEmotionImage(2)} alt="emotion2" />
        <img src={getEmotionImage(3)} alt="emotion3" />
        <img src={getEmotionImage(4)} alt="emotion4" />
        <img src={getEmotionImage(5)} alt="emotion5" />
      </div>
      <div>
        <Link to={"/"}>Home</Link>
        <Link to={"/new"}>New</Link>
        <Link to={"/diary"}>Diary</Link>
      </div>
      <button onClick={onClickButton}>
        New 페이지로 이동
      </button>
      <Routes>
        <Route path="/" component={<Home/>} />
        <Route path="/new" component={<New/>} />
        <Route path="/diary/:id" component={<Diary/>} />
        <Route path="*" component={<NotFound/>} />
      </Routes>
    </>
  )
}

import NotFound from "./pages/NotFound.jsx";

export default App
