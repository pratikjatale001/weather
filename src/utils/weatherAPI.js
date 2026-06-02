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
      timezone: location.timezone || 'auto',
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
      hourly: 'temperature_2m,apparent_temperature,relativehumidity_2m,weathercode,pressure_msl',
      daily: 'weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max,uv_index_max',
      forecast_days: days,
    },
  })

  return response.data
}

const processWeatherData = (location, rawWeather) => {
  const currentWeather = rawWeather.current_weather
  const hourIndex = rawWeather.hourly.time.indexOf(currentWeather.time)

  const current = {
    temperature: Math.round(currentWeather.temperature),
    windspeed: Math.round(currentWeather.windspeed),
    weathercode: currentWeather.weathercode,
    time: currentWeather.time,
    apparentTemperature:
      hourIndex >= 0 ? Math.round(rawWeather.hourly.apparent_temperature[hourIndex]) : Math.round(currentWeather.temperature),
    humidity:
      hourIndex >= 0 ? rawWeather.hourly.relativehumidity_2m[hourIndex] : null,
    pressure:
      hourIndex >= 0 ? Math.round(rawWeather.hourly.pressure_msl[hourIndex]) : 1013,
    uvIndex:
      rawWeather.daily && rawWeather.daily.uv_index_max
        ? rawWeather.daily.uv_index_max[0]
        : 3,
  }

  // Next 24 hours of hourly forecast
  const startIdx = hourIndex >= 0 ? hourIndex : 0
  const hourly = []
  for (let i = startIdx; i < Math.min(startIdx + 24, rawWeather.hourly.time.length); i++) {
    hourly.push({
      time: rawWeather.hourly.time[i],
      temp: Math.round(rawWeather.hourly.temperature_2m[i]),
      weathercode: rawWeather.hourly.weathercode[i],
      apparentTemp: Math.round(rawWeather.hourly.apparent_temperature[i]),
      humidity: rawWeather.hourly.relativehumidity_2m[i],
    })
  }

  const forecast = rawWeather.daily.time.map((date, index) => ({
    date,
    weathercode: rawWeather.daily.weathercode[index],
    maxTemp: Math.round(rawWeather.daily.temperature_2m_max[index]),
    minTemp: Math.round(rawWeather.daily.temperature_2m_min[index]),
    rainChance: rawWeather.daily.precipitation_probability_max[index],
    uvIndex: rawWeather.daily.uv_index_max ? rawWeather.daily.uv_index_max[index] : 3,
  }))

  return {
    current: {
      location,
      current,
    },
    hourly,
    forecast,
  }
}

export const getWeatherData = async (city) => {
  try {
    const location = await geocodeCity(city)
    const rawWeather = await fetchRawWeather(location)
    return processWeatherData(location, rawWeather)
  } catch (error) {
    throw error
  }
}

export const getWeatherDataByCoords = async (latitude, longitude) => {
  try {
    let name = 'Local Weather'
    let country = ''

    // Reverse lookup
    try {
      const response = await axios.get('https://nominatim.openstreetmap.org/reverse', {
        params: {
          lat: latitude,
          lon: longitude,
          format: 'json',
        },
        headers: {
          'Accept-Language': 'en',
        },
        timeout: 4000,
      })
      if (response.data && response.data.address) {
        name = response.data.address.city || response.data.address.town || response.data.address.village || response.data.address.suburb || 'Local Weather'
        country = response.data.address.country || ''
      }
    } catch (e) {
      console.warn('Reverse geocoding failed, using coordinates label', e)
    }

    const location = {
      latitude,
      longitude,
      name,
      country,
      timezone: 'auto',
    }

    const rawWeather = await fetchRawWeather(location)
    return processWeatherData(location, rawWeather)
  } catch (error) {
    throw error
  }
}

