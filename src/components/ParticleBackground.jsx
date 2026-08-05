import { useEffect, useRef } from 'react'

const DENSITY = 12000 // px^2 per particle — lower = more particles
const MAX_PARTICLES = 90
const LINK_DISTANCE = 130
const MOUSE_LINK_DISTANCE = 160
const SPEED = 0.25

export default function ParticleBackground({ className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const container = canvas.parentElement

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = 0
    let height = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let particles = []
    let animationId = null
    let isDark = document.documentElement.classList.contains('dark')

    const mouse = { x: null, y: null }

    function makeParticles() {
      const count = Math.min(MAX_PARTICLES, Math.max(20, Math.floor((width * height) / DENSITY)))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * SPEED,
        vy: (Math.random() - 0.5) * SPEED,
        r: Math.random() * 1.5 + 1,
      }))
    }

    function resize() {
      width = container.clientWidth
      height = container.clientHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      makeParticles()
    }

    function colors() {
      return isDark
        ? { dot: 'rgba(255,255,255,0.55)', line: '31,162,74', mouseLine: '255,255,255' }
        : { dot: 'rgba(23,128,58,0.55)', line: '31,162,74', mouseLine: '23,128,58' }
    }

    function step() {
      const { dot, line, mouseLine } = colors()
      ctx.clearRect(0, 0, width, height)

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x <= 0 || p.x >= width) p.vx *= -1
        if (p.y <= 0 || p.y >= height) p.vy *= -1
        p.x = Math.min(Math.max(p.x, 0), width)
        p.y = Math.min(Math.max(p.y, 0), height)
      }

      for (let i = 0; i < particles.length; i++) {
        const a = particles[i]
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.hypot(dx, dy)
          if (dist < LINK_DISTANCE) {
            ctx.strokeStyle = `rgba(${line},${0.18 * (1 - dist / LINK_DISTANCE)})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }

        if (mouse.x !== null) {
          const dx = a.x - mouse.x
          const dy = a.y - mouse.y
          const dist = Math.hypot(dx, dy)
          if (dist < MOUSE_LINK_DISTANCE) {
            ctx.strokeStyle = `rgba(${mouseLine},${0.35 * (1 - dist / MOUSE_LINK_DISTANCE)})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.stroke()
          }
        }

        ctx.fillStyle = dot
        ctx.beginPath()
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2)
        ctx.fill()
      }

      animationId = requestAnimationFrame(step)
    }

    function handleMouseMove(e) {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }

    function handleMouseLeave() {
      mouse.x = null
      mouse.y = null
    }

    function handleVisibility() {
      if (document.hidden) {
        cancelAnimationFrame(animationId)
        animationId = null
      } else if (!animationId && !reduceMotion) {
        animationId = requestAnimationFrame(step)
      }
    }

    const themeObserver = new MutationObserver(() => {
      isDark = document.documentElement.classList.contains('dark')
    })
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(container)

    resize()

    if (reduceMotion) {
      step()
      cancelAnimationFrame(animationId)
      animationId = null
    } else {
      animationId = requestAnimationFrame(step)
      container.addEventListener('mousemove', handleMouseMove)
      container.addEventListener('mouseleave', handleMouseLeave)
      document.addEventListener('visibilitychange', handleVisibility)
    }

    return () => {
      if (animationId) cancelAnimationFrame(animationId)
      resizeObserver.disconnect()
      themeObserver.disconnect()
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none ${className}`}
    />
  )
}
