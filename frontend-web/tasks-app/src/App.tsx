import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import './App.css'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { TaskDetailPage } from './pages/TaskDetailPage'
import { TasksPage } from './pages/TasksPage'

function App() {

  return (
    <div>
      <BrowserRouter>
        <header>
          <h2>Tasks App Web</h2>
          <nav>
            <ul>
              <li>
                <NavLink to={'/'}>Home</NavLink>
              </li>
              <li>
                <NavLink to={'tasks'}>Tasks</NavLink>
              </li>
              <li>
                <NavLink to={'login'}>Login</NavLink>
              </li>
            </ul>
          </nav>
        </header>

        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='tasks' >
            <Route index element={<TasksPage />} />
            <Route path=':id' element={<TaskDetailPage />} />
          </Route>
          <Route path='login' element={<LoginPage />} />
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
