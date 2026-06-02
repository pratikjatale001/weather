import '../styles/WeatherCard.css'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useSpring, animated } from 'react-spring'

const weatherCodeMap = {
  0: '☀️',
  1: '🌤️',
  2: '⛅',
  3: '☁️',
  45: '🌫️',
  48: '🌫️',
  51: '🌧️',
  53: '🌧️',
  55: '🌧️',
  61: '🌧️',
  63: '🌧️',
  65: '🌧️',
  71: '❄️',
  73: '❄️',
  75: '❄️',
  77: '❄️',
  80: '🌧️',
  81: '🌧️',
  82: '🌧️',
  85: '❄️',
  86: '❄️',
  95: '⛈️',
  96: '⛈️',
  99: '⛈️',
}

function WeatherCard({ weather, forecast }) {
  const { location, current } = weather
  const emoji = weatherCodeMap[current.weathercode] || '🌤️'

  const [dayName, setDayName] = useState('')
  const [isNight, setIsNight] = useState(false)

  useEffect(() => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    setDayName(days[new Date().getDay()])

    const hour = new Date().getHours()
    setIsNight(hour > 18 || hour < 6)
  }, [])

  const temp = Math.round(current.temperature)
  const feelsLike = Math.round(
    current.apparent_temperature ?? current.temperature
  )

  // React Spring animation for temperature
  const tempAnimation = useSpring({
    from: { number: 0 },
    to: { number: temp },
    config: { duration: 1500 },
  })

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const day = date.toLocaleDateString('en-US', { weekday: 'short' })
    const month = date.getDate()
    return `${day} ${month}`
  }

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.2,
        duration: 0.5,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
      },
    }),
  }

  const emojiVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: {
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        delay: 0.3,
      },
    },
    hover: {
      scale: 1.1,
      transition: { duration: 0.3 },
    },
  }

  const forecastVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.08,
        duration: 0.4,
        ease: 'easeOut',
      },
    }),
  }

  const forecastHover = {
    scale: 1.05,
    y: -8,
    transition: { duration: 0.3 },
  }

  return (
    <motion.div
      className={`weather-card-3d ${isNight ? 'night' : 'day'}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ boxShadow: '0 25px 70px rgba(77, 166, 214, 0.35)' }}
    >
      {/* CURRENT WEATHER SECTION */}
      <motion.div className="weather-card-content" variants={contentVariants}>
        {/* LEFT */}
        <motion.div className="weather-left" custom={0} variants={itemVariants}>
          <motion.div className="location-header" whileHover={{ x: 5 }}>
            📍 <span className="location-name">{location.name}</span>
          </motion.div>

          <motion.div
            className="day-name"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {dayName}
          </motion.div>

          <div className="weather-conditions">
            {[
              { icon: '💧', value: `${current.humidity ?? 'N/A'}%`, label: 'Humidity' },
              { icon: '💨', value: `${current.windspeed} km/h`, label: 'Wind' },
              { icon: '⊙', value: '1013 hPa', label: 'Pressure' },
            ].map((condition, i) => (
              <motion.div
                key={i}
                className="condition-item"
                custom={i + 1}
                variants={itemVariants}
                whileHover={{ x: 8, color: '#4da6d6' }}
              >
                {condition.icon} {condition.value}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CENTER */}
        <motion.div className="weather-center" variants={contentVariants}>
          <motion.div className="weather-icon-3d" variants={emojiVariants} initial="initial" animate="animate" whileHover="hover">
            <motion.span
              className="main-emoji"
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              {emoji}
            </motion.span>
            <motion.span
              className="secondary-emoji"
              animate={{ x: [0, 10, 0], y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              ☁️
            </motion.span>
          </motion.div>
        </motion.div>

        {/* RIGHT */}
        <motion.div className="weather-right" custom={4} variants={itemVariants}>
          <motion.div
            className="temp-display"
            whileHover={{ scale: 1.05, boxShadow: '0 15px 40px rgba(77, 166, 214, 0.3)' }}
            transition={{ duration: 0.3 }}
          >
            <animated.span className="temp-value">
              {tempAnimation.number.to((n) => Math.round(n) + '°C')}
            </animated.span>
          </motion.div>
          <motion.div
            className="feels-like-display"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            whileHover={{ color: '#4da6d6' }}
          >
            Feels like {feelsLike}°C
          </motion.div>
        </motion.div>
      </motion.div>

      {/* 5-DAY FORECAST SECTION */}
      {forecast && forecast.length > 0 && (
        <motion.div
          className="forecast-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <motion.h3
            className="forecast-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            5-Day Forecast
          </motion.h3>
          <div className="forecast-grid">
            {forecast.map((day, index) => {
              const dayEmoji = weatherCodeMap[day.weathercode] || '🌤️'
              return (
                <motion.div
                  key={index}
                  className="forecast-item"
                  custom={index}
                  variants={forecastVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={forecastHover}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className="forecast-date"
                    whileHover={{ color: '#4da6d6' }}
                  >
                    {formatDate(day.date)}
                  </motion.div>
                  <motion.div
                    className="forecast-emoji"
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: index * 0.1 }}
                    whileHover={{ scale: 1.2 }}
                  >
                    {dayEmoji}
                  </motion.div>
                  <motion.div className="forecast-temp">
                    <motion.span
                      className="forecast-high"
                      whileHover={{ fontSize: '1.1em' }}
                    >
                      {day.maxTemp}°
                    </motion.span>
                    <span className="forecast-low">{day.minTemp}°</span>
                  </motion.div>
                  <motion.div
                    className="forecast-rain"
                    whileHover={{ scale: 1.1 }}
                  >
                    💧 {day.rainChance}%
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      )}
    </motion.div>
  )
        
}

export default WeatherCard