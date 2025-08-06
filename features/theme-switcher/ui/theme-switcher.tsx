"use client"

import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { Sun, Moon, Monitor } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { cn } from "@/shared/lib/utils"

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const themes = [
    { value: "light", icon: Sun, label: "Light" },
    { value: "dark", icon: Moon, label: "Dark" },
    { value: "system", icon: Monitor, label: "System" }
  ]

  return (
    <div className="flex flex-wrap gap-2 w-full">
      {themes.map(({ value, icon: Icon, label }) => (
        <motion.div key={value} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1 min-w-[80px]">
          <Button
            variant={theme === value ? "default" : "outline"}
            size="sm"
            onClick={() => setTheme(value)}
            className={cn(
              "w-full flex items-center justify-center space-x-2 text-sm py-2 px-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500",
              theme === value ? "bg-sky-500 text-white hover:bg-sky-600" : "border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            )}
            aria-label={`Set theme to ${label}`}
          >
            <Icon className="w-4 h-4" />
            <span className="hidden sm:inline">{label}</span>
          </Button>
        </motion.div>
      ))}
    </div>
  )
}
