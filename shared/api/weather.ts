import axios from "axios"

const API_KEY = "d4aa0904849d039f64c416c30f677c73"
const BASE_URL = "https://api.openweathermap.org/data/2.5"

// API_KEY mavjudligini tekshirish endi har bir funksiya ichida amalga oshiriladi.
// Yuqori darajadagi console.error olib tashlandi.

export interface WeatherData {
  id: number
  name: string
  country: string
  coord: {
    lat: number
    lon: number
  }
  weather: Array<{
    id: number
    main: string
    description: string
    icon: string
  }>
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
  }
  wind: {
    speed: number
    deg: number
  }
  visibility: number
  dt: number
  sys: {
    country: string
    sunrise: number
    sunset: number
  }
}

export interface ForecastData {
  list: Array<{
    dt: number
    main: {
      temp: number
      feels_like: number
      temp_min: number
      temp_max: number
      pressure: number
      humidity: number
    }
    weather: Array<{
      id: number
      main: string
      description: string
      icon: string
    }>
    wind: {
      speed: number
      deg: number
    }
    dt_txt: string
  }>
  city: {
    id: number
    name: string
    country: string
    coord: {
      lat: number
      lon: number
    }
  }
}

export const weatherApi = {
  getCurrentWeather: async (city: string): Promise<WeatherData> => {
    if (!API_KEY) throw new Error("OpenWeatherMap API kaliti o'rnatilmagan. Iltimos, .env.local faylini tekshiring.")
    const response = await axios.get(`${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`)
    return response.data
  },

  getCurrentWeatherByCoords: async (lat: number, lon: number): Promise<WeatherData> => {
    if (!API_KEY) throw new Error("OpenWeatherMap API kaliti o'rnatilmagan. Iltimos, .env.local faylini tekshiring.")
    const response = await axios.get(`${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    return response.data
  },

  getForecast: async (city: string): Promise<ForecastData> => {
    if (!API_KEY) throw new Error("OpenWeatherMap API kaliti o'rnatilmagan. Iltimos, .env.local faylini tekshiring.")
    const response = await axios.get(`${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`)
    return response.data
  },

  getForecastByCoords: async (lat: number, lon: number): Promise<ForecastData> => {
    if (!API_KEY) throw new Error("OpenWeatherMap API kaliti o'rnatilmagan. Iltimos, .env.local faylini tekshiring.")
    const response = await axios.get(`${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    return response.data
  },
}
