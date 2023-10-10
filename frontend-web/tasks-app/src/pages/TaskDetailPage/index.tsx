import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Task } from "../TasksPage"

export function TaskDetailPage() {

  const [task, setTask] = useState<Task | null>(null)

  const { id } = useParams()

  useEffect(() => {

    const fetchTask = async () => {
      const response = await fetch(`http://localhost:3000/tasks/${id}`)

      if (response.ok) {
        const data = await response.json()
        setTask(data)
      } else {
        alert('Não foi possível carregar')
      }

    }

    fetchTask()

  }, [])

  return (
    <main>
      {task && (
        <>
          <h1>Detalhes Task  #{task.id.slice(0, 6)}</h1>
          <ul>
            <li>Nome: {task.name}</li>
            <li>Criada em: {task.created_at}</li>
          </ul>
        </>
      )}
    </main>
  )
}