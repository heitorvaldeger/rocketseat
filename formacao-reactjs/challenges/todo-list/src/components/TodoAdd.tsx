import { PlusCircle } from "@phosphor-icons/react"

import style from './TodoAdd.module.css'
import { ChangeEvent, FormEvent, useState } from "react"

type TodoAddProps = {
  onAdd: (title: string) => void
}
export const TodoAdd = ({ onAdd }: TodoAddProps) => {
  const [newTitle, setNewTitle] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (newTitle.trim()) {
      onAdd(newTitle)
      setNewTitle('')
    }
  }

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value)
  }

  return (
    <form className={style.formContent} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Adicione uma nova tarefa"
        onChange={handleTitleChange}
        value={newTitle}
      />
      <button type="submit">
        Criar
        <PlusCircle />
      </button>
    </form>
  )
}