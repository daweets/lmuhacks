"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "./button";

interface SearchResultProps {
  gamertag: string;
  description: string;
  onClick?: () => void;
}

const SearchResult = ({
  gamertag,
  description,
  onClick,
}: SearchResultProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          className="motion-blur-in-lg rounded-full text-md hover:bg-transparent"
          onClick={onClick}
        >
          🧍 {gamertag}
        </Button>
      </TooltipTrigger>
      <TooltipContent className="max-w-[300px] p-4 rounded-xl">
        <p>{description}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default SearchResult;
