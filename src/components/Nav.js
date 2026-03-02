import React, { useEffect, useState } from "react";
import logoLight from "@images/logo-light.svg";
import logoDark from "@images/logo-dark.svg";

const Nav = ({ scroll }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDarkBackground, setIsDarkBackground] = useState(false);
  const [isSpidermanTheme, setIsSpidermanTheme] = useState(false);
  const [logoLightSvg, setLogoLightSvg] = useState(null);
  const [logoDarkSvg, setLogoDarkSvg] = useState(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Load SVG content
  useEffect(() => {
    const loadSvgs = async () => {
      try {
        const [lightResponse, darkResponse] = await Promise.all([
          fetch(logoLight.src),
          fetch(logoDark.src),
        ]);
        const lightText = await lightResponse.text();
        const darkText = await darkResponse.text();
        setLogoLightSvg(lightText);
        setLogoDarkSvg(darkText);
      } catch (error) {
        console.error("Failed to load SVGs:", error);
      }
    };
    loadSvgs();
  }, []);

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
      const isDark =
        bodyClasses.includes("dark") || bodyClasses.includes("work");
      setIsDarkBackground(isDark);

      // Check color theme
      const primaryColor = getComputedStyle(document.documentElement)
        .getPropertyValue("--color-primary")
        .trim();
      setIsSpidermanTheme(
        primaryColor === "#D51B1C" || primaryColor === "#d51b1c",
      );
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll);

    // Also listen for class changes on body
    const observer = new MutationObserver(handleScroll);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Also listen for style changes on :root
    const styleObserver = new MutationObserver(handleScroll);
    styleObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["style"],
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
      styleObserver.disconnect();
    };
  }, []);
  return (
    <nav
      className={`navBar ${isVisible ? "visible" : ""} ${isSpidermanTheme ? "spiderman-theme" : "orange-theme"}`}
    >
      <a href="/#" className="logo">
        {isDarkBackground ? (
          logoLightSvg ? (
            <div
              dangerouslySetInnerHTML={{ __html: logoLightSvg }}
              className="logo-svg"
              style={{ width: "169px", height: "auto" }}
            />
          ) : null
        ) : logoDarkSvg ? (
          <div
            dangerouslySetInnerHTML={{ __html: logoDarkSvg }}
            className="logo-svg"
            style={{ width: "169px", height: "auto" }}
          />
        ) : null}
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
          <a className="logo-menu" href="/#home">
            <div
              dangerouslySetInnerHTML={{ __html: logoLightSvg }}
              className="logo-svg"
              style={{ width: "169px", height: "auto" }}
            />
          </a>
        </li>
        <li>
          <a className="pixel-font" href="/#about-me">
            Me
          </a>
        </li>
        <li>
          <a className="pixel-font" href="/#my-work">
            My Work
          </a>
        </li>
        <li>
          <a className="pixel-font" href="/#my-writings">
            My Writings
          </a>
        </li>
        <li>
          <a className="pixel-font" href="/my-clicks">
            My Clicks
          </a>
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
