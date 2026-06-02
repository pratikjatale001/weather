import { useState } from 'react'
import './App.css'
import HomePage from './components/HomePage'
import WeatherCard from './components/WeatherCard'
import { getWeatherData, getWeatherDataByCoords } from './utils/weatherAPI'
import { motion, AnimatePresence } from 'framer-motion'

function App() {
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [hourlyForecast, setHourlyForecast] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const searchWeather = async (searchCity) => {
    if (!searchCity.trim()) return

    setLoading(true)
    setError('')
    setWeather(null)
    setForecast(null)
    setHourlyForecast(null)

    try {
      const data = await getWeatherData(searchCity)
      setWeather(data.current)
      setForecast(data.forecast)
      setHourlyForecast(data.hourly)
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data')
      setWeather(null)
      setForecast(null)
      setHourlyForecast(null)
    } finally {
      setLoading(false)
    }
  }

  const searchWeatherByCoords = async (latitude, longitude) => {
    setLoading(true)
    setError('')
    setWeather(null)
    setForecast(null)
    setHourlyForecast(null)

    try {
      const data = await getWeatherDataByCoords(latitude, longitude)
      setWeather(data.current)
      setForecast(data.forecast)
      setHourlyForecast(data.hourly)
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data from your location')
      setWeather(null)
      setForecast(null)
      setHourlyForecast(null)
    } finally {
      setLoading(false)
    }
  }

  const getWeatherClass = (code) => {
    if (code === undefined || code === null) return 'weather-default'
    if (code === 0) return 'weather-clear'
    if (code === 1 || code === 2) return 'weather-partly-cloudy'
    if (code === 3 || code === 45 || code === 48) return 'weather-cloudy'
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return 'weather-rainy'
    if ([71, 73, 75, 77, 85, 86].includes(code)) return 'weather-snowy'
    if ([95, 96, 99].includes(code)) return 'weather-stormy'
    return 'weather-default'
  }

  const activeWeatherCode = weather?.current?.weathercode ?? null
  const bgClass = getWeatherClass(activeWeatherCode)

  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3, ease: 'easeIn' },
    },
  }

  const errorVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.2 },
    },
  }

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  }

  return (
    <div className={`app-container ${bgClass}`}>
      {/* Visual floating atmospheric ambient overlays depending on the weather */}
      {activeWeatherCode !== null && (
        <div className="weather-ambient-overlay">
          {bgClass === 'weather-rainy' && <div className="ambient-rain-layer"></div>}
          {bgClass === 'weather-snowy' && <div className="ambient-snow-layer"></div>}
          {bgClass === 'weather-stormy' && <div className="ambient-storm-layer"></div>}
          {bgClass === 'weather-clear' && <div className="ambient-clear-layer"></div>}
        </div>
      )}
      
      <div className="app-wrapper">
        <AnimatePresence mode="wait">
          {/* Show HomePage if no weather data */}
          {!weather && !error && (
            <motion.div
              key="home"
              variants={pageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <header className="app-header"></header>
              <HomePage
                onSearch={searchWeather}
                onSearchCoords={searchWeatherByCoords}
                loading={loading}
              />
            </motion.div>
          )}

          {/* Show error message */}
          {error && (
            <motion.div
              key="error"
              className="error-container"
              variants={errorVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.div
                className="error-message"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                {error}
              </motion.div>
              <motion.button
                onClick={() => setError('')}
                className="back-button"
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
              >
                ← Try Another Search
              </motion.button>
            </motion.div>
          )}

          {/* Show weather data */}
          {weather && (
            <motion.div
              key="weather"
              className="results-container"
              variants={pageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.button
                onClick={() => {
                  setWeather(null)
                  setForecast(null)
                  setHourlyForecast(null)
                  setError('')
                }}
                className="back-button"
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
              >
                ← New Search
              </motion.button>
              <WeatherCard
                weather={weather}
                forecast={forecast}
                hourly={hourlyForecast}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default App
