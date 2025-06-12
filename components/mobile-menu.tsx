"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MobileMenuProps {
  links: {
    name: string
    onClick: () => void
  }[]
  activeSection: string
}

export default function MobileMenu({ links, activeSection }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Close menu when clicking a link
  const handleLinkClick = (onClick: () => void) => {
    setIsOpen(false)
    onClick()
  }

  // Close menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        className="relative z-50 text-white border border-purple-500/30 bg-black/50 backdrop-blur-sm hover:bg-purple-900/20"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6 text-purple-400" /> : <Menu className="h-6 w-6 text-purple-400" />}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-40 flex flex-col items-center justify-center overflow-hidden"
          >
            {/* Background elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
                <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent via-purple-500 to-transparent"></div>
                <div className="absolute top-0 bottom-0 right-0 w-px bg-gradient-to-b from-transparent via-purple-500 to-transparent"></div>

                {/* Grid pattern */}
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, rgba(139, 92, 246, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(139, 92, 246, 0.1) 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                ></div>
              </div>
            </div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 w-full max-w-md px-6 py-8"
            >
              <div className="relative border border-purple-500/30 bg-black/60 backdrop-blur-sm rounded-md overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-900 via-purple-500 to-purple-900"></div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-xl font-bold text-white">
                      <span className="text-purple-400">GAME</span>MENU
                    </h2>
                    <div className="h-px w-24 bg-gradient-to-r from-purple-500 to-transparent"></div>
                  </div>

                  <nav className="space-y-2">
                    {links.map((link, index) => (
                      <motion.div
                        key={link.name}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 * index }}
                        className="w-full"
                      >
                        <button
                          onClick={() => handleLinkClick(link.onClick)}
                          className={`group relative w-full text-left py-3 px-4 flex items-center justify-between transition-all duration-200 ${
                            activeSection === link.name.toLowerCase()
                              ? "bg-purple-900/30 text-purple-300 border-l-2 border-purple-500"
                              : "text-gray-300 hover:bg-purple-900/20 hover:border-l-2 hover:border-purple-500/50"
                          }`}
                        >
                          <div className="flex items-center">
                            <span className="text-lg font-medium">{link.name}</span>
                          </div>

                          <ChevronRight
                            className={`h-4 w-4 transition-transform duration-200 ${
                              activeSection === link.name.toLowerCase()
                                ? "text-purple-400"
                                : "text-gray-500 group-hover:text-purple-400"
                            }`}
                          />

                          {activeSection === link.name.toLowerCase() && (
                            <motion.div
                              layoutId="activeIndicator"
                              className="absolute right-0 top-0 bottom-0 w-1 bg-purple-500"
                            />
                          )}
                        </button>
                      </motion.div>
                    ))}
                  </nav>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-900 via-purple-500 to-purple-900"></div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                className="absolute bottom-[-30px] left-0 right-0 flex justify-center"
              >
                <div className="text-xl font-bold px-4 py-1 bg-black/80 rounded-b-md border-x border-b border-purple-500/30">
                  <span className="text-purple-500">Dev</span>Portfolio
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

