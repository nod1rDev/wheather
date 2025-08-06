"use client"

import { useState, useEffect } from "react"

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => {
      // Tailwind CSS 'lg' breakpoint (1024px) ga mos keladi
      setIsMobile(window.innerWidth < 1024)
    }

    // Komponent yuklanganda bir marta tekshiramiz
    checkIsMobile()

    // Oyna o'lchami o'zgarganda tekshiramiz
    window.addEventListener("resize", checkIsMobile)

    // Cleanup funksiyasi
    return () => {
      window.removeEventListener("resize", checkIsMobile)
    }
  }, [])

  return isMobile
}
