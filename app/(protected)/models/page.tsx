"use client";

import { useState, useMemo } from "react";
import { useAssetStore } from "@/app/stores/assetStore";
import { ASSETS, ASSET_LIST, type AssetId } from "@/app/constants/assets";
import {
  MOCK_EVALUATION_METRICS,
  MOCK_WALK_FORWARD,
  MOCK_HYPERPARAMETER_EXPERIMENTS,
  MOCK_ENSEMBLE_RESULTS,
  MOCK_LOSS_CURVES,
  MOCK_PERFORMANCE_SUMMARY,
} from "@/app/lib/mock-data/metrics";
import { PredictionChart } from "@/app/components/charts/PredictionChart";
import { InfoTooltip } from "@/app/components/ui/InfoTooltip";
import { Badge } from "@/app/components/ui/Badge";
import { formatNumber } from "@/app/utils/formatters";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from "recharts";
import {
  CHART_TOOLTIP_STYLE,
  CHART_AXIS_STYLE,
  CHART_GRID_STYLE,
  CHART_MARGINS,
} from "@/app/utils/chart-helpers";
import {
  GitCompare,
  Trophy,
  ArrowUpDown,
  ChevronDown,
  ChevronUp,
  Beaker,
  Layers,
  Activity,
} from "lucide-react";
import clsx from "clsx";

type SortKey = "rmse" | "mae" | "mape" | "r2Score" | "directionalAccuracy";

export default function ModelsPage() {
  const { selectedAsset } = useAssetStore();
  const [activeTab, setActiveTab] = useState<AssetId>(selectedAsset);
  const [sortKey, setSortKey] = useState<SortKey>("rmse");
  const [sortAsc, setSortAsc] = useState(true);

  const asset = ASSETS[activeTab];
  const metrics = MOCK_EVALUATION_METRICS[activeTab];
  const experiments = MOCK_HYPERPARAMETER_EXPERIMENTS[activeTab];
  const ensemble = MOCK_ENSEMBLE_RESULTS[activeTab];
  const lossCurves = MOCK_LOSS_CURVES[activeTab];

  const sortedMetrics = useMemo(() => {
    const copy = [...metrics];
    copy.sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      // R² and directional accuracy: higher is better (sort desc)
      const higherIsBetter = sortKey === "r2Score" || sortKey === "directionalAccuracy";
      if (higherIsBetter) {
        return sortAsc ? bVal - aVal : aVal - bVal;
      }
      return sortAsc ? aVal - bVal : bVal - aVal;
    });
    return copy;
  }, [metrics, sortKey, sortAsc]);

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const SortIcon = ({ k }: { k: SortKey }) => {
    if (k !== sortKey) return <ArrowUpDown size={12} className="opacity-30" />;
    return sortAsc ? <ChevronUp size={12} /> : <ChevronDown size={12} />;
  };

  // Ensemble comparison bar chart data
  const ensembleBarData = [
    { name: "ARIMA", rmse: ensemble.arimaRmse, fill: "#EF4444" },
    { name: "LSTM", rmse: ensemble.lstmRmse, fill: "#3B82F6" },
    { name: "Ensemble", rmse: ensemble.ensembleRmse, fill: "#22C55E" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary flex items-center gap-3">
          <GitCompare size={28} className="text-primary" />
          Model Comparison
        </h1>
        <p className="text-sm text-text-secondary mt-1">
          Compare LSTM, ARIMA, ensemble, and baseline models across all assets
        </p>
      </div>

      {/* Asset Tabs */}
      <div className="flex gap-2">
        {ASSET_LIST.map((a) => (
          <button
            key={a.id}
            onClick={() => setActiveTab(a.id as AssetId)}
            className={clsx(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
              activeTab === a.id
                ? "bg-surface-hover text-text-primary"
                : "text-text-muted hover:text-text-secondary hover:bg-surface-hover/50"
            )}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: a.color }}
            />
            {a.name}
          </button>
        ))}
      </div>

      {/* Model Comparison Table */}
      <div className="glass-card p-4 md:p-6">
        <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
          <Trophy size={16} className="text-warning" />
          Performance Rankings — {asset.name}
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-3 text-xs text-text-muted font-medium uppercase tracking-wide">
                  Model
                </th>
                {([
                  ["rmse", "RMSE", "Root Mean Squared Error — lower is better"],
                  ["mae", "MAE", "Mean Absolute Error — lower is better"],
                  ["mape", "MAPE", "Mean Absolute Percentage Error — lower is better"],
                  ["r2Score", "R²", "Coefficient of determination — closer to 1 is better"],
                  ["directionalAccuracy", "Dir. Acc.", "Percentage of times the model correctly predicted the price direction"],
                ] as [SortKey, string, string][]).map(([key, label, tooltip]) => (
                  <th key={key} className="text-right py-3 px-3">
                    <button
                      onClick={() => handleSort(key)}
                      className="inline-flex items-center gap-1 text-xs text-text-muted font-medium uppercase tracking-wide hover:text-text-primary transition-colors"
                    >
                      {label}
                      <InfoTooltip content={tooltip} />
                      <SortIcon k={key} />
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedMetrics.map((m, i) => {
                const isBest = i === 0;
                return (
                  <tr
                    key={m.id}
                    className={clsx(
                      "border-b border-border/50 transition-colors",
                      isBest
                        ? "bg-success/5 hover:bg-success/10"
                        : "hover:bg-surface-hover/50"
                    )}
                  >
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        {isBest && <Trophy size={14} className="text-warning" />}
                        <span className="font-medium text-text-primary">
                          {m.modelType}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-text-primary">
                      {m.rmse.toFixed(2)}
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-text-primary">
                      {m.mae.toFixed(2)}
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-text-primary">
                      {m.mape.toFixed(2)}%
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-text-primary">
                      {m.r2Score.toFixed(4)}
                    </td>
                    <td className="py-3 px-3 text-right font-mono">
                      <span
                        className={clsx(
                          "px-2 py-0.5 rounded text-xs font-medium",
                          m.directionalAccuracy > 0.7
                            ? "bg-success/10 text-success"
                            : m.directionalAccuracy > 0.6
                              ? "bg-warning/10 text-warning"
                              : "bg-error/10 text-error"
                        )}
                      >
                        {(m.directionalAccuracy * 100).toFixed(1)}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ensemble Comparison */}
        <div className="glass-card p-4 md:p-6">
          <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
            <Layers size={16} className="text-info" />
            Ensemble vs Standalone (RMSE)
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={ensembleBarData} margin={CHART_MARGINS}>
              <CartesianGrid {...CHART_GRID_STYLE} />
              <XAxis dataKey="name" {...CHART_AXIS_STYLE} tickLine={false} axisLine={false} />
              <YAxis {...CHART_AXIS_STYLE} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={CHART_TOOLTIP_STYLE} />
              <Bar
                dataKey="rmse"
                name="RMSE"
                radius={[6, 6, 0, 0]}
                animationDuration={800}
              >
                {ensembleBarData.map((entry, i) => (
                  <rect key={i} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-text-muted text-center mt-2">
            Winner: <span className="text-success font-semibold">{ensemble.winner}</span> (RMSE: {ensemble.ensembleRmse.toFixed(2)})
          </p>
        </div>

        {/* Loss Curve */}
        <div className="glass-card p-4 md:p-6">
          <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
            <Activity size={16} className="text-primary" />
            Training Loss Curve (LSTM)
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lossCurves} margin={CHART_MARGINS}>
              <CartesianGrid {...CHART_GRID_STYLE} />
              <XAxis dataKey="epoch" {...CHART_AXIS_STYLE} tickLine={false} axisLine={false} label={{ value: "Epoch", style: { fontSize: 10, fill: "var(--text-muted)" }, position: "insideBottomRight", offset: -5 }} />
              <YAxis {...CHART_AXIS_STYLE} tickLine={false} axisLine={false} label={{ value: "Loss (MSE)", style: { fontSize: 10, fill: "var(--text-muted)" }, angle: -90, position: "insideLeft" }} />
              <Tooltip contentStyle={CHART_TOOLTIP_STYLE} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="trainLoss" stroke="#3B82F6" strokeWidth={1.5} dot={false} name="Train Loss" animationDuration={1000} />
              <Line type="monotone" dataKey="valLoss" stroke="#EF4444" strokeWidth={1.5} dot={false} name="Val Loss" animationDuration={1000} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Walk-Forward Validation */}
      <PredictionChart assetId={activeTab} />

      {/* Hyperparameter Experiments */}
      <div className="glass-card p-4 md:p-6">
        <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
          <Beaker size={16} className="text-secondary" />
          Hyperparameter Experiments — {asset.name}
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-text-muted text-xs uppercase tracking-wide">
                <th className="text-left py-3 px-3 font-medium">LSTM Units</th>
                <th className="text-left py-3 px-3 font-medium">Layers</th>
                <th className="text-left py-3 px-3 font-medium">Dropout</th>
                <th className="text-left py-3 px-3 font-medium">LR</th>
                <th className="text-left py-3 px-3 font-medium">Batch</th>
                <th className="text-left py-3 px-3 font-medium">Seq Len</th>
                <th className="text-right py-3 px-3 font-medium">RMSE</th>
                <th className="text-right py-3 px-3 font-medium">R²</th>
                <th className="text-right py-3 px-3 font-medium">Val Loss</th>
                <th className="text-right py-3 px-3 font-medium">Best Epoch</th>
              </tr>
            </thead>
            <tbody>
              {experiments.map((exp) => (
                <tr
                  key={exp.id}
                  className={clsx(
                    "border-b border-border/50 transition-colors",
                    exp.isBest
                      ? "bg-success/5 hover:bg-success/10"
                      : "hover:bg-surface-hover/50"
                  )}
                >
                  <td className="py-3 px-3 font-mono">{exp.config.lstmUnits}</td>
                  <td className="py-3 px-3 font-mono">{exp.config.layers}</td>
                  <td className="py-3 px-3 font-mono">{exp.config.dropout}</td>
                  <td className="py-3 px-3 font-mono">{exp.config.learningRate}</td>
                  <td className="py-3 px-3 font-mono">{exp.config.batchSize}</td>
                  <td className="py-3 px-3 font-mono">{exp.config.sequenceLength}</td>
                  <td className="py-3 px-3 text-right font-mono font-medium">{exp.rmse.toFixed(2)}</td>
                  <td className="py-3 px-3 text-right font-mono">{exp.r2.toFixed(4)}</td>
                  <td className="py-3 px-3 text-right font-mono">{exp.valLoss.toFixed(4)}</td>
                  <td className="py-3 px-3 text-right font-mono">
                    <span className="flex items-center justify-end gap-1">
                      {exp.bestEpoch}
                      {exp.isBest && <Badge color="#22C55E" size="sm">Best</Badge>}
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
