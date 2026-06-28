import type { AssetId } from "@/app/constants/assets";

export interface PredictionResult {
  id: string;
  assetId: AssetId;
  predictedPrice: number;
  projectedChangePct: number;
  modelType: string;
  predictionDate: string;
  sequenceEndDate: string;
  currentPrice: number;
  confidence: "high" | "medium" | "low";
}

export interface PredictionHistoryItem {
  id: string;
  assetId: AssetId;
  predictedPrice: number;
  actualPrice: number | null;
  projectedChangePct: number;
  modelType: string;
  predictionDate: string;
  createdAt: string;
  error: number | null;
}
