
interface SaudacaoProps {
  name?: string
}

export function Saudacao(
  { name = "Rogério Silva" }: SaudacaoProps
) {
  return (
    <p>Olá, {name}</p>
  )
}