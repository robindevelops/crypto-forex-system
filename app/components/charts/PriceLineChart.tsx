"use client";

import { useState, useMemo } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import type { FeatureRecord } from "@/app/types/asset.types";
import type { AssetId } from "@/app/constants/assets";
import { ASSETS } from "@/app/constants/assets";
import {
  CHART_TOOLTIP_STYLE,
  CHART_AXIS_STYLE,
  CHART_GRID_STYLE,
  CHART_MARGINS,
} from "@/app/utils/chart-helpers";
import { formatCurrency, formatDateShort } from "@/app/utils/formatters";
import { INDICATORS } from "@/app/constants/indicators";
import type { IndicatorId } from "@/app/constants/indicators";
import clsx from "clsx";

type Timeframe = "1M" | "3M" | "6M" | "1Y" | "ALL";
const TIMEFRAMES: { id: Timeframe; days: number }[] = [
  { id: "1M", days: 30 },
  { id: "3M", days: 90 },
  { id: "6M", days: 180 },
  { id: "1Y", days: 365 },
  { id: "ALL", days: 0 }, // 0 means all data
];

interface PriceLineChartProps {
  data: FeatureRecord[];
  assetId: AssetId;
  activeIndicators?: Set<IndicatorId>;
  height?: number;
  className?: string;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;

  return (
    <div style={CHART_TOOLTIP_STYLE}>
      <p className="text-xs text-text-muted mb-1.5 font-mono">{label}</p>
      {payload.map((entry: any, i: number) => {
        // If this is the main Price line, show OHLC details
        if (entry.name === "Price") {
          const { open, high, low, close } = entry.payload;
          return (
            <div key={i} className="mb-2 pb-2 border-b border-border/50">
              <div className="flex items-center justify-between gap-4 text-xs font-bold mb-1" style={{ color: entry.color }}>
                <span>{entry.name} (Close)</span>
                <span className="font-mono">{close.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-1 text-[10px] text-muted-foreground">
                <div className="flex justify-between"><span>O:</span><span className="font-mono">{open}</span></div>
                <div className="flex justify-between"><span>H:</span><span className="font-mono">{high}</span></div>
                <div className="flex justify-between"><span>L:</span><span className="font-mono">{low}</span></div>
              </div>
            </div>
          );
        }
        
        // Render other indicators normally
        return (
          <div key={i} className="flex items-center justify-between gap-4 text-xs py-0.5">
            <span className="flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              {entry.name}
            </span>
            <span className="font-mono font-medium">{
              typeof entry.value === "number"
                ? entry.value.toLocaleString(undefined, { maximumFractionDigits: 2 })
                : entry.value
            }</span>
          </div>
        );
      })}
    </div>
  );
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export function PriceLineChart({
  data,
  assetId,
  activeIndicators = new Set(),
  height = 420,
  className,
}: PriceLineChartProps) {
  const [timeframe, setTimeframe] = useState<Timeframe>("1Y");
  const asset = ASSETS[assetId];
  const gradientId = `price-gradient-${assetId}`;

  // Filter and format chart data based on selected timeframe
  const chartData = useMemo(() => {
    const tf = TIMEFRAMES.find(t => t.id === timeframe);
    const sliceCount = tf && tf.days > 0 ? tf.days : data.length;
    
    // Make sure we don't slice more than we have
    const actualSlice = Math.min(sliceCount, data.length);
    const slicedData = data.slice(-actualSlice);
    
    return slicedData.map((d) => ({
      ...d,
      dateLabel: formatDateShort(d.timestamp),
    }));
  }, [data, timeframe]);

  return (
    <div
      className={clsx(
        "glass-card p-4 md:p-6",
        className
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-semibold text-text-primary">
            Price History
          </h3>
          <span className="text-xs text-text-muted font-mono bg-surface-hover px-2 py-0.5 rounded">
            {chartData.length} days
          </span>
        </div>
        
        {/* Timeframe Selectors */}
        <div className="flex items-center gap-1 bg-background p-1 rounded-md border border-border">
          {TIMEFRAMES.map((tf) => (
            <button
              key={tf.id}
              onClick={() => setTimeframe(tf.id)}
              className={clsx(
                "px-2.5 py-1 text-[11px] font-bold rounded-sm transition-all",
                timeframe === tf.id
                  ? "bg-surface-hover text-primary shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-surface-hover/50"
              )}
            >
              {tf.id}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={chartData} margin={CHART_MARGINS}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={asset.color} stopOpacity={0.25} />
              <stop offset="100%" stopColor={asset.color} stopOpacity={0} />
            </linearGradient>

            {/* Bollinger Band fill gradient */}
            <linearGradient id="bb-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366F1" stopOpacity={0.08} />
              <stop offset="100%" stopColor="#6366F1" stopOpacity={0.02} />
            </linearGradient>
          </defs>

          <CartesianGrid {...CHART_GRID_STYLE} />

          <XAxis
            dataKey="dateLabel"
            {...CHART_AXIS_STYLE}
            tickLine={false}
            axisLine={false}
            interval="equidistantPreserveStart"
            minTickGap={60}
          />

          <YAxis
            {...CHART_AXIS_STYLE}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v: number) => formatCurrency(v, assetId)}
            width={90}
            domain={["auto", "auto"]}
          />

          <Tooltip content={<CustomTooltip />} />

          {/* Bollinger Bands (render behind price) */}
          {activeIndicators.has("bollinger") && (
            <>
              <Area
                type="monotone"
                dataKey="bb_upper"
                stroke="#6366F1"
                strokeWidth={1}
                strokeDasharray="4 2"
                fill="none"
                name="BB Upper"
                dot={false}
                animationDuration={800}
              />
              <Area
                type="monotone"
                dataKey="bb_lower"
                stroke="#6366F1"
                strokeWidth={1}
                strokeDasharray="4 2"
                fill={`url(#bb-fill)`}
                name="BB Lower"
                dot={false}
                animationDuration={800}
              />
            </>
          )}

          {/* SMA Lines */}
          {activeIndicators.has("sma") && (
            <>
              <Area
                type="monotone"
                dataKey="sma_30"
                stroke="#3B82F6"
                strokeWidth={1.5}
                fill="none"
                name="SMA 30"
                dot={false}
                animationDuration={800}
              />
              <Area
                type="monotone"
                dataKey="sma_60"
                stroke="#3B82F680"
                strokeWidth={1}
                strokeDasharray="6 3"
                fill="none"
                name="SMA 60"
                dot={false}
                animationDuration={800}
              />
            </>
          )}

          {/* EMA Lines */}
          {activeIndicators.has("ema") && (
            <>
              <Area
                type="monotone"
                dataKey="ema_14"
                stroke="#8B5CF6"
                strokeWidth={1.5}
                fill="none"
                name="EMA 14"
                dot={false}
                animationDuration={800}
              />
              <Area
                type="monotone"
                dataKey="ema_30"
                stroke="#8B5CF680"
                strokeWidth={1}
                strokeDasharray="6 3"
                fill="none"
                name="EMA 30"
                dot={false}
                animationDuration={800}
              />
            </>
          )}

          {/* Main Price Line (on top) */}
          <Area
            type="monotone"
            dataKey="close"
            stroke={asset.color}
            strokeWidth={2}
            fill={`url(#${gradientId})`}
            name="Price"
            dot={chartData.length <= 90 ? { r: 3, fill: asset.color, strokeWidth: 0 } : false}
            activeDot={{ r: 5, fill: asset.color, stroke: "#000", strokeWidth: 2 }}
            animationDuration={1000}
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Legend */}
      {activeIndicators.size > 0 && (
        <div className="flex flex-wrap items-center gap-4 mt-3 pt-3 border-t border-border">
          <LegendItem color={asset.color} label="Price" />
          {activeIndicators.has("sma") && (
            <LegendItem color="#3B82F6" label="SMA" />
          )}
          {activeIndicators.has("ema") && (
            <LegendItem color="#8B5CF6" label="EMA" />
          )}
          {activeIndicators.has("bollinger") && (
            <LegendItem color="#6366F1" label="Bollinger Bands" dashed />
          )}
        </div>
      )}
    </div>
  );
}

function LegendItem({
  color,
  label,
  dashed,
}: {
  color: string;
  label: string;
  dashed?: boolean;
}) {
  return (
    <div className="flex items-center gap-1.5 text-xs text-text-secondary">
      <div
        className="w-4 h-0.5 rounded"
        style={{
          backgroundColor: color,
          ...(dashed ? { backgroundImage: `repeating-linear-gradient(90deg, ${color} 0px, ${color} 4px, transparent 4px, transparent 6px)`, backgroundColor: "transparent" } : {}),
        }}
      />
      {label}
    </div>
  );
}

// Sub-charts for RSI and MACD (rendered separately below the main chart)
export function RSIChart({
  data,
  height = 150,
}: {
  data: FeatureRecord[];
  height?: number;
}) {
  const chartData = data.map((d) => ({
    dateLabel: formatDateShort(d.timestamp),
    rsi: d.rsi,
  }));

  return (
    <div className="glass-card p-4 md:p-6">
      <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: INDICATORS.rsi.color }} />
        RSI (14)
      </h3>
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={chartData} margin={CHART_MARGINS}>
          <CartesianGrid {...CHART_GRID_STYLE} />
          <XAxis dataKey="dateLabel" {...CHART_AXIS_STYLE} tickLine={false} axisLine={false} minTickGap={60} />
          <YAxis {...CHART_AXIS_STYLE} tickLine={false} axisLine={false} domain={[0, 100]} ticks={[30, 50, 70]} width={35} />
          <Tooltip content={<CustomTooltip />} />

          {/* Overbought/Oversold reference areas */}
          <Area type="monotone" dataKey="rsi" stroke="#EC4899" strokeWidth={1.5} fill="none" name="RSI" dot={false} animationDuration={800} />
        </AreaChart>
      </ResponsiveContainer>
      <div className="flex justify-between text-[10px] text-text-muted mt-1 px-4">
        <span>Oversold (&lt;30)</span>
        <span>Overbought (&gt;70)</span>
      </div>
    </div>
  );
}

export function MACDChart({
  data,
  height = 150,
}: {
  data: FeatureRecord[];
  height?: number;
}) {
  const chartData = data.map((d) => ({
    dateLabel: formatDateShort(d.timestamp),
    macd: d.macd,
    signal: d.macd_signal,
    histogram: Math.round((d.macd - d.macd_signal) * 100) / 100,
  }));

  return (
    <div className="glass-card p-4 md:p-6">
      <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: INDICATORS.macd.color }} />
        MACD (12, 26, 9)
      </h3>
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={chartData} margin={CHART_MARGINS}>
          <CartesianGrid {...CHART_GRID_STYLE} />
          <XAxis dataKey="dateLabel" {...CHART_AXIS_STYLE} tickLine={false} axisLine={false} minTickGap={60} />
          <YAxis {...CHART_AXIS_STYLE} tickLine={false} axisLine={false} width={50} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="macd" stroke="#06B6D4" strokeWidth={1.5} fill="none" name="MACD" dot={false} animationDuration={800} />
          <Area type="monotone" dataKey="signal" stroke="#F59E0B" strokeWidth={1} strokeDasharray="4 2" fill="none" name="Signal" dot={false} animationDuration={800} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
