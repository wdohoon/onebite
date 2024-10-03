import '../css/Edit.css';
import {useState} from "react";

const Editor = ({ onCreate }) => {

    const [content, setContent] = useState('');

    const onChangeContent = (e) => {
        setContent(e.target.value);
    }

    const onSubmit = () => {
        onCreate()
    }
    return (
        <div className="Editor">
            <input value={content} onChange={onChangeContent} placeholder="새로운 Todo..."/>
            <button onClick={onSubmit}>추가</button>

        </div>
    )
}

export default Editor;