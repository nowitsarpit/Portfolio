import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { ArrowRight, Search, ExternalLink, X, GraduationCap, FolderGit2 } from 'lucide-react'
import { Github } from '../components/Icons'
import { projects, type Project } from '../data/projects'

const CATEGORIES = ['ALL', 'AI / ML', 'FULL STACK', 'MOBILE', 'CYBERSECURITY', 'SAAS', 'SYSTEMS', 'RESEARCH']

function mapCategory(cat: string, projectCategories: string[]): boolean {
  if (cat === 'ALL') return true
  const lower = cat.toLowerCase()
  return projectCategories.some(c => c.toLowerCase().includes(lower.replace('saas', 'saas').replace('ai / ml', 'ai')))
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView && { opacity: 1, y: 0 } || {}}
      transition={{ duration: 0.45, delay: (index % 6) * 0.07, ease: [0.22, 1, 0.36, 1] }}
      layout
    >
      <Link to={`/projects/${project.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
        <div className="project-card" style={{ cursor: 'pointer' }}>
          {/* Visual */}
          <div style={{
            aspectRatio: '16/9',
            background: `linear-gradient(135deg, var(--surface) 0%, color-mix(in srgb, ${project.color} 10%, var(--surface)) 100%)`,
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            padding: '2rem',
          }}>
            {/* Grid pattern */}
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: `linear-gradient(var(--border-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px)`,
              backgroundSize: '32px 32px',
              opacity: 0.6,
            }} />
            {/* Glow */}
            <div style={{
              position: 'absolute',
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: `radial-gradient(circle, ${project.color}1a 0%, transparent 70%)`,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }} />
            {/* Priority indicator */}
            {project.priority === 1 && (
              <div style={{ position: 'absolute', top: '1rem', right: '1rem', fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.08em', color: project.color, textTransform: 'uppercase' }}>
                Featured
              </div>
            )}
            {/* Project name */}
            <div style={{ position: 'relative', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem', letterSpacing: '-0.02em', color: 'var(--foreground)' }}>
                {project.title}
              </div>
            </div>
            {/* Year */}
            <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: 'var(--foreground-muted)', opacity: 0.5 }}>
              {project.year}
            </div>
            {/* Status */}
            <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: project.liveUrl ? '#22c55e' : project.status === 'in-progress' ? project.color : 'var(--muted)' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--foreground-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {project.liveUrl ? 'Live' : project.status === 'in-progress' ? 'Building' : 'Completed'}
              </span>
            </div>
          </div>

          {/* Info */}
          <div style={{ padding: '1.375rem' }}>
            <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
              {project.category.slice(0, 2).map(cat => (
                <span key={cat} className="badge" style={{ fontSize: '0.625rem' }}>{cat}</span>
              ))}
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.0625rem', letterSpacing: '-0.01em', color: 'var(--foreground)', marginBottom: '0.5rem', lineHeight: 1.3 }}>
              {project.subtitle}
            </h3>
            <p style={{ fontSize: '0.8375rem', color: 'var(--foreground-muted)', lineHeight: 1.6, marginBottom: '1.125rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {project.description}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginBottom: '1rem' }}>
              {project.technologies.slice(0, 4).map(t => (
                <span key={t} className="tech-pill">{t}</span>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8125rem', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '0.375rem', fontWeight: 500 }}>
                Case Study <ArrowRight size={12} />
              </span>
              <div style={{ display: 'flex', gap: '0.5rem' }} onClick={e => e.preventDefault()}>
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} source code`} style={{ color: 'var(--foreground-muted)', display: 'flex', transition: 'color 150ms ease' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--foreground)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--foreground-muted)')}>
                    <Github size={15} />
                  </a>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} live demo`} style={{ color: 'var(--foreground-muted)', display: 'flex', transition: 'color 150ms ease' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--foreground)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--foreground-muted)')}>
                    <ExternalLink size={15} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function Projects() {
  const [projectGroup, setProjectGroup] = useState<'all' | 'personal' | 'academic'>('all')
  const [activeFilter, setActiveFilter] = useState('ALL')
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = projects.filter(p => {
    const matchesGroup = projectGroup === 'all' || (p.projectType || 'personal') === projectGroup
    const matchesCategory = mapCategory(activeFilter, p.category)
    const q = searchQuery.toLowerCase()
    const matchesSearch = !q ||
      p.title.toLowerCase().includes(q) ||
      p.subtitle.toLowerCase().includes(q) ||
      p.technologies.some(t => t.toLowerCase().includes(q)) ||
      p.category.some(c => c.toLowerCase().includes(q))
    return matchesGroup && matchesCategory && matchesSearch
  })

  // Sort by priority
  const sorted = [...filtered].sort((a, b) => a.priority - b.priority)

  useEffect(() => {
    document.title = 'Projects — Arpit Kumar'
  }, [])

  return (
    <div style={{ paddingTop: '5rem', minHeight: '100vh' }}>
      {/* Header */}
      <section style={{ padding: '4rem 0 2.5rem', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="section-label">Engineering Portfolio</div>
            <h1 className="text-display-lg" style={{ marginBottom: '1rem' }}>Projects</h1>
            <p style={{ color: 'var(--foreground-muted)', fontSize: '1.0625rem', maxWidth: '58ch', lineHeight: 1.7, marginBottom: '2rem' }}>
              Explore production applications and engineering systems, categorized into Personal builds and Academic research milestones.
            </p>

            {/* Scope Switcher: All vs Personal vs Academic */}
            <div style={{ display: 'inline-flex', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', padding: '3px' }}>
              <button
                onClick={() => setProjectGroup('all')}
                style={{
                  background: projectGroup === 'all' ? 'var(--accent)' : 'transparent',
                  color: projectGroup === 'all' ? '#fff' : 'var(--foreground-muted)',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '7px 14px',
                  fontSize: '0.8125rem',
                  fontFamily: 'var(--font-mono)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'all 150ms ease',
                }}
              >
                All ({projects.length})
              </button>
              <button
                onClick={() => setProjectGroup('personal')}
                style={{
                  background: projectGroup === 'personal' ? 'var(--accent)' : 'transparent',
                  color: projectGroup === 'personal' ? '#fff' : 'var(--foreground-muted)',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '7px 14px',
                  fontSize: '0.8125rem',
                  fontFamily: 'var(--font-mono)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'all 150ms ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <FolderGit2 size={13} /> Personal ({projects.filter(p => (p.projectType || 'personal') === 'personal').length})
              </button>
              <button
                onClick={() => setProjectGroup('academic')}
                style={{
                  background: projectGroup === 'academic' ? 'var(--accent)' : 'transparent',
                  color: projectGroup === 'academic' ? '#fff' : 'var(--foreground-muted)',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '7px 14px',
                  fontSize: '0.8125rem',
                  fontFamily: 'var(--font-mono)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'all 150ms ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <GraduationCap size={14} /> Academic ({projects.filter(p => p.projectType === 'academic').length})
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters + Search */}
      <section style={{ padding: '1.25rem 0', borderBottom: '1px solid var(--border)', position: 'sticky', top: '56px', zIndex: 40, background: 'var(--background)', backdropFilter: 'blur(12px)' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            {/* Filter tabs */}
            <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }} role="tablist" aria-label="Filter projects by category">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  className={`filter-tab ${activeFilter === cat ? 'active' : ''}`}
                  onClick={() => setActiveFilter(cat)}
                  role="tab"
                  aria-selected={activeFilter === cat}
                  id={`filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search */}
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <Search size={14} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--foreground-muted)', pointerEvents: 'none' }} />
              <input
                type="search"
                placeholder="Search by project or technology..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="form-input"
                style={{ width: '240px', height: '36px', paddingLeft: '2.25rem', paddingRight: searchQuery ? '2rem' : '0.875rem' }}
                aria-label="Search projects"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{ position: 'absolute', right: '0.5rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--foreground-muted)', display: 'flex' }}
                  aria-label="Clear search"
                >
                  <X size={13} />
                </button>
              )}
            </div>
          </div>

          {/* Results count */}
          <div style={{ marginTop: '0.75rem' }}>
            <span className="text-mono" style={{ fontSize: '0.6875rem', color: 'var(--foreground-muted)' }}>
              {sorted.length} of {projects.length} projects
              {activeFilter !== 'ALL' && ` in ${activeFilter}`}
              {searchQuery && ` matching "${searchQuery}"`}
            </span>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section style={{ padding: '3rem 0 6rem' }}>
        <div className="container">
          <AnimatePresence mode="wait">
            {sorted.length > 0 ? (
              <motion.div
                key={activeFilter + searchQuery}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}
                className="projects-grid"
              >
                {sorted.map((project, i) => (
                  <ProjectCard key={project.slug} project={project} index={i} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ textAlign: 'center', padding: '6rem 0', color: 'var(--foreground-muted)' }}
              >
                <Search size={32} style={{ margin: '0 auto 1rem', opacity: 0.4 }} />
                <p style={{ fontSize: '1rem' }}>No projects found for "{searchQuery}"</p>
                <button onClick={() => { setSearchQuery(''); setActiveFilter('ALL') }} className="btn btn-ghost" style={{ marginTop: '1rem' }}>
                  Clear filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <style>{`
        @media (max-width: 1024px) { .projects-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 600px) { .projects-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  )
}
