"use client"

import type * as React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Home, Users, Target, Mail, Menu, X, Info } from "lucide-react"
import { useTheme } from "next-themes"

interface MenuItem {
  icon: React.ReactNode
  label: string
  href: string
  gradient: string
  iconColor: string
}

const menuItems: MenuItem[] = [
  {
    icon: <Home className="h-5 w-5" />,
    label: "Ana Sayfa",
    href: "#home",
    gradient: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, rgba(29,78,216,0) 100%)",
    iconColor: "text-blue-500",
  },
  {
    icon: <Info className="h-5 w-5" />,
    label: "Hakkımızda",
    href: "#about",
    gradient: "radial-gradient(circle, rgba(168,85,247,0.15) 0%, rgba(147,51,234,0.06) 50%, rgba(126,34,206,0) 100%)",
    iconColor: "text-purple-500",
  },
  {
    icon: <Users className="h-5 w-5" />,
    label: "Ekibimiz",
    href: "#team",
    gradient: "radial-gradient(circle, rgba(249,115,22,0.15) 0%, rgba(234,88,12,0.06) 50%, rgba(194,65,12,0) 100%)",
    iconColor: "text-orange-500",
  },
  {
    icon: <Target className="h-5 w-5" />,
    label: "Vizyon & Misyon",
    href: "#vision",
    gradient: "radial-gradient(circle, rgba(34,197,94,0.15) 0%, rgba(22,163,74,0.06) 50%, rgba(21,128,61,0) 100%)",
    iconColor: "text-green-500",
  },
  {
    icon: <Mail className="h-5 w-5" />,
    label: "İletişim",
    href: "#contact",
    gradient: "radial-gradient(circle, rgba(239,68,68,0.15) 0%, rgba(220,38,38,0.06) 50%, rgba(185,28,28,0) 100%)",
    iconColor: "text-red-500",
  },
]

const itemVariants = {
  initial: { rotateX: 0, opacity: 1 },
  hover: { rotateX: -90, opacity: 0 },
}

const backVariants = {
  initial: { rotateX: 90, opacity: 0 },
  hover: { rotateX: 0, opacity: 1 },
}

const glowVariants = {
  initial: { opacity: 0, scale: 0.8 },
  hover: {
    opacity: 1,
    scale: 2,
    transition: {
      opacity: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
      scale: { duration: 0.5, type: "spring", stiffness: 300, damping: 25 },
    },
  },
}

const navGlowVariants = {
  initial: { opacity: 0 },
  hover: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
}

const sharedTransition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  duration: 0.5,
}

export function MenuBar() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.replace('#', '')
    const targetElement = document.getElementById(targetId)
    
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
    
    // Close mobile menu after clicking a link
    setIsMobileMenuOpen(false)
  }

  const isDarkTheme = mounted ? theme === "dark" : false

  return (
    <motion.nav
      className="p-2 rounded-2xl bg-gradient-to-b from-black/30 to-black/20 backdrop-blur-lg border border-white/20 shadow-lg relative overflow-hidden"
      initial="initial"
      whileHover="hover"
    >
      <motion.div
        className={`absolute -inset-2 bg-gradient-radial from-transparent ${
          isDarkTheme
            ? "via-blue-400/30 via-30% via-purple-400/30 via-60% via-red-400/30 via-90%"
            : "via-blue-400/20 via-30% via-purple-400/20 via-60% via-red-400/20 via-90%"
        } to-transparent rounded-3xl z-0 pointer-events-none`}
        variants={navGlowVariants}
      />
      
      {/* Desktop Menu - Always visible on larger screens */}
      <ul className="hidden md:flex items-center gap-2 relative z-10">
        {menuItems.map((item, index) => (
          <motion.li key={item.label} className="relative">
            <motion.div
              className="block rounded-xl overflow-visible group relative"
              style={{ perspective: "600px" }}
              whileHover="hover"
              initial="initial"
            >
              <motion.div
                className="absolute inset-0 z-0 pointer-events-none"
                variants={glowVariants}
                style={{
                  background: item.gradient,
                  opacity: 0,
                  borderRadius: "16px",
                }}
              />
              <motion.a
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                className="flex items-center gap-2 px-4 py-2 relative z-10 bg-transparent text-white/80 hover:text-white transition-colors rounded-xl"
                variants={itemVariants}
                transition={sharedTransition}
                style={{ transformStyle: "preserve-3d", transformOrigin: "center bottom" }}
              >
                <span className={`transition-colors duration-300 group-hover:${item.iconColor} text-white`}>
                  {item.icon}
                </span>
                <span className="drop-shadow-lg">{item.label}</span>
              </motion.a>
              <motion.a
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                className="flex items-center gap-2 px-4 py-2 absolute inset-0 z-10 bg-transparent text-white/80 hover:text-white transition-colors rounded-xl"
                variants={backVariants}
                transition={sharedTransition}
                style={{ transformStyle: "preserve-3d", transformOrigin: "center top", rotateX: 90 }}
              >
                <span className={`transition-colors duration-300 group-hover:${item.iconColor} text-white`}>
                  {item.icon}
                </span>
                <span className="drop-shadow-lg">{item.label}</span>
              </motion.a>
            </motion.div>
          </motion.li>
        ))}
      </ul>

      {/* Mobile Menu - Compact horizontal scroll */}
      <div className="md:hidden relative z-10">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide px-1">
          {menuItems.map((item, index) => (
            <motion.div key={item.label} className="flex-shrink-0">
              <motion.a
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                className="flex flex-col items-center gap-1 px-3 py-2 text-white/80 hover:text-white transition-colors rounded-xl min-w-[70px]"
                whileTap={{ scale: 0.95 }}
              >
                <span className={`${item.iconColor} text-sm`}>
                  {item.icon}
                </span>
                <span className="text-xs font-medium text-center leading-tight">
                  {item.label.split(' ').map((word, i) => (
                    <div key={i}>{word}</div>
                  ))}
                </span>
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.nav>
  )
}
