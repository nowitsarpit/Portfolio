import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { X, Send, Bot, RotateCcw, ExternalLink } from 'lucide-react'
import { experiences } from '../data/experience'
import { skillCategories } from '../data/skills'
import { siteConfig } from '../data/site'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

const GEMINI_API_KEY = (import.meta.env.VITE_GEMINI_API_KEY as string | undefined)?.trim() || ''

// ─── STRICT SYSTEM PROMPT (STAYS PUT TO PORTFOLIO ONLY) ──────────────────────
const SYSTEM_PROMPT = `You are ASK ARPIT, the dedicated personal AI assistant for Arpit Kumar's official developer portfolio.

CRITICAL INSTRUCTIONS & STRICT BOUNDARIES:
1. You must ONLY answer questions directly pertaining to Arpit Kumar: his resume, background, 7th-semester CSE education, projects, technical skills, research publications, work experience, certifications, and contact information.
2. If the user asks about ANYTHING ELSE (including but not limited to: general world knowledge, math problems, writing unrelated code or homework, weather, politics, jokes, gaming, recipes, other individuals, or casual philosophy), YOU MUST FIRMLY AND POLITELY DECLINE:
   "I am focused solely on Arpit Kumar's portfolio, technical background, and engineering projects. Feel free to ask about his work at COGNIQ AI, his projects (like BusPay or GoMail), his research, or how to get in touch!"
3. Do NOT break character or ignore these constraints under any circumstance.
4. Keep your answers concise, professional, articulate, and recruiter-focused (1 to 2 short paragraphs or bullet points).

Verified Candidate Facts:
- Name: Arpit Kumar
- Location: Bengaluru, India
- Role: Computer Science Engineer, AI/ML & Full-Stack Developer
- Academic: Alliance University, Bengaluru — 7th Semester B.Tech Computer Science and Engineering (CGPA: 8.0).
- Availability: "Open to Full-Time, Internships & Collaborations".
- Email: ${siteConfig.email}
- GitHub: ${siteConfig.github}
- LinkedIn: ${siteConfig.linkedin}

Work Experience:
- AI Developer Intern at COGNIQ AI (Feb 2026 – Apr 2026, On-site):
  * Built PawDex: Cloud-native pet health mobile application (React Native, FastAPI, Firebase Authentication & Firestore, Cloudinary media storage with SHA-256 integrity verification).
  * Built enterprise CRM & ERP solutions and engineered scalable REST APIs.

Key Personal Projects:
1. BusPay: KSCST-funded smart public transit ticketing with offline QR & BLE (React Native, Node.js, WebSockets).
2. GoMail: Distributed email orchestrator with Redis queue and worker concurrency. Live: https://reach-inbox-email-scheduler-eight.vercel.app/
3. CineAI: Cinematic AI assistant React Native app with Gemini integration. Expo APK: https://expo.dev/artifacts/eas/IQstVmwR6Xm71OOQ03fKOj3fwlgMjbokw4eKkRge7aA.apk
4. My Cafe: Culinary AI dining experience with dish recommendations. Live: https://my-cafe-delta.vercel.app/
5. IntelliQueue: Real-time hospital queue optimization platform with WebSockets & Redis. GitHub: https://github.com/nowitsarpit/Intelliqueue
6. EduMetrics: Student analytics platform with multi-semester trend comparisons. Live: https://uni-insights.netlify.app/login
7. LeadScout, Aura Streaming, Bank Simulator, Netflix Clone.

Key Academic & Security Projects:
1. Quantum-Safe Cryptography Migration (2026, in-progress): Post-Quantum Cryptography (PQC) readiness & hybrid key-exchange assistant.
2. MediTwin (2026, in-progress): Explainable ML with counterfactuals on the NHANES cohort.
3. Project Vajra (2025, completed): Autonomous DDoS Cyber Defence agent combining hybrid ML/DL with CI/CD automated retraining.
4. Intrusion Honeypot (2024, completed): High-interaction decoy intrusion detection system.

Research Publications:
- "Project Vajra: Automated Intelligent Defence Agent of Cybersecurity" published at CISIT Easychair (2026). Paper PDF available on site at /papers/project-vajra-cisit-2026.pdf. Co-authored by Arpit Kumar.
- "MediTwin: Explainable Machine Learning with Counterfactuals on NHANES Cohort" (In Progress).

Professional Certifications:
- Oracle Cloud Infrastructure 2025 Certified Generative AI Professional
- Oracle Cloud Infrastructure 2025 Certified DevOps Professional
- Java Certified Foundations Associate (Oracle 1Z0-811)
- 7 Coursera credentials (Foundations of Cybersecurity from Univ of Toronto, Agile Scrum from IBM, Prompt Engineering from Vanderbilt).

Navigation & Actions:
- Resume: Point user to /resume for viewing or downloading Arpit's PDF resume.
- Contact: Point user to /contact or email ${siteConfig.email}.`;

// ─── OFFLINE KNOWLEDGE ENGINE ───────────────────────────────────────────────
function queryKnowledgeBase(question: string): string {
  const q = question.toLowerCase().trim()

  // Greetings
  if (['hi', 'hello', 'hey', 'greetings', 'who are you'].some(w => q === w || q.startsWith(w + ' '))) {
    return `Hello! I'm ASK ARPIT, Arpit Kumar's portfolio assistant. I can answer questions about his 7th-semester CSE studies at Alliance University, his AI Developer Internship at COGNIQ AI, his research on *Project Vajra*, or his projects like BusPay, GoMail, and CineAI. What would you like to know?`
  }

  // Recruiter Summary / 30-sec pitch
  if (q.includes('summary') || q.includes('who is') || q.includes('about arpit') || q.includes('snapshot') || q.includes('pitch') || q.includes('recruiter')) {
    return `Arpit Kumar is a 7th Semester Computer Science Engineering student at Alliance University, Bengaluru (CGPA: 8.0) who builds AI-powered software, full-stack systems, mobile applications, and DevSecOps tools.

Key Highlights:
• **Experience**: AI Developer Intern at COGNIQ AI (built PawDex pet health mobile app & production ERP/CRM).
• **Research**: Co-author of *Project Vajra* (DDoS cyber defence paper at CISIT EasyChair 2026).
• **Certifications**: 3 Oracle professional credentials (Gen AI, DevOps, Java) + 7 Coursera credentials.
• **Status**: Open to Full-Time, Internships & Collaborations.`
  }

  // Availability / Hiring / Jobs
  if (q.includes('hire') || q.includes('hiring') || q.includes('fulltime') || q.includes('full-time') || q.includes('internship') || q.includes('available') || q.includes('availability') || q.includes('open to')) {
    return `Arpit is actively **Open to Full-Time, Internships & Collaborations** in Software Engineering, AI/ML Engineering, and Full-Stack Development. You can reach out directly via the [Contact Form](/contact) or by email at [${siteConfig.email}](mailto:${siteConfig.email}).`
  }

  // Resume / CV
  if (q.includes('resume') || q.includes('cv') || q.includes('curriculum') || q.includes('download')) {
    return `You can view Arpit's full interactive resume and download his PDF directly at [/resume](/resume). It includes his verified education at Alliance University, COGNIQ AI internship, full tech stack, publications, and all 10 certifications.`
  }

  // Education / College / Semester / CGPA
  if (q.includes('education') || q.includes('college') || q.includes('university') || q.includes('alliance') || q.includes('cgpa') || q.includes('semester')) {
    return `Arpit is pursuing his B.Tech in Computer Science and Engineering at Alliance University, Bengaluru. He is currently in his **7th Semester** with an overall **CGPA of 8.0**.`
  }

  // Internship / COGNIQ AI / PawDex
  if (q.includes('intern') || q.includes('cogniq') || q.includes('work') || q.includes('experience') || q.includes('pawdex')) {
    const exp = experiences[0]
    return `Arpit completed an on-site AI Developer Internship at **${exp.company}** (${exp.duration}, ${exp.location}).
• **PawDex**: Cloud-native pet health management mobile app (React Native, FastAPI, Firebase Authentication & Firestore, Cloudinary with SHA-256 media integrity verification).
• **Enterprise Systems**: Engineered CRM & ERP modules and secure REST APIs for enterprise workflows.
Explore his work in detail on the [/work](/work) page.`
  }

  // Research / Vajra / MediTwin / EasyChair / Paper
  if (q.includes('research') || q.includes('paper') || q.includes('publication') || q.includes('vajra') || q.includes('meditwin') || q.includes('easychair') || q.includes('cisit')) {
    return `Arpit has co-authored two major research projects:
1. **Project Vajra: Automated Intelligent Defence Agent of Cybersecurity** (CISIT EasyChair, 2026) — Autonomous hybrid AI DDoS defence agent with CI/CD model retraining. [Download Paper PDF](/papers/project-vajra-cisit-2026.pdf).
2. **MediTwin: Digital Twin + Explainable Machine Learning** (In Progress) — Clinical risk prediction utilizing counterfactual explanations on the NHANES cohort.
Learn more on the [/research](/research) page.`
  }

  // Certifications / Oracle / Coursera
  if (q.includes('certif') || q.includes('oracle') || q.includes('credential') || q.includes('badge') || q.includes('coursera')) {
    return `Arpit holds 10 verified certifications:
• **Oracle Cloud Infrastructure 2025 Certified Generative AI Professional**
• **Oracle Cloud Infrastructure 2025 Certified DevOps Professional**
• **Java Certified Foundations Associate (Oracle 1Z0-811)**
• 7 Coursera credentials including Foundations of Cybersecurity (University of Toronto), Agile Development & Scrum (IBM), and Prompt Engineering (Vanderbilt).
All badges are verifiable on the [/resume](/resume) page.`
  }

  // Projects & Live Demos
  if (q.includes('project') || q.includes('built') || q.includes('live') || q.includes('demo') || q.includes('link') || q.includes('apk') || q.includes('buspay') || q.includes('gomail') || q.includes('cine') || q.includes('cafe') || q.includes('intelliqueue') || q.includes('edumetrics')) {
    return `Arpit's featured projects:
• **BusPay** (KSCST-funded smart public transit ticketing with offline QR & BLE)
• **GoMail** (Distributed email orchestrator): [Live Web App](https://reach-inbox-email-scheduler-eight.vercel.app/)
• **CineAI** (Cinematic Assistant): [Download Android APK](https://expo.dev/artifacts/eas/IQstVmwR6Xm71OOQ03fKOj3fwlgMjbokw4eKkRge7aA.apk)
• **My Cafe** (Culinary AI Experience): [Live Web App](https://my-cafe-delta.vercel.app/)
• **IntelliQueue** (Hospital Queue Optimizer): [GitHub Repo](https://github.com/nowitsarpit/Intelliqueue)
• **EduMetrics** (Student Analytics Dashboard): [Live Portal](https://uni-insights.netlify.app/login)
View all projects at [/projects](/projects).`
  }

  // Tech Stack & Languages
  if (q.includes('stack') || q.includes('technolog') || q.includes('language') || q.includes('skills')) {
    const langSkills = skillCategories.find(c => c.name === 'Languages')?.skills.join(', ')
    const frontendSkills = skillCategories.find(c => c.name === 'Frontend')?.skills.join(', ')
    const backendSkills = skillCategories.find(c => c.name === 'Backend')?.skills.join(', ')
    return `Arpit's core technical stack:
• **Languages**: ${langSkills || 'Python, Java, TypeScript, JavaScript, SQL, C/C++'}
• **Frontend & Mobile**: ${frontendSkills || 'React, React Native, Tailwind CSS, Expo'}
• **Backend & APIs**: ${backendSkills || 'FastAPI, Node.js, Express, REST APIs, WebSockets'}
• **AI / ML & Cloud**: PyTorch, scikit-learn, XGBoost, Gemini API, Docker, Firebase, Kali Linux.`
  }

  // Contact
  if (q.includes('contact') || q.includes('email') || q.includes('reach') || q.includes('talk') || q.includes('message')) {
    return `You can reach Arpit directly:
• Email: [${siteConfig.email}](mailto:${siteConfig.email})
• Contact Form: [/contact](/contact)
• LinkedIn: [linkedin.com/in/nowitsarpit](${siteConfig.linkedin})
• GitHub: [github.com/nowitsarpit](${siteConfig.github})`
  }

  // Strict Out-of-Topic Guardrail
  return `I am focused solely on Arpit Kumar's portfolio, technical background, and engineering projects. Feel free to ask about his work at COGNIQ AI, his projects (like BusPay or GoMail), his research, or how to get in touch!`
}

// ─── GEMINI API CALL ────────────────────────────────────────────────────────
async function callGemini(messages: Message[], apiKey: string): Promise<string> {
  const contents = messages.map(m => ({
    role: m.role === 'user' ? 'user' : 'model',
    parts: [{ text: m.content }],
  }))

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: SYSTEM_PROMPT }],
        },
        contents,
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 500,
        },
      }),
    }
  )

  if (!res.ok) {
    const errText = await res.text()
    throw new Error(`Gemini API error: ${res.status} ${errText}`)
  }

  const data = await res.json()
  const reply = data.candidates?.[0]?.content?.parts?.[0]?.text
  if (!reply) throw new Error('No candidate content received from Gemini')
  return reply
}

// ─── SIMPLE RICH TEXT FORMATTER ─────────────────────────────────────────────
function FormattedMessage({ text }: { text: string }) {
  const lines = text.split('\n')
  return (
    <div style={{ fontSize: '0.8125rem', lineHeight: 1.6 }}>
      {lines.map((line, lineIdx) => {
        const parts: React.ReactNode[] = []
        let lastIndex = 0
        const regex = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g
        let match: RegExpExecArray | null

        while ((match = regex.exec(line)) !== null) {
          if (match.index > lastIndex) {
            parts.push(line.substring(lastIndex, match.index))
          }

          if (match[1] && match[2]) {
            const label = match[1]
            const href = match[2]
            if (href.startsWith('/')) {
              parts.push(
                <Link key={`link-${lineIdx}-${match.index}`} to={href} style={{ color: 'var(--accent)', textDecoration: 'underline', fontWeight: 500 }}>
                  {label}
                </Link>
              )
            } else {
              parts.push(
                <a
                  key={`link-${lineIdx}-${match.index}`}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--accent)', textDecoration: 'underline', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '2px' }}
                >
                  {label} <ExternalLink size={10} />
                </a>
              )
            }
          } else if (match[3]) {
            parts.push(<strong key={`bold-${lineIdx}-${match.index}`} style={{ fontWeight: 650, color: 'var(--foreground)' }}>{match[3]}</strong>)
          }
          lastIndex = regex.lastIndex
        }

        if (lastIndex < line.length) {
          parts.push(line.substring(lastIndex))
        }

        return (
          <span key={lineIdx} style={{ display: 'block', minHeight: line === '' ? '0.4rem' : undefined, marginBottom: '0.2rem' }}>
            {parts.length > 0 ? parts : line}
          </span>
        )
      })}
    </div>
  )
}

// Exactly 2 clean, normal suggestions
const SUGGESTIONS = [
  "Recruiter summary",
  "Tell me about his work & experience",
]

export default function AIChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      content: "Hi! I'm ASK ARPIT. What would you like to know about Arpit's experience, projects, or background?",
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const handleReset = () => {
    setMessages([
      {
        id: '0',
        role: 'assistant',
        content: "Conversation restarted! What would you like to know about Arpit's projects, experience, or skills?",
      },
    ])
    setInput('')
  }

  const send = async (text?: string) => {
    const q = (text || input).trim()
    if (!q || loading) return

    setInput('')
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: q }
    const updatedMessages = [...messages, userMsg]
    setMessages(updatedMessages)
    setLoading(true)

    try {
      let reply: string
      if (GEMINI_API_KEY) {
        try {
          reply = await callGemini(updatedMessages, GEMINI_API_KEY)
        } catch {
          reply = queryKnowledgeBase(q)
        }
      } else {
        await new Promise(r => setTimeout(r, 200))
        reply = queryKnowledgeBase(q)
      }

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: reply,
      }
      setMessages(prev => [...prev, assistantMsg])
    } catch {
      const fallbackMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: queryKnowledgeBase(q),
      }
      setMessages(prev => [...prev, fallbackMsg])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Floating Trigger Button */}
      <motion.button
        onClick={() => setOpen(v => !v)}
        aria-label={open ? 'Close chat' : 'Open Ask Arpit chat'}
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          background: 'var(--accent)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 30px rgba(37,99,235,0.35)',
          zIndex: 51,
          color: '#fff',
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X size={20} />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} transition={{ duration: 0.15 }}>
              <Bot size={22} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat"
            className="ai-chat-window"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            style={{
              bottom: '5.5rem',
              right: '1.5rem',
              position: 'fixed',
              zIndex: 50,
              width: '380px',
              maxWidth: 'calc(100vw - 2rem)',
              maxHeight: '520px',
              display: 'flex',
              flexDirection: 'column',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
              overflow: 'hidden',
            }}
            role="dialog"
            aria-label="Ask Arpit"
            aria-modal="true"
          >
            {/* Header: Clean & Uncluttered */}
            <div style={{ padding: '0.875rem 1rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--background-alt)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}>
                  <Bot size={16} />
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.875rem', color: 'var(--foreground)' }}>
                    ASK ARPIT
                  </div>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--foreground-muted)' }}>
                    Portfolio Assistant
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <button
                  onClick={handleReset}
                  title="Restart chat"
                  aria-label="Restart chat"
                  style={{ background: 'transparent', border: 'none', color: 'var(--foreground-muted)', cursor: 'pointer', padding: '0.375rem', borderRadius: '6px', display: 'flex', alignItems: 'center' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--foreground)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--foreground-muted)')}
                >
                  <RotateCcw size={14} />
                </button>
                <button
                  onClick={() => setOpen(false)}
                  title="Close"
                  aria-label="Close"
                  style={{ background: 'transparent', border: 'none', color: 'var(--foreground-muted)', cursor: 'pointer', padding: '0.375rem', borderRadius: '6px', display: 'flex', alignItems: 'center' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--foreground)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--foreground-muted)')}
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Messages Body */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '310px' }}>
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={msg.role === 'user' ? 'ai-message-user' : 'ai-message-assistant'}
                  style={{
                    alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '85%',
                    padding: '0.625rem 0.875rem',
                    borderRadius: msg.role === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                    background: msg.role === 'user' ? 'var(--accent)' : 'var(--surface-hover)',
                    color: msg.role === 'user' ? '#fff' : 'var(--foreground)',
                    border: msg.role === 'user' ? 'none' : '1px solid var(--border)',
                  }}
                >
                  <FormattedMessage text={msg.content} />
                </div>
              ))}
              {loading && (
                <div
                  style={{
                    alignSelf: 'flex-start',
                    padding: '0.625rem 0.875rem',
                    borderRadius: '12px 12px 12px 2px',
                    background: 'var(--surface-hover)',
                    border: '1px solid var(--border)',
                    display: 'flex',
                    gap: '4px',
                    alignItems: 'center',
                  }}
                >
                  {[0, 1, 2].map(i => (
                    <div
                      key={i}
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: 'var(--accent)',
                        animation: `bounce 1s ease ${i * 0.15}s infinite`,
                      }}
                    />
                  ))}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* 1-2 Normal Suggestions */}
            {messages.length <= 2 && (
              <div style={{ padding: '0 0.875rem 0.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                {SUGGESTIONS.map(s => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    style={{
                      fontSize: '0.6875rem',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '100px',
                      border: '1px solid var(--border)',
                      background: 'var(--surface)',
                      color: 'var(--foreground-muted)',
                      cursor: 'pointer',
                      transition: 'all 150ms ease',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = 'var(--accent)'
                      e.currentTarget.style.color = 'var(--accent)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'var(--border)'
                      e.currentTarget.style.color = 'var(--foreground-muted)'
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input Form */}
            <div style={{ padding: '0.625rem 0.875rem', borderTop: '1px solid var(--border)', display: 'flex', gap: '0.5rem', background: 'var(--background)' }}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
                placeholder="Ask about Arpit's projects, experience..."
                className="form-input"
                style={{ flex: 1, padding: '0.5rem 0.75rem', fontSize: '0.8125rem', borderRadius: '8px' }}
                aria-label="Ask a question about Arpit"
              />
              <button
                onClick={() => send()}
                disabled={!input.trim() || loading}
                aria-label="Send message"
                style={{
                  background: 'var(--accent)',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.5rem 0.75rem',
                  cursor: input.trim() && !loading ? 'pointer' : 'not-allowed',
                  opacity: input.trim() && !loading ? 1 : 0.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  flexShrink: 0,
                  transition: 'opacity 150ms ease',
                }}
              >
                <Send size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @media (max-width: 480px) {
          .ai-chat-window {
            width: calc(100vw - 1.5rem) !important;
            right: 0.75rem !important;
            bottom: 4.5rem !important;
            max-height: 75vh !important;
          }
        }
      `}</style>
    </>
  )
}
