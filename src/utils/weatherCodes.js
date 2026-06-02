// Open-Meteo weather code descriptions
const WEATHER_CODES = {
  0: { desc: 'Clear sky', emoji: '☀️' },
  1: { desc: 'Mainly clear', emoji: '🌤️' },
  2: { desc: 'Partly cloudy', emoji: '⛅' },
  3: { desc: 'Overcast', emoji: '☁️' },
  45: { desc: 'Foggy', emoji: '🌫️' },
  48: { desc: 'Depositing rime fog', emoji: '🌫️' },
  51: { desc: 'Light drizzle', emoji: '🌧️' },
  53: { desc: 'Moderate drizzle', emoji: '🌧️' },
  55: { desc: 'Dense drizzle', emoji: '🌧️' },
  61: { desc: 'Slight rain', emoji: '🌧️' },
  63: { desc: 'Moderate rain', emoji: '🌧️' },
  65: { desc: 'Heavy rain', emoji: '🌧️' },
  71: { desc: 'Slight snow', emoji: '❄️' },
  73: { desc: 'Moderate snow', emoji: '❄️' },
  75: { desc: 'Heavy snow', emoji: '❄️' },
  77: { desc: 'Snow grains', emoji: '❄️' },
  80: { desc: 'Slight rain showers', emoji: '🌧️' },
  81: { desc: 'Moderate rain showers', emoji: '🌧️' },
  82: { desc: 'Violent rain showers', emoji: '🌧️' },
  85: { desc: 'Slight snow showers', emoji: '❄️' },
  86: { desc: 'Heavy snow showers', emoji: '❄️' },
  95: { desc: 'Thunderstorm', emoji: '⛈️' },
  96: { desc: 'Thunderstorm with hail', emoji: '⛈️' },
  99: { desc: 'Thunderstorm with hail', emoji: '⛈️' },
}

export const getWeatherInfo = (code) => {
  return WEATHER_CODES[code] || { desc: 'Unknown', emoji: '🌤️' }
}

export const getWeatherEmoji = (code) => {
  return (WEATHER_CODES[code] || { emoji: '🌤️' }).emoji
}

export const getWeatherDescription = (code) => {
  return (WEATHER_CODES[code] || { desc: 'Unknown' }).desc
}
