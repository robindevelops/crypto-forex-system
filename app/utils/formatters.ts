import type { AssetId } from "@/app/constants/assets";
import { ASSETS } from "@/app/constants/assets";

/**
 * Format a number as currency based on asset type.
 * Bitcoin: $68,234.56 | Gold: $2,234.56 | Silver: $25.67
 */
export function formatCurrency(
  value: number,
  assetId?: AssetId
): string {
  const decimals = assetId ? ASSETS[assetId].decimals : 2;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/**
 * Format as compact currency: $68.2K, $1.2M, etc.
 */
export function formatCurrencyCompact(value: number): string {
  if (Math.abs(value) >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(1)}B`;
  }
  if (Math.abs(value) >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1)}M`;
  }
  if (Math.abs(value) >= 1_000) {
    return `$${(value / 1_000).toFixed(1)}K`;
  }
  return `$${value.toFixed(2)}`;
}

/**
 * Format a percentage value: +2.45% or -1.23%
 */
export function formatPercent(value: number, showSign = true): string {
  const sign = showSign && value > 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
}

/**
 * Format large numbers with commas: 1,234,567
 */
export function formatNumber(value: number, decimals = 0): string {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/**
 * Format volume: 15.2B, 234.5K, etc.
 */
export function formatVolume(value: number): string {
  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(1)}B`;
  }
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  }
  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1)}K`;
  }
  return value.toFixed(0);
}

/**
 * Format a date string: "Jun 28, 2026"
 */
export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Format a date for chart axis: "Jun 28"
 */
export function formatDateShort(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

/**
 * Format a datetime: "Jun 28, 2026 10:30 AM"
 */
export function formatDateTime(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

/**
 * Get relative time: "2 hours ago", "3 days ago"
 */
export function formatRelativeTime(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(dateStr);
}

/**
 * Format a metric value with appropriate precision
 */
export function formatMetric(value: number, type: string): string {
  switch (type) {
    case "rmse":
    case "mae":
      return value >= 100 ? formatNumber(value, 2) : value.toFixed(2);
    case "mape":
      return `${value.toFixed(2)}%`;
    case "r2":
      return value.toFixed(4);
    case "directional_accuracy":
      return `${(value * 100).toFixed(1)}%`;
    default:
      return value.toFixed(2);
  }
}
