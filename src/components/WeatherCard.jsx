import '../styles/WeatherCard.css'
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useSpring, animated } from 'react-spring'
import WeatherIcon from './WeatherIcon'
import { MapPin, Calendar, Clock, ChevronLeft, ChevronRight, Wind } from 'lucide-react'

function WeatherCard({ weather, forecast, hourly }) {
  const { location, current } = weather
  const [dayName, setDayName] = useState('')
  const [isNight, setIsNight] = useState(false)
  const hourlyScrollRef = useRef(null)

  useEffect(() => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    setDayName(days[new Date().getDay()])

    const hour = new Date().getHours()
    setIsNight(hour > 18 || hour < 6)
  }, [weather])

  const temp = Math.round(current.temperature)
  const feelsLike = Math.round(
    current.apparentTemperature ?? current.apparent_temperature ?? current.temperature
  )

  // React Spring animation for temperature count-up
  const tempAnimation = useSpring({
    from: { number: 0 },
    to: { number: temp },
    config: { duration: 1200 },
  })

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const day = date.toLocaleDateString('en-US', { weekday: 'short' })
    const month = date.getDate()
    return `${day} ${month}`
  }

  const formatHourShort = (isoString) => {
    try {
      const date = new Date(isoString)
      let hours = date.getHours()
      const ampm = hours >= 12 ? 'PM' : 'AM'
      hours = hours % 12
      hours = hours ? hours : 12
      return `${hours} ${ampm}`
    } catch (e) {
      return isoString
    }
  }

  // Framer Motion animation definitions
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  const scrollHourly = (direction) => {
    if (hourlyScrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300
      hourlyScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <motion.div
      className={`weather-card-3d ${isNight ? 'night' : 'day'}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* 1. CURRENT BRIEF HERO SECTION */}
      <div className="weather-card-content">
        {/* Left Side: Location & Visual Info */}
        <div className="weather-left">
          <div className="location-header">
            <MapPin className="pin-icon" size={18} />
            <span className="location-name">{location.name}</span>
            {location.country && <span className="location-country">, {location.country}</span>}
          </div>

          <div className="time-header">
            <Calendar size={14} />
            <span className="day-name">{dayName}</span>
          </div>

          <div className="weather-description-badge">
            Current Conditions
          </div>
        </div>

        {/* Center Side: Stunning Custom SVG Icon */}
        <div className="weather-center">
          <div className="hero-weather-icon">
            <WeatherIcon code={current.weathercode} size={150} animated={true} />
          </div>
        </div>

        {/* Right Side: Temperature and Apparent */}
        <div className="weather-right">
          <div className="temp-display">
            <animated.span className="temp-value">
              {tempAnimation.number.to((n) => Math.round(n) + '°')}
            </animated.span>
            <span className="temp-unit">C</span>
          </div>
          <div className="feels-like-display">
            Feels like <span className="feels-temp">{feelsLike}°C</span>
          </div>
        </div>
      </div>

      {/* 2. 24-HOUR HOURLY SWIPE SLIDER */}
      {hourly && hourly.length > 0 && (
        <div className="hourly-forecast-section">
          <div className="section-header">
            <h3 className="section-title"><Clock size={16} /> 24-Hour Forecast</h3>
            <div className="slider-nav-buttons">
              <button className="slider-arrow" onClick={() => scrollHourly('left')}><ChevronLeft size={16} /></button>
              <button className="slider-arrow" onClick={() => scrollHourly('right')}><ChevronRight size={16} /></button>
            </div>
          </div>

          <div className="hourly-scroll-container" ref={hourlyScrollRef}>
            {hourly.map((hourItem, idx) => (
              <motion.div
                key={idx}
                className="hourly-forecast-card"
                whileHover={{ y: -4, borderColor: 'rgba(255, 255, 255, 0.45)', boxShadow: '0 8px 24px rgba(77, 166, 214, 0.15)' }}
              >
                <span className="hourly-time">{formatHourShort(hourItem.time)}</span>
                <div className="hourly-icon-wrapper">
                  <WeatherIcon code={hourItem.weathercode} size={36} animated={true} />
                </div>
                <span className="hourly-temp">{hourItem.temp}°</span>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* 3. PREMIUM METRICS GRID DASHBOARD */}
      <div className="dashboard-metrics-grid">
        {/* Humidity radial visual card */}
        <HumidityGauge value={current.humidity ?? 55} />

        {/* Wind card with responsive spinning turbine */}
        <WindCard speed={current.windspeed ?? 12} />

        {/* Real vs Apparent Temperature Compare card */}
        <ApparentCard real={temp} apparent={feelsLike} />

        {/* Air Pressure gauge-fill card */}
        <PressureCard value={current.pressure ?? 1013} />

        {/* UV Index card */}
        <UVIndexCard value={current.uvIndex ?? 3} />
      </div>

      {/* 4. 5-DAY FORECAST GRAPHIC CARDS */}
      {forecast && forecast.length > 0 && (
        <div className="forecast-section">
          <h3 className="forecast-title"><Calendar size={18} /> 5-Day Outlook</h3>
          <div className="forecast-grid">
            {forecast.map((day, index) => (
              <motion.div
                key={index}
                className="forecast-item"
                whileHover={{ y: -6, boxShadow: '0 12px 30px rgba(0, 0, 0, 0.15)' }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="forecast-date">{formatDate(day.date)}</div>
                <div className="forecast-emoji">
                  <WeatherIcon code={day.weathercode} size={42} animated={true} />
                </div>
                <div className="forecast-temp">
                  <span className="forecast-high">{day.maxTemp}°</span>
                  <span className="forecast-low">{day.minTemp}°</span>
                </div>
                <div className="forecast-rain">
                  <span className="rain-chance-indicator" style={{ background: `linear-gradient(90deg, #4da6d6 ${day.rainChance}%, rgba(255,255,255,0.15) ${day.rainChance}%)` }}></span>
                  💧 {day.rainChance}%
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )
}

/* Metric Dashboards Subcomponents */
function HumidityGauge({ value }) {
  const radius = 28
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (value / 100) * circumference

  return (
    <div className="detail-card humidity-card">
      <div className="card-label">Humidity</div>
      <div className="gauge-container">
        <svg width="74" height="74" className="radial-gauge">
          <circle
            cx="37"
            cy="37"
            r={radius}
            className="gauge-bg"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="5.5"
            fill="none"
          />
          <circle
            cx="37"
            cy="37"
            r={radius}
            className="gauge-progress"
            stroke="url(#humidityGrad)"
            strokeWidth="5.5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="none"
          />
          <defs>
            <linearGradient id="humidityGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4fc3f7" />
              <stop offset="100%" stopColor="#66bb6a" />
            </linearGradient>
          </defs>
        </svg>
        <span className="gauge-value">{value}%</span>
      </div>
      <div className="card-desc">The air is {value > 65 ? 'humid & heavy' : value < 30 ? 'exceptionally dry' : 'perfectly balanced'}.</div>
    </div>
  )
}

function WindCard({ speed }) {
  return (
    <div className="detail-card wind-card">
      <div className="card-label"><Wind size={14} style={{ marginRight: 4, display: 'inline' }} /> Wind Speed</div>
      <div className="wind-visual">
        <div className="propeller-container">
          <svg viewBox="0 0 24 24" className="propeller animate-spin-wind" style={{ animationDuration: `${Math.max(1.5, 30 / Math.max(speed, 1))}s` }}>
            <circle cx="12" cy="12" r="1.5" fill="currentColor" />
            <path d="M12 12c0-3 1.2-5 0-5s-1.2 2 0 5z" fill="currentColor" />
            <path d="M12 12c3 0 5 1.2 5 0s-2-1.2-5 0z" fill="currentColor" />
            <path d="M12 12c0 3-1.2 5 0 5s1.2-2 0-5z" fill="currentColor" />
            <path d="M12 12c-3 0-5-1.2-5 0s2 1.2 5 0z" fill="currentColor" />
          </svg>
        </div>
        <div className="wind-metrics">
          <span className="wind-value">{speed}</span>
          <span className="wind-unit">km/h</span>
        </div>
      </div>
      <div className="card-desc">{speed > 25 ? 'Strong gusts blowing' : speed > 12 ? 'Moderate fresh air' : 'Calm, gentle air'}.</div>
    </div>
  )
}

function ApparentCard({ real, apparent }) {
  const diff = apparent - real
  return (
    <div className="detail-card apparent-card">
      <div className="card-label">Apparent Temp</div>
      <div className="apparent-comparison">
        <span className="apparent-value">{apparent}°C</span>
        <span className={`apparent-diff ${diff > 0 ? 'warmer' : diff < 0 ? 'cooler' : 'same'}`}>
          {diff === 0 ? 'Same as real' : diff > 0 ? `+${diff}° warmer` : `${diff}° cooler`}
        </span>
      </div>
      <div className="temp-comparison-bar">
        <div className="progress-labels">
          <span>Actual: {real}°C</span>
          <span>Apparent: {apparent}°C</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${Math.min(Math.max(((apparent + 10) / 50) * 100, 10), 100)}%` }}></div>
        </div>
      </div>
    </div>
  )
}

function PressureCard({ value }) {
  return (
    <div className="detail-card pressure-card">
      <div className="card-label">Barometer</div>
      <div className="pressure-value-wrapper">
        <span className="pressure-value">{value}</span>
        <span className="pressure-unit">hPa</span>
      </div>
      <div className="pressure-gauge-bar">
        <div className="pressure-gauge-fill" style={{ width: `${Math.min(Math.max((value - 960) / 80 * 100, 10), 100)}%` }}></div>
      </div>
      <div className="card-desc">{value > 1018 ? 'High pressure stability' : value < 1006 ? 'Stormy low pressure' : 'Balanced atmosphere'}.</div>
    </div>
  )
}

function UVIndexCard({ value }) {
  const getUVLabel = (uv) => {
    if (uv <= 2) return { text: 'Low', class: 'uv-low' }
    if (uv <= 5) return { text: 'Mod', class: 'uv-mod' }
    if (uv <= 7) return { text: 'High', class: 'uv-high' }
    return { text: 'Very High', class: 'uv-vhigh' }
  }
  const uvInfo = getUVLabel(value)
  return (
    <div className="detail-card uv-card">
      <div className="card-label">UV Index</div>
      <div className="uv-value-wrapper">
        <span className="uv-value">{value}</span>
        <span className={`uv-badge ${uvInfo.class}`}>{uvInfo.text}</span>
      </div>
      <div className="uv-gauge-bar">
        <div className="uv-gauge-fill" style={{ width: `${(value / 11) * 100}%` }}></div>
      </div>
      <div className="card-desc">{value > 5 ? 'Sunscreen is recommended' : 'Low risk of sun damage'}.</div>
    </div>
  )
}

export default WeatherCard