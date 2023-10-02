import { useEffect, useReducer } from 'react'
import { ulid } from 'ulidx'
import { fetchAllTasks, postNewTask } from '../../providers/api'
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

  useEffect(()=>{
    const  loadTasks = async () => {
      const tasks = await fetchAllTasks()
      dispatch({type: ActionType.Loaded, payload: {tasks}})
    }

    loadTasks()
  },[])

  // ... more code

  const handleAddTask = (text: string) => {
    const task = {
      id: ulid(),
      created_at: new Date(),
      name:text,
      description: "...",
      done: false,
    };

    const postTask = async () => {
      dispatch({
        type: ActionType.Added, 
        payload: {task: await postNewTask(task)}
      })
    }

    postTask();
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