"use client";

import { BrainCircuit } from "lucide-react";
import clsx from "clsx";

interface PredictButtonProps {
  onClick: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
}

export function PredictButton({
  onClick,
  isLoading,
  disabled,
  className,
}: PredictButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={isLoading || disabled}
      className={clsx(
        "w-full flex items-center justify-center gap-2.5 px-5 py-3 rounded-lg text-sm font-semibold transition-all duration-200",
        "bg-gradient-to-r from-primary to-[#FFB84D] text-background",
        "hover:shadow-glow active:scale-[0.98]",
        isLoading
          ? "opacity-70 cursor-wait"
          : disabled
            ? "opacity-40 cursor-not-allowed"
            : "animate-pulse-glow",
        className
      )}
    >
      <BrainCircuit
        size={18}
        className={clsx(isLoading && "animate-spin")}
      />
      <span>{isLoading ? "Running Model..." : "Run AI Prediction"}</span>
    </button>
  );
}
