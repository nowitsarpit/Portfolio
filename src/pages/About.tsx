import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Download } from 'lucide-react'
import { siteConfig } from '../data/site'
import { experiences } from '../data/experience'
import { skillCategories } from '../data/skills'
import { certifications } from '../data/certifications'

function SectionReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

const principles = [
  {
    num: '01',
    title: 'Build for the real problem.',
    body: 'The stated problem is rarely the actual problem. Good engineering starts with understanding what\'s actually broken — not just implementing the first solution that comes to mind.',
  },
  {
    num: '02',
    title: 'Make trade-offs explicit.',
    body: 'Every architecture decision trades something — speed vs consistency, flexibility vs simplicity, cost vs reliability. The worst systems are built by engineers who pretended the trade-offs didn\'t exist.',
  },
  {
    num: '03',
    title: 'Keep systems understandable.',
    body: 'A system that works but can\'t be reasoned about is a liability. Complexity should be earned, not accumulated. Documentation is part of engineering.',
  },
  {
    num: '04',
    title: 'Ship early. Iterate intelligently.',
    body: 'Production reveals things that design reviews can\'t. Get software in front of real usage as early as possible, then improve from evidence — not assumptions.',
  },
  {
    num: '05',
    title: 'Security is part of engineering.',
    body: 'Security that gets "added later" is security theater. Threat modeling, signed uploads, input sanitization, and least-privilege access are engineering decisions, not afterthoughts.',
  },
]

const timeline = [
  { year: '2023', event: 'Started B.Tech Computer Science at Alliance University' },
  { year: '2023', event: 'Built first full-stack applications — MERN stack, C++ systems' },
  { year: '2024', event: 'Explored mobile development with React Native and Expo' },
  { year: '2025', event: 'Deep-dived into ML — multimodal systems, cybersecurity engineering' },
  { year: '2026', event: 'AI Developer Intern at COGNIQ AI — PawDex, CRM, APIs in production' },
  { year: 'Now', event: 'Building AI-powered products. Exploring LLMs, system design, DevSecOps' },
]

export default function About() {
  useEffect(() => {
    document.title = 'About — Arpit Kumar'
  }, [])

  return (
    <div style={{ paddingTop: '5rem', minHeight: '100vh' }}>
      {/* Header */}
      <section style={{ padding: '4rem 0 4rem', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '4rem', alignItems: 'center' }} className="about-header-grid">
              <div>
                <div className="section-label">About</div>
                <h1 className="text-display-lg" style={{ marginBottom: '1.5rem', maxWidth: '18ch' }}>
                  Engineer. Builder. Problem Solver.
                </h1>
                <p style={{ fontSize: '1.125rem', color: 'var(--foreground-muted)', lineHeight: 1.75, maxWidth: '58ch' }}>
                  I'm Arpit Kumar, a Computer Science Engineering student at Alliance University, Bengaluru.
                  I build AI-powered products, full-stack systems, mobile applications, and security-oriented software.
                  I think in systems, engineer for correctness, and ship software that solves real problems.
                </p>
              </div>
              {/* Profile Photo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                style={{ flexShrink: 0 }}
                className="about-avatar"
              >
                <div style={{
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                  padding: '3px',
                  background: 'linear-gradient(135deg, var(--accent) 0%, #f59e0b 50%, var(--accent) 100%)',
                  boxShadow: '0 20px 60px -10px rgba(37,99,235,0.35)',
                }}>
                  <div style={{ borderRadius: '50%', overflow: 'hidden', width: '100%', height: '100%' }}>
                    <img
                      src="/arpit.jpg"
                      alt="Arpit Kumar — AI & Full-Stack Developer"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      <style>{`
        @media (max-width: 768px) { .about-header-grid { grid-template-columns: 1fr !important; } .about-avatar { display: none !important; } }
      `}</style>

      {/* Story + Timeline */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' }} className="about-story-grid">
            <SectionReveal>
              <div className="section-label">The Story</div>
              <div className="prose">
                <p>
                  Computer science appealed to me because it's a discipline where you can build something from nothing, take an abstract idea and make it functional, useful, or even beautiful. I started with the fundamentals: data structures in C++, web applications in JavaScript, databases in SQL.
                </p>
                <p>
                  From there, I moved into the areas that I find most technically interesting: AI/ML systems, full-stack architecture, mobile engineering, and cybersecurity. Not because they were trendy, but because they each involve genuinely hard problems that require genuine thinking.
                </p>
                <p>
                  My internship at COGNIQ AI was where theory met production reality. Building PawDex, a mobile platform with a FastAPI backend, Firebase authentication, and Cloudinary media pipeline, meant making real engineering decisions with real constraints: security, performance, reliability, and maintainability.
                </p>
                <p>
                  I'm currently in my 7th semester at Alliance University. I'm building toward roles where I can work on challenging technical problems at the intersection of AI, backend systems, and product engineering.
                </p>
              </div>
            </SectionReveal>

            {/* Timeline */}
            <SectionReveal delay={0.1}>
              <div className="section-label">Timeline</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {timeline.map((item, i) => (
                  <div key={item.year} style={{ display: 'flex', gap: '1.5rem', alignItems: 'stretch' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '60px', flexShrink: 0 }}>
                      <div style={{
                        width: '8px', height: '8px',
                        borderRadius: '50%',
                        border: item.year === 'Now' ? '2px solid var(--accent)' : '2px solid var(--border)',
                        background: item.year === 'Now' ? 'var(--accent)' : 'var(--background)',
                        flexShrink: 0,
                        marginTop: '1.25rem',
                      }} />
                      {i < timeline.length - 1 && <div style={{ width: '1px', flex: 1, background: 'var(--border)' }} />}
                    </div>
                    <div style={{ paddingBottom: i < timeline.length - 1 ? '1.75rem' : 0, paddingTop: '0.875rem' }}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', letterSpacing: '0.08em', color: item.year === 'Now' ? 'var(--accent)' : 'var(--foreground-muted)', marginBottom: '0.25rem' }}>
                        {item.year}
                      </div>
                      <div style={{ fontSize: '0.9375rem', color: 'var(--foreground)', lineHeight: 1.5 }}>
                        {item.event}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </SectionReveal>
          </div>
        </div>
        <style>{`@media (max-width: 768px) { .about-story-grid { grid-template-columns: 1fr !important; gap: 3rem !important; } }`}</style>
      </section>

      <div className="divider" />

      {/* Experience */}
      <section className="section" id="experience">
        <div className="container">
          <SectionReveal>
            <div className="section-label">Experience</div>
            <h2 className="text-display" style={{ marginBottom: '3rem' }}>Professional Engineering</h2>
          </SectionReveal>

          {experiences.map(exp => (
            <SectionReveal key={exp.id}>
              <div className="experience-card" style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem', marginBottom: '1.25rem', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem', letterSpacing: '-0.015em', color: 'var(--foreground)', marginBottom: '0.25rem' }}>
                      {exp.company}
                    </div>
                    <div style={{ fontSize: '1rem', color: 'var(--accent)', marginBottom: '0.375rem', fontWeight: 500 }}>
                      {exp.role}
                    </div>
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--foreground-muted)' }}>{exp.duration}</span>
                      <span style={{ width: '1px', height: '10px', background: 'var(--border)' }} />
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--foreground-muted)' }}>{exp.mode}</span>
                    </div>
                  </div>
                  <span className="badge">{exp.type.charAt(0).toUpperCase() + exp.type.slice(1)}</span>
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <div className="text-label" style={{ color: 'var(--foreground-muted)', marginBottom: '0.875rem' }}>Responsibilities</div>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingLeft: 0, listStyle: 'none' }}>
                    {exp.responsibilities.map((r, i) => (
                      <li key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', fontSize: '0.9rem', color: 'var(--foreground-muted)', lineHeight: 1.6 }}>
                        <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '0.25rem' }}>—</span>
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="text-label" style={{ color: 'var(--foreground-muted)', marginBottom: '0.75rem' }}>Technologies</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                    {exp.technologies.map(t => (
                      <span key={t} className="tech-pill">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* Education */}
      <section className="section" id="education">
        <div className="container">
          <SectionReveal>
            <div className="section-label">Education</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }} className="edu-grid">
              <div>
                <h2 className="text-display" style={{ marginBottom: '1.5rem' }}>Academic Foundation</h2>
                <p style={{ color: 'var(--foreground-muted)', fontSize: '1rem', lineHeight: 1.75 }}>
                  My degree provides theoretical grounding, algorithms, systems, databases, mathematics. That i apply practically through projects and internships.
                </p>
              </div>
              <div className="experience-card">
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.125rem', letterSpacing: '-0.01em', color: 'var(--foreground)', marginBottom: '0.375rem' }}>
                  {siteConfig.education.institution}
                </div>
                <div style={{ fontSize: '0.9375rem', color: 'var(--accent)', marginBottom: '0.375rem', fontWeight: 500 }}>
                  {siteConfig.education.degree}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--foreground-muted)', marginBottom: '1rem' }}>
                  {siteConfig.education.location} · {siteConfig.education.semester}
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span className="badge badge-accent">Current</span>
                  {siteConfig.education.role ? <span className="badge">{siteConfig.education.role}</span> : null}
                  {siteConfig.education.cgpa ? <span className="badge">CGPA: {siteConfig.education.cgpa}</span> : null}
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
        <style>{`@media (max-width: 768px) { .edu-grid { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      <div className="divider" />

      {/* Skills */}
      <section className="section" id="skills">
        <div className="container">
          <SectionReveal>
            <div className="section-label">Skills</div>
            <h2 className="text-display" style={{ marginBottom: '3rem' }}>Technical Stack</h2>
          </SectionReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }} className="skills-full-grid">
            {skillCategories.map((cat, i) => (
              <SectionReveal key={cat.name} delay={i * 0.06}>
                <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '10px', padding: '1.5rem' }}>
                  <div className="text-label" style={{ color: 'var(--foreground-muted)', marginBottom: '1rem' }}>{cat.name}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {cat.skills.map(skill => (
                      <div key={skill} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', fontSize: '0.9rem', color: 'var(--foreground)' }}>
                        <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--accent)', flexShrink: 0 }} />
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 1024px) { .skills-full-grid { grid-template-columns: repeat(2, 1fr) !important; } }
          @media (max-width: 480px) { .skills-full-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      <div className="divider" />

      {/* Certifications */}
      <section className="section" id="certifications">
        <div className="container">
          <SectionReveal>
            <div className="section-label">Certifications</div>
            <h2 className="text-display" style={{ marginBottom: '3rem' }}>Verified Credentials</h2>
          </SectionReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }} className="certs-grid">
            {certifications.map((cert, i) => (
              <SectionReveal key={cert.id} delay={i * 0.06}>
                {/* Entire card is clickable — opens verify URL */}
                <a
                  href={cert.credentialUrl || cert.pdfUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={cert.credentialUrl ? 'Click to verify credential' : 'Click to view PDF'}
                  style={{ textDecoration: 'none', display: 'block', height: '100%' }}
                >
                  <div
                    style={{
                      background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '10px',
                      padding: '1.5rem', height: '100%', position: 'relative', display: 'flex',
                      flexDirection: 'column', cursor: 'pointer',
                      transition: 'border-color 200ms ease, box-shadow 200ms ease, transform 200ms ease',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = 'var(--accent)';
                      e.currentTarget.style.boxShadow = '0 0 0 1px var(--accent), 0 8px 24px -4px rgba(0,0,0,0.25)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'var(--border)';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    {/* Top badges */}
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.875rem' }}>
                      <span className="badge" style={{ fontSize: '0.5625rem', textTransform: 'capitalize' }}>{cert.type}</span>
                      {cert.code && <span className="badge badge-accent" style={{ fontSize: '0.5625rem' }}>{cert.code}</span>}
                      {/* External link icon top-right */}
                      <span style={{ marginLeft: 'auto', opacity: 0.4 }}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--foreground-muted)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </span>
                    </div>

                    {/* Cert name */}
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.9375rem', letterSpacing: '-0.01em', color: 'var(--foreground)', marginBottom: '0.375rem', lineHeight: 1.4, flex: 1 }}>
                      {cert.name}
                    </div>

                    {/* Issuer */}
                    <div style={{ fontSize: '0.8125rem', color: 'var(--foreground-muted)', marginBottom: cert.score ? '0.5rem' : '0.875rem' }}>
                      {cert.issuer}
                    </div>

                    {cert.score && (
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--accent)', marginBottom: '0.875rem' }}>
                        Score: {cert.score}
                      </div>
                    )}

                    {/* Bottom action row */}
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }} onClick={e => e.stopPropagation()}>
                      {cert.credentialUrl && (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Verify credential"
                          style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                            fontSize: '0.6875rem', fontFamily: 'var(--font-mono)',
                            color: 'var(--accent)', textDecoration: 'none',
                            border: '1px solid var(--accent)', borderRadius: '5px',
                            padding: '0.3rem 0.625rem', transition: 'background 150ms ease, color 150ms ease',
                          }}
                          onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = 'var(--background)'; }}
                          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--accent)'; }}
                        >
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                          Verify
                        </a>
                      )}
                      {cert.pdfUrl && (
                        <a
                          href={cert.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="View PDF certificate"
                          style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                            fontSize: '0.6875rem', fontFamily: 'var(--font-mono)',
                            color: 'var(--foreground-muted)', textDecoration: 'none',
                            border: '1px solid var(--border)', borderRadius: '5px',
                            padding: '0.3rem 0.625rem', transition: 'background 150ms ease, color 150ms ease',
                          }}
                          onMouseEnter={e => { e.currentTarget.style.background = 'var(--surface-elevated)'; e.currentTarget.style.color = 'var(--foreground)'; }}
                          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--foreground-muted)'; }}
                        >
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
                          PDF
                        </a>
                      )}
                    </div>
                  </div>
                </a>
              </SectionReveal>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 900px) { .certs-grid { grid-template-columns: repeat(2, 1fr) !important; } }
          @media (max-width: 480px) { .certs-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      <div className="divider" />

      {/* Engineering Philosophy */}
      <section className="section">
        <div className="container">
          <SectionReveal>
            <div className="section-label">Philosophy</div>
            <h2 className="text-display" style={{ marginBottom: '3rem' }}>How I think about engineering.</h2>
          </SectionReveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)', borderRadius: '12px', overflow: 'hidden' }}>
            {principles.map((p, i) => (
              <SectionReveal key={p.num} delay={i * 0.07}>
                <div style={{
                  background: 'var(--background)',
                  padding: '1.75rem 2rem',
                  display: 'grid',
                  gridTemplateColumns: '2.5rem 1fr',
                  gap: '1.5rem',
                  transition: 'background 200ms ease',
                }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'var(--background)')}
                >
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--foreground-muted)', opacity: 0.5, paddingTop: '0.25rem' }}>
                    {p.num}
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.0625rem', letterSpacing: '-0.01em', color: 'var(--foreground)', marginBottom: '0.5rem' }}>
                      {p.title}
                    </div>
                    <p style={{ fontSize: '0.9rem', color: 'var(--foreground-muted)', lineHeight: 1.7, margin: 0 }}>
                      {p.body}
                    </p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '4rem 0 6rem', borderTop: '1px solid var(--border)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <h2 className="text-heading" style={{ marginBottom: '0.5rem' }}>Ready to talk?</h2>
            <p style={{ color: 'var(--foreground-muted)', fontSize: '0.9375rem' }}>
              Open to full-time roles, internships, and high-impact engineering collaborations.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap' }}>
            {siteConfig.resumeUrl ? (
              siteConfig.resumeUrl.startsWith('/') ? (
                <Link to={siteConfig.resumeUrl} className="btn btn-primary">
                  <Download size={14} /> View Full Resume
                </Link>
              ) : (
                <a href={siteConfig.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  <Download size={14} /> Resume
                </a>
              )
            ) : (
              <span className="btn btn-ghost" style={{ opacity: 0.45, cursor: 'not-allowed' }}>Resume link not configured</span>
            )}
            <Link to="/contact" className="btn btn-ghost">
              Contact <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
