import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const experience = [
  {
    role: "Principal Designer",
    company: "AntStack Technologies",
    period: "Nov 2018 – Present",
    logo: "/images/exp/antstackio_logo.jpeg",
    bg: "linear-gradient(341deg, #042582 1.79%, #345ACA 80.27%)",
    stringColor: "#345ACA",
    textColor: "#ffffff",
    desc: "Led design at AntStack, introducing AI tools that cut ideation time by 40%. Built a scalable React design system, collaborated on AI-driven features, and oversaw frontend development for speed, scalability, and accessibility.",
  },
  {
    role: "UI Engineer",
    company: "Wheels Box",
    period: "Nov 2018 – Oct 2019",
    logo: "/images/exp/wheelsbox_logo.jpeg",
    bg: "linear-gradient(135deg, rgb(7, 192, 213), rgb(118, 211, 144))",
    stringColor: "rgb(7, 192, 213)",
    textColor: "#0a3a2a",
    desc: "Headed product design, branding, and frontend UI for a logistics platform. Built responsive HTML/CSS/JS components to enhance customer experience and visual consistency.",
  },
  {
    role: "HTML Developer",
    company: "Infibeam Avenues",
    period: "Nov 2015 – Oct 2018",
    logo: "/images/exp/avenues_ai_logo.jpeg",
    bg: "radial-gradient(308.75% 138.95% at 2.07% 0%, #F79907 0%, #FD1A9F 45.98%, #583BF8 100%)",
    stringColor: "#FD1A9F",
    textColor: "#ffffff",
    desc: "Designed consistent, intuitive interfaces for consumer-facing web platforms and collaborated closely with engineering teams to improve end-user usability and product quality.",
  },
  {
    role: "Catalogue Executive",
    company: "Reliance Ajio",
    period: "Dec 2014 – Oct 2015",
    logo: "/images/exp/ajiolife_logo.jpeg",
    bg: "#dddddd",
    stringColor: "#dddddd",
    textColor: "#000000",
    desc: "Coded accurate e-commerce catalogue pages in HTML/CSS and designed promotional banners, optimising visual assets in Photoshop for a consistent brand experience.",
  },
  {
    role: "Catalogue Executive",
    company: "HomeShop18",
    period: "July 2014 – Nov 2014",
    logo: "/images/exp/hs18.jpeg",
    bg: "#EC1E22",
    stringColor: "#EC1E22",
    textColor: "#ffffff",
    desc: "Developed digital product listings and catalogue layouts using HTML/CSS, and produced marketing graphics to maintain visual consistency across campaigns.",
  },
];

// Each card gets its own string length for a natural, uneven hanging look
const STRING_HEIGHTS = [100, 170, 120, 210, 130];

const Journey = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);


  // GSAP horizontal scroll + card animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        const track = trackRef.current;
        const section = sectionRef.current;
        if (!track || !section) return;

        const R = track.scrollWidth - window.innerWidth;
        if (R <= 0) return;

        const vw = window.innerWidth;
        const EXTRA = 400;
        const wraps = gsap.utils.toArray(track.querySelectorAll(".jc-wrap"));

        // Pivot every wrap from the top of the string (where it meets the rail)
        gsap.set(wraps, { transformOrigin: "50% 0" });

        // Each card gets a unique swing feel — different speed and sensitivity
        const ROT_FACTORS = [1.0, 0.55, 1.3, 0.7, 1.1];
        const ROT_DURATIONS = [0.3, 0.55, 0.25, 0.65, 0.4];
        // Per-card ambient wind: freq (rad/ms), amplitude (deg), phase offset
        const WIND = [
          { freq: 0.00080, amp: 0.36, phase: 0.0 },
          { freq: 0.00055, amp: 0.21, phase: 1.1 },
          { freq: 0.00100, amp: 0.45, phase: 2.3 },
          { freq: 0.00065, amp: 0.18, phase: 0.7 },
          { freq: 0.00090, amp: 0.30, phase: 1.8 },
        ];
        const scrollRot = wraps.map(() => 0); // scroll-driven component per card
        const rotTo = wraps.map((wrap, i) =>
          gsap.quickTo(wrap, "rotation", {
            duration: ROT_DURATIONS[i],
            ease: "power2.out",
          })
        );

        // ── Before view: cards 1-2 peek from right, left empty ───────────────────
        gsap.set(track, { x: vw * 0.6 });

        // ── Entrance: drop + pendulum swing as cards enter view ──────────────────
        gsap.fromTo(
          wraps,
          { rotation: 3.6, y: -40, opacity: 0 },
          {
            rotation: 0,
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 1.6,
            ease: "elastic.out(1, 0.45)",
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );

        // ── Entrance scrub: 60vw → 20vw as section scrolls into view ─────────────
        gsap.fromTo(
          track,
          { x: vw * 0.6 },
          {
            x: vw * 0.2,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "top top",
              scrub: true,
            },
          }
        );

        // ── Pinned horizontal scroll ──────────────────────────────────────────────
        gsap.fromTo(
          track,
          { x: vw * 0.2 },
          {
            x: -(R + EXTRA),
            ease: "none",
            scrollTrigger: {
              trigger: section,
              pin: true,
              scrub: 1,
              start: "top top",
              end: `+=${vw * 0.2 + R + EXTRA}`,
            },
          }
        );

        // ── Global scroll velocity → hanging rotation (always active) ─────────────
        ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate(self) {
            const vel = self.getVelocity();
            rotTo.forEach((setter, i) => {
              scrollRot[i] = gsap.utils.clamp(-6.6, 6.6, vel * 0.0036 * ROT_FACTORS[i]);
            });
          },
        });

        // ── Ambient wind: continuous subtle sway, unique per card ─────────────────
        const windTick = () => {
          const now = Date.now();
          rotTo.forEach((setter, i) => {
            const wind = Math.sin(now * WIND[i].freq + WIND[i].phase) * WIND[i].amp;
            setter(scrollRot[i] + wind);
          });
        };
        gsap.ticker.add(windTick);

        return () => gsap.ticker.remove(windTick);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="journey-section" id="journey" ref={sectionRef}>
      {/* Section header */}
      <div className="journey-top">
        <div className="container">
          <h2 className="subTitle">My Journey</h2>
        </div>
      </div>

      {/* Horizontal scrolling track */}
      <div className="journey-track-outer">
        <div className="journey-track" ref={trackRef}>
          {experience.map((exp, i) => (
            <div className="jc-wrap" key={i}>
              {/* Hanging string */}
              <div
                className="jc-string"
                style={{
                  height: STRING_HEIGHTS[i],
                  background: exp.bg,
                }}
              />
              {/* Clip that attaches string to card */}
              <div className="jc-clip" >
              </div>
              {/* ID Card */}
              <div className="id-card">
                <div
                  className="idc-header"
                  style={{ background: exp.bg, color: exp.textColor }}
                >
                  <div className="idc-header-top">
                    <span className="idc-num" style={{ color: exp.textColor }}>
                      0{experience.length - i}
                    </span>
                    <Image
                      src={exp.logo}
                      alt={exp.company}
                      width={40}
                      height={40}
                      className="idc-logo"
                    />
                  </div>
                  <span className="idc-period" style={{ color: exp.textColor }}>
                    {exp.company}
                  </span>
                </div>
                <div className="idc-body">
                  <h3 className="idc-role">{exp.role}</h3>
                  <p className="idc-company">
                    {exp.period.includes("Present")
                      ? <>{exp.period.replace("Present", "")}<span className="idc-present">Present</span></>
                      : exp.period}
                  </p>
                  <p className="idc-desc">{exp.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Journey;
