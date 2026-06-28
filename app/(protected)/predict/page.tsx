"use client";

import { useState } from "react";
import { useAssetStore } from "@/app/stores/assetStore";
import { ASSETS } from "@/app/constants/assets";
import { PredictButton } from "@/app/components/controls/PredictButton";
import { PredictionResultCard } from "@/app/components/prediction/PredictionResultCard";
import { PredictionChart } from "@/app/components/charts/PredictionChart";
import { generateMockPrediction, MOCK_PREDICTION_HISTORY } from "@/app/lib/mock-data/predictions";
import { formatCurrency, formatDate } from "@/app/utils/formatters";
import type { PredictionResult } from "@/app/types/prediction.types";
import { BrainCircuit, Clock, CheckCircle, XCircle } from "lucide-react";
import clsx from "clsx";

export default function PredictPage() {
  const { selectedAsset } = useAssetStore();
  const asset = ASSETS[selectedAsset];
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const history = MOCK_PREDICTION_HISTORY[selectedAsset];

  const handlePredict = async () => {
    setIsLoading(true);
    // Simulate model inference delay
    await new Promise((resolve) => setTimeout(resolve, 1500 + Math.random() * 1000));
    const result = generateMockPrediction(selectedAsset);
    setPrediction(result);
    setIsLoading(false);
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary flex items-center gap-3">
          <span
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${asset.color}20`, color: asset.color }}
          >
            <BrainCircuit size={22} />
          </span>
          AI Price Prediction
        </h1>
        <p className="text-sm text-text-secondary mt-1">
          Generate next-day price forecasts using LSTM deep learning models
        </p>
      </div>

      {/* Predict Action */}
      <div className="glass-card p-6">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1">
            <h3 className="text-base font-semibold text-text-primary">
              Run Prediction for {asset.name}
            </h3>
            <p className="text-xs text-text-secondary mt-1">
              Uses the last 30-day price sequence to predict tomorrow&apos;s closing price
            </p>
          </div>
          <div className="w-full sm:w-56">
            <PredictButton onClick={handlePredict} isLoading={isLoading} />
          </div>
        </div>
      </div>

      {/* Prediction Result */}
      {prediction && <PredictionResultCard result={prediction} />}

      {/* Actual vs Predicted Chart */}
      <PredictionChart assetId={selectedAsset} />

      {/* Prediction History */}
      <div className="glass-card p-4 md:p-6">
        <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
          <Clock size={16} className="text-text-muted" />
          Recent Predictions
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-text-muted text-xs uppercase tracking-wide">
                <th className="text-left py-3 px-3 font-medium">Date</th>
                <th className="text-right py-3 px-3 font-medium">Predicted</th>
                <th className="text-right py-3 px-3 font-medium">Actual</th>
                <th className="text-right py-3 px-3 font-medium">Error</th>
                <th className="text-right py-3 px-3 font-medium">Change %</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-border/50 hover:bg-surface-hover/50 transition-colors"
                >
                  <td className="py-3 px-3 text-text-secondary font-mono text-xs">
                    {formatDate(item.predictionDate)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-text-primary">
                    {formatCurrency(item.predictedPrice, selectedAsset)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-text-primary">
                    {item.actualPrice
                      ? formatCurrency(item.actualPrice, selectedAsset)
                      : "—"}
                  </td>
                  <td className="py-3 px-3 text-right font-mono">
                    {item.error !== null ? (
                      <span
                        className={clsx(
                          "text-xs",
                          item.error < 500 ? "text-success" : item.error < 1500 ? "text-warning" : "text-error"
                        )}
                      >
                        {formatCurrency(item.error, selectedAsset)}
                      </span>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <span
                      className={clsx(
                        "text-xs font-medium",
                        item.projectedChangePct > 0
                          ? "text-success"
                          : item.projectedChangePct < 0
                            ? "text-error"
                            : "text-text-muted"
                      )}
                    >
                      {item.projectedChangePct > 0 ? "+" : ""}
                      {item.projectedChangePct.toFixed(2)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
