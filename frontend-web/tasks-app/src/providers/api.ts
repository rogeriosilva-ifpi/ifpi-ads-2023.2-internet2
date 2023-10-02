import { Task } from "../pages/TasksPage";

const base_url = "http://localhost:3000/tasks";

export async function fetchAllTasks(): Promise<Task[]> {
  const response = await fetch(`${base_url}?_sort=created_at&_order=desc`);
  const data = await response.json();

  return data as Task[];
}

export async function postNewTask(task: Task): Promise<Task> {
  const init = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  };

  const response = await fetch(base_url, init);
  const data = await response.json();

  return data as Task;
}
