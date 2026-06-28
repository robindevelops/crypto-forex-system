import type { AssetId } from "@/app/constants/assets";

export interface PriceRecord {
  timestamp: string;
  date: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface FeatureRecord extends PriceRecord {
  sma_7: number;
  sma_14: number;
  sma_30: number;
  sma_60: number;
  ema_7: number;
  ema_14: number;
  ema_30: number;
  ema_60: number;
  rsi: number;
  macd: number;
  macd_signal: number;
  bb_upper: number;
  bb_mid: number;
  bb_lower: number;
}

export interface AssetStats {
  assetId: AssetId;
  count: number;
  mean: number;
  std: number;
  min: number;
  max: number;
  p25: number;
  p50: number;
  p75: number;
  priceRange: { start: number; end: number };
  dateRange: { start: string; end: string };
  latestClose: number;
  previousClose: number;
  change24h: number;
  change24hPct: number;
  high30d: number;
  low30d: number;
  avgVolume: number;
}

export interface Asset {
  id: AssetId;
  name: string;
  ticker: string;
  lastSyncedAt: string | null;
  latestPrice: number;
}
