import { useEffect, useRef, useState } from "react";
import resumeUrl from "../KAMALESH.pdf?url";

const typingPhrases = ["Kamalesh", "Senior Software Engineer"];
const web3FormsAccessKey = "40f0ad34-127b-41c0-ac3a-4a38f77618b9";

type ContactStatus = "idle" | "loading" | "success" | "error";

const links = {
  email: "mailto:Kamalesh5112000@gmail.com",
  linkedin: "https://www.linkedin.com/in/kamaleshb05/",
  github: "https://github.com/kamalesh5112000",
  leetcode: "https://leetcode.com/Kamalesh_mc/",
  resume: resumeUrl,
};

const metrics = [
  { value: "~4", label: "Years across product engineering" },
  { value: "25%", label: "API latency improvement delivered" },
  { value: "35%", label: "Traffic growth through SEO improvements" },
  { value: "250+", label: "Problems solved on LeetCode" },
];

const skillGroups = [
  {
    title: "Frontend & Mobile",
    skills: ["React", "React Native", "Next.js", "Vite", "Tailwind", "JavaScript"],
  },
  {
    title: "Backend & Realtime",
    skills: ["Python", "Node.js", "Express", "Go", "Echo", "FastAPI", "Django", "Socket.IO", "REST APIs"],
  },
  {
    title: "AI, Data & Cloud",
    skills: ["LLMs", "Hugging Face", "MongoDB", "MySQL", "SQL Server", "Redis", "Kafka", "AWS", "GCP", "Cloud Run", "Azure"],
  },
  {
    title: "Tools",
    skills: ["Docker", "Git", "GitHub", "Postman", "Asana", "Regex", "Power BI", "Puppeteer", "SSIS", "JWT/OAuth2"],
  },
];

const experiences = [
  {
    role: "Senior Software Engineer",
    company: "Unthink Inc",
    period: "Jul 2026 - Present",
    theme: "Customer-facing web products, kiosks, and cloud operations",
    bullets: [
      "Develop and maintain customer-facing web applications and kiosk products using Next.js, React, Node.js, Django, and Python.",
      "Manage production deployments on GCP, including Cloud Run services, server configuration, and environment management.",
      "Resolve UI rendering, hydration, API, and deployment issues to improve application stability and user experience.",
      "Contribute across architecture, feature implementation, production troubleshooting, monitoring, and maintenance.",
    ],
    stack: ["Next.js", "React", "Node.js", "Django", "Python", "MongoDB", "GCP", "Cloud Run", "Docker", "Git"],
  },
  {
    role: "Software Development Engineer",
    company: "Privasapien",
    period: "Jul 2025 - Jun 2026",
    theme: "Privacy-first backend and AI integrations",
    bullets: [
      "Built a Go and Echo middleware gateway for secure communication across 5+ internal services and LLM provider integrations.",
      "Designed multi-tenant MongoDB workflows with RBAC, reducing manual access-control work by nearly 40%.",
      "Worked on DSR compliance flows using Kafka and Redis for audit logs and realtime status updates.",
      "Added production safeguards including JWT authentication, rate limiting, and MinIO based object storage.",
    ],
    stack: ["React", "Go", "Echo", "MongoDB", "Kafka", "Redis", "MinIO", "Docker", "JWT"],
  },
  {
    role: "Software Development Engineer",
    company: "Drishtee",
    period: "Aug 2024 - Jul 2025",
    theme: "Mobile products, APIs, and AI experiments",
    bullets: [
      "Built React Native and Node.js features for hybrid mobile applications used across platforms.",
      "Improved FastAPI and MongoDB services, reducing API latency by around 25%.",
      "Integrated Microsoft Dynamics 365 Business Central for expense tracking and reporting workflows.",
      "Designed an AI-powered test automation platform using interaction capture and Hugging Face LLMs, reducing manual QA effort by approximately 50%.",
    ],
    stack: ["React Native", "React", "Node.js", "FastAPI", "MongoDB", "Puppeteer", "LLMs", "Socket.IO"],
  },
  {
    role: "Software Development Engineer",
    company: "Tutorpoint",
    period: "Mar 2023 - Jul 2024",
    theme: "Full-stack web applications",
    bullets: [
      "Delivered React, Express, MongoDB, and GCP based applications for business workflows.",
      "Improved API and database performance by 20% through backend optimization.",
      "Increased website traffic by 35% using SEO, analytics, and heatmap-backed improvements.",
      "Maintained GCP deployment pipelines with 99.9% uptime.",
    ],
    stack: ["React", "Next.js", "Express", "MongoDB", "GCP", "Docker", "SEO"],
  },
  {
    role: "Data Engineer Intern",
    company: "HP Inc.",
    period: "Feb 2022 - Jul 2022",
    theme: "Enterprise data workflows",
    bullets: [
      "Designed Power BI dashboards for enterprise-scale datasets and strategic business decisions.",
      "Refactored Spark workflows into Python to improve analytics maintainability and processing efficiency.",
      "Built a Python library integrating SSIS tools, automating repetitive ETL operations.",
      "Contributed to Azure-based data pipeline optimization for stronger operational efficiency.",
    ],
    stack: ["Python", "Power BI", "SSIS", "SQL Server", "Azure"],
  },
];

const projects = [
  {
    name: "AI Test Automation Engine",
    tag: "AI-powered QA Automation",
    description:
      "An automation platform using WebComponents and JavaScript event interception to track feature-level interactions, with FastAPI and Socket.IO coordinating real-time workflows and Hugging Face LLMs generating readable test cases.",
    impact: "Reduced QA documentation effort by approximately 50%",
    stack: ["React", "Python", "FastAPI", "Socket.IO", "MongoDB", "Hugging Face", "LLMs"],
  },
  {
    name: "Group Chat Application",
    tag: "Realtime Collaboration",
    description:
      "A realtime messaging platform with group chats, member management, one-to-one conversations, chat history, and reliable synchronization.",
    impact: "Built scalable APIs and responsive chat experiences",
    stack: ["React", "Node.js", "Express", "Socket.IO", "MongoDB"],
  },
  {
    name: "Job Seeker",
    tag: "Django Web Scraper",
    description:
      "A Django-based job aggregation project that scrapes, consolidates, stores, and presents listings from multiple sources.",
    impact: "Reduced manual job searching through scheduled scraping workflows",
    stack: ["Django", "Python", "SQLite", "Scrapy"],
  },
];

const achievements = [
  "Winner of AIC-PECF Innovation Challenge for Angadi, a farmer-to-consumer marketplace officially launched by the Chief Minister.",
  "Solved 250+ LeetCode problems with a 50+ day coding streak, strengthening algorithmic and data-structure fundamentals.",
  "Completed MERN Stack engineering program focused on scalable React, Node.js, Express, MySQL, MongoDB, REST APIs, and cloud deployment.",
];

function App() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [visibleChars, setVisibleChars] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [contactStatus, setContactStatus] = useState<ContactStatus>("idle");
  const [contactMessage, setContactMessage] = useState("");
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const resumeDialogRef = useRef<HTMLDialogElement>(null);
  const resumeCloseRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const currentPhrase = typingPhrases[phraseIndex];
  const typedText = currentPhrase.slice(0, visibleChars);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const phraseComplete = visibleChars === currentPhrase.length;
    const phraseCleared = visibleChars === 0;
    let delay = isDeleting ? 48 : 92;

    if (!isDeleting && phraseComplete) delay = 1500;
    if (isDeleting && phraseCleared) delay = 360;

    const timer = window.setTimeout(() => {
      if (!isDeleting && phraseComplete) {
        setIsDeleting(true);
        return;
      }

      if (isDeleting && phraseCleared) {
        setIsDeleting(false);
        setPhraseIndex((index) => (index + 1) % typingPhrases.length);
        return;
      }

      setVisibleChars((count) => count + (isDeleting ? -1 : 1));
    }, delay);

    return () => window.clearTimeout(timer);
  }, [currentPhrase.length, isDeleting, visibleChars, prefersReducedMotion]);

  useEffect(() => {
    if (!isResumeOpen) return;

    const dialog = resumeDialogRef.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal();
    resumeCloseRef.current?.focus();
    document.body.style.overflow = "hidden";

    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, [isResumeOpen]);

  const handleContactSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (contactStatus === "loading") return;

    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const botcheck = String(formData.get("botcheck") || "");

    if (botcheck) return;

    if (!name || !email || !message) {
      setContactStatus("error");
      setContactMessage("Please fill your name, email, and message before sending.");
      return;
    }

    setContactStatus("loading");
    setContactMessage("");
    formData.append("access_key", web3FormsAccessKey);
    formData.append("subject", `Portfolio enquiry from ${name}`);
    formData.append("from_name", "Kamalesh Portfolio");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to send message");
      }

      setContactStatus("success");
      setContactMessage("Message sent. I will get back to you soon.");
      form.reset();
    } catch {
      setContactStatus("error");
      setContactMessage("Could not send the message right now. Please try again or use email/LinkedIn.");
    }
  };

  return (
    <main className="site-shell">
      <div className="noise" />
      <div className="orb orb-one" />
      <div className="orb orb-two" />

      <nav className="nav">
        <a className="brand" href="#top" aria-label="Kamalesh home">
          <span>KB</span>
        </a>
        <div className="nav-links" aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section id="top" className="hero section-grid">
        <div className="hero-copy">
          <p className="eyebrow">Senior Software Engineer | Full Stack | Mobile | Cloud</p>
          <h1 className="hero-title typing-title" aria-label="Kamalesh B, Senior Software Engineer">
            <span className="typing-text" aria-hidden="true">{prefersReducedMotion ? "Kamalesh" : typedText}</span>
            <span className="typing-cursor" aria-hidden="true" />
          </h1>
          <div className="hero-specialties" aria-label="Engineering focus areas">
            <span>React & React Native</span>
            <span>Backend APIs</span>
            <span>AI/LLM Integrations</span>
            <span>Cloud Deployments</span>
          </div>
          <p className="hero-text">
            I’m a Senior Software Engineer at Unthink Inc with nearly four years of experience building web and mobile applications, scalable backend systems, and data solutions. I work across Next.js, React, React Native, Node.js, Python, Go, and cloud deployments to deliver secure, maintainable products.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#contact">Let&apos;s work together</a>
            <button className="button secondary" type="button" onClick={() => setIsResumeOpen(true)}>View resume</button>
          </div>
          <div className="social-row" aria-label="Social links">
            <a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a href={links.github} target="_blank" rel="noreferrer">GitHub</a>
            <a href={links.leetcode} target="_blank" rel="noreferrer">LeetCode</a>
          </div>
        </div>

        <div className="hero-card" aria-label="Developer identity card">
          <div className="avatar-mark">
            <span>K</span>
            <span>B</span>
          </div>
          <div className="terminal-card">
            <div className="terminal-dots"><i /><i /><i /></div>
            <code>
              <span>const engineer = &#123;</span>
              <span>  focus: &quot;full-stack products&quot;,</span>
              <span>  stack: [&quot;React&quot;, &quot;Node&quot;, &quot;Go&quot;],</span>
              <span>  ships: &quot;production first&quot;</span>
              <span>&#125;;</span>
            </code>
          </div>
          <div className="floating-chip chip-a">AI/LLM Integrations</div>
          <div className="floating-chip chip-b">Backend APIs</div>
          <div className="floating-chip chip-c">React Native</div>
        </div>
      </section>

      <section className="metrics" aria-label="Career impact metrics">
        {metrics.map((metric) => (
          <article className="metric-card" key={metric.label}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </article>
        ))}
      </section>

      <section className="section about section-grid">
        <div>
          <p className="eyebrow">Profile</p>
          <h2>Full-stack engineer comfortable across product, APIs, mobile, and cloud.</h2>
        </div>
        <div className="about-copy">
          <p>
            At Unthink Inc, I develop customer-facing web applications and kiosk products, manage GCP and Cloud Run deployments, and troubleshoot production systems. My earlier work spans privacy-first microservices, mobile applications, AI-powered test automation, and enterprise data pipelines.
          </p>
          <p>
            I prefer practical engineering: readable code, predictable APIs, secure integrations, and features that are easy for a team to maintain after release.
          </p>
        </div>
      </section>

      <section id="skills" className="section">
        <div className="section-heading">
          <p className="eyebrow">Skills</p>
          <h2>Technologies I have used across product work.</h2>
        </div>
        <div className="skills-grid">
          {skillGroups.map((group) => (
            <article className="skill-card" key={group.title}>
              <h3>{group.title}</h3>
              <div className="tag-cloud">
                {group.skills.map((skill) => <span key={skill}>{skill}</span>)}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="work" className="section">
        <div className="section-heading wide">
          <p className="eyebrow">Experience</p>
          <h2>Experience across startups, product teams, and data workflows.</h2>
        </div>
        <div className="timeline">
          {experiences.map((item) => (
            <article className="experience-card" key={`${item.company}-${item.role}`}>
              <div className="timeline-dot" />
              <div className="experience-topline">
                <div>
                  <p className="company">{item.company}</p>
                  <h3>{item.role}</h3>
                </div>
                <span>{item.period}</span>
              </div>
              <p className="theme">{item.theme}</p>
              <ul>
                {item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
              </ul>
              <div className="mini-tags">
                {item.stack.map((tech) => <span key={tech}>{tech}</span>)}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="projects" className="section">
        <div className="section-heading">
          <p className="eyebrow">Selected Projects</p>
          <h2>Projects that show how I approach product problems.</h2>
        </div>
        <div className="project-grid">
          {projects.map((project, index) => (
            <article className="project-card" key={project.name}>
              <div className="project-number">0{index + 1}</div>
              <p className="project-tag">{project.tag}</p>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <strong>{project.impact}</strong>
              <div className="mini-tags">
                {project.stack.map((tech) => <span key={tech}>{tech}</span>)}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section split-panel">
        <article className="panel-card">
          <p className="eyebrow">Achievements</p>
          <h2>Other work I am proud of.</h2>
          <ul className="clean-list">
            {achievements.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </article>
        <article className="panel-card education-card">
          <p className="eyebrow">Education</p>
          <h2>B.Tech, Computer Science and Engineering</h2>
          <p>Pondicherry Engineering College, Pondicherry</p>
          <div className="education-meta">
            <span>CGPA 7.56</span>
            <span>2018 - 2022</span>
          </div>
          <div className="cert-strip">
            <span>MERN Stack | Sharpener</span>
            <small>Sep 2022 - Feb 2023</small>
          </div>
        </article>
      </section>

      <section id="contact" className="section contact-section">
        <div className="contact-intro">
          <p className="eyebrow">Contact</p>
          <h2>Tell me what you are building.</h2>
          <p>
            I am open to full-stack roles and product work involving web apps, mobile apps, backend APIs, cloud deployments, and AI integrations where they add real value.
          </p>
          <div className="contact-links" aria-label="Alternative contact links">
            <a href={links.email}>Email</a>
            <a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a href={links.github} target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleContactSubmit} noValidate>
          <input className="hidden-field" type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" />
          <div className="form-row">
            <label>
              <span>Name</span>
              <input name="name" type="text" placeholder="Your name" autoComplete="name" required />
            </label>
            <label>
              <span>Email</span>
              <input name="email" type="email" placeholder="you@example.com" autoComplete="email" required />
            </label>
          </div>
          <div className="form-row">
            <label>
              <span>Company</span>
              <input name="company" type="text" placeholder="Company or team" autoComplete="organization" />
            </label>
            <label>
              <span>Project type</span>
              <select name="project_type" defaultValue="Full-stack role">
                <option>Full-stack role</option>
                <option>Frontend / React work</option>
                <option>Backend API work</option>
                <option>Mobile app work</option>
                <option>AI / LLM integration</option>
                <option>General enquiry</option>
              </select>
            </label>
          </div>
          <label>
            <span>Message</span>
            <textarea name="message" rows={6} placeholder="Share the role, project, timeline, or problem you want to solve." required />
          </label>
          {contactMessage && (
            <p className={`form-status ${contactStatus === "success" ? "success" : "error"}`} role="status">
              {contactMessage}
            </p>
          )}
          <button className="button primary form-submit" type="submit" disabled={contactStatus === "loading"}>
            {contactStatus === "loading" ? "Sending..." : "Send message"}
          </button>
        </form>
      </section>

      <footer className="footer">
        <span>Kamalesh B</span>
        <span>Senior Software Engineer based in India</span>
        <a href="tel:+917598383120">+91 759 838 3120</a>
      </footer>

      {isResumeOpen && (
        <dialog ref={resumeDialogRef} className="resume-modal" aria-labelledby="resume-title" onCancel={() => setIsResumeOpen(false)} onClose={() => setIsResumeOpen(false)}>
          <button className="resume-backdrop" type="button" tabIndex={-1} aria-label="Close resume preview" onClick={() => setIsResumeOpen(false)} />
          <div className="resume-window">
            <div className="resume-header">
              <div>
                <p className="eyebrow">Resume</p>
                <h2 id="resume-title">Kamalesh B</h2>
              </div>
              <div className="resume-actions">
                <a className="button secondary" href={links.resume} download="KAMALESH.pdf">Download PDF</a>
                <button ref={resumeCloseRef} className="modal-close" type="button" onClick={() => setIsResumeOpen(false)} aria-label="Close resume preview">Close</button>
              </div>
            </div>
            <iframe className="resume-frame" src={links.resume} title="Kamalesh B resume PDF" />
          </div>
        </dialog>
      )}
    </main>
  );
}

export default App;
