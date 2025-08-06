"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Save, MapPin } from "lucide-react"
import { Navigation } from "@/widgets/navigation/ui/navigation"
import { ThemeSwitcher } from "@/features/theme-switcher/ui/theme-switcher"
import { useLocalStorage } from "@/shared/hooks/use-local-storage"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export function SettingsPage() {
  const [defaultCity, setDefaultCity] = useLocalStorage("defaultCity", "London")
  const [tempCity, setTempCity] = useState(defaultCity)
  const [isSaved, setIsSaved] = useState(false)

  const handleSave = () => {
    setDefaultCity(tempCity)
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-6 pb-20 md:pb-6">
        <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Customize your weather app experience</p>
        </motion.header>

        <main className="space-y-8 mb-8">
          {/* Theme Settings */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Appearance</h2>
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Theme</Label>
                <div className="mt-2">
                  <ThemeSwitcher />
                </div>
              </div>
            </div>
          </motion.section>

          {/* Location Settings */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Location</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="default-city" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Default City
                </Label>
                <div className="mt-2 flex space-x-2">
                  <div className="relative flex-1">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="default-city"
                      type="text"
                      value={tempCity}
                      onChange={(e) => setTempCity(e.target.value)}
                      placeholder="Enter city name"
                      className="pl-10"
                    />
                  </div>
                  <Button
                    onClick={handleSave}
                    disabled={tempCity === defaultCity || !tempCity.trim()}
                    className="flex items-center space-x-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>{isSaved ? "Saved!" : "Save"}</span>
                  </Button>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  This city will be used as default when location access is not available
                </p>
              </div>
            </div>
          </motion.section>

          {/* About Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">About</h2>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>Weather Forecast App v1.0</p>
              <p>Weather Forecast App created by Negmatov Nodirbek</p>
              <p>Built with React, Next.js, and OpenWeatherMap API</p>
              <p>Features responsive design and accessibility support</p>
            </div>
          </motion.section>
        </main>

        <Navigation />
      </div>
    </div>
  )
}
