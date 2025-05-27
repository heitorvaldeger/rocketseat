import styles from './TodoTasksCreated.module.css'

type TodoTasksCreatedProps = {
  total: number
}

export const TodoTasksCreated = ({ total }: TodoTasksCreatedProps) => {
  return (
    <div className={styles.tasksCreated}>
      <span className={styles.tasksCreatedTitle}>Tarefas criadas</span>
      <div className={styles.tasksCreatedCount}>
        <span>{total}</span>
      </div>
    </div>
  )
}