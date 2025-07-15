import { useState, useEffect } from 'react'
import WeatherDashboard from './Components/WeatherDashboard'
import ParticleCanvas from './Components/ParticleCanvas'
import ThemeToggle from './Components/ThemeToggle'
import './App.css'

function App() {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <div className="app">
      <ParticleCanvas theme={theme} />
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      <WeatherDashboard theme={theme} />
    </div>
  )
}

export default App