import { Check, Trash } from "@phosphor-icons/react"

import styles from './TodoItem.module.css'
import { Todo } from "../models/todo"

type TodoItemProps = {
  onCompletedChange: (id: string) => void
  onDelete: (id: string) => void
  todo: Todo
}

export const TodoItem = ({ todo, onCompletedChange, onDelete }: TodoItemProps) => {
  const handleItemCompletedChange = () => {
    onCompletedChange(todo.id)
  }

  const handleDelete = () => {
    onDelete(todo.id)
  }

  return (
    <div className={styles.todoItem}>
      <label className={styles.todoItemCheckbox}>
        <input type="checkbox" checked={todo.isCompleted} onChange={handleItemCompletedChange} />
        <span className={styles.icon}>
          <Check size={12} color="white" />
        </span>

        <p className={styles.title}>{todo.title}</p>
      </label>
      <button className={styles.buttonDelete} onClick={handleDelete}>
        <Trash />
      </button>
    </div>
  )
}