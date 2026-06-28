"use client";

import {
  FileBarChart,
  Image as ImageIcon,
  FileSpreadsheet,
  Package,
  Download,
  Eye,
} from "lucide-react";
import { ASSET_LIST } from "@/app/constants/assets";
import { Badge } from "@/app/components/ui/Badge";

const MOCK_PLOTS = [
  { name: "bitcoin_price_prediction.png", asset: "Bitcoin", size: "245 KB", date: "2026-06-15" },
  { name: "bitcoin_loss_curve.png", asset: "Bitcoin", size: "182 KB", date: "2026-06-15" },
  { name: "gold_walk_forward.png", asset: "Gold", size: "198 KB", date: "2026-06-14" },
  { name: "gold_ensemble_comparison.png", asset: "Gold", size: "156 KB", date: "2026-06-14" },
  { name: "silver_bollinger_bands.png", asset: "Silver", size: "178 KB", date: "2026-06-13" },
  { name: "model_comparison_all.png", asset: "All", size: "312 KB", date: "2026-06-15" },
];

const MOCK_CSVS = [
  { name: "final_performance_table.csv", size: "12 KB", date: "2026-06-15" },
  { name: "bitcoin_features.csv", size: "1.2 MB", date: "2026-06-15" },
  { name: "gold_features.csv", size: "856 KB", date: "2026-06-14" },
  { name: "silver_features.csv", size: "834 KB", date: "2026-06-13" },
  { name: "hyperparameter_results.csv", size: "8 KB", date: "2026-06-15" },
];

const MOCK_ARTIFACTS = [
  { name: "bitcoin_lstm_optimized.keras", asset: "Bitcoin", model: "LSTM", size: "4.8 MB", date: "2026-06-15" },
  { name: "bitcoin_scaler.pkl", asset: "Bitcoin", model: "Scaler", size: "2 KB", date: "2026-06-15" },
  { name: "gold_lstm_optimized.keras", asset: "Gold", model: "LSTM", size: "4.6 MB", date: "2026-06-14" },
  { name: "gold_scaler.pkl", asset: "Gold", model: "Scaler", size: "2 KB", date: "2026-06-14" },
  { name: "silver_lstm_optimized.keras", asset: "Silver", model: "LSTM", size: "4.5 MB", date: "2026-06-13" },
  { name: "silver_scaler.pkl", asset: "Silver", model: "Scaler", size: "2 KB", date: "2026-06-13" },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary flex items-center gap-3">
          <FileBarChart size={28} className="text-primary" />
          Reports & Artifacts
        </h1>
        <p className="text-sm text-text-secondary mt-1">
          Download saved plots, metrics CSVs, and model training artifacts
        </p>
      </div>

      {/* Saved Plots */}
      <div className="glass-card p-4 md:p-6">
        <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
          <ImageIcon size={16} className="text-info" />
          Saved Plots
        </h3>
        <div className="space-y-2">
          {MOCK_PLOTS.map((plot) => (
            <div
              key={plot.name}
              className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-border-hover transition-colors"
            >
              <ImageIcon size={16} className="text-text-muted shrink-0" />
              <span className="text-sm text-text-primary font-mono flex-1 truncate">
                {plot.name}
              </span>
              <Badge color={ASSET_LIST.find((a) => a.name === plot.asset)?.color ?? "#94A3B8"} size="sm">
                {plot.asset}
              </Badge>
              <span className="text-xs text-text-muted">{plot.size}</span>
              <button className="p-1.5 rounded hover:bg-surface-hover text-text-muted hover:text-text-primary transition-colors" aria-label="Download">
                <Download size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Metrics CSVs */}
      <div className="glass-card p-4 md:p-6">
        <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
          <FileSpreadsheet size={16} className="text-success" />
          Metrics & Data CSVs
        </h3>
        <div className="space-y-2">
          {MOCK_CSVS.map((csv) => (
            <div
              key={csv.name}
              className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-border-hover transition-colors"
            >
              <FileSpreadsheet size={16} className="text-text-muted shrink-0" />
              <span className="text-sm text-text-primary font-mono flex-1 truncate">
                {csv.name}
              </span>
              <span className="text-xs text-text-muted">{csv.size}</span>
              <span className="text-xs text-text-muted">{csv.date}</span>
              <button className="p-1.5 rounded hover:bg-surface-hover text-text-muted hover:text-text-primary transition-colors" aria-label="Download">
                <Download size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Training Artifacts */}
      <div className="glass-card p-4 md:p-6">
        <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
          <Package size={16} className="text-secondary" />
          Training Artifacts
        </h3>
        <div className="space-y-2">
          {MOCK_ARTIFACTS.map((artifact) => (
            <div
              key={artifact.name}
              className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-border-hover transition-colors"
            >
              <Package size={16} className="text-text-muted shrink-0" />
              <span className="text-sm text-text-primary font-mono flex-1 truncate">
                {artifact.name}
              </span>
              <Badge color={ASSET_LIST.find((a) => a.name === artifact.asset)?.color ?? "#94A3B8"} size="sm">
                {artifact.asset}
              </Badge>
              <Badge color="#94A3B8" variant="outline" size="sm">
                {artifact.model}
              </Badge>
              <span className="text-xs text-text-muted">{artifact.size}</span>
              <button className="p-1.5 rounded hover:bg-surface-hover text-text-muted hover:text-text-primary transition-colors" aria-label="Download">
                <Download size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
