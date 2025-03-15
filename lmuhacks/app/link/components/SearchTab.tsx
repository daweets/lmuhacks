"use client";
import { useState, useEffect, useRef } from "react";
import SearchResult from "@/components/ui/search-result";

type SearchResult = {
  title: string;
  description: string;
};

export const SearchTab = () => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([
    {
      title: "John Smith",
      description: "John Smith is a software engineer at Google",
    },
    {
      title: "Sarah Lee",
      description: "Sarah Lee is a software engineer at Facebook",
    },
    {
      title: "Mike Johnson",
      description: "Mike Johnson is a software engineer at Amazon",
    },
    {
      title: "Emily Brown",
      description: "Emily Brown is a software engineer at Apple",
    },
    {
      title: "David Wilson",
      description: "David Wilson is a product manager at Microsoft",
    },
    {
      title: "Jessica Chen",
      description: "Jessica Chen is a UX designer at Netflix",
    },
    {
      title: "Michael Taylor",
      description: "Michael Taylor is a data scientist at Twitter",
    },
    {
      title: "Amanda Garcia",
      description: "Amanda Garcia is a software architect at Adobe",
    },
    {
      title: "James Kim",
      description: "James Kim is a frontend developer at Airbnb",
    },
    {
      title: "Rachel Moore",
      description: "Rachel Moore is a backend engineer at LinkedIn",
    },
  ]);
  const [positions, setPositions] = useState<{
    [key: string]: { x: number; y: number };
  }>({});
  const [isInitialized, setIsInitialized] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const calculatePositions = () => {
    if (!containerRef.current || searchResults.length === 0) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const radius = Math.min(centerX, centerY) * 0.85;

    if (!isInitialized) {
      const centerPositions: { [key: string]: { x: number; y: number } } = {};
      searchResults.forEach((result) => {
        centerPositions[result.title] = { x: centerX, y: centerY };
      });
      setPositions(centerPositions);
      setIsInitialized(true);

      setTimeout(() => {
        const newPositions: { [key: string]: { x: number; y: number } } = {};
        searchResults.forEach((result, index) => {
          const angle = (index * 2 * Math.PI) / searchResults.length;
          const randomRadius = radius * (0.8 + Math.random() * 0.2);
          const x = centerX + randomRadius * Math.cos(angle);
          const y = centerY + randomRadius * Math.sin(angle);
          newPositions[result.title] = { x, y };
        });
        setPositions(newPositions);
      }, 100);
    } else {
      const newPositions: { [key: string]: { x: number; y: number } } = {};
      searchResults.forEach((result, index) => {
        const angle = (index * 2 * Math.PI) / searchResults.length;
        const randomRadius = radius * (0.8 + Math.random() * 0.2);
        const x = centerX + randomRadius * Math.cos(angle);
        const y = centerY + randomRadius * Math.sin(angle);
        newPositions[result.title] = { x, y };
      });
      setPositions(newPositions);
    }
  };

  useEffect(() => {
    setIsInitialized(false);
    calculatePositions();
  }, [searchResults]);

  useEffect(() => {
    const handleResize = () => {
      calculatePositions();
    };

    window.addEventListener("resize", handleResize);
    calculatePositions();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [searchResults]);

  return (
    <div className="h-full flex flex-col gap-4 p-8">
      <div className="relative flex-1" ref={containerRef}>
        <div className="z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32">
          {/* Gradient glow underlay */}
          <div className="absolute inset-0 -z-10 animate-pulse">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-lmu-blue to-lmu-crimson blur-lg opacity-80 scale-120" />
          </div>
          {/* Main circle */}
          <div className="relative w-full h-full rounded-full bg-white flex flex-col items-center justify-center">
            <span className="text-foreground font-bold text-lg">You</span>
            <span>🎓💡</span>
          </div>
        </div>
        {searchResults.map((result) => (
          <div
            key={result.title}
            className="absolute transition-all duration-500 ease-in-out"
            style={{
              left: positions[result.title]?.x ?? "50%",
              top: positions[result.title]?.y ?? "50%",
              transform: "translate(-50%, -50%)",
              opacity: isInitialized ? 1 : 0,
            }}
          >
            <SearchResult
              title={result.title}
              description={result.description}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
