import { useReducer } from 'react'
import { ActionType, taskStateReducer } from '../../reducers/tasks_reducer'
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
  const [state, dispatch] = useReducer(taskStateReducer, {tasks: []})

  const handleAddTask = (text: string) => {
    dispatch({type: ActionType.Added, payload: {text}})
  }

  const handleRemoveTask = ({id}: Task) => {
    dispatch({type: ActionType.Deleted, payload: {id}})
  }

  const handleSaveTask = (task: Task) => {
    dispatch({type: ActionType.Changed, payload: {task}})
  }

  console.log('Page renderizada!')

  return (
    <>
      <TaskForm onAdd={handleAddTask} />
      <TaskList 
        tasks={state.tasks} 
        onSave={handleSaveTask} 
        onRemove={handleRemoveTask} />
    </>
  )
}