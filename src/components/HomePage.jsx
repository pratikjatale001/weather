import React, { useState, useEffect } from 'react'
import '../styles/HomePage.css'
import { motion } from 'framer-motion'
import { MapPin, Navigation, Search, Loader2 } from 'lucide-react'
import WeatherIcon from './WeatherIcon'

const defaultCities = [
  { name: 'Tokyo', code: 0, label: 'Clear' },
  { name: 'London', code: 61, label: 'Rainy' },
  { name: 'New York', code: 2, label: 'Partly Cloudy' },
  { name: 'Paris', code: 3, label: 'Cloudy' },
  { name: 'Sydney', code: 0, label: 'Clear' },
  { name: 'Dubai', code: 0, label: 'Clear' },
]

function HomePage({ onSearch, onSearchCoords, loading }) {
  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  }

  const illustrationVariants = {
    hidden: { opacity: 0, scale: 0.9, rotate: -5 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { duration: 1, ease: 'easeOut', delay: 0.2 },
    },
  }

  return (
    <motion.div
      className="home-page"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="home-content">
        {/* Left Side - Title and Search */}
        <motion.div className="home-left" variants={itemVariants}>
          <div className="home-header">
            <motion.h1
              className="home-title"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              Aether
              <span className="title-suffix">Weather</span>
            </motion.h1>
            <p className="home-subtitle">Experience weather forecasting redefined with stunning glassmorphic dashboards and live interactive metrics.</p>
          </div>

          <div className="search-section">
            <SearchInput
              onSearch={onSearch}
              onSearchCoords={onSearchCoords}
              loading={loading}
            />
          </div>

          {/* Quick Shortcuts */}
          <div className="shortcuts-section">
            <h3 className="shortcuts-title">Explore Popular Cities</h3>
            <div className="city-shortcuts-grid">
              {defaultCities.map((city, idx) => (
                <motion.button
                  key={idx}
                  className="city-shortcut-card"
                  whileHover={{ y: -6, boxShadow: '0 12px 30px rgba(77, 166, 214, 0.18)', borderColor: 'rgba(255, 255, 255, 0.6)' }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onSearch(city.name)}
                  disabled={loading}
                >
                  <div className="shortcut-info">
                    <span className="shortcut-name">{city.name}</span>
                    <span className="shortcut-label">{city.label}</span>
                  </div>
                  <WeatherIcon code={city.code} size={36} animated={true} />
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Side - Premium Illustration */}
        <motion.div
          className="home-right"
          variants={illustrationVariants}
        >
          <WeatherIllustration />
        </motion.div>
      </div>
    </motion.div>
  )
}

function WeatherIllustration() {
  return (
    <div className="premium-illustration-container">
      <div className="glass-backdrop-circle"></div>
      <div className="illustration-showcase">
        {/* Sunny Layer */}
        <div className="showcase-element sun-glow-effect">
          <WeatherIcon code={0} size={150} animated={true} />
        </div>
        {/* Cloud Layers */}
        <div className="showcase-element cloud-1-drift">
          <WeatherIcon code={3} size={130} animated={true} />
        </div>
        {/* Rain Layer */}
        <div className="showcase-element rain-drift">
          <WeatherIcon code={63} size={90} animated={true} />
        </div>
      </div>
      <div className="interactive-badge">
        <Navigation className="badge-icon" />
        <span>Live Atmospheric Feeds</span>
      </div>
    </div>
  )
}

function SearchInput({ onSearch, onSearchCoords, loading }) {
  const [input, setInput] = useState('')
  const [locLoading, setLocLoading] = useState(false)

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

  const handleGeolocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser')
      return
    }

    setLocLoading(true)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        onSearchCoords(latitude, longitude)
        setLocLoading(false)
      },
      (error) => {
        console.error('Error fetching geolocation', error)
        alert('Unable to retrieve your location. Please type in search.')
        setLocLoading(false)
      },
      { enableHighAccuracy: true, timeout: 8000 }
    )
  }

  return (
    <div className="search-input-wrapper">
      <div className="search-box-glass">
        <Search className="search-icon-inside" size={20} />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Enter a city to explore..."
          disabled={loading || locLoading}
          className="home-search-input"
        />
        {(loading || locLoading) && (
          <Loader2 className="search-spinner-inside animate-spin" size={20} />
        )}
      </div>

      <div className="search-actions">
        <motion.button
          onClick={handleSearch}
          disabled={loading || locLoading || !input.trim()}
          className="home-search-button"
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
        >
          Explore
        </motion.button>

        <motion.button
          onClick={handleGeolocation}
          disabled={loading || locLoading}
          className="geolocation-button"
          title="Use current location"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          {locLoading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <MapPin size={20} />
          )}
        </motion.button>
      </div>
    </div>
  )
}

export default HomePage
