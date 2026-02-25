import React, { useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import veenArt from "@images/header/veen-art.png";
import veenSpidy from "@images/header/veen-spidy.png";
import veenPic from "@images/header/veen-pic.png";
import TypingText from "../TypingText";

const Header = () => {
  const headerRef = useRef(null);
  const titleRef = useRef(null);
  const imageRef = useRef(null);
  const abstractRef = useRef(null);
  const actionsRef = useRef(null);
  const designerTextRef = useRef(null);
  const veenPicImageRef = useRef(null);
  const veenArtImageRef = useRef(null);
  const svgRef = useRef(null);
  const pathRef = useRef(null);

  // Randomly select between veenArt and veenSpidy on load
  const { maskImage, isSpiderman } = useMemo(() => {
    const useSpiderman = Math.random() > 0.5;

    // Set color theme immediately
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      const color = useSpiderman ? '#D51B1C' : '#ff4f00';
      const image = useSpiderman ? 'veenSpidy' : 'veenArt';
      root.style.setProperty('--color-primary', color);
      console.log('Theme:', useSpiderman ? 'SPIDERMAN' : 'VEEN ART');
      console.log('Color:', color);
      console.log('Mask Image:', image);
    }

    return {
      maskImage: useSpiderman ? veenSpidy : veenArt,
      isSpiderman: useSpiderman
    };
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
            designerTextRef.current?.children,
            {
              opacity: 0,
              filter: "blur(20px)",
              duration: 0.8,
              stagger: 0.08,
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
          );
      }, 2000);
    }, headerRef);

    return () => ctx.revert();
  }, []);

  // Water droplet wiggle effect
  useEffect(() => {
    const wrapper = veenArtImageRef.current;
    const path = pathRef.current;
    const svg = svgRef.current;
    if (!wrapper || !path || !svg) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let velocityX = 0;
    let velocityY = 0;
    let moveAngle = 0;
    let stretchAmount = 0;
    let animationFrame;

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
      const time = Date.now() * 0.001;

      // Smooth movement with inertia
      const dx = targetX - currentX;
      const dy = targetY - currentY;

      velocityX += dx * 0.02;
      velocityY += dy * 0.02;
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
      const rect = wrapper.getBoundingClientRect();
      svg.setAttribute('width', rect.width);
      svg.setAttribute('height', rect.height);

      // Update blob path with trail, stretch, and angle
      path.setAttribute('d', createTrailPath(stretchAmount, moveAngle));

      animationFrame = requestAnimationFrame(animate);
    };

    const container = imageRef.current;
    if (container) {
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
        <h1>
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
            <span className="high">*</span> Principal Designer
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
          {/* Blob Masked Art Layer - randomly veenArt or veenSpidy */}
          <div className="art-image-wrapper" ref={veenArtImageRef}>
            <Image
              loading="lazy"
              src={maskImage}
              alt="Praveen Gorakala's Art"
              className="art-image"
            />
          </div>
        </div>

        <h1 className="designer-text" ref={designerTextRef}>
          {"DESIGNER".split("").map((letter, index) => (
            <React.Fragment key={index}>
              <span style={{ display: "inline-block" }} className="pixel-font">
                {letter}
              </span>
              {(index === 2 || index === 5) && <div className="mobile-break"></div>}
            </React.Fragment>
          ))}
        </h1>
      </div>
    </div>
  );
};

export default Header;
