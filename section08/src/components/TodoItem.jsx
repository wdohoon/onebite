import '../css/TodoItem.css'

const TodoItem = ({id, isDone, content, date, onUpdate, onDelete}) => {

    const onChangeCheckbox = () => {
        onUpdate(id);
    }

    const onClickdeleteButton = () => {
        onDelete(id);
    }

    return (
        <div className="TodoItem">
            <input
                onChange={onChangeCheckbox}
                type="checkbox"
                checked={isDone}
            />
            <div className="content">{content}</div>
            <div className="date">
                {new Date(date).toLocaleDateString()}
            </div>
            <button onClick={onClickdeleteButton}>삭제</button>
        </div>
    )
}

export default TodoItem;