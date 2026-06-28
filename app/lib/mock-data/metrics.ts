import type { AssetId } from "@/app/constants/assets";
import type {
  EvaluationMetric,
  WalkForwardResult,
  HyperparameterExperiment,
  EnsembleResult,
  LossCurveData,
  PerformanceSummary,
} from "@/app/types/metrics.types";

// --- Model Evaluation Metrics ---
export const MOCK_EVALUATION_METRICS: Record<AssetId, EvaluationMetric[]> = {
  bitcoin: [
    {
      id: "btc-lstm",
      modelType: "LSTM (Optimized)",
      assetId: "bitcoin",
      rmse: 1247.83,
      mae: 982.45,
      mape: 1.42,
      r2Score: 0.9847,
      directionalAccuracy: 0.7312,
      testSetSize: 73,
      evaluatedAt: "2026-06-15T10:30:00Z",
    },
    {
      id: "btc-arima",
      modelType: "ARIMA",
      assetId: "bitcoin",
      rmse: 2156.91,
      mae: 1723.18,
      mape: 2.51,
      r2Score: 0.9543,
      directionalAccuracy: 0.6438,
      testSetSize: 73,
      evaluatedAt: "2026-06-15T10:30:00Z",
    },
    {
      id: "btc-lr",
      modelType: "Linear Regression",
      assetId: "bitcoin",
      rmse: 3412.67,
      mae: 2845.32,
      mape: 4.13,
      r2Score: 0.8856,
      directionalAccuracy: 0.5616,
      testSetSize: 73,
      evaluatedAt: "2026-06-15T10:30:00Z",
    },
    {
      id: "btc-rf",
      modelType: "Random Forest",
      assetId: "bitcoin",
      rmse: 2891.44,
      mae: 2312.78,
      mape: 3.36,
      r2Score: 0.918,
      directionalAccuracy: 0.589,
      testSetSize: 73,
      evaluatedAt: "2026-06-15T10:30:00Z",
    },
    {
      id: "btc-ensemble",
      modelType: "Ensemble (ARIMA+LSTM)",
      assetId: "bitcoin",
      rmse: 1089.56,
      mae: 856.23,
      mape: 1.24,
      r2Score: 0.9883,
      directionalAccuracy: 0.7534,
      testSetSize: 73,
      evaluatedAt: "2026-06-15T10:30:00Z",
    },
  ],
  gold: [
    {
      id: "gold-lstm",
      modelType: "LSTM (Optimized)",
      assetId: "gold",
      rmse: 18.42,
      mae: 14.56,
      mape: 0.68,
      r2Score: 0.9912,
      directionalAccuracy: 0.7671,
      testSetSize: 73,
      evaluatedAt: "2026-06-15T10:30:00Z",
    },
    {
      id: "gold-arima",
      modelType: "ARIMA",
      assetId: "gold",
      rmse: 31.87,
      mae: 25.43,
      mape: 1.19,
      r2Score: 0.9734,
      directionalAccuracy: 0.6712,
      testSetSize: 73,
      evaluatedAt: "2026-06-15T10:30:00Z",
    },
    {
      id: "gold-lr",
      modelType: "Linear Regression",
      assetId: "gold",
      rmse: 52.34,
      mae: 43.12,
      mape: 2.01,
      r2Score: 0.9284,
      directionalAccuracy: 0.5753,
      testSetSize: 73,
      evaluatedAt: "2026-06-15T10:30:00Z",
    },
    {
      id: "gold-rf",
      modelType: "Random Forest",
      assetId: "gold",
      rmse: 42.18,
      mae: 34.67,
      mape: 1.62,
      r2Score: 0.9535,
      directionalAccuracy: 0.6027,
      testSetSize: 73,
      evaluatedAt: "2026-06-15T10:30:00Z",
    },
    {
      id: "gold-ensemble",
      modelType: "Ensemble (ARIMA+LSTM)",
      assetId: "gold",
      rmse: 15.89,
      mae: 12.34,
      mape: 0.58,
      r2Score: 0.9934,
      directionalAccuracy: 0.7808,
      testSetSize: 73,
      evaluatedAt: "2026-06-15T10:30:00Z",
    },
  ],
  silver: [
    {
      id: "silver-lstm",
      modelType: "LSTM (Optimized)",
      assetId: "silver",
      rmse: 0.48,
      mae: 0.37,
      mape: 1.45,
      r2Score: 0.9789,
      directionalAccuracy: 0.726,
      testSetSize: 73,
      evaluatedAt: "2026-06-15T10:30:00Z",
    },
    {
      id: "silver-arima",
      modelType: "ARIMA",
      assetId: "silver",
      rmse: 0.82,
      mae: 0.65,
      mape: 2.55,
      r2Score: 0.9387,
      directionalAccuracy: 0.6301,
      testSetSize: 73,
      evaluatedAt: "2026-06-15T10:30:00Z",
    },
    {
      id: "silver-lr",
      modelType: "Linear Regression",
      assetId: "silver",
      rmse: 1.34,
      mae: 1.08,
      mape: 4.24,
      r2Score: 0.8367,
      directionalAccuracy: 0.5479,
      testSetSize: 73,
      evaluatedAt: "2026-06-15T10:30:00Z",
    },
    {
      id: "silver-rf",
      modelType: "Random Forest",
      assetId: "silver",
      rmse: 1.12,
      mae: 0.89,
      mape: 3.49,
      r2Score: 0.8856,
      directionalAccuracy: 0.5753,
      testSetSize: 73,
      evaluatedAt: "2026-06-15T10:30:00Z",
    },
    {
      id: "silver-ensemble",
      modelType: "Ensemble (ARIMA+LSTM)",
      assetId: "silver",
      rmse: 0.41,
      mae: 0.32,
      mape: 1.26,
      r2Score: 0.9847,
      directionalAccuracy: 0.7534,
      testSetSize: 73,
      evaluatedAt: "2026-06-15T10:30:00Z",
    },
  ],
};

// --- Walk-Forward Validation Results ---
function generateWalkForward(assetId: AssetId, basePrice: number, baseRmse: number): WalkForwardResult {
  const predictions: WalkForwardResult["predictions"] = [];
  const rollingRmse: WalkForwardResult["rollingRmse"] = [];
  let price = basePrice;
  const startDate = new Date("2026-04-01");

  for (let i = 0; i < 30; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    const actual = price + (Math.sin(i / 5) * baseRmse * 0.5) + ((Math.random() - 0.5) * baseRmse);
    const predicted = actual + (Math.random() - 0.48) * baseRmse * 0.8;
    const error = predicted - actual;
    price = actual;

    predictions.push({
      date: date.toISOString().split("T")[0],
      actual: Math.round(actual * 100) / 100,
      predicted: Math.round(predicted * 100) / 100,
      error: Math.round(error * 100) / 100,
    });

    rollingRmse.push({
      date: date.toISOString().split("T")[0],
      rmse: Math.round((baseRmse * (0.7 + Math.random() * 0.6)) * 100) / 100,
    });
  }

  return {
    assetId,
    predictions,
    rollingRmse,
    rmse: baseRmse,
    mae: Math.round(baseRmse * 0.78 * 100) / 100,
    mape: Math.round((baseRmse / basePrice) * 100 * 100) / 100,
    r2: 0.9847,
    meanBias: Math.round(baseRmse * 0.05 * 100) / 100,
  };
}

export const MOCK_WALK_FORWARD: Record<AssetId, WalkForwardResult> = {
  bitcoin: generateWalkForward("bitcoin", 72000, 1247),
  gold: generateWalkForward("gold", 2280, 18.4),
  silver: generateWalkForward("silver", 26.5, 0.48),
};

// --- Hyperparameter Experiments ---
export const MOCK_HYPERPARAMETER_EXPERIMENTS: Record<AssetId, HyperparameterExperiment[]> = {
  bitcoin: [
    { id: "hp1", assetId: "bitcoin", config: { lstmUnits: 64, layers: 2, dropout: 0.2, learningRate: 0.001, batchSize: 32, epochs: 100, sequenceLength: 30 }, rmse: 1567.23, r2: 0.9756, valLoss: 0.0034, trainLoss: 0.0012, bestEpoch: 78, isBest: false },
    { id: "hp2", assetId: "bitcoin", config: { lstmUnits: 128, layers: 2, dropout: 0.2, learningRate: 0.001, batchSize: 32, epochs: 100, sequenceLength: 30 }, rmse: 1247.83, r2: 0.9847, valLoss: 0.0021, trainLoss: 0.0008, bestEpoch: 85, isBest: true },
    { id: "hp3", assetId: "bitcoin", config: { lstmUnits: 128, layers: 3, dropout: 0.3, learningRate: 0.0005, batchSize: 16, epochs: 150, sequenceLength: 30 }, rmse: 1312.45, r2: 0.9831, valLoss: 0.0025, trainLoss: 0.0006, bestEpoch: 112, isBest: false },
    { id: "hp4", assetId: "bitcoin", config: { lstmUnits: 256, layers: 2, dropout: 0.3, learningRate: 0.001, batchSize: 64, epochs: 100, sequenceLength: 60 }, rmse: 1489.12, r2: 0.9782, valLoss: 0.003, trainLoss: 0.0009, bestEpoch: 67, isBest: false },
    { id: "hp5", assetId: "bitcoin", config: { lstmUnits: 64, layers: 1, dropout: 0.1, learningRate: 0.002, batchSize: 32, epochs: 50, sequenceLength: 14 }, rmse: 1823.67, r2: 0.9673, valLoss: 0.0042, trainLoss: 0.0018, bestEpoch: 45, isBest: false },
  ],
  gold: [
    { id: "hp6", assetId: "gold", config: { lstmUnits: 64, layers: 2, dropout: 0.2, learningRate: 0.001, batchSize: 32, epochs: 100, sequenceLength: 30 }, rmse: 22.14, r2: 0.9878, valLoss: 0.0028, trainLoss: 0.001, bestEpoch: 82, isBest: false },
    { id: "hp7", assetId: "gold", config: { lstmUnits: 128, layers: 2, dropout: 0.2, learningRate: 0.001, batchSize: 32, epochs: 100, sequenceLength: 30 }, rmse: 18.42, r2: 0.9912, valLoss: 0.0019, trainLoss: 0.0007, bestEpoch: 88, isBest: true },
    { id: "hp8", assetId: "gold", config: { lstmUnits: 128, layers: 3, dropout: 0.3, learningRate: 0.0005, batchSize: 16, epochs: 150, sequenceLength: 30 }, rmse: 19.87, r2: 0.9897, valLoss: 0.0022, trainLoss: 0.0005, bestEpoch: 118, isBest: false },
  ],
  silver: [
    { id: "hp9", assetId: "silver", config: { lstmUnits: 64, layers: 2, dropout: 0.2, learningRate: 0.001, batchSize: 32, epochs: 100, sequenceLength: 30 }, rmse: 0.58, r2: 0.9692, valLoss: 0.0031, trainLoss: 0.0011, bestEpoch: 76, isBest: false },
    { id: "hp10", assetId: "silver", config: { lstmUnits: 128, layers: 2, dropout: 0.2, learningRate: 0.001, batchSize: 32, epochs: 100, sequenceLength: 30 }, rmse: 0.48, r2: 0.9789, valLoss: 0.0023, trainLoss: 0.0008, bestEpoch: 91, isBest: true },
    { id: "hp11", assetId: "silver", config: { lstmUnits: 128, layers: 3, dropout: 0.3, learningRate: 0.0005, batchSize: 16, epochs: 150, sequenceLength: 30 }, rmse: 0.52, r2: 0.9753, valLoss: 0.0026, trainLoss: 0.0006, bestEpoch: 121, isBest: false },
  ],
};

// --- Ensemble Comparison ---
export const MOCK_ENSEMBLE_RESULTS: Record<AssetId, EnsembleResult> = {
  bitcoin: {
    assetId: "bitcoin",
    arimaRmse: 2156.91,
    lstmRmse: 1247.83,
    ensembleRmse: 1089.56,
    winner: "Ensemble",
    dailyErrors: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(2026, 3, i + 1).toISOString().split("T")[0],
      arimaError: Math.round((Math.random() * 4000 - 1500) * 100) / 100,
      lstmError: Math.round((Math.random() * 2500 - 800) * 100) / 100,
      ensembleError: Math.round((Math.random() * 2000 - 700) * 100) / 100,
    })),
  },
  gold: {
    assetId: "gold",
    arimaRmse: 31.87,
    lstmRmse: 18.42,
    ensembleRmse: 15.89,
    winner: "Ensemble",
    dailyErrors: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(2026, 3, i + 1).toISOString().split("T")[0],
      arimaError: Math.round((Math.random() * 60 - 20) * 100) / 100,
      lstmError: Math.round((Math.random() * 36 - 12) * 100) / 100,
      ensembleError: Math.round((Math.random() * 30 - 10) * 100) / 100,
    })),
  },
  silver: {
    assetId: "silver",
    arimaRmse: 0.82,
    lstmRmse: 0.48,
    ensembleRmse: 0.41,
    winner: "Ensemble",
    dailyErrors: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(2026, 3, i + 1).toISOString().split("T")[0],
      arimaError: Math.round((Math.random() * 1.6 - 0.5) * 100) / 100,
      lstmError: Math.round((Math.random() * 0.9 - 0.3) * 100) / 100,
      ensembleError: Math.round((Math.random() * 0.8 - 0.25) * 100) / 100,
    })),
  },
};

// --- Loss Curve Data ---
export const MOCK_LOSS_CURVES: Record<AssetId, LossCurveData[]> = {
  bitcoin: Array.from({ length: 100 }, (_, i) => ({
    epoch: i + 1,
    trainLoss: Math.round((0.05 * Math.exp(-i / 20) + 0.0008 + Math.random() * 0.001) * 10000) / 10000,
    valLoss: Math.round((0.06 * Math.exp(-i / 22) + 0.0021 + Math.random() * 0.002) * 10000) / 10000,
  })),
  gold: Array.from({ length: 100 }, (_, i) => ({
    epoch: i + 1,
    trainLoss: Math.round((0.04 * Math.exp(-i / 18) + 0.0007 + Math.random() * 0.0008) * 10000) / 10000,
    valLoss: Math.round((0.05 * Math.exp(-i / 20) + 0.0019 + Math.random() * 0.0015) * 10000) / 10000,
  })),
  silver: Array.from({ length: 100 }, (_, i) => ({
    epoch: i + 1,
    trainLoss: Math.round((0.045 * Math.exp(-i / 19) + 0.0008 + Math.random() * 0.001) * 10000) / 10000,
    valLoss: Math.round((0.055 * Math.exp(-i / 21) + 0.0023 + Math.random() * 0.0018) * 10000) / 10000,
  })),
};

// --- Performance Summary Table ---
export const MOCK_PERFORMANCE_SUMMARY: PerformanceSummary[] = [
  { asset: "Bitcoin", model: "Ensemble (ARIMA+LSTM)", rmse: 1089.56, mae: 856.23, mape: 1.24, r2: 0.9883, directionalAccuracy: 0.7534 },
  { asset: "Bitcoin", model: "LSTM (Optimized)", rmse: 1247.83, mae: 982.45, mape: 1.42, r2: 0.9847, directionalAccuracy: 0.7312 },
  { asset: "Bitcoin", model: "ARIMA", rmse: 2156.91, mae: 1723.18, mape: 2.51, r2: 0.9543, directionalAccuracy: 0.6438 },
  { asset: "Bitcoin", model: "Random Forest", rmse: 2891.44, mae: 2312.78, mape: 3.36, r2: 0.918, directionalAccuracy: 0.589 },
  { asset: "Bitcoin", model: "Linear Regression", rmse: 3412.67, mae: 2845.32, mape: 4.13, r2: 0.8856, directionalAccuracy: 0.5616 },
  { asset: "Gold", model: "Ensemble (ARIMA+LSTM)", rmse: 15.89, mae: 12.34, mape: 0.58, r2: 0.9934, directionalAccuracy: 0.7808 },
  { asset: "Gold", model: "LSTM (Optimized)", rmse: 18.42, mae: 14.56, mape: 0.68, r2: 0.9912, directionalAccuracy: 0.7671 },
  { asset: "Gold", model: "ARIMA", rmse: 31.87, mae: 25.43, mape: 1.19, r2: 0.9734, directionalAccuracy: 0.6712 },
  { asset: "Gold", model: "Random Forest", rmse: 42.18, mae: 34.67, mape: 1.62, r2: 0.9535, directionalAccuracy: 0.6027 },
  { asset: "Gold", model: "Linear Regression", rmse: 52.34, mae: 43.12, mape: 2.01, r2: 0.9284, directionalAccuracy: 0.5753 },
  { asset: "Silver", model: "Ensemble (ARIMA+LSTM)", rmse: 0.41, mae: 0.32, mape: 1.26, r2: 0.9847, directionalAccuracy: 0.7534 },
  { asset: "Silver", model: "LSTM (Optimized)", rmse: 0.48, mae: 0.37, mape: 1.45, r2: 0.9789, directionalAccuracy: 0.726 },
  { asset: "Silver", model: "ARIMA", rmse: 0.82, mae: 0.65, mape: 2.55, r2: 0.9387, directionalAccuracy: 0.6301 },
  { asset: "Silver", model: "Random Forest", rmse: 1.12, mae: 0.89, mape: 3.49, r2: 0.8856, directionalAccuracy: 0.5753 },
  { asset: "Silver", model: "Linear Regression", rmse: 1.34, mae: 1.08, mape: 4.24, r2: 0.8367, directionalAccuracy: 0.5479 },
];
