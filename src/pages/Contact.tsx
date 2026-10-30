import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Send, Mail, CheckCircle, AlertCircle, Phone, MessageCircle } from 'lucide-react'
import { Github, Linkedin } from '../components/Icons'
import { siteConfig } from '../data/site'

type FormState = 'idle' | 'loading' | 'success' | 'error'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [state, setState] = useState<FormState>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => { document.title = 'Contact — Arpit Kumar' }, [])

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email is required'
    if (!form.message.trim() || form.message.length < 10) e.message = 'Message must be at least 10 characters'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setState('loading')

    // Contact form abstraction
    // Configure VITE_CONTACT_ENDPOINT in .env to connect to Resend, Formspree, or similar
    const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT

    if (!endpoint) {
      // Graceful fallback — show mailto link
      window.location.href = `mailto:${siteConfig.email}?subject=Portfolio Contact from ${encodeURIComponent(form.name)}&body=${encodeURIComponent(form.message)}`
      setState('idle')
      return
    }

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, _subject: `Portfolio contact from ${form.name}` }),
      })
      if (!res.ok) throw new Error('Submission failed')
      setState('success')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setState('error')
    }
  }

  return (
    <div style={{ paddingTop: '5rem', minHeight: '100vh' }}>
      {/* Header */}
      <section style={{ padding: '4rem 0 4rem', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
            <div className="section-label">Contact</div>
            <h1 className="text-display-lg" style={{ marginBottom: '1rem' }}>
              Let's build something useful.
            </h1>
            <p style={{ fontSize: '1.0625rem', color: 'var(--foreground-muted)', maxWidth: '50ch', lineHeight: 1.75 }}>
              I'm open to full-time roles, internships, research discussions, and high-impact engineering projects. Use the form below or reach out directly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '5rem', alignItems: 'start' }} className="contact-grid">

            {/* Left — Direct Links */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1, duration: 0.5 }}>
              <div className="section-label">Direct</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
                <a href={`mailto:${siteConfig.email}`} style={{
                  display: 'flex', alignItems: 'center', gap: '1rem',
                  background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '10px',
                  padding: '1.25rem', textDecoration: 'none', color: 'var(--foreground)',
                  transition: 'border-color 150ms ease, transform 150ms ease',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none' }}
                >
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--accent-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Mail size={16} style={{ color: 'var(--accent)' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.6875rem', color: 'var(--foreground-muted)', marginBottom: '0.2rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Email</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>{siteConfig.email}</div>
                  </div>
                </a>

                <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" style={{
                  display: 'flex', alignItems: 'center', gap: '1rem',
                  background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '10px',
                  padding: '1.25rem', textDecoration: 'none', color: 'var(--foreground)',
                  transition: 'border-color 150ms ease, transform 150ms ease',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--muted)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none' }}
                >
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--surface-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Linkedin size={16} style={{ color: 'var(--foreground-muted)' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.6875rem', color: 'var(--foreground-muted)', marginBottom: '0.2rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>LinkedIn</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>Connect professionally ↗</div>
                  </div>
                </a>

                <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" style={{
                  display: 'flex', alignItems: 'center', gap: '1rem',
                  background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '10px',
                  padding: '1.25rem', textDecoration: 'none', color: 'var(--foreground)',
                  transition: 'border-color 150ms ease, transform 150ms ease',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--muted)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none' }}
                >
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--surface-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Github size={16} style={{ color: 'var(--foreground-muted)' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.6875rem', color: 'var(--foreground-muted)', marginBottom: '0.2rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>GitHub</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>View my code ↗</div>
                  </div>
                </a>

                <a href={`https://wa.me/91${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer" style={{
                  display: 'flex', alignItems: 'center', gap: '1rem',
                  background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '10px',
                  padding: '1.25rem', textDecoration: 'none', color: 'var(--foreground)',
                  transition: 'border-color 150ms ease, transform 150ms ease',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#25D366'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none' }}
                >
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(37,211,102,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <MessageCircle size={16} style={{ color: '#25D366' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.6875rem', color: 'var(--foreground-muted)', marginBottom: '0.2rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>WhatsApp</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>+91 {siteConfig.whatsapp} ↗</div>
                  </div>
                </a>

                <a href={`tel:+91${siteConfig.phone}`} style={{
                  display: 'flex', alignItems: 'center', gap: '1rem',
                  background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '10px',
                  padding: '1.25rem', textDecoration: 'none', color: 'var(--foreground)',
                  transition: 'border-color 150ms ease, transform 150ms ease',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none' }}
                >
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--accent-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Phone size={16} style={{ color: 'var(--accent)' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.6875rem', color: 'var(--foreground-muted)', marginBottom: '0.2rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Phone</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>+91 {siteConfig.phone}</div>
                  </div>
                </a>
              </div>

              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '10px', padding: '1.5rem' }}>
                <div className="text-label" style={{ color: 'var(--foreground-muted)', marginBottom: '0.75rem' }}>Location</div>
                <div style={{ fontSize: '0.9375rem', color: 'var(--foreground)', marginBottom: '0.25rem' }}>Bengaluru, India</div>
                <div style={{ fontSize: '0.875rem', color: 'var(--foreground-muted)' }}>IST (UTC+5:30)</div>
                <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e' }} />
                    <span style={{ fontSize: '0.875rem', color: 'var(--foreground-muted)' }}>{siteConfig.availability}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right — Form */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15, duration: 0.5 }}>
              {state === 'success' ? (
                <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                  <CheckCircle size={40} style={{ color: '#22c55e', margin: '0 auto 1rem' }} />
                  <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.25rem', color: 'var(--foreground)', marginBottom: '0.75rem' }}>Message sent.</h2>
                  <p style={{ color: 'var(--foreground-muted)', fontSize: '0.9375rem' }}>I'll get back to you as soon as I can.</p>
                  <button onClick={() => setState('idle')} className="btn btn-ghost" style={{ marginTop: '1.5rem' }}>Send another</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div style={{ display: 'grid', gap: '1.25rem' }}>
                    <div>
                      <label htmlFor="contact-name" className="form-label">Name</label>
                      <input
                        id="contact-name"
                        type="text"
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        className="form-input"
                        placeholder="Your name"
                        autoComplete="name"
                        aria-required="true"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                      />
                      {errors.name && <div id="name-error" style={{ fontSize: '0.8125rem', color: '#ef4444', marginTop: '0.375rem' }}>{errors.name}</div>}
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="form-label">Email</label>
                      <input
                        id="contact-email"
                        type="email"
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        className="form-input"
                        placeholder="your@email.com"
                        autoComplete="email"
                        aria-required="true"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                      />
                      {errors.email && <div id="email-error" style={{ fontSize: '0.8125rem', color: '#ef4444', marginTop: '0.375rem' }}>{errors.email}</div>}
                    </div>

                    <div>
                      <label htmlFor="contact-message" className="form-label">Message</label>
                      <textarea
                        id="contact-message"
                        value={form.message}
                        onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                        className="form-input"
                        placeholder="What would you like to talk about?"
                        rows={6}
                        style={{ resize: 'vertical', minHeight: '140px' }}
                        aria-required="true"
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? 'message-error' : undefined}
                      />
                      {errors.message && <div id="message-error" style={{ fontSize: '0.8125rem', color: '#ef4444', marginTop: '0.375rem' }}>{errors.message}</div>}
                    </div>

                    {state === 'error' && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ef4444', fontSize: '0.875rem', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '6px', padding: '0.75rem 1rem' }}>
                        <AlertCircle size={15} />
                        Something went wrong. Please try emailing directly.
                      </div>
                    )}

                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={state === 'loading'}
                      style={{ alignSelf: 'flex-start', opacity: state === 'loading' ? 0.7 : 1 }}
                      id="contact-submit"
                    >
                      {state === 'loading' ? (
                        <>Sending...</>
                      ) : (
                        <><Send size={15} /> Send Message</>
                      )}
                    </button>

                    {!import.meta.env.VITE_CONTACT_ENDPOINT && (
                      <p style={{ fontSize: '0.8125rem', color: 'var(--foreground-muted)', lineHeight: 1.6 }}>
                        No contact endpoint configured? The button will open your email client directly.
                        Set <code style={{ fontFamily: 'var(--font-mono)', background: 'var(--surface)', padding: '0.125rem 0.375rem', borderRadius: '3px' }}>VITE_CONTACT_ENDPOINT</code> to enable form submission.
                      </p>
                    )}
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </div>
        <style>{`@media (max-width: 768px) { .contact-grid { grid-template-columns: 1fr !important; gap: 3rem !important; } }`}</style>
      </section>
    </div>
  )
}
