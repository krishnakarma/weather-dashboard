const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <button
      className="theme-toggle glass"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      <span className="theme-icon">
        {theme === 'dark' ? '🌙' : '☀️'}
      </span>
    </button>
  )
}

export default ThemeToggle