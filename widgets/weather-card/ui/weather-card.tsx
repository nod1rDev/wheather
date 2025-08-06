"use client"

import { motion } from "framer-motion"
import { MapPin, Thermometer, Droplets, Wind, Eye, Sunrise, Sunset } from "lucide-react"
import type { WeatherData } from "@/shared/api/weather"
import { formatTemperature, formatTime, getWeatherIcon, capitalizeFirst } from "@/shared/lib/utils"

interface WeatherCardProps {
  weather: WeatherData
}

export function WeatherCard({ weather }: WeatherCardProps) {
  const getGradientByWeather = (weatherMain: string) => {
    switch (weatherMain.toLowerCase()) {
      case "clear":
        return "from-yellow-400 via-orange-400 to-red-400"
      case "clouds":
        return "from-gray-400 via-gray-500 to-gray-600"
      case "rain":
        return "from-blue-500 via-blue-600 to-indigo-600"
      case "snow":
        return "from-blue-200 via-blue-300 to-blue-400"
      case "thunderstorm":
        return "from-purple-600 via-purple-700 to-indigo-800"
      default:
        return "from-sky-400 via-sky-500 to-sky-600"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative overflow-hidden"
    >
      {/* Main Weather Card */}
      <div
        className={`bg-gradient-to-br ${getGradientByWeather(weather.weather[0].main)} rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden`}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full translate-x-20 translate-y-20"></div>
        </div>

        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-8 relative z-10"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">
                {weather.name}, {weather.sys.country}
              </h2>
              <p className="text-white/80 text-sm">{formatTime(weather.dt)}</p>
            </div>
          </div>
        </motion.div>

        {/* Main Temperature Display */}
        <motion.div
          className="flex items-center justify-between mb-8 relative z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div>
            <div className="text-6xl md:text-7xl font-bold mb-2 leading-none">
              {formatTemperature(weather.main.temp)}
            </div>
            <div className="text-xl mb-2 capitalize font-medium">{capitalizeFirst(weather.weather[0].description)}</div>
            <div className="text-white/90 text-lg">Feels like {formatTemperature(weather.main.feels_like)}</div>
          </div>
          <motion.div
            initial={{ opacity: 0, rotate: -10 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-right"
          >
            <img
              src={getWeatherIcon(weather.weather[0].icon) || "/placeholder.svg"}
              alt={weather.weather[0].description}
              className="w-24 h-24 md:w-32 md:h-32 drop-shadow-lg"
            />
            <div className="text-white/90 text-sm mt-2">
              {formatTemperature(weather.main.temp_min)} / {formatTemperature(weather.main.temp_max)}
            </div>
          </motion.div>
        </motion.div>

        {/* Weather Details Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {[
            { icon: Thermometer, label: "Pressure", value: `${weather.main.pressure} hPa` },
            { icon: Droplets, label: "Humidity", value: `${weather.main.humidity}%` },
            { icon: Wind, label: "Wind Speed", value: `${weather.wind.speed} m/s` },
            { icon: Eye, label: "Visibility", value: `${(weather.visibility / 1000).toFixed(1)} km` },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
            >
              <item.icon className="w-6 h-6 mx-auto mb-2 opacity-90" />
              <div className="text-xs opacity-80 mb-1">{item.label}</div>
              <div className="text-sm font-semibold">{item.value}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Sun Times Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="mt-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full">
              <Sunrise className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Sunrise</p>
              <p className="font-semibold text-gray-900 dark:text-white">{formatTime(weather.sys.sunrise)}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-right">Sunset</p>
              <p className="font-semibold text-gray-900 dark:text-white text-right">{formatTime(weather.sys.sunset)}</p>
            </div>
            <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full">
              <Sunset className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
