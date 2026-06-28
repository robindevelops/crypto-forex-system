import clsx from "clsx";

interface BadgeProps {
  children: React.ReactNode;
  color?: string;
  variant?: "solid" | "outline" | "subtle";
  size?: "sm" | "md";
  className?: string;
}

export function Badge({
  children,
  color = "#94A3B8",
  variant = "subtle",
  size = "sm",
  className,
}: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1 font-medium rounded-full whitespace-nowrap",
        size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-3 py-1 text-xs",
        className
      )}
      style={
        variant === "solid"
          ? { backgroundColor: color, color: "#0F1117" }
          : variant === "outline"
            ? {
                border: `1px solid ${color}`,
                color: color,
              }
            : {
                backgroundColor: `${color}18`,
                color: color,
              }
      }
    >
      {children}
    </span>
  );
}
