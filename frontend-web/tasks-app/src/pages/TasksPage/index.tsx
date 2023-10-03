import { useEffect, useMemo, useReducer } from 'react'
import { ulid } from 'ulidx'
import { TasksRepository } from '../../data/TasksRepository'
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
  const repository = useMemo(() => new TasksRepository(), [])

  const [{ tasks }, dispatch] = useReducer(TaskReducer, { tasks: [] })

  useEffect(() => {
    const routine = async () => {
      const tasks = await repository.fetchAllTasks()

      dispatch({ type: ActionType.LOADED, payload: { tasks: tasks ?? [] } })
    }

    routine()
  }, [])


  const handleAddTask = (text: string) => {
    if (text.trim().length == 0) return

    const task: Task = {
      id: ulid(),
      name: text,
      description: '...',
      created_at: new Date(),
      done: false
    };

    repository.saveNewTask(task)
      .then(id => {
        if (id == null) {
          // delete otmist task when repository return null (not saved)
          dispatch({ type: ActionType.REMOVED, payload: { id: task.id } })
        }
      })

    // while the request is made, follow otimistic
    dispatch({ type: ActionType.ADDED, payload: { task } })


  }

  const handleRemoveTask = async (task: Task) => {
    const deleted = await repository.deleteTask(task.id)

    if (deleted) {
      dispatch({ type: ActionType.REMOVED, payload: { id: task.id } })
    }
  }

  const handleSaveTask = async (task: Task) => {
    const updatedId = await repository.updateTask(task)

    if (updatedId != null) {
      dispatch({ type: ActionType.UPDATED, payload: { task } })
    }
  }

  console.log('Page renderizada!')

  return (
    <>
      <TaskForm onAdd={handleAddTask} />
      <TaskList tasks={tasks} onSave={handleSaveTask} onRemove={handleRemoveTask} />
    </>
  )
}