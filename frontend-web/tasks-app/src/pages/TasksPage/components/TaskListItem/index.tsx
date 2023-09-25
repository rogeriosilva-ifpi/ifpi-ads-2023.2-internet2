import { Task } from "../.."

interface TaskListItemProps {
  task: Task
  onRemove: (task: Task) => void
}

export function TaskListItem({ task, onRemove }: TaskListItemProps) {

  const handleRemove = () => { onRemove(task) }

  return (
    <li>
      <div>
        <p>{task.name} <button onClick={handleRemove}>Lixeira</button> </p>
      </div>
    </li>)
}