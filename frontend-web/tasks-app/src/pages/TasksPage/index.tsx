import { useState } from 'react'
import { ulid } from 'ulidx'
import { TaskForm } from './components/TaskForm'
import { TaskList } from './components/TaskList'

export interface Task {
  id: string
  name: string
  description?: string
  done: boolean
  created_at: Date
}


export function TasksPage() {

  const [tasks, setTasks] = useState<Task[]>([])


  const handleAddTask = (text: string) => {
    const new_task = {
      id: ulid(),
      created_at: new Date(),
      name: text,
      description: 'Brincar quando estiver cansado',
      done: false
    }

    setTasks([new_task, ...tasks])
  }

  const handleRemoveTask = (task: Task) => {
    const filtradas = tasks.filter(t => t.id !== task.id)
    setTasks(filtradas)
  }

  const handleSaveTask = (task: Task) => {
    const filtradas = tasks.filter(t => {
      if (t.id === task.id) {
        return task
      }
      return t
    })

    setTasks(filtradas)
  }

  console.log('Page renderizada!')

  return (
    <>
      <TaskForm onAdd={handleAddTask} />
      <TaskList tasks={tasks} onSave={handleSaveTask} onRemove={handleRemoveTask} />
    </>
  )
}