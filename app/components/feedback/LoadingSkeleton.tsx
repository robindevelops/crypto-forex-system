import clsx from "clsx";

interface LoadingSkeletonProps {
  variant?: "chart" | "card" | "table" | "text";
  className?: string;
  lines?: number;
}

export function LoadingSkeleton({
  variant = "card",
  className,
  lines = 3,
}: LoadingSkeletonProps) {
  if (variant === "chart") {
    return (
      <div
        className={clsx(
          "w-full h-[400px] rounded-lg animate-shimmer",
          className
        )}
      />
    );
  }

  if (variant === "table") {
    return (
      <div className={clsx("space-y-2", className)}>
        <div className="h-10 rounded-lg animate-shimmer" />
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className="h-12 rounded-lg animate-shimmer"
            style={{ animationDelay: `${i * 100}ms` }}
          />
        ))}
      </div>
    );
  }

  if (variant === "text") {
    return (
      <div className={clsx("space-y-2", className)}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={clsx(
              "h-4 rounded animate-shimmer",
              i === lines - 1 ? "w-2/3" : "w-full"
            )}
            style={{ animationDelay: `${i * 80}ms` }}
          />
        ))}
      </div>
    );
  }

  // Card variant
  return (
    <div
      className={clsx("h-32 rounded-lg animate-shimmer", className)}
    />
  );
}
