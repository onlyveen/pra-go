import React from "react";
import Image from "next/image";
import veenBabu from "@images/header/praveen-gorakala.png";
import designerText from "@images/header/designer-text.svg";
import TypingText from "../TypingText";

const Header = () => {
  const words = [
    "🎯 Branding Expert",
    "💡 User Experience Designer",
    "🎨 Visual Designer",
    "✨ User Interface Designer",
    "🕸️ Web Developer",
    "📸 Photoholic",
  ];
  return (
    <div className="header">
      <div className="container">
        <h1>
          <p className="title">
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
        <p className="abstract">
          a passionate designer focused on crafting impactful experiences . My
          work spans branding, UI/UX design, & web development.
        </p>
        <div className="actions">
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
      <div className="abs">
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
