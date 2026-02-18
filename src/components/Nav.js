import React, { useEffect, useState } from "react";
import Image from "next/image";
import logoLight from "@images/logo-light.svg";
import logoDark from "@images/logo-dark.svg";

const Nav = ({ scroll }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDarkBackground, setIsDarkBackground] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    let scrollHeight = 0;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > window.innerHeight * scrollHeight) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setMenuOpen(false);
      }

      // Check if background is dark by checking body class or background color
      const bodyClasses = document.body.className;
      const isDark = bodyClasses.includes('dark') ||
                     bodyClasses.includes('work');
      setIsDarkBackground(isDark);
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll);

    // Also listen for class changes on body
    const observer = new MutationObserver(handleScroll);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);
  return (
    <nav className={`navBar ${isVisible ? "visible" : ""}`}>
      <a href="/#" className="logo">
        <Image
          loading="lazy"
          src={isDarkBackground ? logoLight : logoDark}
          alt="Veen Logo"
          height={70}
        />
      </a>
      <div
        className={`burgerMenu ${menuOpen ? "open" : ""}`}
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul
        onClick={toggleMenu}
        className={`menuItems ${menuOpen ? "open" : ""} ${isDarkBackground ? "dark" : "light"}`}
      >
        <li>
          <a  className="pixel-font" href="/#about-me">Me</a>
        </li>
        <li>
          <a  className="pixel-font" href="/#my-work">My Work</a>
        </li>
        <li>
          <a  className="pixel-font" href="/#my-writings">My Writings</a>
        </li>
        <li>
          <a  className="pixel-font" href="/my-clicks">My Clicks</a>
        </li>
        <li>
          <a
            className="btn"
            href="https://calendly.com/onlyveen"
            target="_blank"
          >
            Let's Talk
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
