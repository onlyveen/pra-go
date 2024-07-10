import React, { useEffect, useState } from "react";
import Image from "next/image";
import veenImage from "@images/veen.png";

const Nav = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > window.innerHeight * 0.4) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <nav className={`navBar ${isVisible ? "visible" : ""}`}>
      <a href="/#" className="logo">
        <Image loading="lazy" src={veenImage} alt="Veen Logo" width={40} />
        <span>
          Pra<b>VeeN</b>
        </span>
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
        className={`menuItems ${menuOpen ? "open" : ""}`}
      >
        <li>
          <a href="/#about-me">Me</a>
        </li>
        <li>
          <a href="/#my-work">My Work</a>
        </li>
        <li>
          <a href="/#my-writings">My Writings</a>
        </li>
        <li>
          <a href="/my-clicks">My Clicks</a>
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
