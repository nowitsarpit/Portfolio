import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, Home } from 'lucide-react'

export default function NotFound() {
  useEffect(() => { document.title = '404 — Arpit Kumar' }, [])
  return (
    <div style={{ paddingTop: '5rem', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: '560px', margin: '0 auto', padding: '4rem 2rem' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', letterSpacing: '0.1em', color: 'var(--accent)', marginBottom: '2rem' }}>
            404 — PAGE NOT FOUND
          </div>
          <h1 className="text-display" style={{ marginBottom: '1.25rem', color: 'var(--foreground)' }}>
            Looks like this route hasn't been deployed.
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--foreground-muted)', lineHeight: 1.75, marginBottom: '2.5rem' }}>
            The page you're looking for doesn't exist or may have been moved. Navigate back to something that does exist.
          </p>
          <div style={{ display: 'flex', gap: '0.875rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/" className="btn btn-primary" id="not-found-home">
              <Home size={15} /> Back Home
            </Link>
            <Link to="/projects" className="btn btn-ghost" id="not-found-work">
              View Work <ArrowLeft size={14} />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
