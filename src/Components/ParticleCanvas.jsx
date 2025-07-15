import { useEffect, useRef } from 'react'

const ParticleCanvas = ({ theme }) => {
  const canvasRef = useRef()
  const particlesRef = useRef([])
  const animationRef = useRef()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = []
      const particleCount = 50

      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.5 + 0.2,
          hue: Math.random() * 60 + 200 // Blue to cyan range
        })
      }
    }

    // Background Tasks API - Using requestIdleCallback for non-critical updates
    const updateParticlesInBackground = (deadline) => {
      while (deadline.timeRemaining() > 0 && particlesRef.current.length > 0) {
        // Update particle properties during idle time
        particlesRef.current.forEach(particle => {
          // Randomly adjust particle properties for dynamic effect
          if (Math.random() < 0.01) {
            particle.hue = (particle.hue + Math.random() * 10 - 5) % 360
            particle.opacity = Math.max(0.1, Math.min(0.7, particle.opacity + (Math.random() - 0.5) * 0.1))
          }
        })
        break
      }
      
      // Schedule next background update
      if (window.requestIdleCallback) {
        window.requestIdleCallback(updateParticlesInBackground)
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Bounce off walls
        if (particle.x <= 0 || particle.x >= canvas.width) {
          particle.vx *= -1
        }
        if (particle.y <= 0 || particle.y >= canvas.height) {
          particle.vy *= -1
        }

        // Keep particles in bounds
        particle.x = Math.max(0, Math.min(canvas.width, particle.x))
        particle.y = Math.max(0, Math.min(canvas.height, particle.y))

        // Draw particle
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 2
        )
        
        if (theme === 'dark') {
          gradient.addColorStop(0, `hsla(${particle.hue}, 70%, 60%, ${particle.opacity})`)
          gradient.addColorStop(1, `hsla(${particle.hue}, 70%, 60%, 0)`)
        } else {
          gradient.addColorStop(0, `hsla(${particle.hue + 30}, 50%, 80%, ${particle.opacity})`)
          gradient.addColorStop(1, `hsla(${particle.hue + 30}, 50%, 80%, 0)`)
        }

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Draw connections between nearby particles
        particlesRef.current.forEach((otherParticle, otherIndex) => {
          if (index !== otherIndex) {
            const distance = Math.sqrt(
              Math.pow(particle.x - otherParticle.x, 2) +
              Math.pow(particle.y - otherParticle.y, 2)
            )

            if (distance < 100) {
              const opacity = (100 - distance) / 100 * 0.2
              ctx.beginPath()
              ctx.moveTo(particle.x, particle.y)
              ctx.lineTo(otherParticle.x, otherParticle.y)
              ctx.strokeStyle = theme === 'dark' 
                ? `rgba(78, 205, 196, ${opacity})`
                : `rgba(102, 126, 234, ${opacity})`
              ctx.lineWidth = 1
              ctx.stroke()
            }
          }
        })
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    initParticles()
    animate()

    // Start background updates if supported
    if (window.requestIdleCallback) {
      window.requestIdleCallback(updateParticlesInBackground)
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [theme])

  return (
    <canvas
      ref={canvasRef}
      className="particle-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none'
      }}
    />
  )
}

export default ParticleCanvas