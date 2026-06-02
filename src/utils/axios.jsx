import axios from 'axios'

// Using Open-Meteo API (free, no API key required)
const API_BASE_URL = 'https://api.open-meteo.com/v1'

const weatherAPI = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add response interceptor
weatherAPI.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    console.error('API Error:', error.response?.status, error.response?.data)
    if (error.response?.status === 400) {
      throw new Error('Invalid city or location not found')
    }
    throw new Error(error.response?.data?.error?.message || 'Failed to fetch weather data')
  }
)

export default weatherAPI
