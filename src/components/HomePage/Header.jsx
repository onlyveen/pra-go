import React, { useEffect, useRef, useMemo, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import veenArt from "@images/header/veen-art.png";
import veenSpidy from "@images/header/veen-spidy.png";
import veenPic from "@images/header/veen-pic.png";
import TypingText from "../TypingText";
import DecryptedText from "../DecryptedText";

const Header = () => {
  const headerRef = useRef(null);
  const titleRef = useRef(null);
  const imageRef = useRef(null);
  const abstractRef = useRef(null);
  const actionsRef = useRef(null);
  const designerTextRef = useRef(null);
  const [cycleCount, setCycleCount] = useState(0);
  const veenPicImageRef = useRef(null);
  const veenArtImageRef = useRef(null);
  const veenSpidyImageRef = useRef(null);
  const svgRef = useRef(null);
  const pathRef = useRef(null);

  // Randomly select between veenArt and veenSpidy on load
  useMemo(() => {
    const useSpiderman = Math.random() > 0.5;

    // Set body class for theme
    if (typeof document !== 'undefined') {
      // Remove both classes first
      document.body.classList.remove('spiderman-theme', 'veenart-theme');
      // Add the selected one
      document.body.classList.add(useSpiderman ? 'spiderman-theme' : 'veenart-theme');
      console.log('Theme:', useSpiderman ? 'SPIDERMAN' : 'VEENART');
    }
  }, []);

  const words = [
    "🎯 Branding Expert",
    "💡 User Experience Designer",
    "🎨 Visual Designer",
    "✨ User Interface Designer",
    "🕸️ Web Developer",
    "📸 Photoholic",
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hide art layers immediately — revealed with base image animation
      gsap.set([veenArtImageRef.current, veenSpidyImageRef.current], { opacity: 0 });

      // Start animations after 2 seconds (when loading is removed)
      setTimeout(() => {
        // Create timeline - all animations start together after loading is removed
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        // All elements animate in together, except image comes after DESIGNER text
        tl.from(imageRef.current, {
          y: 50,
          opacity: 0,
          duration: 0.8,
        })
          .from(
            designerTextRef.current,
            {
              opacity: 0,
              filter: "blur(20px)",
              duration: 0.8,
              ease: "power2.out",
            },
            "<"
          )
          .from(
            titleRef.current?.children,
            {
              y: 100,
              opacity: 0,
              duration: 1,
              stagger: 0.2,
            },
            "<"
          )
          .from(
            abstractRef.current,
            {
              y: 50,
              opacity: 0,
              duration: 0.8,
            },
            "<"
          )
          .from(
            actionsRef.current?.children,
            {
              y: 30,
              opacity: 0,
              duration: 0.6,
              stagger: 0.15,
            },
            "<"
          )
          .from(
            veenPicImageRef.current,
            {
              opacity: 0,
              filter: "blur(30px)",
              scale: 1.1,
              duration: 1.2,
              ease: "power2.out",
            },
            "-=0.4"
          )
          .to(
            [veenArtImageRef.current, veenSpidyImageRef.current],
            {
              opacity: 1,
              duration: 0,
            },
            "<"
          );
      }, 2000);
    }, headerRef);

    return () => ctx.revert();
  }, []);

  // Cycle DESIGNER → DEVELOPER every 4s
  useEffect(() => {
    const id = setInterval(() => setCycleCount((c) => c + 1), 4000);
    return () => clearInterval(id);
  }, []);

  // Water droplet wiggle effect
  useEffect(() => {
    const wrapperArt = veenArtImageRef.current;
    const wrapperSpidy = veenSpidyImageRef.current;
    const path = pathRef.current;
    const svg = svgRef.current;
    if ((!wrapperArt && !wrapperSpidy) || !path || !svg) return;

    // Function to get the visible wrapper
    const getVisibleWrapper = () => {
      if (wrapperArt && window.getComputedStyle(wrapperArt).display !== 'none') {
        return wrapperArt;
      }
      if (wrapperSpidy && window.getComputedStyle(wrapperSpidy).display !== 'none') {
        return wrapperSpidy;
      }
      return wrapperArt || wrapperSpidy; // Fallback
    };

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let velocityX = 0;
    let velocityY = 0;
    let moveAngle = 0;
    let stretchAmount = 0;
    let animationFrame;

    // Idle animation state — start idle so effect is visible on load
    let isIdle = true;
    let lastMouseTime = 0;
    let idleTargetX = 0;
    let idleTargetY = 0;
    let idleNextChange = 0;
    let idleStep = 0;
    let idleMode = 0; // picked randomly each cycle
    const IDLE_TIMEOUT = 2500;
    const IDLE_STEP_INTERVAL = 330;
    const IDLE_PAUSE = 2000;
    const IDLE_STEPS = 4;
    // modes: 0=left→right going down, 1=left→right going up,
    //        2=top→bottom going right, 3=top→bottom going left
    const IDLE_MODE_COUNT = 4;

    // Trail history - store positions
    const trailLength = 8;
    const trail = Array(trailLength).fill(null).map(() => ({
      x: 0,
      y: 0,
      scale: 0
    }));

    // Blob points with spring physics
    const numPoints = 12;
    const baseRadius = 60
    let currentScale = 0;
    let targetScale = 0;
    const points = Array(numPoints).fill(null).map((_, i) => ({
      angle: (i / numPoints) * Math.PI * 2,
      offset: 0,
      velocity: 0,
      targetOffset: 0
    }));

    const handleMouseMove = (e) => {
      isIdle = false;
      lastMouseTime = Date.now();
      const wrapper = getVisibleWrapper();
      const rect = wrapper.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
    };

    const createSingleBlob = (cx, cy, scale, wobblePoints, stretch, angle) => {
      if (scale === 0) return '';

      const points_coords = wobblePoints.map((p) => {
        const pointAngle = p.angle;

        // Calculate stretch based on alignment with movement direction
        const alignmentWithMovement = Math.cos(pointAngle - angle);

        // Points aligned with movement stretch more
        const stretchFactor = 1 + (alignmentWithMovement * stretch);

        const radius = baseRadius * scale * stretchFactor;
        const r = p.offset * scale;

        const x = Math.cos(pointAngle) * (radius + r);
        const y = Math.sin(pointAngle) * (radius + r);

        return {
          x: cx + x,
          y: cy + y
        };
      });

      let pathD = `M ${points_coords[0].x} ${points_coords[0].y}`;

      for (let i = 0; i < points_coords.length; i++) {
        const current = points_coords[i];
        const next = points_coords[(i + 1) % points_coords.length];

        const cx1 = current.x + (next.x - current.x) * 0.5;
        const cy1 = current.y + (next.y - current.y) * 0.5;

        pathD += ` Q ${next.x} ${next.y} ${cx1} ${cy1}`;
      }

      pathD += ' Z';
      return pathD;
    };

    const createTrailPath = (currentStretch, currentAngle) => {
      let pathD = '';

      // Draw all trail blobs from back to front
      for (let i = trail.length - 1; i >= 0; i--) {
        const blob = trail[i];
        if (blob.scale > 0.01) {
          // Front blob gets full stretch, trail blobs get reduced stretch
          const blobStretch = i === 0 ? currentStretch : currentStretch * (0.3 - i * 0.05);
          pathD += createSingleBlob(blob.x, blob.y, blob.scale, points, blobStretch, currentAngle);
        }
      }

      return pathD || 'M 0 0';
    };

    const animate = () => {
      const now = Date.now();
      const time = now * 0.001;

      // Switch to idle if mouse has been still too long
      if (!isIdle && now - lastMouseTime > IDLE_TIMEOUT) {
        isIdle = true;
      }

      // Idle: zig-zag from top to bottom
      if (isIdle) {
        if (now > idleNextChange) {
          const wrapper = getVisibleWrapper();
          const rect = wrapper.getBoundingClientRect();
          if (rect.width && rect.height) {
            // Pick a new random mode at the start of each cycle
            if (idleStep === 0) idleMode = Math.floor(Math.random() * IDLE_MODE_COUNT);

            const t = idleStep / (IDLE_STEPS - 1); // 0→1 along primary axis
            const zigzag = idleStep % 2 === 0;      // alternates each step
            const j = (Math.random() - 0.5) * 0.12; // small jitter

            if (idleMode === 0) {
              // left→right, progressing downward
              idleTargetX = rect.width * ((zigzag ? 0.2 : 0.8) + j);
              idleTargetY = rect.height * (0.1 + t * 0.8);
            } else if (idleMode === 1) {
              // left→right, progressing upward
              idleTargetX = rect.width * ((zigzag ? 0.2 : 0.8) + j);
              idleTargetY = rect.height * (0.9 - t * 0.8);
            } else if (idleMode === 2) {
              // top→bottom, progressing rightward
              idleTargetX = rect.width * (0.1 + t * 0.8);
              idleTargetY = rect.height * ((zigzag ? 0.2 : 0.8) + j);
            } else {
              // top→bottom, progressing leftward
              idleTargetX = rect.width * (0.9 - t * 0.8);
              idleTargetY = rect.height * ((zigzag ? 0.2 : 0.8) + j);
            }

            idleStep = (idleStep + 1) % IDLE_STEPS;
          }
          // Pause after completing the full zig-zag, quick steps in between
          const justCompleted = idleStep === 0;
          idleNextChange = now + (justCompleted ? IDLE_PAUSE : IDLE_STEP_INTERVAL);
        }
        targetX = idleTargetX;
        targetY = idleTargetY;
      }

      // Smooth movement with inertia — faster acceleration in idle
      const accel = isIdle ? 0.07 : 0.02;
      const dx = targetX - currentX;
      const dy = targetY - currentY;

      velocityX += dx * accel;
      velocityY += dy * accel;
      velocityX *= 0.85;
      velocityY *= 0.85;

      currentX += velocityX;
      currentY += velocityY;

      // Calculate movement speed and direction
      const speed = Math.sqrt(velocityX * velocityX + velocityY * velocityY);

      // Update movement angle only when moving
      if (speed > 0.1) {
        moveAngle = Math.atan2(velocityY, velocityX);
      }

      // Scale based on speed - 0 when not moving, grows with speed
      targetScale = Math.min(speed / 2, 1.68); // Max scale 1.68 (70% of original)
      currentScale += (targetScale - currentScale) * 0.08;

      // Stretch amount based on speed - creates bounce effect
      const targetStretch = Math.min(speed / 8, 0.6); // Max 60% stretch
      stretchAmount += (targetStretch - stretchAmount) * 0.15; // Spring back slowly

      // Update trail - shift positions back and add new front position
      for (let i = trail.length - 1; i > 0; i--) {
        trail[i].x = trail[i - 1].x;
        trail[i].y = trail[i - 1].y;
        trail[i].scale = trail[i - 1].scale * 0.85; // Each trail blob is 85% of previous
      }

      // Set the front blob position and scale
      trail[0].x = currentX;
      trail[0].y = currentY;
      trail[0].scale = currentScale;

      // Speed-based wobble intensity (more speed = more wobble)
      const speedFactor = Math.min(speed / 10, 1);
      const wobbleIntensity = speedFactor * 5;

      // Update blob points - keep circular shape with wiggle
      points.forEach((p, i) => {
        // Subtle natural wobble for circle edge
        const baseWobble = Math.sin(time * 3 + i * 0.5) * 2;

        // Speed-based wobble - increases with speed
        const speedWobble = Math.sin(time * 5 + i * 0.8 + speed) * wobbleIntensity;

        p.targetOffset = baseWobble + speedWobble;

        // Spring physics
        const stiffness = 0.05 + speedFactor * 0.08;
        const damping = 0.75 - speedFactor * 0.1;

        const offsetDiff = p.targetOffset - p.offset;
        p.velocity += offsetDiff * stiffness;
        p.velocity *= damping;
        p.offset += p.velocity;
      });

      // Resize SVG to match wrapper
      const wrapper = getVisibleWrapper();
      const rect = wrapper.getBoundingClientRect();
      svg.setAttribute('width', rect.width);
      svg.setAttribute('height', rect.height);

      // Update blob path with trail, stretch, and angle
      path.setAttribute('d', createTrailPath(stretchAmount, moveAngle));

      animationFrame = requestAnimationFrame(animate);
    };

    const container = imageRef.current;
    if (container) {
      // Seed idle position to center of container
      const initRect = container.getBoundingClientRect();
      idleTargetX = currentX = targetX = initRect.width * 0.65;
      idleTargetY = currentY = targetY = initRect.height * 0.35;
      container.addEventListener('mousemove', handleMouseMove);
      animate();
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <div className="header" ref={headerRef}>
      <div className="container">
        <h1 className="main">
          <p className="title" ref={titleRef}>
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
            <span className="high">*</span> Principal Designer Engineer
          </p>
        </h1>
        <p className="abstract" ref={abstractRef}>
          a passionate designer focused on crafting impactful experiences . My
          work spans branding, UI/UX design, & web development.
        </p>
        <div className="actions" ref={actionsRef}>
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
      <div className="abs" ref={imageRef}>
        {/* SVG Blob Mask */}
        <svg
          ref={svgRef}
          style={{
            position: 'absolute',
            width: 0,
            height: 0,
            pointerEvents: 'none'
          }}
        >
          <defs>
            <filter id="gooey-trail">
              <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9"
                result="gooey"
              />
            </filter>
            <mask id="blob-mask">
              <path
                ref={pathRef}
                fill="white"
                filter="url(#gooey-trail)"
              />
            </mask>
          </defs>
        </svg>

        <div className="image-container">
          {/* Base Image - veenPic */}
          <Image
            loading="lazy"
            src={veenPic}
            alt="Praveen Gorakala's Image"
            ref={veenPicImageRef}
            className="base-image"
          />
          {/* Blob Masked Art Layer - veenArt */}
          <div className="art-image-wrapper veenart-image" ref={veenArtImageRef}>
            <Image
              loading="lazy"
              src={veenArt}
              alt="Praveen Gorakala's Art"
              className="art-image"
            />
          </div>
          {/* Blob Masked Art Layer - veenSpidy */}
          <div className="art-image-wrapper veenspidy-image" ref={veenSpidyImageRef}>
            <Image
              loading="lazy"
              src={veenSpidy}
              alt="Praveen Gorakala's Spiderman Art"
              className="art-image"
            />
          </div>
        </div>

        <h1
          className="designer-text"
          ref={designerTextRef}
          style={{
            fontSize: `${25 * (8 / (cycleCount % 2 === 0 ? 8 : 10))}vw`,
            letterSpacing: `${-2 * (8 / (cycleCount % 2 === 0 ? 8 : 10))}vw`,
            height: "calc(25vw * 0.677)",
          }}
        >
          <DecryptedText
            key={cycleCount}
            text={cycleCount % 2 === 0 ? "DESIGNER" : "DEVELOPER"}
            speed={50}
            delay={cycleCount === 0 ? 2200 : 0}
            className="pixel-font"
            encryptedClassName="pixel-font"
            breaks={[2, 5]}
          />
        </h1>
      </div>
    </div>
  );
};

export default Header;
