"use client";

import { useState } from "react";
import { useAssetStore } from "@/app/stores/assetStore";
import { ASSETS } from "@/app/constants/assets";
import { MOCK_PRICE_HISTORY } from "@/app/lib/mock-data/price-history";
import { PriceLineChart, RSIChart, MACDChart } from "@/app/components/charts/PriceLineChart";
import { INDICATORS, type IndicatorId } from "@/app/constants/indicators";
import { Activity } from "lucide-react";
import clsx from "clsx";

type TabId = "bollinger" | "rsi" | "macd" | "all";

const TABS: { id: TabId; label: string; description: string }[] = [
  { id: "all", label: "All Indicators", description: "View all technical indicators overlaid on the price chart" },
  { id: "bollinger", label: "Bollinger Bands", description: "Volatility bands placed above and below a moving average" },
  { id: "rsi", label: "RSI", description: "Momentum oscillator measuring overbought and oversold conditions" },
  { id: "macd", label: "MACD", description: "Moving Average Convergence Divergence for trend changes" },
];

export default function IndicatorsPage() {
  const { selectedAsset } = useAssetStore();
  const [activeTab, setActiveTab] = useState<TabId>("all");
  const asset = ASSETS[selectedAsset];
  const priceData = MOCK_PRICE_HISTORY[selectedAsset];

  const activeIndicators = new Set<IndicatorId>(
    activeTab === "all"
      ? (["sma", "ema", "bollinger"] as IndicatorId[])
      : activeTab === "bollinger"
        ? (["bollinger", "sma"] as IndicatorId[])
        : []
  );

  const currentTab = TABS.find((t) => t.id === activeTab)!;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary flex items-center gap-3">
          <Activity size={28} className="text-primary" />
          Technical Indicators
        </h1>
        <p className="text-sm text-text-secondary mt-1">
          Explore technical analysis indicators for{" "}
          <span className="font-medium" style={{ color: asset.color }}>
            {asset.name}
          </span>
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={clsx(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all",
              activeTab === tab.id
                ? "bg-primary/10 text-primary"
                : "text-text-muted hover:text-text-secondary hover:bg-surface-hover/50"
            )}
          >
            {tab.id !== "all" && (
              <span
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor:
                    INDICATORS[tab.id]?.color ?? "var(--primary)",
                }}
              />
            )}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Description */}
      <div className="glass-card p-4">
        <p className="text-sm text-text-secondary">{currentTab.description}</p>
      </div>

      {/* Main Chart */}
      <PriceLineChart
        data={priceData}
        assetId={selectedAsset}
        activeIndicators={activeIndicators}
        height={500}
      />

      {/* Sub-charts */}
      {(activeTab === "rsi" || activeTab === "all") && (
        <RSIChart data={priceData} height={200} />
      )}

      {(activeTab === "macd" || activeTab === "all") && (
        <MACDChart data={priceData} height={200} />
      )}

      {/* Indicator Reference */}
      <div className="glass-card p-4 md:p-6">
        <h3 className="text-sm font-semibold text-text-primary mb-4">
          Indicator Reference
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.values(INDICATORS).map((ind) => (
            <div
              key={ind.id}
              className="p-4 rounded-lg border border-border hover:border-border-hover transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: ind.color }}
                />
                <h4 className="text-sm font-semibold text-text-primary">
                  {ind.shortLabel}
                </h4>
                <span className="text-[10px] text-text-muted px-1.5 py-0.5 rounded bg-surface-hover">
                  {ind.category}
                </span>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                {ind.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
