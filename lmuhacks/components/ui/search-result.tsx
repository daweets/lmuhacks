"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "./button";

interface SearchResultProps {
  title: string;
  description: string;
}

const SearchResult = ({ title, description }: SearchResultProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          className="rounded-full text-md hover:bg-transparent"
        >
          🧍 {title}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{description}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default SearchResult;
