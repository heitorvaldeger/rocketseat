import { TodoItem } from './TodoItem'
import styles from './TodoList.module.css'
import { TodoTasksCompleted } from './TodoTasksCompleted'
import { TodoTasksCreated } from './TodoTasksCreated'
import { Todo } from '../models/todo'

type TodoListProps = {
  todos: Todo[]
  onCompletedChange: (id: string) => void
  onDelete: (id: string) => void
}

export const TodoList = ({ todos, onCompletedChange, onDelete }: TodoListProps) => {

  const todoItemsCount = todos.length
  const todoItemsCompletedCount = todos.filter(todo => todo.isCompleted).length

  return (
    <div className={styles.todoList}>
      <header>
        <TodoTasksCreated total={todoItemsCount} />
        <TodoTasksCompleted 
          total={todoItemsCount}
          totalCompleted={todoItemsCompletedCount}
        />
      </header>
      <div className={styles.todoListItem}>
        {
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onCompletedChange={onCompletedChange}
              onDelete={onDelete}
            />
          ))
        }
      </div>
    </div>
  )
}