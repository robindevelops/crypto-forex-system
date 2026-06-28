"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import type { AssetId } from "@/app/constants/assets";
import {
  CHART_TOOLTIP_STYLE,
  CHART_AXIS_STYLE,
  CHART_GRID_STYLE,
  CHART_MARGINS,
} from "@/app/utils/chart-helpers";
import { formatCurrency, formatDateShort } from "@/app/utils/formatters";
import { MOCK_WALK_FORWARD } from "@/app/lib/mock-data/metrics";

interface PredictionChartProps {
  assetId: AssetId;
  height?: number;
}

export function PredictionChart({ assetId, height = 350 }: PredictionChartProps) {
  const wf = MOCK_WALK_FORWARD[assetId];
  const chartData = wf.predictions.map((p) => ({
    date: formatDateShort(p.date),
    actual: p.actual,
    predicted: p.predicted,
  }));

  return (
    <div className="glass-card p-4 md:p-6">
      <h3 className="text-sm font-semibold text-text-primary mb-4">
        Actual vs Predicted (Walk-Forward Test)
      </h3>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={chartData} margin={CHART_MARGINS}>
          <CartesianGrid {...CHART_GRID_STYLE} />
          <XAxis dataKey="date" {...CHART_AXIS_STYLE} tickLine={false} axisLine={false} minTickGap={40} />
          <YAxis
            {...CHART_AXIS_STYLE}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v: number) => formatCurrency(v, assetId)}
            width={90}
          />
          <Tooltip
            contentStyle={CHART_TOOLTIP_STYLE}
            labelStyle={{ color: "var(--text-muted)", fontSize: 11 }}
          />
          <Legend
            wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
          />
          <Line
            type="monotone"
            dataKey="actual"
            stroke="#22C55E"
            strokeWidth={2}
            dot={false}
            name="Actual"
            animationDuration={1000}
          />
          <Line
            type="monotone"
            dataKey="predicted"
            stroke="#F7931A"
            strokeWidth={2}
            strokeDasharray="6 3"
            dot={false}
            name="Predicted"
            animationDuration={1000}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
