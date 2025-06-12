"use client"

import type React from "react"

import { useEffect, useRef } from "react"

export function GlitchText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <span className="absolute top-0 left-0 z-0 text-purple-500 opacity-70 animate-pulse">{children}</span>
      <span
        className="absolute top-0 left-0 z-0 text-cyan-500 opacity-70"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)",
          animation: "glitch 3s infinite",
          animationDelay: "0.5s",
        }}
      >
        {children}
      </span>
    </div>
  )
}

export function HexagonButton({
  children,
  onClick,
  active = false,
  className = "",
}: {
  children: React.ReactNode
  onClick?: () => void
  active?: boolean
  className?: string
}) {
  return (
    <button onClick={onClick} className={`relative group ${className}`}>
      <div
        className={`
        relative z-10 px-6 py-3 transition-colors duration-300
        ${active ? "text-purple-300" : "text-white group-hover:text-purple-300"}
      `}
      >
        {children}
      </div>
      <svg
        className={`absolute inset-0 w-full h-full transition-all duration-300 ${
          active ? "stroke-purple-500 stroke-2" : "stroke-gray-700 group-hover:stroke-purple-500/50"
        }`}
        viewBox="0 0 100 50"
      >
        <polygon
          points="0,25 10,0 90,0 100,25 90,50 10,50"
          fill="transparent"
          strokeLinejoin="round"
          className="transition-all duration-300"
        />
      </svg>
      {active && <div className="absolute inset-0 bg-purple-500/10 z-0"></div>}
    </button>
  )
}

export function RadarAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    let angle = 0
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(centerX, centerY) * 0.8

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw circles
      for (let i = 1; i <= 3; i++) {
        ctx.beginPath()
        ctx.arc(centerX, centerY, radius * (i / 3), 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(139, 92, 246, ${0.2 - (i - 1) * 0.05})`
        ctx.lineWidth = 1
        ctx.stroke()
      }

      // Draw grid lines
      ctx.strokeStyle = "rgba(139, 92, 246, 0.1)"
      ctx.lineWidth = 1

      // Horizontal line
      ctx.beginPath()
      ctx.moveTo(centerX - radius, centerY)
      ctx.lineTo(centerX + radius, centerY)
      ctx.stroke()

      // Vertical line
      ctx.beginPath()
      ctx.moveTo(centerX, centerY - radius)
      ctx.lineTo(centerX, centerY + radius)
      ctx.stroke()

      // Draw radar sweep
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(centerX + Math.cos(angle) * radius, centerY + Math.sin(angle) * radius)
      ctx.strokeStyle = "rgba(139, 92, 246, 0.7)"
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw gradient sweep
      const gradient = ctx.createConicGradient(angle, centerX, centerY)
      gradient.addColorStop(0, "rgba(139, 92, 246, 0.2)")
      gradient.addColorStop(1, "rgba(139, 92, 246, 0)")

      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, angle, angle + Math.PI / 2)
      ctx.lineTo(centerX, centerY)
      ctx.fillStyle = gradient
      ctx.fill()

      angle += 0.01
      if (angle > Math.PI * 2) {
        angle = 0
      }

      requestAnimationFrame(animate)
    }

    const animationId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full opacity-20" />
}

export function CornerBorders({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {/* Top left corner */}
      <div className="absolute top-0 left-0 w-4 h-4">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-purple-500"></div>
        <div className="absolute top-0 left-0 h-full w-[2px] bg-purple-500"></div>
      </div>

      {/* Top right corner */}
      <div className="absolute top-0 right-0 w-4 h-4">
        <div className="absolute top-0 right-0 w-full h-[2px] bg-purple-500"></div>
        <div className="absolute top-0 right-0 h-full w-[2px] bg-purple-500"></div>
      </div>

      {/* Bottom left corner */}
      <div className="absolute bottom-0 left-0 w-4 h-4">
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-purple-500"></div>
        <div className="absolute bottom-0 left-0 h-full w-[2px] bg-purple-500"></div>
      </div>

      {/* Bottom right corner */}
      <div className="absolute bottom-0 right-0 w-4 h-4">
        <div className="absolute bottom-0 right-0 w-full h-[2px] bg-purple-500"></div>
        <div className="absolute bottom-0 right-0 h-full w-[2px] bg-purple-500"></div>
      </div>
    </div>
  )
}

