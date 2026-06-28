import type { AssetId } from "@/app/constants/assets";
import type {
  PredictionResult,
  PredictionHistoryItem,
} from "@/app/types/prediction.types";
import { MOCK_ASSET_STATS } from "./price-history";

export function generateMockPrediction(assetId: AssetId): PredictionResult {
  const stats = MOCK_ASSET_STATS[assetId];
  const changePct = (Math.random() - 0.45) * 4; // Slight upward bias
  const predictedPrice =
    Math.round(stats.latestClose * (1 + changePct / 100) * 100) / 100;

  return {
    id: `pred-${Date.now()}`,
    assetId,
    predictedPrice,
    projectedChangePct: Math.round(changePct * 100) / 100,
    modelType: "LSTM (Optimized)",
    predictionDate: new Date(Date.now() + 86400000)
      .toISOString()
      .split("T")[0],
    sequenceEndDate: new Date().toISOString().split("T")[0],
    currentPrice: stats.latestClose,
    confidence:
      Math.abs(changePct) < 1 ? "high" : Math.abs(changePct) < 2.5 ? "medium" : "low",
  };
}

export const MOCK_PREDICTION_HISTORY: Record<AssetId, PredictionHistoryItem[]> =
  {
    bitcoin: Array.from({ length: 15 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i - 1);
      const basePrice = 68000 + Math.sin(i / 3) * 3000;
      const predicted = basePrice + (Math.random() - 0.48) * 2500;
      const actual = basePrice + (Math.random() - 0.5) * 2000;
      return {
        id: `hist-btc-${i}`,
        assetId: "bitcoin" as AssetId,
        predictedPrice: Math.round(predicted * 100) / 100,
        actualPrice: i > 0 ? Math.round(actual * 100) / 100 : null,
        projectedChangePct:
          Math.round(((predicted - basePrice) / basePrice) * 10000) / 100,
        modelType: "LSTM (Optimized)",
        predictionDate: date.toISOString().split("T")[0],
        createdAt: date.toISOString(),
        error:
          i > 0
            ? Math.round(Math.abs(predicted - actual) * 100) / 100
            : null,
      };
    }),
    gold: Array.from({ length: 15 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i - 1);
      const basePrice = 2200 + Math.sin(i / 3) * 80;
      const predicted = basePrice + (Math.random() - 0.48) * 40;
      const actual = basePrice + (Math.random() - 0.5) * 35;
      return {
        id: `hist-gold-${i}`,
        assetId: "gold" as AssetId,
        predictedPrice: Math.round(predicted * 100) / 100,
        actualPrice: i > 0 ? Math.round(actual * 100) / 100 : null,
        projectedChangePct:
          Math.round(((predicted - basePrice) / basePrice) * 10000) / 100,
        modelType: "LSTM (Optimized)",
        predictionDate: date.toISOString().split("T")[0],
        createdAt: date.toISOString(),
        error:
          i > 0
            ? Math.round(Math.abs(predicted - actual) * 100) / 100
            : null,
      };
    }),
    silver: Array.from({ length: 15 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i - 1);
      const basePrice = 25.5 + Math.sin(i / 3) * 1.5;
      const predicted = basePrice + (Math.random() - 0.48) * 0.8;
      const actual = basePrice + (Math.random() - 0.5) * 0.7;
      return {
        id: `hist-silver-${i}`,
        assetId: "silver" as AssetId,
        predictedPrice: Math.round(predicted * 100) / 100,
        actualPrice: i > 0 ? Math.round(actual * 100) / 100 : null,
        projectedChangePct:
          Math.round(((predicted - basePrice) / basePrice) * 10000) / 100,
        modelType: "LSTM (Optimized)",
        predictionDate: date.toISOString().split("T")[0],
        createdAt: date.toISOString(),
        error:
          i > 0
            ? Math.round(Math.abs(predicted - actual) * 100) / 100
            : null,
      };
    }),
  };
