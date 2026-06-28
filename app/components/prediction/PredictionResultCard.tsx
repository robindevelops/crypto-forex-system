"use client";

import type { PredictionResult } from "@/app/types/prediction.types";
import { ASSETS } from "@/app/constants/assets";
import { formatCurrency, formatPercent, formatDate } from "@/app/utils/formatters";
import { TrendingUp, TrendingDown, BrainCircuit, Calendar, BarChart3 } from "lucide-react";
import clsx from "clsx";

interface PredictionResultCardProps {
  result: PredictionResult;
}

export function PredictionResultCard({ result }: PredictionResultCardProps) {
  const asset = ASSETS[result.assetId];
  const isUp = result.projectedChangePct > 0;
  const isDown = result.projectedChangePct < 0;

  return (
    <div className="glass-card overflow-hidden animate-fade-in-up">
      {/* Top accent bar */}
      <div
        className="h-1"
        style={{
          background: isUp
            ? "linear-gradient(90deg, #22C55E, #4ADE80)"
            : isDown
              ? "linear-gradient(90deg, #EF4444, #F87171)"
              : "linear-gradient(90deg, #94A3B8, #CBD5E1)",
        }}
      />

      <div className="p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${asset.color}20`, color: asset.color }}
          >
            <BrainCircuit size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-text-primary">
              AI Prediction Result
            </h3>
            <p className="text-xs text-text-secondary">
              {asset.name} • {result.modelType}
            </p>
          </div>
        </div>

        {/* Main prediction display */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Predicted Price */}
          <div className="text-center md:text-left">
            <p className="text-xs text-text-muted mb-1 uppercase tracking-wide">
              Predicted Price
            </p>
            <p className="text-3xl md:text-4xl font-bold font-mono text-text-primary">
              {formatCurrency(result.predictedPrice, result.assetId)}
            </p>
          </div>

          {/* Projected Change */}
          <div className="text-center">
            <p className="text-xs text-text-muted mb-1 uppercase tracking-wide">
              Projected Change
            </p>
            <div
              className={clsx(
                "inline-flex items-center gap-2 px-4 py-2 rounded-xl text-2xl font-bold",
                isUp && "bg-success/10 text-success",
                isDown && "bg-error/10 text-error",
                !isUp && !isDown && "bg-surface-hover text-text-muted"
              )}
            >
              {isUp ? <TrendingUp size={24} /> : isDown ? <TrendingDown size={24} /> : null}
              {formatPercent(result.projectedChangePct)}
            </div>
          </div>

          {/* Current Price */}
          <div className="text-center md:text-right">
            <p className="text-xs text-text-muted mb-1 uppercase tracking-wide">
              Current Price
            </p>
            <p className="text-2xl font-semibold font-mono text-text-secondary">
              {formatCurrency(result.currentPrice, result.assetId)}
            </p>
          </div>
        </div>

        {/* Footer metadata */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-6 pt-4 border-t border-border text-xs text-text-muted">
          <span className="flex items-center gap-1.5">
            <Calendar size={12} />
            Prediction for: {formatDate(result.predictionDate)}
          </span>
          <span className="flex items-center gap-1.5">
            <BarChart3 size={12} />
            Based on: {result.modelType}
          </span>
          <span
            className={clsx(
              "px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase",
              result.confidence === "high" && "bg-success/10 text-success",
              result.confidence === "medium" && "bg-warning/10 text-warning",
              result.confidence === "low" && "bg-error/10 text-error"
            )}
          >
            {result.confidence} confidence
          </span>
        </div>
      </div>
    </div>
  );
}
