import { useEffect, useState, useRef } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#@!%&*";

export default function DecryptedText({ text, speed = 50, delay = 0, className = "", encryptedClassName = "", breaks = [] }) {
  const [displayed, setDisplayed] = useState(text);
  const [revealed, setRevealed] = useState(new Set());
  const [animating, setAnimating] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const t = setTimeout(() => setAnimating(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!animating) return;
    const interval = setInterval(() => {
      setRevealed((prev) => {
        if (prev.size >= text.length) {
          clearInterval(interval);
          setAnimating(false);
          setDisplayed(text);
          return prev;
        }
        const next = new Set(prev);
        next.add(prev.size); // reveal left → right
        setDisplayed(
          text.split("").map((char, i) =>
            next.has(i) ? char : CHARS[Math.floor(Math.random() * CHARS.length)]
          ).join("")
        );
        return next;
      });
    }, speed);
    return () => clearInterval(interval);
  }, [animating, text, speed]);

  return (
    <span aria-label={text} style={{ display: "contents" }}>
      {displayed.split("").map((char, i) => (
        <span key={i} style={{ display: "contents" }}>
          <span
            style={{ display: "inline-block" }}
            className={revealed.has(i) || (!animating && displayed === text) ? className : encryptedClassName}
          >
            {char}
          </span>
          {breaks.includes(i) && <div className="mobile-break" />}
        </span>
      ))}
    </span>
  );
}
