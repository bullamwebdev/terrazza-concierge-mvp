import { useState, useEffect } from 'react';

interface AnimatedHeadingProps {
  text: string;
  delay?: number;
  className?: string;
  charDelay?: number;
}

export function AnimatedHeading({
  text,
  delay = 200,
  className = '',
  charDelay = 30,
}: AnimatedHeadingProps) {
  const [animate, setAnimate] = useState(false);
  const lines = text.split('\n');

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <h1
      className={className}
      style={{
        fontFamily: "'Instrument Serif', serif",
        letterSpacing: '-0.04em',
        lineHeight: 1.1,
      }}
    >
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} style={{ display: 'block', overflow: 'hidden' }}>
          {line.split('').map((char, charIndex) => {
            const totalDelay =
              delay + lineIndex * line.length * charDelay + charIndex * charDelay;
            return (
              <span
                key={`${lineIndex}-${charIndex}`}
                style={{
                  display: 'inline-block',
                  opacity: animate ? 1 : 0,
                  transform: animate ? 'translateX(0)' : 'translateX(-18px)',
                  transition: `opacity 500ms cubic-bezier(0.16, 1, 0.3, 1) ${totalDelay}ms, transform 500ms cubic-bezier(0.16, 1, 0.3, 1) ${totalDelay}ms`,
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}
