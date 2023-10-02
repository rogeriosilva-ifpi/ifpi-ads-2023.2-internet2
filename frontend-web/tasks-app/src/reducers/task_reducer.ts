import { Task } from "../pages/TasksPage";

interface TaskState {
  tasks: Task[]
}

export enum ActionType { ADDED, UPDATED, REMOVED, LOADED }

type ActionAdded = { type: ActionType.ADDED, payload: { task: Task } }
type ActionUpdated = { type: ActionType.UPDATED, payload: { task: Task } }
type ActionRemoved = { type: ActionType.REMOVED, payload: { id: string } }
type ActionLoaded = { type: ActionType.LOADED, payload: { tasks: Task[] } }

type Action = ActionAdded | ActionUpdated | ActionRemoved | ActionLoaded


function reducer(state: TaskState, action: Action): TaskState {

  switch (action.type) {
    case ActionType.ADDED: {
      const new_task = action.payload.task
      return { tasks: [new_task, ...state.tasks] }
    }
    case ActionType.UPDATED: {
      const task_updated = action.payload.task
      const tasks = state.tasks.filter(task =>
        task.id === task_updated.id ? task_updated : task
      )

      return { tasks }
    }
    case ActionType.REMOVED: {
      const removed_id = action.payload.id
      return { tasks: state.tasks.filter(t => t.id !== removed_id) }
    }
    case ActionType.LOADED: {
      return { tasks: [...action.payload.tasks] }
    }
    default: {
      console.warn('Action Inválida')
      return state
    }

  }

}

export { reducer as TaskReducer };
