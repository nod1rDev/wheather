"use client"

import { useQuery } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { Calendar, Cloud, Droplets, Wind, Thermometer } from "lucide-react"
import { weatherApi } from "@/shared/api/weather"
import { useLocalStorage } from "@/shared/hooks/use-local-storage"
import { Sidebar } from "@/widgets/sidebar/ui/sidebar"
import { Navigation } from "@/widgets/navigation/ui/navigation"
import { LoadingSpinner } from "@/shared/ui/loading-spinner"
import { ErrorMessage } from "@/shared/ui/error-message"
import { formatDate, formatTemperature, getWeatherIcon, capitalizeFirst } from "@/shared/lib/utils"

export function ForecastPage() {
  const [defaultCity] = useLocalStorage("defaultCity", "London")

  const {
    data: forecast,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["forecast", defaultCity],
    queryFn: () => weatherApi.getForecast(defaultCity),
    retry: 1,
  })

  // Group forecast data by day
  const dailyForecast =
    forecast?.list.reduce(
      (acc, item) => {
        const date = new Date(item.dt * 1000).toDateString()
        if (!acc[date]) {
          acc[date] = []
        }
        acc[date].push(item)
        return acc
      },
      {} as Record<string, typeof forecast.list>,
    ) || {}

  // Get daily summary
  const dailySummary = Object.entries(dailyForecast)
    .map(([date, items]) => {
      const noonItem =
        items.find((item) => {
          const hour = new Date(item.dt * 1000).getHours()
          return hour >= 11 && hour <= 13
        }) || items[Math.floor(items.length / 2)]

      const temps = items.map((item) => item.main.temp)
      const minTemp = Math.min(...temps)
      const maxTemp = Math.max(...temps)

      return {
        date: new Date(date),
        timestamp: noonItem.dt,
        weather: noonItem.weather[0],
        temp: noonItem.main.temp,
        minTemp,
        maxTemp,
        humidity: noonItem.main.humidity,
        windSpeed: noonItem.wind.speed,
        pressure: noonItem.main.pressure,
        items: items,
      }
    })
    .slice(0, 7)

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col lg:ml-0">
        <main className="flex-1 p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8 overflow-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 lg:mb-8"
          >
            <div className="flex items-center space-x-3 lg:space-x-4 mb-4 lg:mb-6">
              <div className="p-2.5 lg:p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl lg:rounded-2xl shadow-lg flex-shrink-0">
                <Calendar className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
              </div>
              <div className="min-w-0">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 dark:text-white truncate">
                  7-Day Forecast
                </h1>
                <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 truncate">
                  {forecast?.city.name}, {forecast?.city.country}
                </p>
              </div>
            </div>
          </motion.div>

          {isLoading ? (
            <div className="flex flex-col justify-center items-center h-64 sm:h-80 lg:h-96">
              <LoadingSpinner size="lg" />
              <p className="mt-4 text-sm sm:text-base text-gray-600 dark:text-gray-400">Loading forecast data...</p>
            </div>
          ) : error ? (
            <ErrorMessage
              message={error instanceof Error ? error.message : "Failed to fetch forecast data"}
              onRetry={() => refetch()}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 lg:gap-6">
              {dailySummary.map((day, index) => (
                <motion.div
                  key={day.timestamp}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="group"
                >
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl lg:rounded-3xl p-4 lg:p-6 shadow-xl border border-white/20 dark:border-gray-700/20 hover:shadow-2xl transition-all duration-300 h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4 lg:mb-6">
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white truncate">
                          {formatDate(day.timestamp)}
                        </h3>
                        <p className="text-sm lg:text-base text-gray-600 dark:text-gray-400 capitalize truncate">
                          {capitalizeFirst(day.weather.description)}
                        </p>
                      </div>
                      <motion.div whileHover={{ rotate: 5, scale: 1.1 }} className="relative flex-shrink-0">
                        <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-blue-500 rounded-xl lg:rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                        <div className="relative bg-gradient-to-br from-sky-100 to-blue-100 dark:from-sky-900/30 dark:to-blue-900/30 p-2.5 lg:p-3 rounded-xl lg:rounded-2xl">
                          <img
                            src={getWeatherIcon(day.weather.icon) || "/placeholder.svg"}
                            alt={day.weather.description}
                            className="w-10 h-10 lg:w-12 lg:h-12"
                          />
                        </div>
                      </motion.div>
                    </div>

                    {/* Temperature */}
                    <div className="text-center mb-4 lg:mb-6">
                      <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent mb-2">
                        {formatTemperature(day.temp)}
                      </div>
                      <div className="text-sm lg:text-base text-gray-500 dark:text-gray-400">
                        {formatTemperature(day.minTemp)} / {formatTemperature(day.maxTemp)}
                      </div>
                    </div>

                    {/* Weather Details */}
                    <div className="grid grid-cols-2 gap-2 lg:gap-4 mb-4">
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg lg:rounded-xl p-2.5 lg:p-3">
                        <div className="flex items-center space-x-2 mb-1">
                          <Droplets className="w-3 h-3 lg:w-4 lg:h-4 text-blue-500 flex-shrink-0" />
                          <span className="text-xs lg:text-sm text-gray-600 dark:text-gray-400 truncate">Humidity</span>
                        </div>
                        <div className="text-sm lg:text-base font-bold text-gray-900 dark:text-white">
                          {day.humidity}%
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg lg:rounded-xl p-2.5 lg:p-3">
                        <div className="flex items-center space-x-2 mb-1">
                          <Wind className="w-3 h-3 lg:w-4 lg:h-4 text-green-500 flex-shrink-0" />
                          <span className="text-xs lg:text-sm text-gray-600 dark:text-gray-400 truncate">Wind</span>
                        </div>
                        <div className="text-sm lg:text-base font-bold text-gray-900 dark:text-white">
                          {day.windSpeed} m/s
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg lg:rounded-xl p-2.5 lg:p-3">
                        <div className="flex items-center space-x-2 mb-1">
                          <Thermometer className="w-3 h-3 lg:w-4 lg:h-4 text-purple-500 flex-shrink-0" />
                          <span className="text-xs lg:text-sm text-gray-600 dark:text-gray-400 truncate">Pressure</span>
                        </div>
                        <div className="text-sm lg:text-base font-bold text-gray-900 dark:text-white">
                          {day.pressure} hPa
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-lg lg:rounded-xl p-2.5 lg:p-3">
                        <div className="flex items-center space-x-2 mb-1">
                          <Cloud className="w-3 h-3 lg:w-4 lg:h-4 text-orange-500 flex-shrink-0" />
                          <span className="text-xs lg:text-sm text-gray-600 dark:text-gray-400 truncate">
                            Condition
                          </span>
                        </div>
                        <div className="text-xs lg:text-sm font-bold text-gray-900 dark:text-white truncate">
                          {day.weather.main}
                        </div>
                      </div>
                    </div>

                    {/* Hourly Preview */}
                    <div className="pt-3 lg:pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500 dark:text-gray-400">Hourly</span>
                        <div className="flex space-x-1 lg:space-x-2">
                          {day.items.slice(0, 4).map((hour, idx) => (
                            <div key={idx} className="text-center">
                              <div className="text-xs text-gray-400 mb-1">{new Date(hour.dt * 1000).getHours()}:00</div>
                              <div className="text-xs font-medium text-gray-900 dark:text-white">
                                {Math.round(hour.main.temp)}°
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </main>

        <Navigation />
      </div>
    </div>
  )
}
