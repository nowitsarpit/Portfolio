import { Link } from 'react-router-dom'
import { Mail, ExternalLink } from 'lucide-react'
import { Github, Linkedin } from './Icons'
import { siteConfig } from '../data/site'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '3rem 0 2.5rem',
      marginTop: '6rem',
    }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem', marginBottom: '3rem', alignItems: 'start' }}>
          {/* Brand */}
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.125rem', letterSpacing: '-0.02em', color: 'var(--foreground)', marginBottom: '0.5rem' }}>
              ARPIT KUMAR
            </div>
            <div className="text-label" style={{ color: 'var(--foreground-muted)', marginBottom: '1rem' }}>
              Software · AI · Systems
            </div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--foreground-muted)', lineHeight: 1.6 }}>
              Building intelligent software from<br/>idea to deployment.
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div className="text-label" style={{ color: 'var(--foreground-muted)', marginBottom: '1.25rem' }}>Navigation</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { label: 'Work', href: '/work' },
                { label: 'Projects', href: '/projects' },
                { label: 'About', href: '/about' },
                { label: 'Research', href: '/research' },
                { label: 'Writing', href: '/writing' },
                { label: 'Contact', href: '/contact' },
              ].map(link => (
                <Link
                  key={link.href}
                  to={link.href}
                  style={{ fontSize: '0.875rem', color: 'var(--foreground-muted)', transition: 'color 150ms ease' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--foreground)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--foreground-muted)')}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <div className="text-label" style={{ color: 'var(--foreground-muted)', marginBottom: '1.25rem' }}>Connect</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.875rem', color: 'var(--foreground-muted)', display: 'flex', alignItems: 'center', gap: '0.375rem', transition: 'color 150ms ease' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--foreground)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--foreground-muted)')}>
                <Github size={14} /> GitHub
              </a>
              <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.875rem', color: 'var(--foreground-muted)', display: 'flex', alignItems: 'center', gap: '0.375rem', transition: 'color 150ms ease' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--foreground)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--foreground-muted)')}>
                <Linkedin size={14} /> LinkedIn
              </a>
              <a href={`mailto:${siteConfig.email}`} style={{ fontSize: '0.875rem', color: 'var(--foreground-muted)', display: 'flex', alignItems: 'center', gap: '0.375rem', transition: 'color 150ms ease' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--foreground)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--foreground-muted)')}>
                <Mail size={14} /> Email
              </a>
              {siteConfig.resumeUrl && (
                siteConfig.resumeUrl.startsWith('/') ? (
                  <Link to={siteConfig.resumeUrl} style={{ fontSize: '0.875rem', color: 'var(--foreground-muted)', display: 'flex', alignItems: 'center', gap: '0.375rem', transition: 'color 150ms ease' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--foreground)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--foreground-muted)')}>
                    Resume
                  </Link>
                ) : (
                  <a href={siteConfig.resumeUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.875rem', color: 'var(--foreground-muted)', display: 'flex', alignItems: 'center', gap: '0.375rem', transition: 'color 150ms ease' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--foreground)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--foreground-muted)')}>
                    <ExternalLink size={14} /> Resume
                  </a>
                )
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          <span style={{ fontSize: '0.8125rem', color: 'var(--foreground-muted)' }}>
            © {year} Arpit Kumar. Designed & engineered by Arpit Kumar.
          </span>
          <span className="text-mono" style={{ color: 'var(--foreground-muted)', fontSize: '0.75rem' }}>
            Bengaluru, India
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          footer > .container > div:first-child {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 768px) {
          footer > .container > div:first-child {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </footer>
  )
}
