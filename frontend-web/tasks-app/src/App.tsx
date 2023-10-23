import { useMemo } from 'react'
import './App.css'
import { useAuth } from './contexts/AuthContext'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { NotFoundPage } from './pages/NotFound'
import { TasksPage } from './pages/TasksPage'

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './components/ProtectedRoute'
import { TaskPage } from './pages/TaskPage'

function App() {
  const { signout, isAuthenticated, user } = useAuth()

  const authBlock = useMemo(() => {
    return (
      isAuthenticated ?
        <p>{user!.username}
          <button onClick={() => { signout() }}>Sair</button>
        </p>
        : <p>Olá Visitante!</p>)
  }, [isAuthenticated])

  return (
    <div>
      <BrowserRouter>
        <header>
          <h1>Tasks App</h1>
          <span>
            {authBlock}
          </span>
          <nav>
            <ul>
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/tasks">Tasks</NavLink></li>
              <li><NavLink to="/login">Login</NavLink></li>
            </ul>
          </nav>
        </header>

        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/tasks'>
            <Route index element={<ProtectedRoute> <TasksPage /> </ProtectedRoute>} />
            <Route path=':id' element={<ProtectedRoute> <TaskPage /> </ProtectedRoute>} />
          </Route>
          <Route path='*' element={<NotFoundPage />} />
        </Routes>

        <footer>
          <p>Fim por fim feito por mim!</p>
        </footer>
      </BrowserRouter>
    </div>
  )
}

export default App
