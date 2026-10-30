import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Menu, ExternalLink, Moon, Sun } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'
import { siteConfig } from '../data/site'

const navLinks = [
  { label: 'Work', href: '/work' },
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'Research', href: '/research' },
  { label: 'Contact', href: '/contact' },
  { label: 'Home', href: '/' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 90,
          transition: 'all 250ms cubic-bezier(0.4,0,0.2,1)',
          backgroundColor: scrolled
            ? 'rgba(10,10,11,0.88)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled
            ? '1px solid var(--border)'
            : '1px solid transparent',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: scrolled ? '56px' : '68px', transition: 'height 250ms ease' }}>
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', textDecoration: 'none' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'var(--foreground)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--background)',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '0.8125rem',
              letterSpacing: '-0.02em',
              flexShrink: 0,
            }}>
              AK
            </div>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.9375rem', color: 'var(--foreground)', letterSpacing: '-0.01em' }}>
              Arpit Kumar
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }} aria-label="Main navigation" className="desktop-nav">
            {navLinks.map(link => (
              <NavLink
                key={link.href}
                to={link.href}
                className="nav-link"
                style={{ padding: '0.375rem 0.75rem', borderRadius: '6px' }}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              style={{
                background: 'none',
                border: '1px solid var(--border)',
                borderRadius: '6px',
                padding: '0.375rem',
                cursor: 'pointer',
                color: 'var(--foreground-muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'color 150ms ease, border-color 150ms ease',
              }}
              className="theme-toggle-btn"
            >
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            {siteConfig.resumeUrl ? (
              siteConfig.resumeUrl.startsWith('/') ? (
                <Link
                  to={siteConfig.resumeUrl}
                  className="btn btn-ghost btn-sm"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}
                >
                  Resume
                </Link>
              ) : (
                <a
                  href={siteConfig.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost btn-sm"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}
                >
                  Resume <ExternalLink size={12} />
                </a>
              )
            ) : null}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(v => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              style={{
                background: 'none',
                border: '1px solid var(--border)',
                borderRadius: '6px',
                padding: '0.375rem',
                cursor: 'pointer',
                color: 'var(--foreground)',
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              className="mobile-menu-btn"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-nav"
            className="mobile-nav-overlay"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            {/* Top */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '3rem' }}>
              <Link to="/" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', color: 'var(--foreground)' }}>
                ARPIT KUMAR
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--foreground)', padding: '0.25rem' }}
              >
                <X size={22} />
              </button>
            </div>

            {/* Links */}
            <nav style={{ flex: 1 }}>
              {[...navLinks, { label: 'Resume', href: '/resume' }, { label: 'Writing', href: '/writing' }, { label: 'Open Source', href: '/opensource' }].map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.2 }}
                >
                  <NavLink
                    to={link.href}
                    style={({ isActive }) => ({
                      display: 'block',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 600,
                      fontSize: '1.75rem',
                      lineHeight: 1.3,
                      letterSpacing: '-0.02em',
                      color: isActive ? 'var(--accent)' : 'var(--foreground)',
                      marginBottom: '1rem',
                      transition: 'color 150ms ease',
                    })}
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>

            {/* Bottom */}
            <div style={{ paddingTop: '2rem', borderTop: '1px solid var(--border)', display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">GitHub ↗</a>
              <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">LinkedIn ↗</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu-btn { display: none !important; }
        }
        .nav-link.active { color: var(--foreground) !important; }
        .theme-toggle-btn:hover { color: var(--foreground) !important; border-color: var(--muted) !important; }
      `}</style>
    </>
  )
}
