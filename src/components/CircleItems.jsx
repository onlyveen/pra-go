import Image from "next/image";
import React, { useEffect, useState } from "react";

const CircleItems = ({ items }) => {
  const [rotation, setRotation] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const deltaY = scrollY - lastScrollY;
      const isMobile = window.innerWidth <= 768;
      const speed = isMobile ? 1.5 : 1;

      setRotation((prevRotation) => prevRotation + deltaY * 0.2 * speed);
      lastScrollY = scrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const getTransformStyle = (index) => {
    if (!isMounted) return {};
    const isMobile = window.innerWidth <= 768;
    const radius = isMobile ? (window.innerWidth * 1.4) / 2 : 250;
    const angle = (360 / items.length) * index;
    return {
      transform: `rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg) translate(-50%, -50%)`,
    };
  };

  return (
    <div className={"circle"} style={{ transform: `rotate(${rotation}deg)` }}>
      {items.map((item, index) => (
        <div
          key={index}
          className={"circleItem"}
          style={getTransformStyle(index)}
        >
          <p style={{ transform: `rotate(-${rotation}deg)` }}>
            <Image src={item.src} alt={item.name} height={50} width={50} />
          </p>
        </div>
      ))}
    </div>
  );
};

export default CircleItems;
