import axios from 'axios'

const geocodeCity = async (city) => {
  try {
    const response = await axios.get('https://geocoding-api.open-meteo.com/v1/search', {
      params: {
        name: city,
        count: 1,
        language: 'en',
        format: 'json',
      },
    })

    if (!response.data.results || response.data.results.length === 0) {
      throw new Error(`City "${city}" not found`)
    }

    const location = response.data.results[0]
    return {
      latitude: location.latitude,
      longitude: location.longitude,
      name: location.name,
      country: location.country,
      timezone: location.timezone,
    }
  } catch (error) {
    throw new Error(`Failed to find city: ${error.message}`)
  }
}

const fetchRawWeather = async (location, days = 5) => {
  const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
    params: {
      latitude: location.latitude,
      longitude: location.longitude,
      timezone: location.timezone,
      current_weather: true,
      hourly: 'apparent_temperature,relativehumidity_2m',
      daily: 'weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max',
      forecast_days: days,
    },
  })

  return response.data
}

export const  getWeatherData = async (city) => {
  try {
    const location = await geocodeCity(city)
    const rawWeather = await fetchRawWeather(location)

    const currentWeather = rawWeather.current_weather
    const hourIndex = rawWeather.hourly.time.indexOf(currentWeather.time)

    const current = {
      temperature: Math.round(currentWeather.temperature),
      windspeed: Math.round(currentWeather.windspeed),
      weathercode: currentWeather.weathercode,
      time: currentWeather.time,
      apparentTemperature:
        hourIndex >= 0 ? Math.round(rawWeather.hourly.apparent_temperature[hourIndex]) : null,
      humidity:
        hourIndex >= 0 ? rawWeather.hourly.relativehumidity_2m[hourIndex] : null,
    }

    const forecast = rawWeather.daily.time.map((date, index) => ({
      date,
      weathercode: rawWeather.daily.weathercode[index],
      maxTemp: Math.round(rawWeather.daily.temperature_2m_max[index]),
      minTemp: Math.round(rawWeather.daily.temperature_2m_min[index]),
      rainChance: rawWeather.daily.precipitation_probability_max[index],
    }))

    return {
      current: {
        location,
        current,
      },
      forecast,
    }
  } catch (error) {
    throw error
  }
}
