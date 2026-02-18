import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import veenBabu from "@images/header/praveen-gorakala.png";
import TypingText from "../TypingText";

const Header = () => {
  const headerRef = useRef(null);
  const titleRef = useRef(null);
  const imageRef = useRef(null);
  const abstractRef = useRef(null);
  const actionsRef = useRef(null);
  const designerTextRef = useRef(null);
  const veenBabuImageRef = useRef(null);

  const words = [
    "🎯 Branding Expert",
    "💡 User Experience Designer",
    "🎨 Visual Designer",
    "✨ User Interface Designer",
    "🕸️ Web Developer",
    "📸 Photoholic",
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Remove loading div after 2 seconds, then start animations
      setTimeout(() => {
        const loadingEl = document.querySelector(".loading");
        if (loadingEl) {
          loadingEl.remove();
        }

        // Create timeline - all animations start together after loading is removed
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        // All elements animate in together, except image comes after DESIGNER text
        tl.from(imageRef.current, {
          y: 50,
          opacity: 0,
          duration: 0.8,
        })
          .from(
            designerTextRef.current?.children,
            {
              opacity: 0,
              filter: "blur(20px)",
              duration: 0.8,
              stagger: 0.08,
              ease: "power2.out",
            },
            "<"
          )
          .from(
            titleRef.current?.children,
            {
              y: 100,
              opacity: 0,
              duration: 1,
              stagger: 0.2,
            },
            "<"
          )
          .from(
            abstractRef.current,
            {
              y: 50,
              opacity: 0,
              duration: 0.8,
            },
            "<"
          )
          .from(
            actionsRef.current?.children,
            {
              y: 30,
              opacity: 0,
              duration: 0.6,
              stagger: 0.15,
            },
            "<"
          )
          .from(
            veenBabuImageRef.current,
            {
              opacity: 0,
              filter: "blur(30px)",
              scale: 1.1,
              duration: 1.2,
              ease: "power2.out",
            },
            "-=0.4"
          );
      }, 2000);
    }, headerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="header" ref={headerRef}>
      <div className="container">
        <h1>
          <p className="title" ref={titleRef}>
            <span>
              Hello There 👋
              <br />
              I'm Pra<span className="high">VeeN</span> Gorakala
            </span>
            <TypingText words={words} typingSpeed={120} deletingSpeed={60} />
            {/* <span className="pills">
              <small>Branding</small>
              <small>UX</small>
              <small>UI</small>
              <small>Web Dev</small>
            </span> */}
          </p>
          <p className="desig">
            <span className="high">*</span> Principal Designer
          </p>
        </h1>
        <p className="abstract" ref={abstractRef}>
          a passionate designer focused on crafting impactful experiences . My
          work spans branding, UI/UX design, & web development.
        </p>
        <div className="actions" ref={actionsRef}>
          <a
            href="https://calendly.com/onlyveen"
            target="_blank"
            className="btn"
          >
            Let's Talk
          </a>
          <a href="/#my-work" className="btn hallow">
            See My Work
          </a>
        </div>
      </div>
      <div className="abs" ref={imageRef}>
        <Image
          loading="lazy"
          src={veenBabu}
          alt="Praveen Gorakala's Image"
          ref={veenBabuImageRef}
        />
        <h1 className="designer-text" ref={designerTextRef}>
          {"DESIGNER".split("").map((letter, index) => (
            <span key={index} style={{ display: "inline-block" }}  className="pixel-font">
              {letter}
            </span>
          ))}
        </h1>
        {/* <Image
          loading="lazy"
          className="h2"
          src={designerText}
          alt="Designer"
        /> */}
      </div>
    </div>
  );
};

export default Header;
