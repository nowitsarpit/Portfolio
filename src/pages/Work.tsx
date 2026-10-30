import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, MapPin, Building2, CheckCircle2, Terminal, Layers, ArrowUpRight, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { experiences } from '../data/experience'

export default function Work() {
  useEffect(() => {
    document.title = 'Work & Experience — Arpit Kumar'
  }, [])

  return (
    <div style={{ paddingTop: '5rem', minHeight: '100vh' }}>
      {/* ─── HEADER ─── */}
      <section style={{ padding: '4rem 0 3.5rem', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="section-label">Industry Experience</div>
            <h1 className="text-display-lg" style={{ marginBottom: '1rem' }}>
              Work & Experience.
            </h1>
            <p style={{ color: 'var(--foreground-muted)', fontSize: '1.0625rem', maxWidth: '62ch', lineHeight: 1.75 }}>
              Hands-on engineering experience shipping production software, integrating generative AI and machine learning architectures, scalable REST APIs, and full-stack mobile applications.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── EXPERIENCE LIST ─── */}
      <section style={{ padding: '3.5rem 0 6rem' }}>
        <div className="container">
          <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
                }}
              >
                {/* Top Banner / Role Metadata Bar */}
                <div style={{
                  padding: '2rem 2.5rem',
                  borderBottom: '1px solid var(--border)',
                  background: 'linear-gradient(180deg, var(--surface-hover) 0%, var(--surface) 100%)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: '1.25rem',
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                      <span className="badge badge-accent" style={{ textTransform: 'uppercase', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.08em' }}>
                        {exp.type.toUpperCase()}
                      </span>
                      <span className="badge" style={{ fontSize: '0.6875rem', color: 'var(--foreground-muted)' }}>
                        {exp.mode} · {exp.location}
                      </span>
                    </div>

                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 2.5vw, 1.875rem)', fontWeight: 700, letterSpacing: '-0.02em', margin: '0 0 0.5rem', color: 'var(--foreground)' }}>
                      {exp.role}
                    </h2>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap', color: 'var(--foreground-muted)', fontSize: '0.9375rem' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600, color: 'var(--foreground)' }}>
                        <Building2 size={16} style={{ color: 'var(--accent)' }} /> {exp.company}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <MapPin size={14} /> Remote
                      </span>
                    </div>
                  </div>

                  {/* Dates badge */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'var(--surface-elevated)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    padding: '0.6rem 1rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8125rem',
                    color: 'var(--accent)',
                    fontWeight: 600,
                  }}>
                    <Calendar size={14} /> {exp.duration}
                  </div>
                </div>

                {/* Main Content Body */}
                <div style={{ padding: '2.5rem' }}>
                  {/* Overview */}
                  <div style={{ marginBottom: '2.25rem' }}>
                    <div className="text-label" style={{ color: 'var(--accent)', marginBottom: '0.625rem' }}>
                      ROLE OVERVIEW
                    </div>
                    <p style={{ color: 'var(--foreground)', fontSize: '1.0625rem', lineHeight: 1.7, margin: 0 }}>
                      {exp.description}
                    </p>
                  </div>

                  {/* Two-Column Grid: Deliverables + Projects */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1.6fr 1fr',
                    gap: '2.5rem',
                    marginBottom: '2.5rem',
                  }} className="work-details-grid">
                    {/* Left Column: Key Engineering Contributions */}
                    <div>
                      <div className="text-label" style={{ color: 'var(--foreground-muted)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <CheckCircle2 size={13} style={{ color: 'var(--accent)' }} /> KEY CONTRIBUTIONS & DELIVERABLES
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {exp.responsibilities.map((resp, idx) => (
                          <div key={idx} style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '0.875rem',
                            background: 'var(--background-alt)',
                            border: '1px solid var(--border)',
                            borderRadius: '10px',
                            padding: '1rem 1.25rem',
                          }}>
                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)', marginTop: '0.55rem', flexShrink: 0 }} />
                            <div style={{ color: 'var(--foreground)', fontSize: '0.9375rem', lineHeight: 1.6 }}>
                              {resp}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right Column: Delivered Products & Core Competencies */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                      {/* Products Delivered */}
                      <div style={{
                        background: 'var(--surface-hover)',
                        border: '1px solid var(--border)',
                        borderRadius: '12px',
                        padding: '1.5rem',
                      }}>
                        <div className="text-label" style={{ color: 'var(--foreground-muted)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <Layers size={13} style={{ color: 'var(--accent)' }} /> PRODUCTS WORKED ON
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                          {exp.projects.map(proj => (
                            <div key={proj} style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              background: 'var(--surface)',
                              border: '1px solid var(--border)',
                              borderRadius: '8px',
                              padding: '0.75rem 1rem',
                            }}>
                              <span style={{ fontWeight: 600, fontSize: '0.9375rem', color: 'var(--foreground)' }}>
                                {proj}
                              </span>
                              <span className="badge" style={{ fontSize: '0.625rem' }}>Production</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Engineering Standards */}
                      <div style={{
                        background: 'var(--surface-hover)',
                        border: '1px solid var(--border)',
                        borderRadius: '12px',
                        padding: '1.5rem',
                      }}>
                        <div className="text-label" style={{ color: 'var(--foreground-muted)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <ShieldCheck size={13} style={{ color: 'var(--accent)' }} /> IMPACT & METHODOLOGY
                        </div>
                        <ul style={{ margin: 0, paddingLeft: '1.1rem', color: 'var(--foreground-muted)', fontSize: '0.875rem', lineHeight: 1.65, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          <li>Authored enterprise-grade System Requirement Specifications (SRS).</li>
                          <li>Implemented secure signed asset upload pipelines via Cloudinary.</li>
                          <li>Designed asynchronous non-blocking REST endpoints with FastAPI.</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Bottom: Technologies & Tools */}
                  <div style={{
                    borderTop: '1px solid var(--border)',
                    paddingTop: '1.75rem',
                  }}>
                    <div className="text-label" style={{ color: 'var(--foreground-muted)', marginBottom: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Terminal size={13} style={{ color: 'var(--accent)' }} /> TECHNOLOGIES & TOOLING USED
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {exp.technologies.map(tech => (
                        <span key={tech} className="tech-pill" style={{ padding: '0.35rem 0.75rem', fontSize: '0.8125rem' }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quick link to Projects */}
          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <Link to="/projects" className="btn btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              Explore Engineering Projects <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 860px) {
          .work-details-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </div>
  )
}
