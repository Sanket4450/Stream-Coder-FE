import { Routes, Route } from 'react-router-dom'
import { routes } from './router'
import './App.css'
import Header from './components/Header'

const App = () => {
  return (
    <main className="root_layout">
      <Header />
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={<route.component />} />
        ))}
      </Routes>
    </main>
  )
}

export default App
