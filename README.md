# Arpit Kumar — Developer Portfolio & AI Showcase

Personal portfolio, engineering case studies, research publications, and credentials of **Arpit Kumar** — Computer Science Engineer, AI/ML & Full-Stack Developer based in Bengaluru, India.

---

## ⚡ Tech Stack

- **Frontend & Framework:** React 19, TypeScript, Vite
- **Styling & Motion:** Tailwind CSS, Framer Motion, Vanilla CSS custom design system
- **Icons & Typography:** Lucide React, Geist & JetBrains Mono fonts
- **AI Integration:** Google Gemini API (`gemini-3.5-flash-lite`) with offline portfolio knowledge fallback engine
- **Contact Service:** Formspree API integration with client-side fallback

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/nowitsarpit/portfolio.git
cd portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment variables
Copy the template to create your local environment file:
```bash
cp .env.example .env.local
```

Configure your secrets in `.env.local` (**never commit this file**):
```env
# Formspree endpoint for the contact form
VITE_CONTACT_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID

# Optional: Google Gemini API key for dynamic AI assistant
VITE_GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

> **Note:** If `VITE_GEMINI_API_KEY` is omitted, the built-in **Ask Arpit** assistant runs seamlessly using its offline knowledge engine with zero external API calls.

### 4. Run development server
```bash
npm run dev
```

### 5. Build for production
```bash
npm run build
```

---

## 🔒 Security & Privacy

- All sensitive environment files (`.env`, `.env.local`, `.env.*`) are strictly ignored in `.gitignore`.
- No API keys or submission endpoints are hardcoded into the bundle.
- Only `.env.example` with empty dummy values is tracked by Git.

---

## 📄 License

Designed and developed by [Arpit Kumar](https://github.com/nowitsarpit). All rights reserved.
