import React, { useRef } from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"

interface LoginPagePros {
  next?: string
}

export function LoginPage({ next = '/' }: LoginPagePros) {

  const { signin, isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return <Navigate to={next} />
  }

  const usernameInputRef = useRef<HTMLInputElement>(null)
  const passwordInputRef = useRef<HTMLInputElement>(null)

  const handleLoginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const username = usernameInputRef.current!.value
    const password = passwordInputRef.current!.value

    if (username !== 'rogerio410' || password !== '123456') {
      alert('Usuário e/ou senha incorretos!')
    }

    signin({ username })
  }

  return (
    <main>
      <h1>Login Page</h1>
      <form onSubmit={handleLoginSubmit}>
        <input type="text" placeholder="username" ref={usernameInputRef} />
        <input type="password" placeholder="senha" ref={passwordInputRef} />
        <input type="submit" value="Entrar..." />
      </form>
    </main>
  )
}