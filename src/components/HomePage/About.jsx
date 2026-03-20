import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import branding from "@images/about/branding.svg";
import ui from "@images/about/ui-ux.svg";
import web from "@images/about/web-dev.svg";
import CircleItems from "@components/CircleItems";
import figma from "@images/about/figma.svg";
import ai from "@images/about/ai.svg";
import ps from "@images/about/ps.svg";
import xd from "@images/about/xd.svg";
import js from "@images/about/js.svg";
import vscode from "@images/about/vscode.svg";
import react from "@images/about/react.svg";
import css from "@images/about/css.svg";
import html from "@images/about/html.svg";
import nextjs from "@images/about/nextjs.svg";
import pr from "@images/about/pr.svg";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const About = () => {
  const aboutRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const iconsRef = useRef(null);
  const circleRef = useRef(null);
  const items = [
    { name: "Figma", src: figma },
    { name: "Adobe Illustrator", src: ai },
    { name: "Adobe Photoshop", src: ps },
    { name: "Adobe XD", src: xd },
    { name: "Java Script", src: js },
    { name: "Visual Studio Code", src: vscode },
    { name: "React", src: react },
    { name: "CSS", src: css },
    { name: "HTML", src: html },
    { name: "Next JS", src: nextjs },
    { name: "Adobe Premier Pro", src: pr },
  ];


  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section title
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 80%",
          end: "top 50%",
          toggleActions: "play none none reverse",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Animate paragraph text
      gsap.from(textRef.current, {
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power2.out",
      });

      // Animate icons with stagger
      gsap.from(iconsRef.current?.children, {
        scrollTrigger: {
          trigger: iconsRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        y: 50,
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.7)",
      });

      // Animate circle items
      gsap.from(circleRef.current, {
        scrollTrigger: {
          trigger: circleRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      });
    }, aboutRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="about" id="about-me" ref={aboutRef}>
      <div className="container">
        <h2 className="subTitle" ref={titleRef}>Me</h2>
        <p ref={textRef}>
          I thrive on turning ideas into Effective Solutions with captivating
          Visuals. My design philosophy revolves around minimalism, elegance,
          and impact. Whether it's crafting brand identities, designing
          intuitive interfaces, or building responsive websites, I'm all in.
        </p>
        <div className="icons" ref={iconsRef}>
          <span>
            <Image loading="lazy" src={branding} alt="Branding" />
            <small>Branding</small>
          </span>
          <span>
            <Image loading="lazy" src={ui} alt="UX & UI" />
            <small>UX & UI</small>
          </span>
          <span>
            <Image loading="lazy" src={web} alt="Web Develepment" />
            <small>Web Dev</small>
          </span>
        </div>
      </div>

      <CircleItems items={items} />

    </div>
  );
};

export default About;
