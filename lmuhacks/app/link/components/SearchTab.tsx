"use client";
import { useState, useEffect, useRef } from "react";
import SearchResult from "@/components/ui/search-result";

interface SearchResult {
  gamertag: string;
  bio: string;
  userId: string;
}

interface SearchTabProps {
  onChat: (gamertag: string, userId: string) => void;
}

export const SearchTab = ({ onChat }: SearchTabProps) => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [positions, setPositions] = useState<{
    [key: string]: { x: number; y: number };
  }>({});
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const searchUsers = async () => {
    setIsLoading(true);
    try {
      console.log("Starting search...");
      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Raw search data:", data);

      if (data.search?.people && Array.isArray(data.search.people)) {
        const results = data.search.people.filter(
          (result: any): result is SearchResult =>
            result &&
            typeof result === "object" &&
            result.gamertag &&
            result.bio &&
            result.userId
        );
        console.log("Filtered search results:", results);
        setSearchResults(results);
      } else {
        console.error("Invalid data structure:", data);
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error searching:", error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("SearchTab mounted, initiating search");
    searchUsers();
  }, []);

  useEffect(() => {
    if (searchResults.length > 0) {
      console.log("Search results updated:", searchResults);
      setIsInitialized(false);
      calculatePositions();
    }
  }, [searchResults]);

  const calculatePositions = () => {
    if (!containerRef.current || searchResults.length === 0) {
      console.log("No container or results to calculate positions for");
      return;
    }

    console.log("Calculating positions for", searchResults.length, "results");
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const radius = Math.min(centerX, centerY) * 0.6;

    if (!isInitialized) {
      console.log("Initializing positions");
      const newPositions: { [key: string]: { x: number; y: number } } = {};
      searchResults.forEach((result, index) => {
        const angle = (index * 2 * Math.PI) / searchResults.length;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        newPositions[result.gamertag] = { x, y };
      });
      setPositions(newPositions);
      setTimeout(() => setIsInitialized(true), 100);
    }
  };

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
      <div className="relative flex-1 h-[600px]" ref={containerRef}>
        {/* Search Results Layer */}
        {searchResults.length > 0 && (
          <div className="absolute inset-0 z-20">
            {searchResults.map((result) => (
              <div
                key={result.gamertag}
                className="absolute transition-all duration-500 ease-in-out"
                style={{
                  left: positions[result.gamertag]?.x ?? "50%",
                  top: positions[result.gamertag]?.y ?? "50%",
                  transform: "translate(-50%, -50%)",
                  opacity: isInitialized ? 1 : 0,
                }}
              >
                <SearchResult
                  gamertag={result.gamertag}
                  description={result.bio}
                  onClick={() => onChat(result.gamertag, result.userId)}
                />
              </div>
            ))}
          </div>
        )}

        {/* Center Circle */}
        <div className="z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32">
          {/* Gradient glow underlay */}
          <div
            className={`absolute inset-0 -z-10 ${
              isLoading ? "animate-pulse" : ""
            }`}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-lmu-blue to-lmu-crimson blur-lg opacity-80 scale-120" />
          </div>
          {/* Main circle */}
          <div className="motion-blur-in relative w-full h-full rounded-full bg-white flex flex-col items-center justify-center shadow-lg">
            <span className="text-foreground font-bold text-lg">You</span>
            <span>🎓💡</span>
          </div>
        </div>
      </div>
    </div>
  );
};
