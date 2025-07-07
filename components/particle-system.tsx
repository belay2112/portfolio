"use client"

import { useEffect, useRef, useState } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  life: number
  maxLife: number
  type: "click" | "trail" | "ambient"
}

interface ParticleSystemProps {
  className?: string
  activeSection?: string
}

export function ParticleSystem({ className = "", activeSection = "home" }: ParticleSystemProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const [isActive, setIsActive] = useState(true)

  // Color schemes for different sections
  const colorSchemes = {
    home: {
      name: "Welcome",
      colors: ["#3B82F6", "#8B5CF6", "#EC4899", "#06B6D4", "#10B981"],
      gradient: "from-blue-500 to-purple-500",
      icon: "🏠",
    },
    about: {
      name: "Personal",
      colors: ["#F59E0B", "#EF4444", "#F97316", "#FBBF24", "#FCD34D"],
      gradient: "from-orange-500 to-yellow-500",
      icon: "👨‍💻",
    },
    skills: {
      name: "Technical",
      colors: ["#10B981", "#059669", "#047857", "#065F46", "#064E3B"],
      gradient: "from-green-500 to-emerald-600",
      icon: "⚡",
    },
    projects: {
      name: "Creative",
      colors: ["#8B5CF6", "#A855F7", "#9333EA", "#7C3AED", "#6D28D9"],
      gradient: "from-purple-500 to-violet-600",
      icon: "🚀",
    },
    experience: {
      name: "Professional",
      colors: ["#3B82F6", "#1D4ED8", "#1E40AF", "#1E3A8A", "#172554"],
      gradient: "from-blue-500 to-blue-700",
      icon: "🎯",
    },
    contact: {
      name: "Connection",
      colors: ["#EC4899", "#DB2777", "#BE185D", "#9D174D", "#831843"],
      gradient: "from-pink-500 to-rose-600",
      icon: "📬",
    },
  }

  const getCurrentColors = () => {
    return colorSchemes[activeSection as keyof typeof colorSchemes]?.colors || colorSchemes.home.colors
  }

  const getCurrentScheme = () => {
    return colorSchemes[activeSection as keyof typeof colorSchemes] || colorSchemes.home
  }

  const createParticle = (x: number, y: number, type: "click" | "trail" | "ambient" = "ambient"): Particle => {
    const colors = getCurrentColors()
    const angle = Math.random() * Math.PI * 2
    const speed = type === "click" ? Math.random() * 8 + 4 : Math.random() * 2 + 1
    const size = type === "click" ? Math.random() * 6 + 3 : Math.random() * 3 + 1
    const life = type === "click" ? 60 : type === "trail" ? 30 : 120

    return {
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size,
      color: colors[Math.floor(Math.random() * colors.length)],
      life,
      maxLife: life,
      type,
    }
  }

  const createClickExplosion = (x: number, y: number) => {
    const particleCount = 15 + Math.random() * 10
    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push(createParticle(x, y, "click"))
    }
  }

  const createTrailParticle = (x: number, y: number) => {
    if (Math.random() < 0.3) {
      // 30% chance to create trail particle
      particlesRef.current.push(createParticle(x + (Math.random() - 0.5) * 20, y + (Math.random() - 0.5) * 20, "trail"))
    }
  }

  const createAmbientParticles = (canvas: HTMLCanvasElement) => {
    if (particlesRef.current.filter((p) => p.type === "ambient").length < 20) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      particlesRef.current.push(createParticle(x, y, "ambient"))
    }
  }

  const updateParticleColors = () => {
    const colors = getCurrentColors()
    // Gradually transition existing particles to new colors
    particlesRef.current.forEach((particle) => {
      if (Math.random() < 0.02) {
        // 2% chance per frame to change color
        particle.color = colors[Math.floor(Math.random() * colors.length)]
      }
    })
  }

  const updateParticles = (canvas: HTMLCanvasElement) => {
    // Update particle colors based on current section
    updateParticleColors()

    particlesRef.current = particlesRef.current.filter((particle) => {
      // Update position
      particle.x += particle.vx
      particle.y += particle.vy

      // Apply gravity and friction
      if (particle.type === "click") {
        particle.vy += 0.2 // gravity
        particle.vx *= 0.98 // friction
        particle.vy *= 0.98
      } else if (particle.type === "trail") {
        particle.vx *= 0.95
        particle.vy *= 0.95
      } else {
        // Ambient particles float gently
        particle.vx += (Math.random() - 0.5) * 0.1
        particle.vy += (Math.random() - 0.5) * 0.1
        particle.vx *= 0.99
        particle.vy *= 0.99
      }

      // Mouse attraction for ambient particles
      if (particle.type === "ambient") {
        const dx = mouseRef.current.x - particle.x
        const dy = mouseRef.current.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          const force = ((100 - distance) / 100) * 0.5
          particle.vx += (dx / distance) * force
          particle.vy += (dy / distance) * force
        }
      }

      // Boundary bouncing
      if (particle.x < 0 || particle.x > canvas.width) {
        particle.vx *= -0.8
        particle.x = Math.max(0, Math.min(canvas.width, particle.x))
      }
      if (particle.y < 0 || particle.y > canvas.height) {
        particle.vy *= -0.8
        particle.y = Math.max(0, Math.min(canvas.height, particle.y))
      }

      // Update life
      particle.life--

      // Remove dead particles
      return particle.life > 0
    })
  }

  const drawParticles = (ctx: CanvasRenderingContext2D) => {
    particlesRef.current.forEach((particle) => {
      const alpha = particle.life / particle.maxLife
      const size = particle.size * alpha

      ctx.save()
      ctx.globalAlpha = alpha

      // Create gradient for particles
      const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, size)
      gradient.addColorStop(0, particle.color)
      gradient.addColorStop(1, particle.color + "00")

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2)
      ctx.fill()

      // Add sparkle effect for click particles
      if (particle.type === "click" && alpha > 0.7) {
        ctx.strokeStyle = "#FFFFFF"
        ctx.lineWidth = 1
        ctx.globalAlpha = alpha * 0.5
        ctx.beginPath()
        ctx.moveTo(particle.x - size, particle.y)
        ctx.lineTo(particle.x + size, particle.y)
        ctx.moveTo(particle.x, particle.y - size)
        ctx.lineTo(particle.x, particle.y + size)
        ctx.stroke()
      }

      ctx.restore()
    })
  }

  const animate = () => {
    const canvas = canvasRef.current
    if (!canvas || !isActive) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Create ambient particles
    createAmbientParticles(canvas)

    // Update and draw particles
    updateParticles(canvas)
    drawParticles(ctx)

    animationRef.current = requestAnimationFrame(animate)
  }

  const handleMouseMove = (e: MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    mouseRef.current = { x, y }
    createTrailParticle(x, y)
  }

  const handleClick = (e: MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    createClickExplosion(x, y)
  }

  const handleResize = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Set initial canvas size
    handleResize()

    // Add event listeners
    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("click", handleClick)
    window.addEventListener("resize", handleResize)

    // Start animation
    animate()

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("click", handleClick)
      window.removeEventListener("resize", handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isActive])

  // Force particle color update when section changes
  useEffect(() => {
    // Create a burst of new particles with the new color scheme when section changes
    if (isActive) {
      const canvas = canvasRef.current
      if (canvas) {
        const centerX = canvas.width / 2
        const centerY = canvas.height / 2

        // Create a subtle burst of particles in the new color scheme
        for (let i = 0; i < 5; i++) {
          const x = centerX + (Math.random() - 0.5) * 200
          const y = centerY + (Math.random() - 0.5) * 200
          particlesRef.current.push(createParticle(x, y, "ambient"))
        }
      }
    }
  }, [activeSection, isActive])

  const currentScheme = getCurrentScheme()

  return (
    <>
      <canvas
        ref={canvasRef}
        className={`fixed inset-0 pointer-events-auto z-10 ${className}`}
        style={{ mixBlendMode: "screen" }}
      />
      <div className="fixed top-24 right-4 z-50 flex flex-col gap-2">
        <button
          onClick={() => setIsActive(!isActive)}
          className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full p-2 hover:bg-white/90 transition-colors"
          title={isActive ? "Disable particles" : "Enable particles"}
        >
          {isActive ? "✨" : "💫"}
        </button>

        {/* Color Scheme Indicator */}
        <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg p-3 text-center">
          <div className="text-lg mb-1">{currentScheme.icon}</div>
          <div className="text-xs font-medium text-gray-700">{currentScheme.name}</div>
          <div className="text-xs text-gray-500 mt-1">Theme</div>

          {/* Color palette preview */}
          <div className="flex gap-1 mt-2 justify-center">
            {currentScheme.colors.slice(0, 3).map((color, index) => (
              <div
                key={index}
                className="w-3 h-3 rounded-full border border-white/50"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
