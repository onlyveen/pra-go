import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import veenBabu from "@images/header/praveen-gorakala.png";
import designerText from "@images/header/designer-text.svg";
import TypingText from "../TypingText";

const Header = () => {
  const headerRef = useRef(null);
  const titleRef = useRef(null);
  const imageRef = useRef(null);
  const abstractRef = useRef(null);
  const actionsRef = useRef(null);

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
      // Create timeline for sequential animations
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Animate title with stagger effect on children
      tl.from(titleRef.current?.children, {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
      })
        // Animate abstract text
        .from(
          abstractRef.current,
          {
            y: 50,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.5"
        )
        // Animate buttons
        .from(
          actionsRef.current?.children,
          {
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.15,
          },
          "-=0.4"
        )
        // Animate images container - simple fade in from bottom
        .from(
          imageRef.current,
          {
            y: 50,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.6"
        );
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
        <Image loading="lazy" src={veenBabu} alt="Praveen Gorakala's Image" />
        <Image
          loading="lazy"
          className="h2"
          src={designerText}
          alt="Designer"
        />
      </div>
    </div>
  );
};

export default Header;
