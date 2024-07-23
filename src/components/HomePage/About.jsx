import React from "react";
import Image from "next/image";
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

const About = () => {
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

  return (
    <div className="about" id="about-me">
      <div className="container">
        <h2 className="subTitle">About Me</h2>
        <p>
          I thrive on turning ideas into Effective Solutions with captivating
          Visuals. My design philosophy revolves around minimalism, elegance,
          and impact. Whether it's crafting brand identities, designing
          intuitive interfaces, or building responsive websites, I'm all in.
        </p>
        <div className="icons">
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
