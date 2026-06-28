import type { AssetId } from "@/app/constants/assets";
import type { FeatureRecord, AssetStats } from "@/app/types/asset.types";

// --- Seeded random number generator for deterministic mock data ---
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// --- Generate realistic OHLCV + indicator data ---
function generatePriceHistory(
  assetId: AssetId,
  basePrice: number,
  volatility: number,
  days: number = 365
): FeatureRecord[] {
  const rand = seededRandom(
    assetId === "bitcoin" ? 42 : assetId === "gold" ? 137 : 256
  );
  const records: FeatureRecord[] = [];
  let price = basePrice;
  const startDate = new Date("2025-06-28");
  startDate.setDate(startDate.getDate() - days);

  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);

    // Realistic price movement with trend + noise
    const trend = Math.sin(i / 60) * volatility * 0.3;
    const noise = (rand() - 0.5) * 2 * volatility;
    const momentum = i > 0 ? (records[i - 1].close - price) * 0.1 : 0;
    price = Math.max(price * 0.7, price + trend + noise + momentum);

    const dayVolatility = volatility * (0.5 + rand());
    const open = price + (rand() - 0.5) * dayVolatility * 0.5;
    const close = price;
    const high = Math.max(open, close) + rand() * dayVolatility * 0.3;
    const low = Math.min(open, close) - rand() * dayVolatility * 0.3;
    const volume =
      assetId === "bitcoin"
        ? 15000000000 + rand() * 30000000000
        : assetId === "gold"
          ? 150000 + rand() * 100000
          : 50000 + rand() * 80000;

    records.push({
      timestamp: date.toISOString().split("T")[0],
      date,
      open: Math.round(open * 100) / 100,
      high: Math.round(high * 100) / 100,
      low: Math.round(low * 100) / 100,
      close: Math.round(close * 100) / 100,
      volume: Math.round(volume),
      sma_7: 0,
      sma_14: 0,
      sma_30: 0,
      sma_60: 0,
      ema_7: 0,
      ema_14: 0,
      ema_30: 0,
      ema_60: 0,
      rsi: 0,
      macd: 0,
      macd_signal: 0,
      bb_upper: 0,
      bb_mid: 0,
      bb_lower: 0,
    });
  }

  // Calculate SMAs
  for (const period of [7, 14, 30, 60] as const) {
    const key = `sma_${period}` as keyof FeatureRecord;
    for (let i = period - 1; i < records.length; i++) {
      let sum = 0;
      for (let j = 0; j < period; j++) {
        sum += records[i - j].close;
      }
      (records[i] as /* eslint-disable-line @typescript-eslint/no-explicit-any */ any)[key] =
        Math.round((sum / period) * 100) / 100;
    }
  }

  // Calculate EMAs
  for (const period of [7, 14, 30, 60] as const) {
    const key = `ema_${period}` as keyof FeatureRecord;
    const multiplier = 2 / (period + 1);
    for (let i = 0; i < records.length; i++) {
      if (i === 0) {
        (records[i] as /* eslint-disable-line @typescript-eslint/no-explicit-any */ any)[key] = records[i].close;
      } else {
        const prevEma = (records[i - 1] as /* eslint-disable-line @typescript-eslint/no-explicit-any */ any)[
          key
        ] as number;
        (records[i] as /* eslint-disable-line @typescript-eslint/no-explicit-any */ any)[key] =
          Math.round(
            (records[i].close * multiplier + prevEma * (1 - multiplier)) * 100
          ) / 100;
      }
    }
  }

  // Calculate RSI (14-period)
  for (let i = 1; i < records.length; i++) {
    const lookback = Math.min(14, i);
    let gains = 0;
    let losses = 0;
    for (let j = 0; j < lookback; j++) {
      const change = records[i - j].close - records[i - j - 1].close;
      if (change > 0) gains += change;
      else losses += Math.abs(change);
    }
    const avgGain = gains / lookback;
    const avgLoss = losses / lookback || 0.001;
    const rs = avgGain / avgLoss;
    records[i].rsi = Math.round((100 - 100 / (1 + rs)) * 100) / 100;
  }

  // Calculate MACD (12, 26, 9)
  const ema12: number[] = [];
  const ema26: number[] = [];
  for (let i = 0; i < records.length; i++) {
    if (i === 0) {
      ema12.push(records[i].close);
      ema26.push(records[i].close);
    } else {
      ema12.push(records[i].close * (2 / 13) + ema12[i - 1] * (1 - 2 / 13));
      ema26.push(records[i].close * (2 / 27) + ema26[i - 1] * (1 - 2 / 27));
    }
    records[i].macd = Math.round((ema12[i] - ema26[i]) * 100) / 100;
  }
  // MACD Signal (9-period EMA of MACD)
  for (let i = 0; i < records.length; i++) {
    if (i === 0) {
      records[i].macd_signal = records[i].macd;
    } else {
      records[i].macd_signal =
        Math.round(
          (records[i].macd * (2 / 10) +
            records[i - 1].macd_signal * (1 - 2 / 10)) *
            100
        ) / 100;
    }
  }

  // Calculate Bollinger Bands (20-period, 2 std devs)
  for (let i = 19; i < records.length; i++) {
    let sum = 0;
    for (let j = 0; j < 20; j++) {
      sum += records[i - j].close;
    }
    const mid = sum / 20;
    let variance = 0;
    for (let j = 0; j < 20; j++) {
      variance += Math.pow(records[i - j].close - mid, 2);
    }
    const std = Math.sqrt(variance / 20);
    records[i].bb_mid = Math.round(mid * 100) / 100;
    records[i].bb_upper = Math.round((mid + 2 * std) * 100) / 100;
    records[i].bb_lower = Math.round((mid - 2 * std) * 100) / 100;
  }

  return records;
}

// --- Generate data for all assets ---
export const MOCK_PRICE_HISTORY: Record<AssetId, FeatureRecord[]> = {
  bitcoin: generatePriceHistory("bitcoin", 68000, 2500),
  gold: generatePriceHistory("gold", 2150, 35),
  silver: generatePriceHistory("silver", 25.5, 0.8),
};

// --- Compute asset stats from price history ---
function computeStats(
  assetId: AssetId,
  data: FeatureRecord[]
): AssetStats {
  const closes = data.map((d) => d.close);
  const sorted = [...closes].sort((a, b) => a - b);
  const last30 = data.slice(-30);
  const latestClose = data[data.length - 1].close;
  const previousClose = data[data.length - 2].close;
  const mean = closes.reduce((s, v) => s + v, 0) / closes.length;
  const std = Math.sqrt(
    closes.reduce((s, v) => s + Math.pow(v - mean, 2), 0) / closes.length
  );

  return {
    assetId,
    count: data.length,
    mean: Math.round(mean * 100) / 100,
    std: Math.round(std * 100) / 100,
    min: sorted[0],
    max: sorted[sorted.length - 1],
    p25: sorted[Math.floor(sorted.length * 0.25)],
    p50: sorted[Math.floor(sorted.length * 0.5)],
    p75: sorted[Math.floor(sorted.length * 0.75)],
    priceRange: { start: data[0].close, end: latestClose },
    dateRange: {
      start: data[0].timestamp,
      end: data[data.length - 1].timestamp,
    },
    latestClose,
    previousClose,
    change24h: Math.round((latestClose - previousClose) * 100) / 100,
    change24hPct:
      Math.round(
        ((latestClose - previousClose) / previousClose) * 10000
      ) / 100,
    high30d: Math.max(...last30.map((d) => d.high)),
    low30d: Math.min(...last30.map((d) => d.low)),
    avgVolume:
      Math.round(
        last30.reduce((s, d) => s + d.volume, 0) / last30.length
      ),
  };
}

export const MOCK_ASSET_STATS: Record<AssetId, AssetStats> = {
  bitcoin: computeStats("bitcoin", MOCK_PRICE_HISTORY.bitcoin),
  gold: computeStats("gold", MOCK_PRICE_HISTORY.gold),
  silver: computeStats("silver", MOCK_PRICE_HISTORY.silver),
};
