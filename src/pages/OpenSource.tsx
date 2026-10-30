import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Github } from '../components/Icons'
import { siteConfig } from '../data/site'

export default function OpenSource() {
  useEffect(() => { document.title = 'Open Source — Arpit Kumar' }, [])
  return (
    <div style={{ paddingTop: '5rem', minHeight: '80vh' }}>
      <section style={{ padding: '4rem 0 4rem', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <div className="section-label">Open Source</div>
            <h1 className="text-display-lg" style={{ marginBottom: '1rem' }}>Open Source Work</h1>
            <p style={{ fontSize: '1.0625rem', color: 'var(--foreground-muted)', maxWidth: '52ch', lineHeight: 1.75 }}>
              Public repositories and contributions to the developer community.
            </p>
          </motion.div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', padding: '5rem 2rem', maxWidth: '500px', margin: '0 auto' }}>
            <Github size={40} style={{ color: 'var(--foreground-muted)', margin: '0 auto 1.5rem', opacity: 0.4 }} />
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.375rem', color: 'var(--foreground)', marginBottom: '0.75rem' }}>
              Open-source work will appear here.
            </h2>
            <p style={{ color: 'var(--foreground-muted)', fontSize: '0.9375rem', lineHeight: 1.7, marginBottom: '2rem' }}>
              As projects are made public, repositories and contributions will appear here. In the meantime, you can explore my GitHub profile directly.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                <Github size={15} /> GitHub Profile ↗
              </a>
              <Link to="/projects" className="btn btn-ghost">
                All Projects <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
