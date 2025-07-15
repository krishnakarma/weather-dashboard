import { useState } from 'react'

const SearchBar = ({ onSearch, loading }) => {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim())
      setQuery('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="search-bar glass">
      <div className="search-input-container">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a city (e.g., London, New York, Tokyo)"
          className="search-input"
          disabled={loading}
        />
        <button 
          type="submit" 
          className="search-button"
          disabled={loading || !query.trim()}
        >
          {loading ? (
            <span className="search-spinner">🔄</span>
          ) : (
            <span className="search-icon">🔍</span>
          )}
        </button>
      </div>
    </form>
  )
}

export default SearchBar