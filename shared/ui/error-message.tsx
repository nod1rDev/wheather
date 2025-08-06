"use client"

import { motion } from "framer-motion"
import { AlertCircle } from "lucide-react"
import { cn } from "@/shared/lib/utils"

interface ErrorMessageProps {
  message: string
  className?: string
  onRetry?: () => void
}

export function ErrorMessage({ message, className, onRetry }: ErrorMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("flex flex-col items-center justify-center p-6 text-center", className)}
    >
      <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
      <p className="text-gray-600 dark:text-gray-400 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
        >
          Try Again
        </button>
      )}
    </motion.div>
  )
}
