import type { AssetId } from "@/app/constants/assets";
import { ASSETS } from "@/app/constants/assets";
import { INDICATORS } from "@/app/constants/indicators";

/**
 * Get the chart line color for an asset
 */
export function getAssetColor(assetId: AssetId): string {
  return ASSETS[assetId].color;
}

/**
 * Get the chart line color for an indicator
 */
export function getIndicatorColor(indicatorId: string): string {
  return INDICATORS[indicatorId]?.color ?? "#94A3B8";
}

/**
 * Get gradient fill for a chart area
 */
export function getAssetGradientId(assetId: AssetId): string {
  return `gradient-${assetId}`;
}

/**
 * Custom tooltip style object for Recharts
 */
export const CHART_TOOLTIP_STYLE = {
  backgroundColor: "var(--surface)",
  border: "1px solid var(--border-color)",
  borderRadius: "var(--radius-md)",
  padding: "12px 16px",
  boxShadow: "var(--shadow-lg)",
  color: "var(--text-primary)",
  fontSize: "13px",
  lineHeight: "1.5",
};

/**
 * Common chart axis tick style for Recharts
 */
export const CHART_AXIS_STYLE = {
  fontSize: 11,
  fill: "var(--text-muted)",
  fontFamily: "var(--font-mono)",
};

/**
 * Common chart grid style
 */
export const CHART_GRID_STYLE = {
  stroke: "var(--border-color)",
  strokeDasharray: "3 3",
  strokeOpacity: 0.5,
};

/**
 * Responsive chart margins
 */
export const CHART_MARGINS = {
  top: 8,
  right: 16,
  bottom: 8,
  left: 16,
};

/**
 * Common Recharts animation config
 */
export const CHART_ANIMATION = {
  animationDuration: 800,
  animationEasing: "ease-out" as const,
};

/**
 * Get domain padding for a price range (adds 5% buffer on each side)
 */
export function getPriceDomain(
  data: Array<{ close: number }>
): [number, number] {
  const prices = data.map((d) => d.close);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const padding = (max - min) * 0.05;
  return [min - padding, max + padding];
}
