import { useEffect, useMemo, useRef, useState } from "react"
import { Task } from "../.."

interface TaskListItemProps {
  task: Task
  onRemove: (task: Task) => void
  onSave: (task: Task) => void
}

export function TaskListItem({ task, onRemove, onSave }: TaskListItemProps) {

  const [isEditing, setIsEditing] = useState(false)
  const refInput = useRef<HTMLInputElement>(null)
  const refDone = useRef<HTMLInputElement>(null)

  const handleRemove = () => { onRemove(task) }

  const handleSaveOrEdit = () => {

    if (isEditing) {
      setIsEditing(false)
      task.name = refInput.current!.value;
      onSave(task)
    } else {
      setIsEditing(true)
    }

  }

  const handleChangeDone = () => {
    task.done = refDone.current!.checked;
    onSave(task);
  }

  useEffect(() => {
    refDone.current!.checked = task.done;
  }, [])

  useEffect(() => {
    if (isEditing) {
      refInput.current!.value = task.name
      refInput.current!.focus()
    }
  }, [isEditing])

  const labelBtnEditar = useMemo(() => {
    return isEditing ? 'Salvar' : 'Editar'
  }, [isEditing])

  console.log('Item renderizado!')

  return (
    <li style={{ listStyle: "none" }}>
      <div style={{ display: "flex", gap: 10 }}>
        <input type="checkbox" ref={refDone} onChange={handleChangeDone} />

        {isEditing ? <input ref={refInput} /> :
          <p>
            {task.name}
          </p>
        }

        <button onClick={handleSaveOrEdit}>{labelBtnEditar}</button>
        <button onClick={handleRemove}>Lixeira</button>
      </div>
    </li>)
}