import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, ExternalLink, GitBranch, Mail, Download, ChevronDown } from 'lucide-react'
import { Github, Linkedin } from '../components/Icons'
import { projects } from '../data/projects'
import { siteConfig } from '../data/site'
import { experiences } from '../data/experience'
import { skillCategories } from '../data/skills'

// Animation helper
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
}

function SectionReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      custom={delay}
    >
      {children}
    </motion.div>
  )
}

// System diagram for hero
function SystemDiagram() {
  const nodes = ['IDEA', 'ARCHITECT', 'BUILD', 'DEPLOY', 'IMPROVE']
  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, userSelect: 'none' }}>
      {nodes.map((node, i) => (
        <div key={node} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2 + i * 0.12, duration: 0.4, ease: 'easeOut' }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.5rem 1.25rem',
              borderRadius: '6px',
              border: i === 0 ? '1px solid var(--accent)' : '1px solid var(--border)',
              background: i === 0 ? 'var(--accent-soft)' : 'var(--surface)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6875rem',
              letterSpacing: '0.1em',
              color: i === 0 ? 'var(--accent)' : 'var(--foreground-muted)',
              whiteSpace: 'nowrap',
            }}
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: 'var(--foreground-muted)', opacity: 0.6 }}>
              0{i + 1}
            </span>
            {node}
          </motion.div>
          {i < nodes.length - 1 && (
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 1.3 + i * 0.12, duration: 0.25 }}
              style={{ width: '1px', height: '28px', background: 'linear-gradient(to bottom, var(--accent), var(--border))', transformOrigin: 'top' }}
            />
          )}
        </div>
      ))}
    </div>
  )
}

// Credibility strip
function CredibilityStrip() {
  const items = ['AI / ML', 'FULL STACK', 'MOBILE', 'CYBERSECURITY', 'CLOUD', 'SYSTEMS']
  return (
    <div style={{
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
      padding: '1.5rem 0',
      overflow: 'hidden',
    }}>
      <div className="container">
        <div style={{ display: 'flex', gap: '3rem', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
          {items.map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8 + i * 0.07 }}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--accent)', flexShrink: 0 }} />
              <span className="text-label" style={{ color: 'var(--foreground-muted)', fontSize: '0.625rem' }}>{item}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Featured project card
function FeaturedProject({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const isEven = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '3rem',
        alignItems: 'center',
        paddingBottom: '4rem',
        marginBottom: '4rem',
        borderBottom: '1px solid var(--border)',
      }}
      className="featured-project-grid"
    >
      {/* Visual */}
      <div style={{ order: isEven ? 1 : 2 }}>
        <Link to={`/projects/${project.slug}`} aria-label={`View ${project.title} case study`}>
          <div style={{
            aspectRatio: '4/3',
            borderRadius: '12px',
            border: '1px solid var(--border)',
            background: `linear-gradient(135deg, var(--surface) 0%, color-mix(in srgb, ${project.color} 8%, var(--surface)) 100%)`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            transition: 'border-color 250ms ease, transform 250ms ease',
            cursor: 'pointer',
          }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--muted)'
              e.currentTarget.style.transform = 'translateY(-4px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            {/* Background grid */}
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: `linear-gradient(var(--border-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
              opacity: 0.5,
            }} />
            {/* Accent glow */}
            <div style={{
              position: 'absolute',
              width: '160px',
              height: '160px',
              borderRadius: '50%',
              background: `radial-gradient(circle, ${project.color}22 0%, transparent 70%)`,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }} />
            {/* Project number */}
            <div style={{ position: 'absolute', top: '1.25rem', left: '1.25rem', fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--foreground-muted)', opacity: 0.5 }}>
              {String(index + 1).padStart(2, '0')}
            </div>
            {/* Title */}
            <div style={{ position: 'relative', textAlign: 'center', padding: '1.5rem' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.5rem', letterSpacing: '-0.02em', color: 'var(--foreground)', marginBottom: '0.5rem' }}>
                {project.title}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', justifyContent: 'center' }}>
                {project.technologies.slice(0, 4).map(t => (
                  <span key={t} className="tech-pill">{t}</span>
                ))}
              </div>
            </div>
            {/* Status dot */}
            <div style={{ position: 'absolute', bottom: '1.25rem', right: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: project.status === 'deployed' ? '#22c55e' : project.status === 'in-progress' ? project.color : 'var(--foreground-muted)' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: 'var(--foreground-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {project.status === 'in-progress' ? 'Building' : project.status}
              </span>
            </div>
          </div>
        </Link>
      </div>

      {/* Content */}
      <div style={{ order: isEven ? 2 : 1 }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
          {project.category.slice(0, 2).map(cat => (
            <span key={cat} className="badge">{cat}</span>
          ))}
          <span className="badge" style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', color: 'var(--foreground-muted)', fontSize: '0.625rem' }}>
            {project.year}
          </span>
        </div>

        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', letterSpacing: '-0.025em', color: 'var(--foreground)', marginBottom: '0.75rem', lineHeight: 1.1 }}>
          {project.title}
        </h3>

        <p style={{ color: 'var(--foreground-muted)', fontSize: '0.9375rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
          {project.description}
        </p>

        {/* Problem → Solution */}
        <div style={{ background: 'var(--surface)', borderRadius: '8px', border: '1px solid var(--border)', padding: '1rem 1.25rem', marginBottom: '1.5rem' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--foreground-muted)', marginBottom: '0.375rem' }}>
            Problem
          </div>
          <div style={{ fontSize: '0.875rem', color: 'var(--foreground)', lineHeight: 1.6 }}>
            {project.problem.slice(0, 120)}...
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Link to={`/projects/${project.slug}`} className="btn btn-primary btn-sm">
            Read Case Study <ArrowRight size={13} />
          </Link>
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
              <GitBranch size={13} /> Code {project.slug === 'buspay' && <span style={{ opacity: 0.75, fontSize: '0.75rem', marginLeft: '0.25rem' }}>(In Progress...)</span>}
            </a>
          )}
          {project.liveUrl ? (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
              Live <ExternalLink size={12} />
            </a>
          ) : null}
        </div>
      </div>
    </motion.div>
  )
}

// Compact project row for Tier B/C
function CompactProjectRow({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.06 }}
    >
      <Link
        to={`/projects/${project.slug}`}
        style={{ display: 'block', textDecoration: 'none' }}
      >
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2rem 1fr auto',
          gap: '1.5rem',
          alignItems: 'center',
          padding: '1.125rem 0',
          borderBottom: '1px solid var(--border)',
          transition: 'opacity 200ms ease',
          cursor: 'pointer',
        }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--foreground-muted)', opacity: 0.5 }}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1rem', letterSpacing: '-0.01em', color: 'var(--foreground)', marginBottom: '0.25rem' }}>
              {project.title}
            </div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--foreground-muted)' }}>
              {project.subtitle}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
            <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
              {project.technologies.slice(0, 3).map(t => (
                <span key={t} className="badge" style={{ fontSize: '0.625rem' }}>{t}</span>
              ))}
            </div>
            <ArrowRight size={14} style={{ color: 'var(--foreground-muted)', flexShrink: 0 }} />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

// The System section
function TheSystem() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const nodes = [
    { label: 'IDEA', sub: 'Understand the real problem' },
    { label: 'ARCHITECTURE', sub: 'Design the system structure' },
    { label: 'CODE', sub: 'Write reliable, clean software' },
    { label: 'DATA', sub: 'Store and process intelligently' },
    { label: 'DEPLOYMENT', sub: 'Ship to production safely' },
    { label: 'FEEDBACK', sub: 'Iterate from real usage' },
  ]

  return (
    <section className="section" style={{ background: 'var(--background-alt)' }}>
      <div className="container">
        <SectionReveal>
          <div className="section-label">The System</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }} className="system-grid">
            <div>
              <h2 className="text-display" style={{ marginBottom: '1.5rem' }}>
                I don't just write code.<br />
                I think in systems.
              </h2>
              <p style={{ color: 'var(--foreground-muted)', fontSize: '1.0625rem', lineHeight: 1.75, maxWidth: '44ch' }}>
                Every engineering decision traces back to a problem. Every architecture reflects a set of trade-offs. Every deployment is a hypothesis. This is how I approach software.
              </p>
            </div>

            <motion.div
              ref={ref}
              style={{ display: 'flex', flexDirection: 'column', gap: 0 }}
            >
              {nodes.map((node, i) => (
                <motion.div
                  key={node.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.1, duration: 0.4, ease: 'easeOut' }}
                  style={{ display: 'flex', gap: '1.25rem', alignItems: 'stretch' }}
                >
                  {/* Connector */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, width: '20px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', border: '2px solid var(--accent)', background: 'var(--background-alt)', flexShrink: 0, marginTop: '1.5rem' }} />
                    {i < nodes.length - 1 && (
                      <div style={{ width: '1px', flex: 1, background: 'var(--border)', margin: '0 auto' }} />
                    )}
                  </div>
                  {/* Content */}
                  <div style={{ paddingBottom: i < nodes.length - 1 ? '1.25rem' : 0, paddingTop: '1rem' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', letterSpacing: '0.08em', color: 'var(--accent)', marginBottom: '0.25rem' }}>
                      {node.label}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--foreground-muted)' }}>
                      {node.sub}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </SectionReveal>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .system-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </section>
  )
}

// The Build section
function TheBuild() {
  const stages = [
    { num: '01', label: 'UNDERSTAND', desc: 'Research the problem domain. Talk to users. Understand constraints before touching the keyboard.' },
    { num: '02', label: 'DESIGN', desc: 'Sketch the architecture. Map data flows. Make trade-offs explicit before they become code.' },
    { num: '03', label: 'ENGINEER', desc: 'Write software that works, then software that is readable, then software that is efficient.' },
    { num: '04', label: 'TEST', desc: 'Edge cases are the real specification. Test aggressively against what you think cannot happen.' },
    { num: '05', label: 'DEPLOY', desc: 'Ship to production. Staged rollouts. Observe before celebrating.' },
    { num: '06', label: 'IMPROVE', desc: 'Real usage teaches things that no design review can. Learn, iterate, don\'t start over.' },
  ]

  return (
    <section className="section">
      <div className="container">
        <SectionReveal>
          <div className="section-label">The Build</div>
          <h2 className="text-display" style={{ marginBottom: '3rem', maxWidth: '20ch' }}>
            Engineering that moves from thinking to shipping.
          </h2>
        </SectionReveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden', background: 'var(--border)' }} className="build-grid">
          {stages.map((stage, i) => (
            <SectionReveal key={stage.num} delay={i * 0.06}>
              <div style={{
                background: 'var(--background)',
                padding: '2rem',
                height: '100%',
                transition: 'background 200ms ease',
              }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'var(--background)')}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', letterSpacing: '0.08em', color: 'var(--accent)', marginBottom: '0.75rem' }}>
                  {stage.num} — {stage.label}
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--foreground-muted)', lineHeight: 1.65 }}>
                  {stage.desc}
                </p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) { .build-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 480px) { .build-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}

export default function Home() {
  const featuredProjects = projects.filter(p => p.priority === 1)
  const secondaryProjects = projects.filter(p => p.priority === 2)
  const compactProjects = projects.filter(p => p.priority === 3)

  return (
    <>
      {/* ─── HERO ───────────────────────────────────────────────────────── */}
      <section
        className="hero-gradient"
        style={{ minHeight: '100dvh', paddingTop: '7rem', paddingBottom: '4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}
        aria-label="Hero section"
      >
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '4rem', alignItems: 'center' }} className="hero-grid">
            {/* Left — Text */}
            <div style={{ maxWidth: '700px' }}>
              {/* Label */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0.1}
                style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}
              >
                {/* Avatar */}
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  padding: '2px',
                  background: 'linear-gradient(135deg, var(--accent) 0%, #f59e0b 100%)',
                  flexShrink: 0,
                }}>
                  <div style={{ borderRadius: '50%', overflow: 'hidden', width: '100%', height: '100%' }}>
                    <img src="/arpit.jpg" alt="Arpit Kumar" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
                  </div>
                </div>
                <span className="text-label" style={{ color: 'var(--foreground-muted)' }}>
                  Computer Science Engineer
                </span>
                <span style={{ width: '1px', height: '12px', background: 'var(--border)' }} />
                <span className="text-mono" style={{ color: 'var(--foreground-muted)', fontSize: '0.625rem' }}>
                  Bengaluru, India
                </span>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0.2}
                className="text-display-xl"
                style={{ marginBottom: '1.5rem', color: 'var(--foreground)' }}
              >
                Building Intelligent
                <br />
                <span style={{ color: 'var(--foreground-muted)' }}>Software.</span>
              </motion.h1>

              {/* Sub-heading */}
              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0.35}
                style={{ fontSize: 'clamp(1rem, 1.75vw, 1.1875rem)', color: 'var(--foreground-muted)', lineHeight: 1.7, maxWidth: '52ch', marginBottom: '2.5rem' }}
              >
                I'm Arpit Kumar, a Computer Science Engineering student building AI-powered products,
                full-stack systems, mobile applications, and security-focused software.
                From architecture to deployment.
              </motion.p>

              {/* CTAs */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0.5}
                style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap', marginBottom: '3rem' }}
              >
                <Link to="/projects" className="btn btn-primary" id="hero-view-work">
                  View My Work <ArrowRight size={15} />
                </Link>
                {siteConfig.resumeUrl ? (
                  siteConfig.resumeUrl.startsWith('/') ? (
                    <Link to={siteConfig.resumeUrl} className="btn btn-ghost" id="hero-resume">
                      <Download size={14} /> Resume
                    </Link>
                  ) : (
                    <a href={siteConfig.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" id="hero-resume">
                      <Download size={14} /> Resume
                    </a>
                  )
                ) : null}
                <Link to="/contact" className="btn btn-ghost" id="hero-contact">
                  Get in Touch
                </Link>
              </motion.div>

              {/* Social Links */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0.62}
                style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}
              >
                <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" style={{ color: 'var(--foreground-muted)', display: 'flex', transition: 'color 150ms ease' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--foreground)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--foreground-muted)')}>
                  <Github size={19} />
                </a>
                <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ color: 'var(--foreground-muted)', display: 'flex', transition: 'color 150ms ease' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--foreground)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--foreground-muted)')}>
                  <Linkedin size={19} />
                </a>
                <a href={`mailto:${siteConfig.email}`} aria-label="Email" style={{ color: 'var(--foreground-muted)', display: 'flex', transition: 'color 150ms ease' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--foreground)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--foreground-muted)')}>
                  <Mail size={19} />
                </a>
                <span style={{ width: '1px', height: '16px', background: 'var(--border)', margin: '0 0.25rem' }} />
                <span style={{ fontSize: '0.8125rem', color: 'var(--foreground-muted)' }}>{siteConfig.availability}</span>
              </motion.div>
            </div>

            {/* Right — Photo + System Diagram */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}
              className="hero-diagram"
            >
              {/* Profile Photo */}
              <div style={{
                width: '180px',
                height: '180px',
                borderRadius: '50%',
                padding: '3px',
                background: 'linear-gradient(135deg, var(--accent) 0%, #f59e0b 50%, var(--accent) 100%)',
                boxShadow: '0 20px 60px -10px rgba(37,99,235,0.4)',
                animation: 'pulse-ring 3s ease-in-out infinite',
              }}>
                <div style={{ borderRadius: '50%', overflow: 'hidden', width: '100%', height: '100%' }}>
                  <img
                    src="/arpit.jpg"
                    alt="Arpit Kumar"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
                  />
                </div>
              </div>
              <SystemDiagram />
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2 }}
            style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.375rem' }}
            aria-hidden="true"
          >
            <span className="text-mono" style={{ fontSize: '0.625rem', color: 'var(--foreground-muted)', opacity: 0.6, letterSpacing: '0.08em' }}>SCROLL</span>
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}>
              <ChevronDown size={14} style={{ color: 'var(--foreground-muted)', opacity: 0.6 }} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── CREDIBILITY STRIP ───────────────────────────────────────────── */}
      <CredibilityStrip />

      {/* ─── SELECTED WORK — FEATURED ────────────────────────────────────── */}
      <section className="section" id="work">
        <div className="container">
          <SectionReveal>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <div className="section-label">Selected Work</div>
                <h2 className="text-display">
                  Systems, products and experiments<br />I've designed, built and shipped.
                </h2>
              </div>
              <Link to="/projects" className="btn btn-ghost" style={{ alignSelf: 'flex-start' }}>
                All Projects <ArrowRight size={14} />
              </Link>
            </div>
          </SectionReveal>

          {featuredProjects.map((project, i) => (
            <FeaturedProject key={project.slug} project={project} index={i} />
          ))}

          {/* Secondary Projects Header */}
          <SectionReveal>
            <div style={{ marginTop: '2rem', marginBottom: '1rem' }}>
              <h3 className="text-subheading" style={{ color: 'var(--foreground-muted)', marginBottom: '0.25rem' }}>More Projects</h3>
            </div>
          </SectionReveal>

          {[...secondaryProjects, ...compactProjects].map((project, i) => (
            <CompactProjectRow key={project.slug} project={project} index={i} />
          ))}
        </div>
      </section>

      {/* ─── THE SYSTEM ──────────────────────────────────────────────────── */}
      <TheSystem />

      {/* ─── THE BUILD ───────────────────────────────────────────────────── */}
      <TheBuild />

      {/* ─── EXPERIENCE TEASER ───────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <SectionReveal>
            <div className="section-label">Experience</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }} className="exp-teaser-grid">
              <div>
                <h2 className="text-display" style={{ marginBottom: '1.5rem' }}>
                  Professional engineering, already in production.
                </h2>
                <p style={{ color: 'var(--foreground-muted)', fontSize: '1rem', lineHeight: 1.75, marginBottom: '1.5rem' }}>
                  As an AI Developer Intern at COGNIQ AI, I worked on real products: building the PawDex pet health platform, CRM software, and REST APIs in a production Python/FastAPI environment.
                </p>
                <Link to="/about" className="btn btn-ghost">
                  Full Background <ArrowRight size={14} />
                </Link>
              </div>
              <div>
                {experiences.map(exp => (
                  <div key={exp.id} className="experience-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <div>
                        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.125rem', letterSpacing: '-0.01em', color: 'var(--foreground)', marginBottom: '0.25rem' }}>
                          {exp.company}
                        </div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--accent)', marginBottom: '0.25rem' }}>
                          {exp.role}
                        </div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--foreground-muted)' }}>
                          {exp.duration} · {exp.mode}
                        </div>
                      </div>
                      <span className="badge">{exp.type}</span>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                      {exp.technologies.slice(0, 6).map(t => (
                        <span key={t} className="tech-pill">{t}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>
        </div>
        <style>{`
          @media (max-width: 768px) { .exp-teaser-grid { grid-template-columns: 1fr !important; gap: 2rem !important; } }
        `}</style>
      </section>

      {/* ─── SKILLS OVERVIEW ─────────────────────────────────────────────── */}
      <section className="section" style={{ borderTop: '1px solid var(--border)', background: 'var(--background-alt)' }}>
        <div className="container">
          <SectionReveal>
            <div className="section-label">Technical Stack</div>
            <h2 className="text-display" style={{ marginBottom: '3rem' }}>
              The tools I reach for.
            </h2>
          </SectionReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }} className="skills-overview-grid">
            {skillCategories.slice(0, 4).map((cat, i) => (
              <SectionReveal key={cat.name} delay={i * 0.07}>
                <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '10px', padding: '1.5rem' }}>
                  <div className="text-label" style={{ color: 'var(--foreground-muted)', marginBottom: '1rem' }}>{cat.name}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                    {cat.skills.map(skill => (
                      <div key={skill} style={{ fontSize: '0.9rem', color: 'var(--foreground)', fontWeight: 450 }}>{skill}</div>
                    ))}
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
          <SectionReveal delay={0.2}>
            <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
              <Link to="/about#skills" className="btn btn-ghost">
                Full Skill Set <ArrowRight size={14} />
              </Link>
            </div>
          </SectionReveal>
        </div>
        <style>{`
          @media (max-width: 1024px) { .skills-overview-grid { grid-template-columns: repeat(2, 1fr) !important; } }
          @media (max-width: 480px) { .skills-overview-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* ─── CONTACT CTA ─────────────────────────────────────────────────── */}
      <section className="section">
        <div className="container" style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
          <SectionReveal>
            <div className="section-label" style={{ justifyContent: 'center' }}>Contact</div>
            <h2 className="text-display-lg" style={{ marginBottom: '1.5rem' }}>
              Let's build something useful.
            </h2>
            <p style={{ fontSize: '1.0625rem', color: 'var(--foreground-muted)', lineHeight: 1.75, marginBottom: '2.5rem' }}>
              I'm open to full-time roles, internships, research collaborations, and discussions on complex engineering challenges.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href={`mailto:${siteConfig.email}`} className="btn btn-primary">
                <Mail size={15} /> Send Email
              </a>
              <Link to="/contact" className="btn btn-ghost">
                Contact Form <ArrowRight size={14} />
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .hero-diagram { display: none !important; }
          .featured-project-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .featured-project-grid > div:first-child { order: 1 !important; }
          .featured-project-grid > div:last-child { order: 2 !important; }
        }
      `}</style>
    </>
  )
}
