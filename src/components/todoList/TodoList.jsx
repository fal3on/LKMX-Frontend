import React, {useState, useEffect} from 'react'
//import nextId from 'react-id-generator'
import {v4 as uniqueId} from 'uuid'
import Todo from '../todo/Todo'

//== style ==//
import './TodoList.css'

export default function TodoList(){
    const [todos, setTodos] = useState([])
    const [todo, setTodo] = useState('')

    useEffect(() => {
        const todos = localStorage.getItem('todos') // for localStorage only
        if(todos){
            setTodos(JSON.parse(todos))
        } else {
            setTodos([])
        }
    }, [])

    function handleSubmit(event){
        event.preventDefault()
        if(todo === ''){
            return
        }
        const newTodo = { id: uniqueId(), text: todo }
        setTodos([...todos, newTodo])
        setTodo('')
        localStorage.setItem('todos', JSON.stringify([...todos, newTodo])) // for localStorage only
    }

    function handleChange(event){
        setTodo(event.target.value)
    }

    return (
        <div className="container">
            <h1>LKMX - Front-end</h1>
            <div className="todo_list">
                <h2>To Do List</h2>
                <form onSubmit={handleSubmit} className="todo_form">
                    <input type="text" value={todo} onChange={handleChange} placeholder="Escribe una tarea"/>
                    <button>Agregar</button>
                </form>
                <div className="todos">
                    {todos.length > 0 ? todos.map(todo => <Todo key={todo.id} todo={todo} todos={todos} setTodos={setTodos} />) : <div className="todo_card"><div className="no_todos">No has agregado tareas</div></div>}
                </div>
            </div>
        </div>
    )
}