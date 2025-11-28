import React, { useEffect, useRef } from "react";
import arw from "@images/footer/arrow-angle.svg";
import github from "@images/footer/github.svg";
import behance from "@images/footer/behance.svg";
import instagram from "@images/footer/instagram.svg";
import linkedin from "@images/footer/linkedin.svg";
import Image from "next/image";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef(null);

  useEffect(() => {
    // Intersection Observer to turn background back to light
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            document.body.classList.remove("dark-section-view");
          } else {
            // When scrolling back up from footer, check if any section is visible
            const sections = document.querySelectorAll('.about, .work-section, .writings-section');
            const anySectionVisible = Array.from(sections).some(section => {
              const rect = section.getBoundingClientRect();
              const windowHeight = window.innerHeight;
              return rect.top < windowHeight * 0.7 && rect.bottom > windowHeight * 0.3;
            });
            if (anySectionVisible) {
              document.body.classList.add("dark-section-view");
            }
          }
        });
      },
      { threshold: 0.7 } // Trigger when 70% of footer is visible
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  return (
    <footer className="footer" ref={footerRef}>
      <div className="top-footer container">
        <div className="left">
          <h4>Say HELLO..!</h4>
          <p>
            Turning Visions Into Effective Products.
            <br />
            Let's Partner On Your Next Innovation!
          </p>
        </div>
        <a href="https://calendly.com/onlyveen" target="_blank" className="btn">
          Let's Talk <Image loading="lazy" src={arw} alt="arrow-angle" />
        </a>
      </div>
      <div className="top-lower">
        <div className="container">
          <p>© {currentYear} All rights reserved.</p>
          <div className="socials">
            <a target="_blank" href="https://github.com/onlyveen">
              <Image loading="lazy" src={github} alt="Github" />
            </a>
            <a target="_blank" href="https://www.behance.net/onlyveen">
              <Image loading="lazy" src={behance} alt="behance" />
            </a>
            <a target="_blank" href="https://instagram.com/onlyveen_">
              <Image loading="lazy" src={instagram} alt="instagram" />
            </a>
            <a target="_blank" href="https://linkedin.com/in/onlyveen/">
              <Image loading="lazy" src={linkedin} alt="linkedin" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
