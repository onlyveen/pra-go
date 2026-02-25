# Liquid Blob Mouse Trail Mask Effect

A smooth, physics-based mouse trail effect that reveals content through an animated blob mask with gooey transitions.

## Effect Overview

This effect creates a liquid blob that:
- Follows the mouse cursor with smooth inertia
- Scales from 0 (when stationary) to full size based on movement speed
- Stretches/deforms in the direction of movement (bounce effect)
- Creates a trail of shrinking blobs that merge together with gooey effect
- Wiggles more intensely when moving fast, stays smooth when moving slow
- Acts as a mask to reveal hidden content underneath

## Visual Behavior

- **Stationary**: Circle is invisible (scale 0)
- **Slow Movement**: Small circle appears, minimal wobble
- **Fast Movement**: Large stretched blob with intense wobble and visible trail
- **Direction Change**: Blob stretches in the direction of cursor movement
- **Trail**: 8 circles following behind, each 85% smaller, merged with gooey filter

## Technical Requirements

- React (with hooks)
- GSAP (for initial page animations - optional)
- Next.js Image component (or standard `<img>`)
- SCSS support (or convert to regular CSS)

## Implementation Steps

### 1. Component Structure

```jsx
import React, { useEffect, useRef } from "react";
import Image from "next/image";

const YourComponent = () => {
  // Refs
  const containerRef = useRef(null);
  const baseImageRef = useRef(null);
  const maskedImageRef = useRef(null);
  const svgRef = useRef(null);
  const pathRef = useRef(null);

  // Mouse trail effect logic goes here (see Step 2)

  return (
    <div ref={containerRef}>
      {/* SVG filter and mask definition */}
      <svg ref={svgRef} style={{ position: 'absolute', width: 0, height: 0 }}>
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
            <path ref={pathRef} fill="white" filter="url(#gooey-trail)" />
          </mask>
        </defs>
      </svg>

      {/* Image container */}
      <div className="image-container">
        {/* Base image - always visible */}
        <Image
          src={baseImage}
          alt="Base"
          ref={baseImageRef}
          className="base-image"
        />

        {/* Masked image - revealed by blob */}
        <div className="masked-wrapper" ref={maskedImageRef}>
          <Image
            src={maskedImage}
            alt="Revealed"
            className="masked-image"
          />
        </div>
      </div>
    </div>
  );
};
```

### 2. Mouse Trail Physics Logic

```jsx
useEffect(() => {
  const wrapper = maskedImageRef.current;
  const path = pathRef.current;
  const svg = svgRef.current;
  if (!wrapper || !path || !svg) return;

  // Configuration
  const trailLength = 8;
  const baseRadius = 60; // Base circle size in pixels
  const numPoints = 12; // Number of points for blob shape
  const maxScale = 1.68; // Maximum scale multiplier
  const maxStretch = 0.6; // Maximum stretch (60%)

  // State variables
  let targetX = 0, targetY = 0;
  let currentX = 0, currentY = 0;
  let velocityX = 0, velocityY = 0;
  let moveAngle = 0;
  let stretchAmount = 0;
  let currentScale = 0, targetScale = 0;
  let animationFrame;

  // Trail history
  const trail = Array(trailLength).fill(null).map(() => ({
    x: 0, y: 0, scale: 0
  }));

  // Blob wobble points
  const points = Array(numPoints).fill(null).map((_, i) => ({
    angle: (i / numPoints) * Math.PI * 2,
    offset: 0,
    velocity: 0,
    targetOffset: 0
  }));

  // Mouse move handler
  const handleMouseMove = (e) => {
    const rect = wrapper.getBoundingClientRect();
    targetX = e.clientX - rect.left;
    targetY = e.clientY - rect.top;
  };

  // Create single blob path
  const createSingleBlob = (cx, cy, scale, wobblePoints, stretch, angle) => {
    if (scale === 0) return '';

    const points_coords = wobblePoints.map((p) => {
      const pointAngle = p.angle;
      const alignmentWithMovement = Math.cos(pointAngle - angle);
      const stretchFactor = 1 + (alignmentWithMovement * stretch);
      const radius = baseRadius * scale * stretchFactor;
      const r = p.offset * scale;

      return {
        x: cx + Math.cos(pointAngle) * (radius + r),
        y: cy + Math.sin(pointAngle) * (radius + r)
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

  // Create complete trail path
  const createTrailPath = (currentStretch, currentAngle) => {
    let pathD = '';
    for (let i = trail.length - 1; i >= 0; i--) {
      const blob = trail[i];
      if (blob.scale > 0.01) {
        const blobStretch = i === 0 ? currentStretch : currentStretch * (0.3 - i * 0.05);
        pathD += createSingleBlob(blob.x, blob.y, blob.scale, points, blobStretch, currentAngle);
      }
    }
    return pathD || 'M 0 0';
  };

  // Animation loop
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

    // Calculate speed and direction
    const speed = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
    if (speed > 0.1) {
      moveAngle = Math.atan2(velocityY, velocityX);
    }

    // Scale based on speed
    targetScale = Math.min(speed / 2, maxScale);
    currentScale += (targetScale - currentScale) * 0.08;

    // Stretch amount (bounce effect)
    const targetStretch = Math.min(speed / 8, maxStretch);
    stretchAmount += (targetStretch - stretchAmount) * 0.15;

    // Update trail positions
    for (let i = trail.length - 1; i > 0; i--) {
      trail[i].x = trail[i - 1].x;
      trail[i].y = trail[i - 1].y;
      trail[i].scale = trail[i - 1].scale * 0.85;
    }
    trail[0].x = currentX;
    trail[0].y = currentY;
    trail[0].scale = currentScale;

    // Update wobble
    const speedFactor = Math.min(speed / 10, 1);
    const wobbleIntensity = speedFactor * 5;
    points.forEach((p, i) => {
      const baseWobble = Math.sin(time * 3 + i * 0.5) * 2;
      const speedWobble = Math.sin(time * 5 + i * 0.8 + speed) * wobbleIntensity;
      p.targetOffset = baseWobble + speedWobble;

      const stiffness = 0.05 + speedFactor * 0.08;
      const damping = 0.75 - speedFactor * 0.1;
      const offsetDiff = p.targetOffset - p.offset;
      p.velocity += offsetDiff * stiffness;
      p.velocity *= damping;
      p.offset += p.velocity;
    });

    // Update SVG
    const rect = wrapper.getBoundingClientRect();
    svg.setAttribute('width', rect.width);
    svg.setAttribute('height', rect.height);
    path.setAttribute('d', createTrailPath(stretchAmount, moveAngle));

    animationFrame = requestAnimationFrame(animate);
  };

  // Start
  const container = containerRef.current;
  if (container) {
    container.addEventListener('mousemove', handleMouseMove);
    animate();
  }

  // Cleanup
  return () => {
    if (container) {
      container.removeEventListener('mousemove', handleMouseMove);
    }
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
    }
  };
}, []);
```

### 3. Styling (SCSS)

```scss
.image-container {
  position: relative;
  width: 500px; // Adjust as needed
  height: 500px;

  img {
    width: 100% !important;
    height: auto !important;
    display: block;
  }

  .base-image {
    position: relative;
  }

  .masked-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;

    // Apply SVG mask
    mask: url(#blob-mask);
    -webkit-mask: url(#blob-mask);
  }

  .masked-image {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover;
  }
}
```

## Customization Parameters

### Size & Scale
- `baseRadius`: Base circle size (default: 60px)
- `maxScale`: Maximum scale multiplier (default: 1.68)
- Adjust `speed / 2` in scale calculation to change growth rate

### Trail Effect
- `trailLength`: Number of trail circles (default: 8)
- `0.85` in trail scale: Size reduction per circle (0.85 = 85% of previous)
- `0.3 - i * 0.05`: Trail stretch reduction formula

### Stretch/Bounce
- `maxStretch`: Maximum directional stretch (default: 0.6 = 60%)
- `speed / 8`: Stretch sensitivity (lower = more stretch)
- `0.15`: Spring-back speed (higher = faster return to circle)

### Wobble
- `numPoints`: More points = smoother circle (default: 12)
- `wobbleIntensity`: Multiplier for speed-based wobble (default: 5)
- `baseWobble`: Constant subtle wobble (default: 2px)

### Physics
- `0.02`: Mouse follow acceleration
- `0.85`: Velocity damping (lower = slower, more momentum)
- `0.08`: Scale transition smoothness

### Gooey Filter
- `stdDeviation="12"`: Blur amount (higher = more gooey)
- `values="...20 -9"`: Contrast values (higher = sharper edges)

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- SVG masks work in all modern browsers
- For older browsers, provide fallback or graceful degradation

## Performance Tips

1. Use `will-change` on animated elements
2. Keep trail length reasonable (6-10 circles)
3. Use `requestAnimationFrame` (already implemented)
4. Consider reducing wobble point count on mobile

## Common Use Cases

- **Reveal Effect**: Show alternate image on hover
- **Spotlight**: Highlight specific content areas
- **Interactive Art**: Creative portfolio pieces
- **Product Showcase**: Reveal product details/variants
- **Before/After**: Compare images interactively

## Troubleshooting

**Mask not working:**
- Ensure SVG is rendered (check browser inspector)
- Verify mask ID matches between `<mask id="blob-mask">` and CSS `url(#blob-mask)`

**Performance issues:**
- Reduce `trailLength`
- Reduce `numPoints`
- Increase damping values (closer to 1)

**Circle too small/large:**
- Adjust `baseRadius`
- Adjust `maxScale`

**Not enough stretch:**
- Increase `maxStretch`
- Lower the divisor in `speed / 8`

## Example Prompt for AI

"Create a liquid blob mouse trail mask effect with these specifications:
- Circle starts at scale 0 when stationary, grows with cursor speed
- Maximum size: 60px base radius, can scale up to 1.68x
- Creates 8 trailing circles, each 85% smaller
- Circles merge with gooey SVG filter (gaussian blur + color matrix)
- Stretches in movement direction up to 60% when moving fast
- Has natural wobble that intensifies with speed (12 points, spring physics)
- Uses smooth inertia-based movement (0.85 damping, 0.02 acceleration)
- Acts as SVG mask to reveal a second image layer
- Trail circles have reduced stretch for smooth effect
- All blobs share same wobble pattern for cohesive look"

---

**Created by**: Praveen Gorakala
**Effect Type**: Mouse Trail Liquid Blob Mask
**Version**: 1.0
