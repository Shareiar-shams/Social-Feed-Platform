import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import './index.css'
import Login from './pages/Login'
import Register from './pages/Register'
import App from './App'
import Feed from './pages/Feed'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Navigate to="/login" replace />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="feed" element={<Feed />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
