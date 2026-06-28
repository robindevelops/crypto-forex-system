"use client";

import { useState } from "react";
import { Info } from "lucide-react";
import clsx from "clsx";

interface InfoTooltipProps {
  content: string;
  className?: string;
  position?: "top" | "bottom" | "left" | "right";
}

export function InfoTooltip({
  content,
  className,
  position = "top",
}: InfoTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <span
      className={clsx("relative inline-flex items-center", className)}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      <button
        type="button"
        className="text-text-muted hover:text-text-secondary transition-colors"
        aria-label="More information"
        tabIndex={0}
      >
        <Info size={14} />
      </button>
      {isVisible && (
        <div
          className={clsx(
            "absolute z-50 px-3 py-2 text-xs leading-relaxed rounded-lg",
            "bg-surface border border-border text-text-secondary",
            "shadow-lg min-w-[200px] max-w-[280px]",
            "animate-fade-in pointer-events-none",
            positionClasses[position]
          )}
          role="tooltip"
        >
          {content}
        </div>
      )}
    </span>
  );
}
