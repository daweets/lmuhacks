import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ChipProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "default" | "selected" | "suggestion";
}

const Chip = ({
  children,
  className,
  onClick,
  variant = "default",
}: ChipProps) => {
  return (
    <div
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full transition-all",
        variant === "selected" && "bg-lmu-blue text-white shadow-md",
        variant === "suggestion" &&
          "bg-white border border-gray-200 hover:bg-gray-50 cursor-pointer",
        variant === "default" && "bg-gray-100 text-gray-800",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Chip;
