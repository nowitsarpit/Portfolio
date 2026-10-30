import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink, FileText } from 'lucide-react'
import { researchPapers } from '../data/research'

function SectionReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  )
}

const exploringTopics = [
  { topic: 'AI Engineering', desc: 'LLM application architecture, RAG systems, prompt engineering for production use' },
  { topic: 'System Design', desc: 'Distributed systems, real-time architectures, database selection trade-offs' },
  { topic: 'DevSecOps', desc: 'Security as a pipeline concern, CI/CD security gates, infrastructure hardening' },
  { topic: 'Healthcare AI', desc: 'Predictive analytics, digital twin systems, clinical decision support' },
  { topic: 'Advanced Backend', desc: 'Async Python patterns, service mesh, background job architectures' },
]

export default function Research() {
  useEffect(() => { document.title = 'Research — Arpit Kumar' }, [])

  return (
    <div style={{ paddingTop: '5rem', minHeight: '100vh' }}>
      {/* Header + Papers combined */}
      <section className="section">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }} style={{ marginBottom: '3rem' }}>
            <div className="section-label">Research & Academic Work</div>
            <h1 className="text-display-lg" style={{ marginBottom: '1rem', maxWidth: '18ch' }}>
              Papers & Co-authored Work.
            </h1>
          </motion.div>

          {researchPapers.map(paper => (
            <SectionReveal key={paper.id}>
              <div style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                padding: '2rem',
                marginBottom: '1.5rem',
              }}>
                {/* Role tag */}
                <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap', alignItems: 'center' }}>
                  <span className="badge" style={{ background: paper.myRole === 'reference' ? 'rgba(239,68,68,0.1)' : 'var(--accent-soft)', color: paper.myRole === 'reference' ? '#ef4444' : 'var(--accent)', border: 'none', fontSize: '0.625rem' }}>
                    {paper.myRole === 'reference' ? 'REFERENCE PAPER — NOT MY WORK' : paper.myRole.toUpperCase()}
                  </span>
                  <span className="badge" style={{ fontSize: '0.625rem' }}>{paper.publisher}</span>
                  <span className="badge" style={{ fontSize: '0.625rem', marginLeft: 'auto' }}>{paper.year}</span>
                </div>

                {/* Title */}
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.125rem', letterSpacing: '-0.015em', color: 'var(--foreground)', marginBottom: '0.75rem', lineHeight: 1.35 }}>
                  {paper.title}
                </h2>

                {/* Journal */}
                <div style={{ fontSize: '0.875rem', color: 'var(--foreground-muted)', marginBottom: '1.25rem' }}>
                  {paper.journal}{paper.volume && `, Vol. ${paper.volume}`}{paper.issue && `, No. ${paper.issue}`}{paper.articleNumber && `, Art. ${paper.articleNumber}`}
                  {paper.doi && (
                    <span> · DOI: <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125em' }}>{paper.doi}</code></span>
                  )}
                </div>

                {/* My role description */}
                <div style={{ background: 'var(--surface-hover)', borderRadius: '8px', padding: '1rem 1.25rem', marginBottom: '1.25rem', border: '1px solid var(--border)' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', letterSpacing: '0.08em', color: 'var(--foreground-muted)', marginBottom: '0.375rem' }}>MY RELATIONSHIP TO THIS PAPER</div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--foreground-muted)', margin: 0, lineHeight: 1.65 }}>
                    {paper.myRoleDescription}
                  </p>
                </div>

                {/* Keywords */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <div className="text-label" style={{ color: 'var(--foreground-muted)', marginBottom: '0.5rem' }}>Topics</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                    {paper.keywords.map(k => (
                      <span key={k} className="badge badge-accent" style={{ fontSize: '0.625rem' }}>{k}</span>
                    ))}
                  </div>
                </div>

                {/* Related topics */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <div className="text-label" style={{ color: 'var(--foreground-muted)', marginBottom: '0.5rem' }}>Related to my interests in</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                    {paper.relatedTopics.map(t => (
                      <span key={t} className="tech-pill">{t}</span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  {paper.url && (
                    <a href={paper.url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
                      View Paper <ExternalLink size={12} />
                    </a>
                  )}
                  {paper.pdfUrl && (
                    <a href={paper.pdfUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
                      <FileText size={12} /> Read PDF
                    </a>
                  )}
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* Currently Exploring */}
      <section className="section" style={{ background: 'var(--background-alt)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <SectionReveal>
            <div className="section-label">Currently Exploring</div>
            <h2 className="text-display" style={{ marginBottom: '0.75rem' }}>What I'm actively studying.</h2>
            <p style={{ color: 'var(--foreground-muted)', fontSize: '1rem', marginBottom: '3rem', maxWidth: '48ch', lineHeight: 1.7 }}>
              Areas I'm reading, building, and thinking about — not claiming expertise, but actively developing knowledge.
            </p>
          </SectionReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }} className="exploring-grid">
            {exploringTopics.map((item, i) => (
              <SectionReveal key={item.topic} delay={i * 0.07}>
                <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '10px', padding: '1.5rem' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', letterSpacing: '0.08em', color: 'var(--accent)', marginBottom: '0.75rem' }}>EXPLORING</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1rem', color: 'var(--foreground)', marginBottom: '0.5rem' }}>
                    {item.topic}
                  </div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--foreground-muted)', lineHeight: 1.65, margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
        <style>{`@media (max-width: 768px) { .exploring-grid { grid-template-columns: 1fr 1fr !important; } } @media (max-width: 480px) { .exploring-grid { grid-template-columns: 1fr !important; } }`}</style>
      </section>
    </div>
  )
}
