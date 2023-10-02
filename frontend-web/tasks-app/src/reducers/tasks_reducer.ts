import { ulid } from "ulidx";
import { Task } from "../pages/TasksPage";

export interface TaskState {
  tasks: Task[];
}

export enum ActionType {
  Added,
  Changed,
  Deleted,
}

type TaskAdded = { type: ActionType.Added; payload: { text: string } };
type TaskChanged = { type: ActionType.Changed; payload: { task: Task } };
type TaskDeleted = { type: ActionType.Deleted; payload: { id: string } };

type Action = TaskAdded | TaskChanged | TaskDeleted;

const reducer = (state: TaskState, action: Action): TaskState => {
  switch (action.type) {
    case ActionType.Added: {
      const new_task = {
        id: ulid(),
        created_at: new Date(),
        name: action.payload.text,
        description: "...",
        done: false,
      };

      return { tasks: [new_task, ...state.tasks] };
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
