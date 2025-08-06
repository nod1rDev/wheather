"use client"

import { motion } from "framer-motion"
import { cn } from "@/shared/lib/utils"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

export function LoadingSpinner({ size = "md", className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  }

  return (
    <div className="flex items-center justify-center">
      <motion.div className={cn("relative", sizeClasses[size], className)}>
        {/* Outer ring */}
        <motion.div
          className="absolute inset-0 border-4 border-sky-200 dark:border-sky-800 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />

        {/* Inner spinning ring */}
        <motion.div
          className="absolute inset-0 border-4 border-transparent border-t-sky-500 border-r-sky-500 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />

        {/* Center dot */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <div className="w-2 h-2 bg-sky-500 rounded-full" />
        </motion.div>
      </motion.div>
    </div>
  )
}
