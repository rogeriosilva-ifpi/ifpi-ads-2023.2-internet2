
interface RogerButtonProps {
  label?: string
  onClick?: () => void
}

export function RogerButton(
  { label = "Clique aqui", onClick }: RogerButtonProps
) {

  return (
    <div>
      <button onClick={onClick}>{label}</button>
    </div>
  )
}