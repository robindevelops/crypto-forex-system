"use client";

import { useEffect, useRef, useState } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { InfoTooltip } from "@/app/components/ui/InfoTooltip";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
    <Card
      ref={ref}
      className={clsx(
        "relative overflow-hidden transition-all duration-300 hover:shadow-md",
        animate && isVisible ? "animate-fade-in-up" : animate ? "opacity-0" : ""
      )}
    >
      {/* Accent top border */}
      {accentColor && (
        <div
          className="absolute top-0 left-0 right-0 h-[3px]"
          style={{ backgroundColor: accentColor }}
        />
      )}

      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
          {icon && <span className="text-muted-foreground">{icon}</span>}
          {label}
          {tooltip && <InfoTooltip content={tooltip} />}
        </CardTitle>
        {change !== undefined && (
          <Badge
            variant={isPositive ? "default" : isNegative ? "destructive" : "secondary"}
            className={clsx(
              "flex items-center gap-1",
              isPositive && "bg-emerald-500/15 text-emerald-600 hover:bg-emerald-500/25",
              isNegative && "bg-rose-500/15 text-rose-600 hover:bg-rose-500/25"
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
          </Badge>
        )}
      </CardHeader>
      <CardContent>
        <div
          className={clsx(
            "text-2xl md:text-3xl font-bold tracking-tight",
            animate && isVisible && "animate-fade-in"
          )}
          style={
            animate && isVisible
              ? { animationDelay: "100ms", animationDuration: "500ms" }
              : undefined
          }
        >
          {value}
        </div>
      </CardContent>
    </Card>
  );
}
