import '../styles/ForecastStrip.css'

const weatherCodeMap = {
  0: '☀️ Clear sky',
  1: '🌤️ Mainly clear',
  2: '⛅ Partly cloudy',
  3: '☁️ Overcast',
  45: '🌫️ Foggy',
  48: '🌫️ Depositing rime fog',
  51: '🌧️ Light drizzle',
  53: '🌧️ Moderate drizzle',
  55: '🌧️ Dense drizzle',
  61: '🌧️ Slight rain',
  63: '🌧️ Moderate rain',
  65: '🌧️ Heavy rain',
  71: '❄️ Slight snow',
  73: '❄️ Moderate snow',
  75: '❄️ Heavy snow',
  77: '❄️ Snow grains',
  80: '🌧️ Rain showers',
  81: '🌧️ Rain showers',
  82: '🌧️ Violent rain showers',
  85: '❄️ Snow showers',
  86: '❄️ Snow showers',
  95: '⛈️ Thunderstorm',
  96: '⛈️ Thunderstorm with hail',
  99: '⛈️ Thunderstorm with hail',
}

function ForecastStrip({ forecast }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const day = date.toLocaleDateString('en-US', { weekday: 'short' })
    const month = date.getDate()
    return `${day} ${month}`
  }

  const getWeatherInfo = (code) => {
    return weatherCodeMap[code] || '🌤️ Clear sky'
  }

  return (
    <div className="forecast-container">
      <h3 className="forecast-title">5-Day Forecast</h3>
      <div className="forecast-strip">
        {forecast.map((day, index) => {
          const [emoji, ...descParts] = getWeatherInfo(day.weathercode).split(' ')
          const description = descParts.join(' ')
          return (
            <div key={index} className="forecast-card">
              <div className="forecast-date">{formatDate(day.date)}</div>
              <div className="forecast-emoji">{emoji}</div>
              <div className="forecast-condition">{description}</div>
              <div className="forecast-temps">
                <div className="forecast-max-temp">
                  <span className="temp-label">H:</span>
                  <span>{day.maxTemp}°</span>
                </div>
                <div className="forecast-min-temp">
                  <span className="temp-label">L:</span>
                  <span>{day.minTemp}°</span>
                </div>
              </div>
              <div className="forecast-rain">💧 {day.rainChance}%</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ForecastStrip
