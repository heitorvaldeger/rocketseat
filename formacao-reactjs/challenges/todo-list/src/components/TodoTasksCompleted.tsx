import styles from './TodoTasksCompleted.module.css'

type TodoTasksCompletedProps = {
  total: number
  totalCompleted: number
}

export const TodoTasksCompleted = ({ total, totalCompleted }: TodoTasksCompletedProps) => {
  return (
    <div className={styles.tasksCompleted}>
      <span className={styles.tasksCompletedTitle}>Concluídas</span>
      <div className={styles.tasksCompletedCount}>
        <span>{totalCompleted} de {total}</span>
      </div>
    </div>
  )
}