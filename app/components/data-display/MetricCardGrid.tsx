import { MetricCard } from "./MetricCard";

interface MetricCardGridProps {
  children: React.ReactNode;
}

export function MetricCardGrid({ children }: MetricCardGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 stagger-children">
      {children}
    </div>
  );
}

export { MetricCard };
