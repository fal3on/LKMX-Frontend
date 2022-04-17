import React, {useState} from 'react'

//== style ==//
import './Todo.css'

//== form action icons ==//
import edit_icon from '../../assets/img/actions/icon-pen.svg'
import delete_icon from '../../assets/img/actions/icon-trash.svg'
import save_icon from '../../assets/img/actions/icon-disk.svg'

export default function Todo({todo, setTodos, todos}) {
    const [edit, setEdit] = useState(false)
    const [text, setText] = useState(todo.text)

    function handleEditChange(event) {
        setText(event.target.value)
    }

    function handleEdit() {
        setEdit(!edit)
    }

    function handleEditSubmit(id) {
        const editedTodos = todos.map((todoItm) => {
            if (todoItm.id === id) {
                todoItm.text = text
            }
            return todoItm
        })
        setTodos(editedTodos)
        handleEdit()
        console.log(todo, id)
        localStorage.setItem('todos', JSON.stringify(editedTodos)) // for localStorage only
    }

    function handleDelete(id){
        const removeTodo = [...todos].filter(todo => todo.id !== id)
        setTodos(removeTodo)
        localStorage.setItem('todos', JSON.stringify(removeTodo)) // for localStorage only
    }

    return (
        <div>
            <div className="todo_card" key={todo.id}>
                {!edit ? (
                <>
                        <div className="todo">
                            <span className="bullet"></span>
                            <span className="todo_text">{todo.text}</span>
                        </div>
                        <div className="todo_actions">
                            <button onClick={handleEdit}><img src={edit_icon} alt="edit" /></button>
                            <button onClick={() => handleDelete(todo.id)}><img src={delete_icon} alt="delete" /></button>
                        </div>
                </>) : (
                <>
                    <div className="todo">
                        <input type="text" value={text} name="todo" onChange={handleEditChange} />
                    </div>
                    <div className="todo_actions">
                        <button onClick={() => handleEditSubmit(todo.id)}><img src={save_icon} alt="save" /></button>
                    </div>
                </>)}
            </div>
        </div>
    )
}