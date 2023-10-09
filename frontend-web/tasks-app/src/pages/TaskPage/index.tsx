import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Task } from "../TasksPage"

export function TaskPage() {

  const [task, setTask] = useState<Task | null>(null)
  const {id} = useParams()

  useEffect(()=>{
    const getTask = async () => {
      const response = await fetch(`http://localhost:3000/tasks/${id}`)

      if (response.ok){
        const data = await response.json()
        setTask(data)
      }else{
        alert(`Erro ao buscar Task #${id}`)
      }

    }

    getTask()

  }, [id])

  return (
    <main>
      <h1>Task Detail</h1>
      {task && 
        <ul>
          <li>#{task.id}</li>
          <li>Nome: {task.name}</li>
          <li>Data: {task.created_at}</li>
        </ul>
      }
    </main>
  )
}