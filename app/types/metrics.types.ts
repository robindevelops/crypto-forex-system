import type { AssetId } from "@/app/constants/assets";

export interface EvaluationMetric {
  id: string;
  modelType: string;
  assetId: AssetId;
  rmse: number;
  mae: number;
  mape: number;
  r2Score: number;
  directionalAccuracy: number;
  testSetSize: number;
  evaluatedAt: string;
}

export interface ModelComparison {
  asset: AssetId;
  models: EvaluationMetric[];
}

export interface WalkForwardResult {
  assetId: AssetId;
  predictions: Array<{
    date: string;
    actual: number;
    predicted: number;
    error: number;
  }>;
  rmse: number;
  mae: number;
  mape: number;
  r2: number;
  meanBias: number;
  rollingRmse: Array<{ date: string; rmse: number }>;
}

export interface HyperparameterExperiment {
  id: string;
  assetId: AssetId;
  config: {
    lstmUnits: number;
    layers: number;
    dropout: number;
    learningRate: number;
    batchSize: number;
    epochs: number;
    sequenceLength: number;
  };
  rmse: number;
  r2: number;
  valLoss: number;
  trainLoss: number;
  bestEpoch: number;
  isBest: boolean;
}

export interface EnsembleResult {
  assetId: AssetId;
  arimaRmse: number;
  lstmRmse: number;
  ensembleRmse: number;
  winner: string;
  dailyErrors: Array<{
    date: string;
    arimaError: number;
    lstmError: number;
    ensembleError: number;
  }>;
}

export interface LossCurveData {
  epoch: number;
  trainLoss: number;
  valLoss: number;
}

export interface PerformanceSummary {
  asset: string;
  model: string;
  rmse: number;
  mae: number;
  mape: number;
  r2: number;
  directionalAccuracy: number;
}
