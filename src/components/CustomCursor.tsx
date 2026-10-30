import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only on desktop hover devices
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!mediaQuery.matches || reducedMotion.matches) return

    let mouseX = 0, mouseY = 0
    let ringX = 0, ringY = 0
    let rafId: number

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const animate = () => {
      const dot = dotRef.current
      const ring = ringRef.current
      if (!dot || !ring) return

      dot.style.transform = `translate(${mouseX - 2.5}px, ${mouseY - 2.5}px)`

      ringX += (mouseX - ringX) * 0.15
      ringY += (mouseY - ringY) * 0.15
      ring.style.transform = `translate(${ringX - 16}px, ${ringY - 16}px)`

      rafId = requestAnimationFrame(animate)
    }

    const onEnterLink = () => {
      const ring = ringRef.current
      if (!ring) return
      ring.style.width = '48px'
      ring.style.height = '48px'
      ring.style.borderColor = 'var(--accent)'
    }

    const onLeaveLink = () => {
      const ring = ringRef.current
      if (!ring) return
      ring.style.width = '32px'
      ring.style.height = '32px'
      ring.style.borderColor = 'rgba(240,237,232,0.3)'
    }

    window.addEventListener('mousemove', onMove)
    rafId = requestAnimationFrame(animate)

    const interactables = document.querySelectorAll('a, button, [role="button"]')
    interactables.forEach(el => {
      el.addEventListener('mouseenter', onEnterLink)
      el.addEventListener('mouseleave', onLeaveLink)
    })

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  )
}
