"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  MapPin,
  Thermometer,
  Droplets,
  Wind,
  Eye,
  Sunrise,
  Sunset,
  Calendar,
  TrendingUp,
} from "lucide-react";
import { weatherApi } from "@/shared/api/weather";
import { useGeolocation } from "@/shared/hooks/use-geolocation";
import { useLocalStorage } from "@/shared/hooks/use-local-storage";
import { Sidebar } from "@/widgets/sidebar/ui/sidebar";
import { Navigation } from "@/widgets/navigation/ui/navigation";
import { CitySearch } from "@/features/city-search/ui/city-search";
import { LoadingSpinner } from "@/shared/ui/loading-spinner";
import { ErrorMessage } from "@/shared/ui/error-message";
import {
  formatTemperature,
  formatTime,
  formatDate,
  getWeatherIcon,
  capitalizeFirst,
} from "@/shared/lib/utils";

export function MainPage() {
  const [searchCity, setSearchCity] = useState<string>("");
  const [defaultCity] = useLocalStorage("defaultCity", "London");
  const {
    latitude,
    longitude,
    error: geoError,
    loading: geoLoading,
  } = useGeolocation();

  const cityToFetch = searchCity || defaultCity;
  const shouldUseCoords = !searchCity && !geoError && latitude && longitude;

  const {
    data: weather,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: [
      "weather",
      shouldUseCoords ? `${latitude},${longitude}` : cityToFetch,
    ],
    queryFn: () => {
      if (shouldUseCoords) {
        return weatherApi.getCurrentWeatherByCoords(latitude!, longitude!);
      }
      return weatherApi.getCurrentWeather(cityToFetch);
    },
    enabled: !geoLoading && (shouldUseCoords || !!cityToFetch),
    retry: 1,
  });

  const { data: forecast } = useQuery({
    queryKey: ["forecast", cityToFetch],
    queryFn: () => weatherApi.getForecast(cityToFetch),
    enabled: !!weather,
  });

  const handleSearch = (city: string) => {
    setSearchCity(city);
  };

  const isLoadingWeather = isLoading || geoLoading;

  const upcomingDays = forecast?.list
    .filter((_, index) => index % 8 === 0)
    .slice(1, 4)
    .map((item) => ({
      date: item.dt,
      temp: item.main.temp,
      weather: item.weather[0],
    }));

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
            <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:items-center lg:justify-between lg:gap-8 mb-6 lg:mb-8">
              <div className="flex-shrink-0">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 dark:text-white mb-2">
                  Weather Dashboard
                </h1>
                <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400">
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              <div className="w-full lg:w-96 xl:w-[28rem] flex-shrink-0">
                <CitySearch
                  onSearch={handleSearch}
                  isLoading={isLoadingWeather}
                />
              </div>
            </div>
          </motion.div>

          {isLoadingWeather ? (
            <div className="flex flex-col justify-center items-center h-64 sm:h-80 lg:h-96">
              <LoadingSpinner size="lg" />
              <p className="mt-4 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                Getting weather data...
              </p>
            </div>
          ) : error ? (
            <ErrorMessage
              message={
                error instanceof Error
                  ? error.message
                  : "Failed to fetch weather data"
              }
              onRetry={() => refetch()}
            />
          ) : weather ? (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
              {/* Main Weather Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="xl:col-span-2"
              >
                <div className="bg-gradient-to-br from-sky-400 via-sky-500 to-blue-600 rounded-2xl lg:rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden min-h-[400px] sm:min-h-[450px] lg:min-h-[500px]">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-32 sm:w-40 lg:w-48 h-32 sm:h-40 lg:h-48 bg-white rounded-full -translate-x-16 sm:-translate-x-20 lg:-translate-x-24 -translate-y-16 sm:-translate-y-20 lg:-translate-y-24"></div>
                    <div className="absolute bottom-0 right-0 w-40 sm:w-52 lg:w-64 h-40 sm:h-52 lg:h-64 bg-white rounded-full translate-x-20 sm:translate-x-26 lg:translate-x-32 translate-y-20 sm:translate-y-26 lg:translate-y-32"></div>
                  </div>

                  <div className="relative z-10 h-full flex flex-col">
                    {/* Location */}
                    <div className="flex items-center space-x-3 mb-6 lg:mb-8">
                      <MapPin className="w-5 h-5 lg:w-6 lg:h-6 flex-shrink-0" />
                      <div className="min-w-0">
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold truncate">
                          {weather.name}, {weather.sys.country}
                        </h2>
                        <p className="text-white/80 text-sm sm:text-base">
                          {formatTime(weather.dt)}
                        </p>
                      </div>
                    </div>

                    {/* Main Temperature */}
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 items-center">
                      <div className="order-2 sm:order-1">
                        <div className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold mb-2 lg:mb-4 leading-none">
                          {formatTemperature(weather.main.temp)}
                        </div>
                        <div className="text-lg sm:text-xl lg:text-2xl mb-2 capitalize font-medium">
                          {capitalizeFirst(weather.weather[0].description)}
                        </div>
                        <div className="text-base sm:text-lg lg:text-xl text-white/90 mb-2">
                          Feels like{" "}
                          {formatTemperature(weather.main.feels_like)}
                        </div>
                        <div className="text-sm sm:text-base lg:text-lg text-white/80">
                          H: {formatTemperature(weather.main.temp_max)} L:{" "}
                          {formatTemperature(weather.main.temp_min)}
                        </div>
                      </div>

                      <div className="order-1 sm:order-2 text-center sm:text-right">
                        <img
                          src={
                            getWeatherIcon(weather.weather[0].icon) ||
                            "/placeholder.svg"
                          }
                          alt={weather.weather[0].description}
                          className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 xl:w-40 xl:h-40 mx-auto sm:ml-auto drop-shadow-lg"
                        />
                      </div>
                    </div>

                    {/* Weather Details */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mt-6 lg:mt-8">
                      {[
                        {
                          icon: Thermometer,
                          label: "Pressure",
                          value: `${weather.main.pressure} hPa`,
                        },
                        {
                          icon: Droplets,
                          label: "Humidity",
                          value: `${weather.main.humidity}%`,
                        },
                        {
                          icon: Wind,
                          label: "Wind",
                          value: `${weather.wind.speed} m/s`,
                        },
                        {
                          icon: Eye,
                          label: "Visibility",
                          value: `${(weather.visibility / 1000).toFixed(1)} km`,
                        },
                      ].map((item, index) => (
                        <motion.div
                          key={item.label}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: 0.2 + index * 0.1,
                            duration: 0.4,
                          }}
                          className="bg-white/15 backdrop-blur-sm rounded-xl lg:rounded-2xl p-3 lg:p-4 text-center"
                        >
                          <item.icon className="w-5 h-5 lg:w-6 lg:h-6 mx-auto mb-1 lg:mb-2" />
                          <div className="text-xs opacity-80 mb-1">
                            {item.label}
                          </div>
                          <div className="text-xs sm:text-sm font-semibold">
                            {item.value}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Side Panel */}
              <div className="space-y-4 lg:space-y-6">
                {/* Sun Times */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-lg"
                >
                  <h3 className="text-base lg:text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Sun Times
                  </h3>
                  <div className="space-y-3 lg:space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-lg flex-shrink-0">
                          <Sunrise className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm lg:text-base text-gray-600 dark:text-gray-400">
                          Sunrise
                        </span>
                      </div>
                      <span className="text-sm lg:text-base font-semibold text-gray-900 dark:text-white">
                        {formatTime(weather.sys.sunrise)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex-shrink-0">
                          <Sunset className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm lg:text-base text-gray-600 dark:text-gray-400">
                          Sunset
                        </span>
                      </div>
                      <span className="text-sm lg:text-base font-semibold text-gray-900 dark:text-white">
                        {formatTime(weather.sys.sunset)}
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Quick Forecast */}
                {upcomingDays && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-lg"
                  >
                    <div className="flex items-center space-x-2 mb-4">
                      <Calendar className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600 dark:text-gray-400 flex-shrink-0" />
                      <h3 className="text-base lg:text-lg font-semibold text-gray-900 dark:text-white">
                        3-Day Forecast
                      </h3>
                    </div>
                    <div className="space-y-3">
                      {upcomingDays.map((day, index) => (
                        <div
                          key={day.date}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center space-x-3 min-w-0 flex-1">
                            <img
                              src={
                                getWeatherIcon(day.weather.icon) ||
                                "/placeholder.svg"
                              }
                              alt={day.weather.description}
                              className="w-6 h-6 lg:w-8 lg:h-8 flex-shrink-0"
                            />
                            <span className="text-xs lg:text-sm text-gray-600 dark:text-gray-400 truncate">
                              {formatDate(day.date).split(",")[0]}
                            </span>
                          </div>
                          <span className="text-sm lg:text-base font-semibold text-gray-900 dark:text-white flex-shrink-0">
                            {formatTemperature(day.temp)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Weather Stats */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-lg"
                >
                  <div className="flex items-center space-x-2 mb-4">
                    <TrendingUp className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600 dark:text-gray-400 flex-shrink-0" />
                    <h3 className="text-base lg:text-lg font-semibold text-gray-900 dark:text-white">
                      Weather Index
                    </h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">
                        UV Index
                      </span>
                      <div className="flex items-center space-x-2">
                        <div className="w-12 lg:w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                          <div className="w-1/3 h-full bg-green-500 rounded-full"></div>
                        </div>
                        <span className="text-xs lg:text-sm font-medium text-gray-900 dark:text-white">
                          Low
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">
                        Air Quality
                      </span>
                      <div className="flex items-center space-x-2">
                        <div className="w-12 lg:w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                          <div className="w-4/5 h-full bg-yellow-500 rounded-full"></div>
                        </div>
                        <span className="text-xs lg:text-sm font-medium text-gray-900 dark:text-white">
                          Good
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          ) : null}
        </main>

        {/* Mobile Navigation */}
        <Navigation />
      </div>
    </div>
  );
}
