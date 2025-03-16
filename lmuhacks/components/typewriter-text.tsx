"use client";
import { useEffect, useState } from "react";

interface TypewriterTextProps {
  text: string;
  speed?: number;
  className?: string;
}

const TypewriterText = ({
  text,
  speed = 0.05,
  className,
}: TypewriterTextProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed * 1000);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return <div className={className}>{displayedText}</div>;
};

export default TypewriterText;
