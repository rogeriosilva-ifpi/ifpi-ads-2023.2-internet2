import { Task } from "../pages/TasksPage";

export class TasksRepository {


    /**
     * Fetch all tasks
     * 
     * @returns Tasks available or null if the request fails
     */
    async fetchAllTasks(): Promise<Task[] | null> {

        // sort by done (true last) last and sort by creation date (new first)
        // https://github.com/typicode/json-server#sort
        const sortAndOrderSettings = "?_sort=done,created_at&_order=asc,desc"

        const response = await fetch("http://localhost:3000/tasks" + sortAndOrderSettings)

        if (response.ok) return await response.json() as Task[]
        else return null
    }

    /**
     * Send task to API to persist it
     * 
     * @param task task to save
     * @returns the task id or null if the request fails
     */
    async saveNewTask(task: Task): Promise<string | null> {
        const init = {
            method: "POST",
            body: JSON.stringify(task),
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await fetch("http://localhost:3000/tasks", init)

        if (response.ok) return task.id;
        else return null
    }

    /**
     * 
     * @param task task to save
     * @returns the task id or null if the request fails
     */
    async updateTask(task: Task): Promise<string | null> {
        const init = {
            method: "PUT",
            body: JSON.stringify(task),
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await fetch(`http://localhost:3000/tasks/${task.id}`, init)

        if (response.ok) return task.id;
        else return null
    }

    /**
     * Delete stack with id from persistency
     * 
     * @param id task id to delete
     * @returns true if the task was deleted successfully
     */
    async deleteTask(id: string): Promise<boolean> {
        const response = await fetch(`http://localhost:3000/tasks/${id}`, { method: "DELETE" })

        if (response.ok) return true;
        else return false
    }
}