"use client";

import { BrainCircuit } from "lucide-react";
import { Button } from "@/components/ui/button";
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
    <Button
      onClick={onClick}
      disabled={isLoading || disabled}
      className={clsx(
        "w-full bg-primary text-black font-bold border border-primary hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(204,255,0,0.4)] transition-all duration-300",
        className
      )}
    >
      <BrainCircuit
        size={18}
        className={clsx("mr-2", isLoading && "animate-spin")}
      />
      <span>{isLoading ? "Running Model..." : "Run AI Prediction"}</span>
    </Button>
  );
}
