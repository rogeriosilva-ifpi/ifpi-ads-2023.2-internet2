import { useEffect, useMemo, useRef, useState } from "react"
import { Task } from "../.."

interface TaskListItemProps {
  task: Task
  onRemove: (task: Task) => void
  onSave: (task: Task) => void
}

export function TaskListItem({ task, onRemove, onSave }: TaskListItemProps) {

  const [isEditing, setIsEditing] = useState(false)
  const refParagraph = useRef<HTMLParagraphElement>(null)
  const refDone = useRef<HTMLInputElement>(null)

  const handleRemove = () => { onRemove(task) }

  const handleSaveOrEdit = () => {

    if (isEditing) {
      setIsEditing(false)
      task.name = refParagraph.current!.innerText;
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



  const labelBtnEditar = useMemo(() => {
    return isEditing ? 'Salvar' : 'Editar'
  }, [isEditing])

  console.log('Item renderizado!')

  const focusedStyle = isEditing ? {border: "2px solid #eee", padding: "10px", borderRadius: "10px"}: {}

  return (
    <li style={{ listStyle: "none" }}>
      <div style={{ display: "flex", gap: 10 }}>
        <input type="checkbox" ref={refDone} onChange={handleChangeDone} />
          <p ref={refParagraph} contentEditable={isEditing} style={focusedStyle}>
            {task.name}
          </p>
        

        <button onClick={handleSaveOrEdit}>{labelBtnEditar}</button>
        <button onClick={handleRemove}>Lixeira</button>
      </div>
    </li>)
}
