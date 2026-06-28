"use client";

import { useAssetStore } from "@/app/stores/assetStore";
import { ASSETS } from "@/app/constants/assets";
import { MOCK_PRICE_HISTORY, MOCK_ASSET_STATS } from "@/app/lib/mock-data/price-history";
import { PriceLineChart, RSIChart, MACDChart } from "@/app/components/charts/PriceLineChart";
import { MetricCard } from "@/app/components/data-display/MetricCard";
import { MetricCardGrid } from "@/app/components/data-display/MetricCardGrid";
import { IndicatorToggle } from "@/app/components/controls/IndicatorToggle";
import { SyncButton } from "@/app/components/controls/SyncButton";
import { PredictButton } from "@/app/components/controls/PredictButton";
import {
  formatCurrency,
  formatPercent,
  formatVolume,
  formatNumber,
} from "@/app/utils/formatters";
import {
  DollarSign,
  TrendingUp,
  ArrowUpDown,
  BarChart3,
  Calendar,
  Activity,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { selectedAsset, activeIndicators } = useAssetStore();
  const router = useRouter();

  const asset = ASSETS[selectedAsset];
  const priceData = MOCK_PRICE_HISTORY[selectedAsset];
  const stats = MOCK_ASSET_STATS[selectedAsset];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary flex items-center gap-3">
            <span
              className="w-10 h-10 rounded-xl flex items-center justify-center text-base font-bold"
              style={{
                backgroundColor: `${asset.color}20`,
                color: asset.color,
              }}
            >
              {asset.icon}
            </span>
            {asset.name} Dashboard
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            Real-time price data with AI-powered analysis
          </p>
        </div>

        <div className="flex items-center gap-3">
          <SyncButton />
        </div>
      </div>

      {/* Metric Cards Row */}
      <MetricCardGrid>
        <MetricCard
          label="Latest Price"
          value={formatCurrency(stats.latestClose, selectedAsset)}
          change={stats.change24hPct}
          accentColor={asset.color}
          icon={<DollarSign size={14} />}
          tooltip="The most recent closing price for this asset"
        />
        <MetricCard
          label="24h Change"
          value={formatCurrency(Math.abs(stats.change24h), selectedAsset)}
          change={stats.change24hPct}
          accentColor={stats.change24h >= 0 ? "#22C55E" : "#EF4444"}
          icon={<TrendingUp size={14} />}
          tooltip="Price change compared to the previous day close"
        />
        <MetricCard
          label="30-Day High"
          value={formatCurrency(stats.high30d, selectedAsset)}
          accentColor="#22C55E"
          icon={<ArrowUpDown size={14} />}
          tooltip="Highest price recorded in the last 30 days"
        />
        <MetricCard
          label="30-Day Low"
          value={formatCurrency(stats.low30d, selectedAsset)}
          accentColor="#EF4444"
          icon={<ArrowUpDown size={14} />}
          tooltip="Lowest price recorded in the last 30 days"
        />
        <MetricCard
          label="Avg Volume"
          value={formatVolume(stats.avgVolume)}
          accentColor="#3B82F6"
          icon={<BarChart3 size={14} />}
          tooltip="Average daily trading volume over the last 30 days"
        />
        <MetricCard
          label="Data Points"
          value={formatNumber(stats.count)}
          accentColor="#8B5CF6"
          icon={<Calendar size={14} />}
          tooltip="Total number of daily price records in the dataset"
        />
      </MetricCardGrid>

      {/* Main Content: Chart + Sidebar Controls */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_240px] gap-6">
        {/* Chart Area */}
        <div className="space-y-4">
          <PriceLineChart
            data={priceData}
            assetId={selectedAsset}
            activeIndicators={activeIndicators}
          />

          {/* Sub-charts for RSI and MACD when active */}
          {activeIndicators.has("rsi") && <RSIChart data={priceData} />}
          {activeIndicators.has("macd") && <MACDChart data={priceData} />}
        </div>

        {/* Right Panel: Controls */}
        <div className="space-y-4 max-xl:hidden">
          {/* Indicator Toggles */}
          <div className="glass-card p-4">
            <IndicatorToggle />
          </div>

          {/* Quick Predict */}
          <div className="glass-card p-4">
            <p className="text-[11px] font-medium uppercase tracking-wider text-text-muted mb-3">
              AI Prediction
            </p>
            <PredictButton
              onClick={() => router.push("/predict")}
            />
            <p className="text-[10px] text-text-muted mt-2 text-center">
              LSTM model • 30-day sequence
            </p>
          </div>

          {/* Price Stats */}
          <div className="glass-card p-4">
            <p className="text-[11px] font-medium uppercase tracking-wider text-text-muted mb-3">
              Statistics
            </p>
            <div className="space-y-2">
              <StatRow label="Mean" value={formatCurrency(stats.mean, selectedAsset)} />
              <StatRow label="Std Dev" value={formatCurrency(stats.std, selectedAsset)} />
              <StatRow label="Min" value={formatCurrency(stats.min, selectedAsset)} />
              <StatRow label="Max" value={formatCurrency(stats.max, selectedAsset)} />
              <StatRow label="P25" value={formatCurrency(stats.p25, selectedAsset)} />
              <StatRow label="Median" value={formatCurrency(stats.p50, selectedAsset)} />
              <StatRow label="P75" value={formatCurrency(stats.p75, selectedAsset)} />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: Indicator Controls (shown below chart) */}
      <div className="xl:hidden glass-card p-4">
        <IndicatorToggle />
      </div>
    </div>
  );
}

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-xs">
      <span className="text-text-muted">{label}</span>
      <span className="text-text-primary font-mono">{value}</span>
    </div>
  );
}
