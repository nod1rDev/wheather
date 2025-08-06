"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { RiTelegramLine } from "react-icons/ri"; // Import Telegram icon from react-icons
import { Home, Calendar, Settings, Cloud, Github, Menu, X } from "lucide-react";
import { ThemeSwitcher } from "@/features/theme-switcher/ui/theme-switcher";
import { cn } from "@/shared/lib/utils";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile"; // useIsMobile hookini import qilamiz

const navItems = [
  {
    href: "/",
    label: "Dashboard",
    icon: Home,
    description: "Current weather overview",
  },
  {
    href: "/forecast",
    label: "Forecast",
    icon: Calendar,
    description: "7-day weather forecast",
  },
  {
    href: "/settings",
    label: "Settings",
    icon: Settings,
    description: "App preferences",
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile(); // isMobile holatini aniqlash uchun hookdan foydalanamiz

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        aria-label="Open menu"
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
      >
        <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
      </button>

      {/* Mobile Overlay - Faqat mobil versiyada va menyu ochiq bo'lganda ko'rsatiladi */}
      {isMobileMenuOpen && isMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -320 }}
        animate={{
          // Agar mobil versiya bo'lsa, isMobileMenuOpen holatiga qarab animatsiya qilamiz
          // Aks holda (desktop), x doim 0 bo'ladi (ko'rinadigan holat)
          x: isMobile ? (isMobileMenuOpen ? 0 : -320) : 0,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={cn(
          "fixed lg:sticky top-0 left-0 h-screen w-80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-r border-gray-200/50 dark:border-gray-700/50 shadow-2xl z-50 flex flex-col",
          "lg:translate-x-0 lg:opacity-100" // Bu klasslar desktopda sidebar doim ko'rinishini ta'minlaydi
        )}
      >
        {/* Mobile Close Button - Faqat mobil versiyada ko'rsatiladi */}
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="Close menu"
          className="lg:hidden absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="p-6 lg:p-8 border-b border-gray-200/50 dark:border-gray-700/50">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="flex items-center space-x-3"
          >
            <div className="p-2.5 lg:p-3 bg-gradient-to-r from-sky-500 to-blue-600 rounded-xl lg:rounded-2xl shadow-lg">
              <Cloud className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                WeatherApp
              </h1>
              <p className="text-xs lg:text-sm text-gray-500 dark:text-gray-400">
                Professional Weather Forecast
              </p>
            </div>
          </motion.div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 lg:p-6 overflow-y-auto">
          <div className="space-y-2">
            {navItems.map(({ href, label, icon: Icon, description }, index) => {
              const isActive = pathname === href;

              return (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
                >
                  <Link
                    href={href}
                    onClick={() => isMobile && setIsMobileMenuOpen(false)} // Faqat mobil versiyada menyuni yopamiz
                    className={cn(
                      "relative flex items-center space-x-3 lg:space-x-4 px-3 lg:px-4 py-3 lg:py-4 rounded-xl lg:rounded-2xl transition-all duration-300 group w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500",
                      isActive
                        ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50"
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavItem"
                        className="absolute inset-0 bg-gradient-to-r from-sky-500 to-blue-600 rounded-xl lg:rounded-2xl shadow-lg"
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.6,
                        }}
                      />
                    )}

                    <div className="relative z-10 flex items-center space-x-3 lg:space-x-4 w-full">
                      <Icon
                        className={cn(
                          "w-5 h-5 lg:w-6 lg:h-6 transition-transform duration-200 flex-shrink-0",
                          isActive ? "scale-110" : "group-hover:scale-110"
                        )}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm lg:text-base truncate">
                          {label}
                        </div>
                        <div
                          className={cn(
                            "text-xs transition-colors duration-200 truncate",
                            isActive
                              ? "text-white/80"
                              : "text-gray-500 dark:text-gray-400"
                          )}
                        >
                          {description}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 lg:p-6 border-t border-gray-200/50 dark:border-gray-700/50 mt-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="space-y-4"
          >
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Theme
              </p>
              <div className="flex justify-between space-x-2">
                <ThemeSwitcher />
              </div>
            </div>

            <div className="flex space-x-2 pt-2">
              <motion.a
                href="https://github.com/nod1rDev/wheather"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 p-2.5 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </motion.a>
              <motion.a
                href="https://t.me/nod1rbek_portfolio"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 p-2.5 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                aria-label="Telegram"
              >
                <RiTelegramLine className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </motion.aside>
    </>
  );
}
