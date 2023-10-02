import { Task } from "../pages/TasksPage";

export interface TaskState {
  tasks: Task[];
}

export enum ActionType {
  Loaded,
  Added,
  Changed,
  Deleted,
}

type TaskAdded = { type: ActionType.Added; payload: { task: Task } };
type TaskChanged = { type: ActionType.Changed; payload: { task: Task } };
type TaskDeleted = { type: ActionType.Deleted; payload: { id: string } };
type TasksLoaded = { type: ActionType.Loaded; payload: { tasks: Task[] } };

type Action = TaskAdded | TaskChanged | TaskDeleted | TasksLoaded;

const reducer = (state: TaskState, action: Action): TaskState => {
  switch (action.type) {
    case ActionType.Loaded: {
      return { tasks: [...action.payload.tasks] };
    }
    case ActionType.Added: {
      return { tasks: [action.payload.task, ...state.tasks] };
    }
    case ActionType.Changed: {
      const changedTask = action.payload.task;
      const tasks = state.tasks.filter((task) =>
        task.id === changedTask.id ? changedTask : task
      );
      return { tasks };
    }
    case ActionType.Deleted: {
      return { tasks: state.tasks.filter((t) => t.id !== action.payload.id) };
    }
    default: {
      console.debug("Invalid Task Action type!");
      return state;
    }
  }
};

export { reducer as taskStateReducer };
