import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { GeistPixelCircle } from "geist/font/pixel";

const Aurora = dynamic(() => import("@/components/Aurora"), { ssr: false });
const FuzzyText = dynamic(() => import("@/components/FuzzyText"), { ssr: false });

const NotFound = () => {
  return (
    <div className={`not-found ${GeistPixelCircle.variable}`}>
      <div className="not-found-aurora">
        <Aurora
          colorStops={["#ff4f00", "#151515", "#ff4f00"]}
          amplitude={1.2}
          blend={0.6}
          speed={0.8}
        />
      </div>
      <div className="flex-container">
        <div style={{ zIndex: 1, display: 'flex', justifyContent: 'center', overflow: 'hidden' }}>
          <FuzzyText
            fontSize="clamp(8rem, 22vw, 22rem)"
            fontWeight={900}
            color="#ffffff"
            baseIntensity={0.15}
            hoverIntensity={0.4}
            enableHover={true}
          >
            404
          </FuzzyText>
        </div>

        <div className="not-found-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
          <p className="not-found-msg">Looks like this page got lost in the void.</p>
          <nav className="not-found-nav">
            <Link href="/" className="pixel-font">Home</Link>
            <Link href="/#about-me" className="pixel-font">Me</Link>
            <Link href="/#journey" className="pixel-font">My Journey</Link>
            <Link href="/#my-work" className="pixel-font">My Work</Link>
            <Link href="/my-clicks" className="pixel-font">My Clicks</Link>
          </nav>
        </div>
      </div>

    </div>
  );
};

export default NotFound;
