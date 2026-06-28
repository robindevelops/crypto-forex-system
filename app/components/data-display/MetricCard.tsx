"use client";

import { useEffect, useRef, useState } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { InfoTooltip } from "@/app/components/ui/InfoTooltip";
import clsx from "clsx";

interface MetricCardProps {
  label: string;
  value: string;
  numericValue?: number;
  prefix?: string;
  suffix?: string;
  change?: number;
  changeSuffix?: string;
  tooltip?: string;
  accentColor?: string;
  icon?: React.ReactNode;
  animate?: boolean;
}

export function MetricCard({
  label,
  value,
  change,
  changeSuffix = "%",
  tooltip,
  accentColor,
  icon,
  animate = true,
}: MetricCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const isPositive = change !== undefined && change > 0;
  const isNegative = change !== undefined && change < 0;

  return (
    <div
      ref={ref}
      className={clsx(
        "glass-card p-4 md:p-5 relative overflow-hidden transition-all duration-300",
        "hover:border-border-hover hover:shadow-md",
        animate && isVisible ? "animate-fade-in-up" : animate ? "opacity-0" : ""
      )}
    >
      {/* Accent top border */}
      {accentColor && (
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ backgroundColor: accentColor }}
        />
      )}

      {/* Label row */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          {icon && (
            <span className="text-text-muted">{icon}</span>
          )}
          <span className="text-xs font-medium text-text-secondary uppercase tracking-wide">
            {label}
          </span>
          {tooltip && <InfoTooltip content={tooltip} />}
        </div>

        {/* Change indicator */}
        {change !== undefined && (
          <div
            className={clsx(
              "flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full",
              isPositive && "text-success bg-success/10",
              isNegative && "text-error bg-error/10",
              !isPositive && !isNegative && "text-text-muted bg-surface-hover"
            )}
          >
            {isPositive ? (
              <TrendingUp size={12} />
            ) : isNegative ? (
              <TrendingDown size={12} />
            ) : (
              <Minus size={12} />
            )}
            <span>
              {isPositive ? "+" : ""}
              {change.toFixed(2)}
              {changeSuffix}
            </span>
          </div>
        )}
      </div>

      {/* Value */}
      <p
        className={clsx(
          "text-2xl md:text-3xl font-bold font-mono tracking-tight text-text-primary",
          animate && isVisible && "animate-fade-in"
        )}
        style={
          animate && isVisible
            ? { animationDelay: "100ms", animationDuration: "500ms" }
            : undefined
        }
      >
        {value}
      </p>
    </div>
  );
}
