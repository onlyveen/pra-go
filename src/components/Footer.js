import React from "react";
import arw from "@images/footer/arrow-angle.svg";
import github from "@images/footer/github.svg";
import behance from "@images/footer/behance.svg";
import instagram from "@images/footer/instagram.svg";
import linkedin from "@images/footer/linkedin.svg";
import Image from "next/image";
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
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
          Let's Talk <Image src={arw} alt="arrow-angle" />
        </a>
      </div>
      <div className="top-lower">
        <div className="container">
          <p>© {currentYear} All rights reserved.</p>
          <div className="socials">
            <a target="_blank" href="https://github.com/onlyveen">
              <Image src={github} alt="Github" />
            </a>
            <a target="_blank" href="https://www.behance.net/onlyveen">
              <Image src={behance} alt="behance" />
            </a>
            <a target="_blank" href="https://instagram.com/onlyveen_">
              <Image src={instagram} alt="instagram" />
            </a>
            <a target="_blank" href="https://linkedin.com/in/onlyveen/">
              <Image src={linkedin} alt="linkedin" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
