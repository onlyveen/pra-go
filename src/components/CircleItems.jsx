import Image from "next/image";
import React, { useEffect, useState } from "react";

const CircleItems = ({ items }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
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
    <div className={"circle"}>
      {items.map((item, index) => (
        <div
          key={index}
          className={"circleItem"}
          style={getTransformStyle(index)}
        >
          <p>
            <Image src={item.src} alt={item.name} height={50} width={50} />
          </p>
        </div>
      ))}
    </div>
  );
};

export default CircleItems;
