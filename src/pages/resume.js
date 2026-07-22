import Layout from "@/components/Layout";
import Head from "next/head";
import { HiOutlineDownload, HiLocationMarker } from "react-icons/hi";
import { FaLinkedin, FaGithub, FaBehance } from "react-icons/fa";

const ContactCard = () => (
  <div className="rui-contact-card">
    <div className="rui-contact-item">
      <HiLocationMarker />
      <span>Bangalore, India</span>
    </div>
    <a
      className="rui-contact-item"
      href="https://www.linkedin.com/in/onlyveen/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <FaLinkedin />
      <span>linkedin.com/in/onlyveen</span>
    </a>
    <a
      className="rui-contact-item"
      href="https://github.com/onlyveen"
      target="_blank"
      rel="noopener noreferrer"
    >
      <FaGithub />
      <span>github.com/onlyveen</span>
    </a>
    <a
      className="rui-contact-item"
      href="https://www.behance.net/onlyveen"
      target="_blank"
      rel="noopener noreferrer"
    >
      <FaBehance />
      <span>behance.com/onlyveen</span>
    </a>
  </div>
);

const skills = {
  frontend: [
    "Component-Driven Development",
    "Design-to-Code Pipelines",
    "AI-Augmented Engineering",
    "Agentic AI Integration",
    "HTML & CSS",
    "Prompt Engineering",
    "JavaScript (ES6+)",
    "React.js and Frameworks",
    "Tailwind CSS",
    "Shadcn UI",
    "Micro-Frontend Architecture",
    "GSAP",
    "Design System Governance",
  ],
  design: [
    "UI/UX Design",
    "User Research",
    "Visual Identity & Branding",
    "Design Systems",
    "UI Prototyping",
    "Micro-interactions",
    "Iconography",
    "Responsive Design",
    "High-Fidelity",
    "MVPs & POCs",
    "AI Design Work Flows",
  ],
  tools: [
    "Figma",
    "Photoshop",
    "Illustrator",
    "Premiere Pro",
    "Jira",
    "Linear",
    "Git",
    "VS Code",
    "Canva",
    "Notion",
  ],
  leadership: [
    "Technical Roadmapping",
    "Frontend Architecture Leadership",
    "Stakeholder Management",
    "Team Enablement & Mentorship",
    "Cross-Functional Collaboration",
    "Storytelling",
    "Pitching",
    "Creative Problem Solving",
  ],
};

const education = [
  {
    school: "Prajna Institute of Technology & Management",
    degree: "Bachelor of Technology - IT",
    period: "2009 to 2013",
  },
  {
    school: "AVK Junior College",
    degree: "Intermediate - MPC",
    period: "2007 to 2009",
  },
  {
    school: "ZPH School, Nadupur",
    degree: "Board Of Secondary Education. AP",
    period: "2007",
  },
];

const experience = [
  {
    role: "Tech Architect | HashedIn by Deloitte",
    period: "Jun 2026 - Present",
    bullets: [
      "Architect micro-frontend platforms for enterprise clients, owning system design and CI/CD integration end-to-end.",
      "Lead GenAI integrations into frontend workflows, cutting ideation-to-prototype cycles by 40%.",
      'Build "AI-first" component systems bridging high-fidelity Figma design and production React code.',
      "Define technical roadmaps and present architecture proposals to C-suite and product stakeholders.",
    ],
  },
  {
    role: "Frontend Architect & Principal Designer | AntStack Technologies",
    period: "Nov 2019 - May 2026",
    bullets: [
      "Pioneered AI-powered design-to-code workflows, reducing ideation-to-prototype time by 40% while improving developer productivity.",
      "Architected scalable frontend solutions and enterprise design systems for SaaS products using React, Next.js, TypeScript, and Tailwind CSS.",
      "Built reusable component libraries with Storybook and modern frontend architecture, ensuring consistency between Figma and production.",
      "Defined technical roadmaps, frontend architecture, and engineering standards while collaborating with product, design, and leadership teams.",
      "Mentored cross-functional teams, driving accessibility, performance optimization, and scalable UI engineering best practices.",

    ],
  },
  {
    role: "UI engineer | Wheels Box",
    period: "Nov 2018 - Oct 2019",
    bullets: [
      "Headed product design, branding, and frontend UI for a transportation logistics platform.",
      "Built responsive HTML/CSS/JS components to elevate overall customer experience.",
    ],
  },
  {
    role: "HTML developer | Infibeam Avenues",
    period: "Nov 2015 - Oct 2018",
    bullets: [
      "Designed visually consistent, intuitive interfaces for consumer-facing and internal web platforms.",
      "Collaborated with engineering teams to significantly improve end-user usability.",
    ],
  },
  {
    role: "Catalogue executive | Reliance Retail Ltd",
    period: "Dec 2014 - Oct 2015",
    bullets: [
      "Coded accurate e-commerce catalogue pages using HTML and CSS.",
      "Designed promotional banners and optimized visual assets using Photoshop.",
    ],
  },
  {
    role: "Catalogue executive | HomeShop18",
    period: "July 2014 - Nov 2014",
    bullets: [
      "Developed digital product listings and catalogue layouts with HTML/CSS.",
      "Produced marketing graphics to drive visual consistency across promotional campaigns.",
    ],
  },
];

const ResumePage = () => {
  const pdfPath = "/Praveen_Resume_Principal_Designer.pdf";

  return (
    <>
      <Head>
        <title>Resume - Praveen Gorakala</title>
        <meta name="description" content="Praveen Gorakala's resume" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <Layout page="resume">
        <div className="resume-page">
          <div className="header-container">
            <div className="resume-header">
              <h1 className="page-title">Resume</h1>
              <a
                href={pdfPath}
                download="Praveen_Resume_Principal_Designer.pdf"
                className="download-btn"
              >
                <HiOutlineDownload />
                Download
              </a>
            </div>
          </div>
          <div className="container">
            <div className="resume-ui">
              {/* ── Top: name + photo + contacts ── */}
              <div className="rui-top">
                <div className="rui-name-block">
                  <h2 className="rui-name">
                    Praveen
                    <br />
                    GORAKALA
                  </h2>
                  <p className="rui-title">Frontend Architect & Principal Designer</p>
                </div>

                <div className="rui-photo-block">
                  <div className="rui-photo-circle" />
                  <img
                    src="/images/resumeImage.png"
                    alt="Praveen Gorakala"
                    className="rui-photo"
                  />
                </div>

                <div className="rui-contacts">
                  <a
                    href="mailto:thepraveengorakala@gmail.com"
                    className="rui-contact-link"
                  >
                    thepraveengorakala@gmail.com
                  </a>
                  <a
                    href="https://praveengorakala.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rui-contact-link"
                  >
                    <u>praveengorakala.com</u>
                  </a>
                </div>
              </div>

              {/* ── Bio ── */}
              <p className="rui-bio">
                Frontend Architect & Principal Designer with 11+ years of experience delivering scalable web applications, enterprise design systems, AI-powered development workflows, and high-performance frontend architectures. Experienced in leading cross-functional teams, architecting modern React ecosystems, and bridging product strategy, UX, and engineering to build scalable digital experiences. Passionate about leveraging AI, automation, and design systems to accelerate product development while maintaining exceptional user experiences.
              </p>

              {/* ── Body: sidebar + main ── */}
              <div className="rui-body">
                {/* Left sidebar */}
                <div className="rui-sidebar">
                  <div className="hidden-phone">
                    <ContactCard />
                  </div>

                  <div className="rui-section">
                    <h3 className="rui-section-title">SKILLS</h3>

                    <div className="rui-skill-group">
                      <p className="rui-skill-label">
                        Frontend Architecture &amp; Engineering
                      </p>
                      <div className="rui-tags">
                        {skills.frontend.map((s) => (
                          <span key={s} className="rui-tag">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="rui-skill-group">
                      <p className="rui-skill-label">
                        Product design, strategy &amp; branding
                      </p>
                      <div className="rui-tags">
                        {skills.design.map((s) => (
                          <span key={s} className="rui-tag">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="rui-skill-group">
                      <p className="rui-skill-label">Tools</p>
                      <div className="rui-tags">
                        {skills.tools.map((s) => (
                          <span key={s} className="rui-tag">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="rui-skill-group">
                      <p className="rui-skill-label">
                        Leadership &amp; Professional Skills
                      </p>
                      <div className="rui-tags">
                        {skills.leadership.map((s) => (
                          <span key={s} className="rui-tag">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right main */}
                <div className="rui-main">
                  <div className="rui-section">
                    <h3 className="rui-section-title">EXPERIENCE</h3>
                    <div className="rui-timeline">
                      {experience.map((e, i) => (
                        <div key={i} className="rui-timeline-item">
                          <div className="rui-dot" />
                          <div className="rui-timeline-content">
                            <div className="rui-item-meta rui-item-meta--header">
                              <p className="rui-item-title">{e.role}</p>
                              <span className="rui-period">{e.period}</span>
                            </div>
                            <ul className="rui-bullets">
                              {e.bullets.map((b, j) => (
                                <li key={j}>{b}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rui-section">
                    <h3 className="rui-section-title">EDUCATION</h3>
                    <div className="rui-timeline">
                      {education.map((e, i) => (
                        <div key={i} className="rui-timeline-item">
                          <div className="rui-dot" />
                          <div className="rui-timeline-content">
                            <p className="rui-item-title">{e.school}</p>
                            <div className="rui-item-meta">
                              <span>{e.degree}</span>
                              <span>{e.period}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ResumePage;
