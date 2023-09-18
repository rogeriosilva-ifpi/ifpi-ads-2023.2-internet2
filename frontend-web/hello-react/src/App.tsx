import { ChangeEvent, useState } from 'react'
import './App.css'
import { RogerButton } from './components/RogerButton'
import { Saudacao } from './components/Saudacao'

function App() {

  const [nome, setNome] = useState("Diego A.")
  const [nomeSaudacao, setNomeSaudacao] = useState("")


  const onNomeChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setNome(event.target.value)
  }

  const onSaveButtonClicked = () => {
    setNomeSaudacao(nome)
  }

  return (
    <main>
      <h1>Hello Vite</h1>

      <input
        type="text"
        placeholder='Digite seu nome'
        value={nome}
        onChange={onNomeChanged}
      />
      <RogerButton label='Saude-me' onClick={onSaveButtonClicked} />
      <Saudacao name={nomeSaudacao} />
      <br />
      <br />

      <Saudacao name='Adélia' />
      <Saudacao />
      <Saudacao name='Gabriel' />
      <RogerButton />
      <RogerButton label='Salvar' onClick={onSaveButtonClicked} />


    </main>
  )
}

export default App
