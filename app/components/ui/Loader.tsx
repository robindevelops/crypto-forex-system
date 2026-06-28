import clsx from "clsx";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  fullPage?: boolean;
}

export function Loader({ size = "md", className, fullPage }: LoaderProps) {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-2",
    lg: "w-12 h-12 border-3",
  };

  const spinner = (
    <div
      className={clsx(
        "rounded-full border-text-muted/30 border-t-primary animate-spin",
        sizeClasses[size],
        className
      )}
      role="status"
      aria-label="Loading"
    />
  );

  if (fullPage) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        {spinner}
      </div>
    );
  }

  return spinner;
}
