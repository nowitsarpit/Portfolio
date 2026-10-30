import { useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink, ArrowRight } from 'lucide-react'
import { Github } from '../components/Icons'
import { projects } from '../data/projects'

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const project = projects.find(p => p.slug === slug)
  const projectIndex = projects.findIndex(p => p.slug === slug)
  const nextProject = projects[(projectIndex + 1) % projects.length]

  useEffect(() => {
    if (project) {
      document.title = `${project.title} — Arpit Kumar`
    }
  }, [project])

  if (!project) {
    return <Navigate to="/projects" replace />
  }

  const sectionStyle: React.CSSProperties = {
    paddingBottom: '3rem',
    marginBottom: '3rem',
    borderBottom: '1px solid var(--border)',
  }

  const sectionNumStyle: React.CSSProperties = {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.625rem',
    letterSpacing: '0.1em',
    color: 'var(--accent)',
    marginBottom: '0.75rem',
    textTransform: 'uppercase',
  }

  const sectionTitleStyle: React.CSSProperties = {
    fontFamily: 'var(--font-display)',
    fontWeight: 600,
    fontSize: '1.25rem',
    letterSpacing: '-0.015em',
    color: 'var(--foreground)',
    marginBottom: '1rem',
  }

  return (
    <div style={{ paddingTop: '5rem', minHeight: '100vh' }}>
      {/* Back */}
      <div className="container" style={{ paddingTop: '2rem' }}>
        <Link to="/projects" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--foreground-muted)', fontSize: '0.875rem', marginBottom: '3rem', transition: 'color 150ms ease' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--foreground)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--foreground-muted)')}>
          <ArrowLeft size={15} /> All Projects
        </Link>
      </div>

      {/* Project Header */}
      <header style={{ borderBottom: '1px solid var(--border)', paddingBottom: '3rem', marginBottom: '4rem' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Meta */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem', alignItems: 'center' }}>
              {project.category.map(cat => (
                <span key={cat} className="badge">{cat}</span>
              ))}
              <span className="badge" style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: 'var(--foreground-muted)' }}>
                {project.year}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: project.liveUrl ? '#22c55e' : project.status === 'in-progress' ? project.color : 'var(--muted)' }} />
                <span className="text-mono" style={{ fontSize: '0.625rem', color: 'var(--foreground-muted)', letterSpacing: '0.06em' }}>
                  {project.liveUrl ? 'LIVE' : project.status === 'in-progress' ? 'BUILDING' : 'COMPLETED'}
                </span>
              </div>
            </div>

            <h1 className="text-display-lg" style={{ marginBottom: '0.75rem' }}>
              {project.title}
            </h1>
            <p style={{ fontSize: '1.125rem', color: 'var(--foreground-muted)', marginBottom: '0.75rem', lineHeight: 1.6 }}>
              {project.subtitle}
            </p>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--foreground-muted)', marginBottom: '2rem' }}>
              Role: {project.role}
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {project.liveUrl ? (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  Open Live App <ExternalLink size={14} />
                </a>
              ) : (
                <span className="btn btn-ghost" style={{ opacity: 0.45, cursor: 'not-allowed' }}>Demo Unavailable</span>
              )}
              {project.githubUrl ? (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                  <Github size={14} /> View Code {project.slug === 'buspay' && <span style={{ opacity: 0.75, fontSize: '0.8rem', marginLeft: '0.35rem' }}>(In Progress...)</span>}
                </a>
              ) : (
                <span className="btn btn-ghost" style={{ opacity: 0.45, cursor: 'not-allowed' }}>GitHub not configured</span>
              )}
            </div>
          </motion.div>
        </div>
      </header>

      {/* Visual / Hero */}
      <div className="container" style={{ marginBottom: '4rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          style={{
            aspectRatio: '21/9',
            borderRadius: '16px',
            border: '1px solid var(--border)',
            background: `linear-gradient(135deg, var(--surface) 0%, color-mix(in srgb, ${project.color} 12%, var(--surface)) 100%)`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
          className="project-hero-visual"
        >
          {/* Grid */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `linear-gradient(var(--border-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
            opacity: 0.5,
          }} />
          {/* Center glow */}
          <div style={{
            position: 'absolute',
            width: '300px', height: '300px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${project.color}18 0%, transparent 70%)`,
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
          }} />
          {/* Content */}
          <div style={{ position: 'relative', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 4rem)', letterSpacing: '-0.03em', color: 'var(--foreground)', opacity: 0.15 }}>
              {project.title}
            </div>
          </div>
          {/* Tech pills */}
          <div style={{ position: 'absolute', bottom: '1.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', padding: '0 2rem' }}>
            {project.technologies.map(t => (
              <span key={t} className="tech-pill">{t}</span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Case Study Body */}
      <div className="container" style={{ maxWidth: '900px', margin: '0 auto', paddingBottom: '6rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '5rem', alignItems: 'start' }} className="case-study-grid">

          {/* Main Content */}
          <div className="prose">
            {/* 01 The Problem */}
            <div style={sectionStyle}>
              <div style={sectionNumStyle}>01 — The Problem</div>
              <h2 style={sectionTitleStyle}>What problem was being solved?</h2>
              <p>{project.problem}</p>
            </div>

            {/* 02 The Idea */}
            <div style={sectionStyle}>
              <div style={sectionNumStyle}>02 — The Idea</div>
              <h2 style={sectionTitleStyle}>What was the initial concept?</h2>
              <p>{project.solution}</p>
            </div>

            {/* 03 The System / Architecture */}
            <div style={sectionStyle}>
              <div style={sectionNumStyle}>03 — The System</div>
              <h2 style={sectionTitleStyle}>Architecture</h2>
              <p>{project.architecture}</p>

              {/* Architecture Diagram */}
              <div style={{
                marginTop: '1.5rem',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '10px',
                padding: '1.75rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8125rem',
                color: 'var(--foreground-muted)',
                lineHeight: 1.8,
              }}>
                <div style={{ color: 'var(--foreground-muted)', fontSize: '0.625rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
                  System Architecture
                </div>
                {project.slug === 'pawdex' && (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0 }}>
                    {[
                      { label: 'MOBILE APP', sub: 'React Native · Expo SDK 56 · TypeScript', color: '#10B981' },
                      { label: 'FASTAPI BACKEND', sub: 'Python · REST API · BackgroundTasks', color: '#3B82F6' },
                      { label: 'FIREBASE AUTH', sub: 'Authentication · Identity', color: '#F59E0B' },
                      { label: 'FIRESTORE', sub: 'Metadata · Document Store', color: '#8B5CF6' },
                      { label: 'CLOUDINARY', sub: 'PDFs (raw) · Images (optimized)', color: '#EC4899' },
                      { label: 'BACKGROUND PROCESSING', sub: 'Checksums · Virus Scan Hook · AI Ready', color: '#EF4444' },
                    ].map((node, i, arr) => (
                      <div key={node.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', padding: '0.625rem 1rem', borderRadius: '6px', background: `${node.color}0e`, border: `1px solid ${node.color}22`, width: '100%' }}>
                          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: node.color, flexShrink: 0 }} />
                          <div>
                            <div style={{ color: node.color, fontSize: '0.6875rem', letterSpacing: '0.08em' }}>{node.label}</div>
                            <div style={{ color: 'var(--foreground-muted)', fontSize: '0.625rem', opacity: 0.75 }}>{node.sub}</div>
                          </div>
                        </div>
                        {i < arr.length - 1 && <div style={{ width: '1px', height: '20px', background: 'var(--border)', marginLeft: '1.375rem' }} />}
                      </div>
                    ))}
                  </div>
                )}
                {project.slug !== 'pawdex' && (
                  <div style={{ color: 'var(--foreground)', whiteSpace: 'pre-wrap' }}>
                    {project.architecture}
                  </div>
                )}
              </div>
            </div>

            {/* 04 The Build */}
            <div style={sectionStyle}>
              <div style={sectionNumStyle}>04 — The Build</div>
              <h2 style={sectionTitleStyle}>Implementation</h2>
              <p style={{ whiteSpace: 'pre-line' }}>{project.implementation}</p>
            </div>

            {/* 05 Key Decisions */}
            {project.decisions.length > 0 && (
              <div style={sectionStyle}>
                <div style={sectionNumStyle}>05 — Key Decisions</div>
                <h2 style={sectionTitleStyle}>Why certain architecture choices were made</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {project.decisions.map(decision => (
                    <div key={decision.title} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', padding: '1.25rem 1.5rem', borderLeft: `3px solid var(--accent)` }}>
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.9375rem', color: 'var(--foreground)', marginBottom: '0.5rem' }}>
                        {decision.title}
                      </div>
                      <p style={{ fontSize: '0.875rem', color: 'var(--foreground-muted)', margin: 0, lineHeight: 1.65 }}>
                        {decision.reason}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 06 Challenges */}
            {project.challenges.length > 0 && (
              <div style={sectionStyle}>
                <div style={sectionNumStyle}>06 — Challenges</div>
                <h2 style={sectionTitleStyle}>What went wrong / what was difficult</h2>
                <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                  {project.challenges.map((c, i) => (
                    <li key={i} style={{ color: 'var(--foreground-muted)', lineHeight: 1.65, fontSize: '0.9375rem' }}>{c}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* 07 Result / Outcomes */}
            {project.outcomes.length > 0 && (
              <div style={sectionStyle}>
                <div style={sectionNumStyle}>07 — Result</div>
                <h2 style={sectionTitleStyle}>Verified outcomes</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {project.outcomes.map((outcome, i) => (
                    <div key={i} style={{ display: 'flex', gap: '0.875rem', alignItems: 'flex-start' }}>
                      <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--accent-soft)', border: '1px solid var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--accent)' }}>{String(i + 1).padStart(2, '0')}</span>
                      </div>
                      <p style={{ fontSize: '0.9375rem', color: 'var(--foreground-muted)', margin: 0, lineHeight: 1.6 }}>{outcome}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 08 What I Learned */}
            {project.learnings.length > 0 && (
              <div style={sectionStyle}>
                <div style={sectionNumStyle}>08 — What I Learned</div>
                <h2 style={sectionTitleStyle}>Technical reflection</h2>
                <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                  {project.learnings.map((l, i) => (
                    <li key={i} style={{ color: 'var(--foreground-muted)', lineHeight: 1.65, fontSize: '0.9375rem' }}>{l}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside style={{ position: 'sticky', top: '7rem' }}>
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '10px', padding: '1.5rem', marginBottom: '1rem' }}>
              <div className="text-label" style={{ color: 'var(--foreground-muted)', marginBottom: '1.25rem' }}>Project Info</div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--foreground-muted)', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Year</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', color: 'var(--foreground)' }}>{project.year}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--foreground-muted)', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Role</div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--foreground)' }}>{project.role}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--foreground-muted)', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Status</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: project.liveUrl ? '#22c55e' : project.status === 'in-progress' ? project.color : 'var(--muted)' }} />
                    <span style={{ fontSize: '0.875rem', color: 'var(--foreground)', textTransform: 'capitalize' }}>
                      {project.status === 'in-progress' ? 'In Progress' : project.status}
                    </span>
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--foreground-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Technologies</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                    {project.technologies.map(t => (
                      <span key={t} style={{ fontSize: '0.8125rem', color: 'var(--foreground-muted)', fontFamily: 'var(--font-mono)' }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {project.liveUrl ? (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-accent btn-sm" style={{ justifyContent: 'center' }}>
                  Live Demo <ExternalLink size={12} />
                </a>
              ) : null}
              {project.githubUrl ? (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm" style={{ justifyContent: 'center' }}>
                  <Github size={14} /> Source Code
                </a>
              ) : null}
            </div>
          </aside>
        </div>

        {/* Next Project */}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '3rem', marginTop: '3rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div className="text-label" style={{ color: 'var(--foreground-muted)', marginBottom: '0.5rem' }}>Next Project</div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.125rem', letterSpacing: '-0.01em', color: 'var(--foreground)' }}>
                {nextProject.title}
              </div>
            </div>
            <Link to={`/projects/${nextProject.slug}`} className="btn btn-ghost">
              View <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .case-study-grid { grid-template-columns: 1fr !important; }
          aside { position: static !important; }
          .project-hero-visual { aspect-ratio: 16/9 !important; }
        }
      `}</style>
    </div>
  )
}
