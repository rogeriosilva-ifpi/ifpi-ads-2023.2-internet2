import { useEffect, useReducer } from 'react'
import { ulid } from 'ulidx'
import { ActionType, TaskReducer } from '../../reducers/task_reducer'
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

  const [{ tasks }, dispatch] = useReducer(TaskReducer, { tasks: [] })

  useEffect(() => {
    fetch('http://localhost:3000/tasks')
      .then(response => response.json())
      .then(data => {
        dispatch({ type: ActionType.LOADED, payload: { tasks: data } })
      })
  }, [])


  const handleAddTask = (text: string) => {

    const task: Task = {
      id: ulid(),
      name: text,
      description: '...',
      created_at: new Date(),
      done: false
    };

    const init = {
      method: 'POST',
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json"
      }
    }
    fetch('http://localhost:3000/tasks', init)
      .then(response => {
        if (response.ok) {
          dispatch({ type: ActionType.ADDED, payload: { task } })
        }
      })

  }

  const handleRemoveTask = (task: Task) => {
    dispatch({ type: ActionType.REMOVED, payload: { id: task.id } })
  }

  const handleSaveTask = (task: Task) => {
    dispatch({ type: ActionType.UPDATED, payload: { task } })
  }

  console.log('Page renderizada!')

  return (
    <main>
      <TaskForm onAdd={handleAddTask} />
      <TaskList tasks={tasks} onSave={handleSaveTask} onRemove={handleRemoveTask} />
    </main>
  )
}