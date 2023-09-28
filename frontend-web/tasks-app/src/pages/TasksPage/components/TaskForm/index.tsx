import React, { useRef } from 'react'

interface TaskFormProps {
  onAdd: (text: string) => void
}

export function TaskForm({ onAdd }: TaskFormProps) {

  const descriptionInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const text = descriptionInputRef.current!.value

    const form = (event.target as HTMLFormElement)
    form.reset()
    descriptionInputRef.current!.focus()

    onAdd(text)
  }


  return (
    <form onSubmit={handleSubmit}>
      <input type="text" ref={descriptionInputRef} placeholder="Descrição da Task" />
      <input type="submit" value="Adicionar Tarefa" />
    </form>
  )
}