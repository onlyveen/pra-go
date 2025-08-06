import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "@images/logo.svg";

const Nav = ({ scroll }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <nav className={`navBar ${isVisible ? "visible" : ""}`}>
      <a href="/#" className="logo">
        <Image loading="lazy" src={logo} alt="Veen Logo" height={90} />
      
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
