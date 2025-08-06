"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Search, X, MapPin } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface CitySearchProps {
  onSearch: (city: string) => void
  isLoading?: boolean
}

export function CitySearch({ onSearch, isLoading }: CitySearchProps) {
  const [query, setQuery] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim())
    }
  }

  const handleClear = () => {
    setQuery("")
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-blue-500 rounded-xl lg:rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
          <div className="relative bg-white dark:bg-gray-800 rounded-xl lg:rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="pl-4 lg:pl-6">
                <Search className="text-gray-400 w-5 h-5 lg:w-6 lg:h-6" />
              </div>
              <Input
                type="text"
                placeholder="Search for any city worldwide..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 border-0 bg-transparent text-base lg:text-lg py-4 lg:py-6 px-3 lg:px-4 focus:ring-0 focus:outline-none placeholder:text-gray-400 placeholder:text-sm lg:placeholder:text-base"
                disabled={isLoading}
              />
              {query && (
                <motion.button
                  type="button"
                  onClick={handleClear}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors touch-manipulation"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-4 h-4 lg:w-5 lg:h-5" />
                </motion.button>
              )}
              <div className="pr-2">
                <Button
                  type="submit"
                  disabled={!query.trim() || isLoading}
                  className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white px-4 lg:px-8 py-2.5 lg:py-3 rounded-lg lg:rounded-xl font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-sm lg:text-base touch-manipulation"
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className="w-4 h-4 lg:w-5 lg:h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-3 h-3 lg:w-4 lg:h-4" />
                      <span className="hidden sm:inline">Search</span>
                    </div>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </motion.div>
  )
}
