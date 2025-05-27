import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { Header } from './components/Header'
import { TodoAdd } from './components/TodoAdd'

import style from './App.module.css'
import { TodoList } from './components/TodoList'
import { Todo } from './models/todo'

function App() {
  const [todos, setTodos] = useState<Todo[]>([])

  const handleAddTodoItem = (title: string) => {
    const id = uuidv4()

    setTodos([...todos, {
      isCompleted: false,
      title,
      id
    }])
  }

  const handleCompletedChange = (id: string) => {
    const newTodoList = todos.map(todo => {
      if (todo.id === id) {
        todo.isCompleted = !todo.isCompleted
      }
      return todo
    })

    setTodos(newTodoList)
  }

  const handleTodoItemDelete = (id: string) => {
    setTodos(state => state.filter(todo => todo.id !== id))
  }

  return (
    <div>
      <Header />
      <div className={style.mainContent}>
        <TodoAdd onAdd={handleAddTodoItem} />
        <TodoList todos={todos} onCompletedChange={handleCompletedChange} onDelete={handleTodoItemDelete} />
      </div>
    </div>
  )
}

export default App
