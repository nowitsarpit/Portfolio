import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Share2,
  Check,
  Mail,
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
  Code,
  FolderGit2,
  ArrowRight,
  Sparkles,
  Download,
  Phone
} from 'lucide-react'
import { siteConfig } from '../data/site'
import { experiences } from '../data/experience'
import { skillCategories } from '../data/skills'
import { certifications } from '../data/certifications'
import { projects } from '../data/projects'
import { Github, Linkedin } from '../components/Icons'

export default function Resume() {
  const [copied, setCopied] = useState(false)
  const [activeSection, setActiveSection] = useState<'all' | 'experience' | 'education' | 'projects' | 'skills' | 'certifications'>('all')

  useEffect(() => {
    document.title = 'Resume — Arpit Kumar | AI & Full-Stack Developer'
    window.scrollTo(0, 0)
  }, [])

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const displayProjects = projects.filter(p => p.priority === 1).slice(0, 4)

  return (
    <div className="resume-page" style={{ paddingTop: '5.5rem', minHeight: '100vh', paddingBottom: '5rem' }}>
      {/* ─── SCREEN-ONLY CONTROLS & HEADER ─── */}
      <section className="no-print" style={{ padding: '2.5rem 0 2rem', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <div className="text-label" style={{ color: 'var(--accent)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Sparkles size={13} /> CURRICULUM VITAE
              </div>
              <h1 className="text-display" style={{ marginBottom: '0.5rem' }}>
                Resume
              </h1>
              <p style={{ color: 'var(--foreground-muted)', fontSize: '0.9375rem', maxWidth: '58ch', lineHeight: 1.6 }}>
                A summary of my professional experience, core engineering projects, academic background, and certifications.
              </p>
            </div>

            {/* Quick Actions */}
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <a
                href="/resume.pdf"
                download="Arpit_Kumar_Resume.pdf"
                className="btn btn-primary"
                id="download-resume-btn"
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 14px rgba(37,99,235,0.25)' }}
              >
                <Download size={15} /> Download PDF
              </a>

              <button
                onClick={handleCopyLink}
                className="btn btn-ghost"
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                title="Copy direct link to resume"
              >
                {copied ? <Check size={14} style={{ color: '#10B981' }} /> : <Share2 size={14} />}
                {copied ? 'Link Copied!' : 'Share Link'}
              </button>
            </div>
          </div>

          {/* Filter Pills */}
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '2rem', flexWrap: 'wrap' }}>
            {[
              { id: 'all', label: 'Complete Resume' },
              { id: 'experience', label: 'Experience' },
              { id: 'education', label: 'Education' },
              { id: 'projects', label: 'Key Projects' },
              { id: 'skills', label: 'Technical Skills' },
              { id: 'certifications', label: 'Certifications' },
            ].map(tab => {
              const isActive = activeSection === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveSection(tab.id as typeof activeSection)
                    const el = document.getElementById(`resume-sec-${tab.id}`)
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    }
                  }}
                  style={{
                    background: isActive ? 'var(--accent)' : 'var(--surface)',
                    color: isActive ? '#ffffff' : 'var(--foreground-muted)',
                    border: `1px solid ${isActive ? 'var(--accent)' : 'var(--border)'}`,
                    padding: '0.45rem 1rem',
                    borderRadius: '20px',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 150ms ease',
                    boxShadow: isActive ? '0 2px 8px rgba(37,99,235,0.25)' : 'none',
                  }}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── RESUME DOCUMENT CARD ─── */}
      <div className="container" style={{ marginTop: '2.5rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="resume-sheet"
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            padding: '3rem 3.5rem',
            boxShadow: '0 20px 40px -15px rgba(0,0,0,0.3)',
            maxWidth: '920px',
            margin: '0 auto',
          }}
        >
          {/* ─── RESUME HEADER ─── */}
          <header style={{ borderBottom: '2px solid var(--border)', paddingBottom: '2rem', marginBottom: '2.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                {/* Photo */}
                <div style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  padding: '2px',
                  background: 'linear-gradient(135deg, var(--accent) 0%, #f59e0b 100%)',
                  flexShrink: 0,
                }} className="no-print">
                  <div style={{ borderRadius: '50%', overflow: 'hidden', width: '100%', height: '100%' }}>
                    <img src="/arpit.jpg" alt="Arpit Kumar" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
                  </div>
                </div>
                <div>
                  <h1 style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '2.25rem',
                    letterSpacing: '-0.03em',
                    color: 'var(--foreground)',
                    lineHeight: 1.1,
                    marginBottom: '0.375rem'
                  }}>
                    {siteConfig.name}
                  </h1>
                  <div style={{
                    fontSize: '1.0625rem',
                    color: 'var(--accent)',
                    fontWeight: 600,
                    letterSpacing: '-0.01em',
                    marginBottom: '0.75rem'
                  }}>
                    Computer Science Engineer · AI & Full-Stack Developer
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap', fontSize: '0.8125rem', color: 'var(--foreground-muted)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                      <MapPin size={13} style={{ color: 'var(--accent)' }} /> {siteConfig.location}
                    </span>
                    <a href={`mailto:${siteConfig.email}`} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: 'inherit', textDecoration: 'none' }}>
                      <Mail size={13} style={{ color: 'var(--accent)' }} /> {siteConfig.email}
                    </a>
                    <a href={`tel:+91${siteConfig.phone}`} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: 'inherit', textDecoration: 'none' }}>
                      <Phone size={13} style={{ color: 'var(--accent)' }} /> +91 {siteConfig.phone}
                    </a>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981' }} />
                      {siteConfig.availability}
                    </span>
                  </div>
                </div>
              </div>

              <div className="resume-socials" style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.8125rem' }}>
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--foreground-muted)', textDecoration: 'none' }}
                >
                  <Github size={14} /> github.com/{siteConfig.githubUsername}
                </a>
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--foreground-muted)', textDecoration: 'none' }}
                >
                  <Linkedin size={14} /> linkedin.com/in/{siteConfig.githubUsername}
                </a>
                {siteConfig.url ? (
                  <a
                    href={siteConfig.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)', textDecoration: 'none', fontWeight: 500 }}
                  >
                    <FolderGit2 size={14} /> {siteConfig.url.replace(/^https?:\/\//, '')}
                  </a>
                ) : null}
              </div>
            </div>

            {/* Professional Summary */}
            <div style={{ marginTop: '1.5rem', fontSize: '0.875rem', lineHeight: 1.65, color: 'var(--foreground-muted)' }}>
              Computer Science Engineering student at Alliance University with hands-on AI Developer internship experience at COGNIQ AI. Strong background in designing scalable REST APIs with FastAPI, developing cross-platform mobile apps using React Native, and deploying multimodal machine learning pipelines (DistilBERT, ResNet50, XGBoost). Certified by Oracle and University of Toronto; focused on building resilient, performant full-stack systems and DevSecOps pipelines.
            </div>
          </header>

          {/* ─── SECTION: EXPERIENCE ─── */}
          {(activeSection === 'all' || activeSection === 'experience') && (
            <section id="resume-sec-experience" className="resume-section" style={{ marginBottom: '2.5rem', scrollMarginTop: '6rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
                <Briefcase size={16} style={{ color: 'var(--accent)' }} />
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                  Professional Experience
                </h2>
              </div>

              {experiences.map(exp => (
                <div key={exp.id} style={{ marginBottom: '1.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <div style={{ fontWeight: 700, fontSize: '1.0625rem', color: 'var(--foreground)' }}>
                      {exp.role} <span style={{ color: 'var(--accent)', fontWeight: 600 }}>@ {exp.company}</span>
                    </div>
                    <div style={{ fontSize: '0.8125rem', fontFamily: 'var(--font-mono)', color: 'var(--foreground-muted)' }}>
                      {exp.duration}
                    </div>
                  </div>

                  <div style={{ fontSize: '0.8125rem', color: 'var(--foreground-muted)', marginBottom: '0.75rem', fontStyle: 'italic' }}>
                    {exp.location} · {exp.mode} · Projects: {exp.projects.join(', ')}
                  </div>

                  <ul style={{ paddingLeft: '1.25rem', marginBottom: '1rem' }}>
                    {exp.responsibilities.map((resp, i) => (
                      <li key={i} style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--foreground-muted)', marginBottom: '0.375rem' }}>
                        {resp}
                      </li>
                    ))}
                  </ul>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                    {exp.technologies.map(tech => (
                      <span
                        key={tech}
                        style={{
                          fontSize: '0.75rem',
                          fontFamily: 'var(--font-mono)',
                          background: 'var(--surface-hover)',
                          color: 'var(--foreground)',
                          padding: '0.125rem 0.5rem',
                          borderRadius: '4px',
                          border: '1px solid var(--border)',
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* ─── SECTION: EDUCATION ─── */}
          {(activeSection === 'all' || activeSection === 'education') && (
            <section id="resume-sec-education" className="resume-section" style={{ marginBottom: '2.5rem', scrollMarginTop: '6rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
                <GraduationCap size={16} style={{ color: 'var(--accent)' }} />
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                  Education
                </h2>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <div style={{ fontWeight: 700, fontSize: '1.0625rem', color: 'var(--foreground)' }}>
                    {siteConfig.education.degree}
                  </div>
                  <div style={{ fontSize: '0.8125rem', fontFamily: 'var(--font-mono)', color: 'var(--foreground-muted)' }}>
                    2023 – Present
                  </div>
                </div>

                <div style={{ fontSize: '0.875rem', color: 'var(--foreground-muted)', marginBottom: '0.5rem' }}>
                  <strong style={{ color: 'var(--foreground)' }}>{siteConfig.education.institution}</strong> — {siteConfig.education.location} ({siteConfig.education.semester})
                </div>

                {siteConfig.education.role ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem', color: 'var(--accent)', fontWeight: 500 }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)' }} />
                    {siteConfig.education.role}
                  </div>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem', color: 'var(--accent)', fontWeight: 500 }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)' }} />
                    CGPA: {siteConfig.education.cgpa}
                  </div>
                )}
              </div>
            </section>
          )}

          {/* ─── SECTION: KEY PROJECTS ─── */}
          {(activeSection === 'all' || activeSection === 'projects') && (
            <section id="resume-sec-projects" className="resume-section" style={{ marginBottom: '2.5rem', scrollMarginTop: '6rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                  <FolderGit2 size={16} style={{ color: 'var(--accent)' }} />
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                    Featured Engineering Projects
                  </h2>
                </div>
                <Link to="/projects" className="no-print" style={{ fontSize: '0.8125rem', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '0.25rem', textDecoration: 'none' }}>
                  All Projects <ArrowRight size={12} />
                </Link>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
                {displayProjects.map(proj => (
                  <div key={proj.slug} style={{ borderLeft: '2px solid var(--accent)', paddingLeft: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.25rem' }}>
                      <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--foreground)' }}>
                        {proj.title} <span style={{ fontWeight: 400, color: 'var(--foreground-muted)', fontSize: '0.8125rem' }}>— {proj.subtitle}</span>
                      </div>
                      <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--foreground-muted)' }}>
                        {proj.year}
                      </div>
                    </div>

                    <p style={{ fontSize: '0.8125rem', lineHeight: 1.55, color: 'var(--foreground-muted)', marginBottom: '0.5rem' }}>
                      {proj.description}
                    </p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                      {proj.technologies.slice(0, 7).map(t => (
                        <span
                          key={t}
                          style={{
                            fontSize: '0.6875rem',
                            fontFamily: 'var(--font-mono)',
                            background: 'var(--surface-hover)',
                            color: 'var(--foreground-muted)',
                            padding: '0.1rem 0.4rem',
                            borderRadius: '3px',
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ─── SECTION: TECHNICAL SKILLS ─── */}
          {(activeSection === 'all' || activeSection === 'skills') && (
            <section id="resume-sec-skills" className="resume-section" style={{ marginBottom: '2.5rem', scrollMarginTop: '6rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
                <Code size={16} style={{ color: 'var(--accent)' }} />
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                  Technical Skills
                </h2>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                {skillCategories.map(cat => (
                  <div key={cat.name} style={{ background: 'var(--surface-elevated)', border: '1px solid var(--border)', borderRadius: '8px', padding: '0.875rem 1rem' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.375rem' }}>
                      {cat.name}
                    </div>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--foreground)', lineHeight: 1.5 }}>
                      {cat.skills.join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ─── SECTION: CERTIFICATIONS ─── */}
          {(activeSection === 'all' || activeSection === 'certifications') && (
            <section id="resume-sec-certifications" className="resume-section" style={{ marginBottom: '1rem', scrollMarginTop: '6rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
                <Award size={16} style={{ color: 'var(--accent)' }} />
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                  Certifications & Accreditations
                </h2>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.875rem' }}>
                {certifications.map(cert => (
                  <a
                    key={cert.id}
                    href={cert.credentialUrl || cert.pdfUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={cert.credentialUrl ? 'Click to verify credential' : 'Click to view PDF'}
                    style={{ textDecoration: 'none', display: 'block' }}
                  >
                    <div
                      style={{
                        display: 'flex', flexDirection: 'column', gap: '0.375rem', padding: '0.75rem',
                        background: 'var(--surface-elevated)', borderRadius: '6px', border: '1px solid var(--border)',
                        cursor: 'pointer', transition: 'border-color 150ms ease, box-shadow 150ms ease',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = 'var(--accent)';
                        e.currentTarget.style.boxShadow = '0 0 0 1px var(--accent)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = 'var(--border)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)', marginTop: '0.375rem', flexShrink: 0 }} />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--foreground)' }}>
                            {cert.name}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--foreground-muted)' }}>
                            {cert.issuer} {cert.score ? `· Score: ${cert.score}` : ''} {cert.code ? `(${cert.code})` : ''}
                          </div>
                        </div>
                        {/* External link indicator */}
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="var(--foreground-muted)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.4, flexShrink: 0, marginTop: '0.25rem' }}>
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </div>
                      {(cert.credentialUrl || cert.pdfUrl) && (
                        <div style={{ display: 'flex', gap: '0.4rem', paddingLeft: '1.25rem' }} onClick={e => e.stopPropagation()}>
                          {cert.credentialUrl && (
                            <a
                              href={cert.credentialUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Verify credential"
                              style={{
                                display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                                fontSize: '0.625rem', fontFamily: 'var(--font-mono)',
                                color: 'var(--accent)', textDecoration: 'none',
                                border: '1px solid var(--accent)', borderRadius: '4px',
                                padding: '0.2rem 0.5rem', transition: 'background 150ms ease, color 150ms ease',
                              }}
                              onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = 'var(--background)'; }}
                              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--accent)'; }}
                            >
                              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
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
                                display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                                fontSize: '0.625rem', fontFamily: 'var(--font-mono)',
                                color: 'var(--foreground-muted)', textDecoration: 'none',
                                border: '1px solid var(--border)', borderRadius: '4px',
                                padding: '0.2rem 0.5rem', transition: 'background 150ms ease, color 150ms ease',
                              }}
                              onMouseEnter={e => { e.currentTarget.style.background = 'var(--surface)'; e.currentTarget.style.color = 'var(--foreground)'; }}
                              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--foreground-muted)'; }}
                            >
                              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
                              PDF
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            </section>
          )}
        </motion.div>
      </div>

      {/* ─── PRINT-SPECIFIC CSS ─── */}
      <style>{`
        @media print {
          /* Hide non-printable elements */
          header, footer, nav, .no-print, .custom-cursor, button, .ai-chat-window, [aria-label*="AI assistant"] {
            display: none !important;
          }
          
          /* Document layout for crisp paper print */
          body, html {
            background: #ffffff !important;
            color: #111827 !important;
            font-size: 11pt !important;
            line-height: 1.4 !important;
          }

          .resume-page {
            padding: 0 !important;
            margin: 0 !important;
          }

          .container {
            max-width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
          }

          .resume-sheet {
            background: #ffffff !important;
            border: none !important;
            box-shadow: none !important;
            padding: 0 !important;
            max-width: 100% !important;
            color: #111827 !important;
          }

          h1, h2, h3, strong {
            color: #000000 !important;
          }

          p, li, span, div {
            color: #1f2937 !important;
          }

          a {
            color: #000000 !important;
            text-decoration: none !important;
          }

          .resume-section {
            page-break-inside: avoid;
            break-inside: avoid;
            margin-bottom: 1.5rem !important;
          }

          @page {
            margin: 12mm 15mm;
            size: A4 portrait;
          }
        }

        @media (max-width: 768px) {
          .resume-sheet {
            padding: 1.75rem 1.25rem !important;
          }
        }
      `}</style>
    </div>
  )
}
