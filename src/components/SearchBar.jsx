import { useState } from 'react'
import '../styles/SearchBar.css'

function SearchBar({ onSearch, loading }) {
  const [input, setInput] = useState('')

  const handleSearch = () => {
    if (input.trim()) {
      onSearch(input)
      setInput('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="search-container">
      <div className="search-input-group">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search for a city..."
          disabled={loading}
          className="search-input"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="search-button"
        >
          {loading ? (
            <span className="loading-spinner">⏳</span>
          ) : (
            <span>Search</span>
          )}
        </button>
      </div>
    </div>
  )
}

export default SearchBar
