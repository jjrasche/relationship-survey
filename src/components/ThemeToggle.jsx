import { useState, useEffect } from 'react'

export default function ThemeToggle() {
  const [theme, setTheme] = useState('system')

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'system'
    setTheme(savedTheme)
    applyTheme(savedTheme)
  }, [])

  const applyTheme = (newTheme) => {
    if (newTheme === 'system') {
      document.documentElement.removeAttribute('data-theme')
    } else {
      document.documentElement.setAttribute('data-theme', newTheme)
    }
  }

  const toggleTheme = () => {
    const themes = ['system', 'light', 'dark']
    const currentIndex = themes.indexOf(theme)
    const newTheme = themes[(currentIndex + 1) % themes.length]
    
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    applyTheme(newTheme)
  }

  const getIcon = () => {
    switch (theme) {
      case 'light': return '☀️'
      case 'dark': return '🌙'
      default: return '⚙️'
    }
  }

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      title={`Current: ${theme} mode`}
    >
      {getIcon()}
    </button>
  )
}