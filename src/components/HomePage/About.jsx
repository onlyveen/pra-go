import React from "react";
import Image from "next/image";
import branding from "@images/about/branding.svg";
import ui from "@images/about/ui-ux.svg";
import web from "@images/about/web-dev.svg";

const About = () => {
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
            <Image src={branding} alt="Branding" />
            <small>Branding</small>
          </span>
          <span>
            <Image src={ui} alt="UX & UI" />
            <small>UX & UI</small>
          </span>
          <span>
            <Image src={web} alt="Web Develepment" />
            <small>Web Dev</small>
          </span>
        </div>
      </div>
    </div>
  );
};

export default About;
