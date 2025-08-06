"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Home, Calendar, Settings } from "lucide-react"
import { cn } from "@/shared/lib/utils"

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/forecast", label: "Forecast", icon: Calendar },
  { href: "/settings", label: "Settings", icon: Settings },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <motion.nav
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      className="lg:hidden fixed bottom-4 left-4 right-4 z-40"
    >
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-2">
        <div className="flex justify-center space-x-1">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href

            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "relative flex flex-col items-center space-y-1 px-4 py-3 rounded-xl transition-all duration-300 flex-1 touch-manipulation",
                  isActive ? "text-white" : "text-gray-600 dark:text-gray-400",
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-sky-500 to-blue-600 rounded-xl shadow-lg"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}

                <div className="relative z-10 flex flex-col items-center space-y-1">
                  <Icon className="w-5 h-5" />
                  <span className="text-xs font-medium">{label}</span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </motion.nav>
  )
}
