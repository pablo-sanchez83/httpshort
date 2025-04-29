import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import ShortUrlRedirect from './pages/ShortUrlRedirect'
import { ThemeProvider } from './context/ThemeContext'
import { ThemeToggle } from './components/ThemeToggle'
import './styles/global.css'

function App() {
  return (
    <ThemeProvider>
      <div className="container">
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0' }}>
          <h1>HTTPSHORT</h1>
          <ThemeToggle />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:shortCode" element={<ShortUrlRedirect />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  )
}

export default App 