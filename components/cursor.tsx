'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CustomCursor() {
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  const ringX = useSpring(mouseX, { mass: 0.12, stiffness: 420, damping: 26 })
  const ringY = useSpring(mouseY, { mass: 0.12, stiffness: 420, damping: 26 })

  useEffect(() => {
    setMounted(true)
    if (!window.matchMedia('(pointer: fine)').matches) return

    document.documentElement.style.cursor = 'none'

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      setVisible(true)
    }

    const onOver = (e: MouseEvent) => {
      const t = e.target as Element
      setHovering(!!t.closest('a, button, [role="button"], input, textarea'))
    }

    const onLeave = () => setVisible(false)

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.documentElement.addEventListener('mouseenter', () => setVisible(true))

    return () => {
      document.documentElement.style.cursor = ''
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [mouseX, mouseY])

  if (!mounted) return null

  return (
    <div className="pointer-events-none select-none" aria-hidden>
      {/* Dot — exact, no lag */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] rounded-full bg-foreground"
        style={{ x: mouseX, y: mouseY, translateX: '-50%', translateY: '-50%' }}
        animate={{ width: hovering ? 0 : 5, height: hovering ? 0 : 5, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.12 }}
      />
      {/* Ring — spring lag */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] rounded-full border border-foreground/30"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: hovering ? 48 : 26,
          height: hovering ? 48 : 26,
          opacity: visible ? (hovering ? 0.55 : 0.25) : 0,
        }}
        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  )
}
