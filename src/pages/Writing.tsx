import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, FileText } from 'lucide-react'

export default function Writing() {
  useEffect(() => { document.title = 'Writing — Arpit Kumar' }, [])
  return (
    <div style={{ paddingTop: '5rem', minHeight: '80vh' }}>
      <section style={{ padding: '4rem 0 4rem', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <div className="section-label">Writing</div>
            <h1 className="text-display-lg" style={{ marginBottom: '1rem' }}>Technical Writing</h1>
            <p style={{ fontSize: '1.0625rem', color: 'var(--foreground-muted)', maxWidth: '52ch', lineHeight: 1.75 }}>
              Technical articles, project breakdowns, research notes, and engineering reflections.
            </p>
          </motion.div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', padding: '5rem 2rem', maxWidth: '500px', margin: '0 auto' }}>
            <FileText size={40} style={{ color: 'var(--foreground-muted)', margin: '0 auto 1.5rem', opacity: 0.4 }} />
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.375rem', color: 'var(--foreground)', marginBottom: '0.75rem' }}>
              Writing section coming soon.
            </h2>
            <p style={{ color: 'var(--foreground-muted)', fontSize: '0.9375rem', lineHeight: 1.7, marginBottom: '2rem' }}>
              I'm preparing technical articles on AI engineering, system design, and lessons from building real products.
              The architecture is ready — content coming shortly.
            </p>
            <Link to="/projects" className="btn btn-ghost">
              View Projects Instead <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
