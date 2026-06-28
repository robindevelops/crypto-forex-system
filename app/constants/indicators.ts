export interface IndicatorConfig {
  id: string;
  label: string;
  shortLabel: string;
  color: string;
  description: string;
  category: "trend" | "momentum" | "volatility";
}

export const INDICATORS: Record<string, IndicatorConfig> = {
  sma: {
    id: "sma",
    label: "Simple Moving Average",
    shortLabel: "SMA",
    color: "#3B82F6",
    description:
      "Average price over a specified period. Smooths out price data to identify the trend direction.",
    category: "trend",
  },
  ema: {
    id: "ema",
    label: "Exponential Moving Average",
    shortLabel: "EMA",
    color: "#8B5CF6",
    description:
      "Weighted moving average that gives more importance to recent prices. Reacts faster to price changes than SMA.",
    category: "trend",
  },
  rsi: {
    id: "rsi",
    label: "Relative Strength Index",
    shortLabel: "RSI",
    color: "#EC4899",
    description:
      "Momentum oscillator measuring speed and magnitude of price changes. Values above 70 indicate overbought, below 30 oversold.",
    category: "momentum",
  },
  macd: {
    id: "macd",
    label: "MACD",
    shortLabel: "MACD",
    color: "#06B6D4",
    description:
      "Moving Average Convergence Divergence. Shows the relationship between two EMAs. Used to spot trend changes and momentum.",
    category: "momentum",
  },
  bollinger: {
    id: "bollinger",
    label: "Bollinger Bands",
    shortLabel: "BB",
    color: "#6366F1",
    description:
      "Volatility bands placed above and below a moving average. Bands widen during high volatility and contract during low volatility.",
    category: "volatility",
  },
} as const;

export const INDICATOR_LIST = Object.values(INDICATORS);
export type IndicatorId = keyof typeof INDICATORS;

export const SMA_PERIODS = [7, 14, 30, 60] as const;
export const EMA_PERIODS = [7, 14, 30, 60] as const;
