"use client";

import { useAssetStore } from "@/app/stores/assetStore";
import { INDICATOR_LIST, type IndicatorId } from "@/app/constants/indicators";
import clsx from "clsx";

export function IndicatorToggle() {
  const { activeIndicators, toggleIndicator } = useAssetStore();

  return (
    <div className="space-y-1.5">
      <p className="text-[11px] font-medium uppercase tracking-wider text-text-muted mb-2">
        Indicators
      </p>
      {INDICATOR_LIST.map((indicator) => {
        const isActive = activeIndicators.has(indicator.id as IndicatorId);
        return (
          <button
            key={indicator.id}
            onClick={() => toggleIndicator(indicator.id as IndicatorId)}
            className={clsx(
              "w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-all duration-200 text-left",
              isActive
                ? "bg-surface-hover text-text-primary"
                : "text-text-secondary hover:bg-surface-hover/50"
            )}
          >
            <div
              className={clsx(
                "w-3 h-3 rounded-sm border-2 transition-all duration-200 flex items-center justify-center",
                isActive ? "border-transparent" : "border-border"
              )}
              style={
                isActive
                  ? { backgroundColor: indicator.color }
                  : undefined
              }
            >
              {isActive && (
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path
                    d="M1.5 4L3 5.5L6.5 2"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
            <span className="flex-1">{indicator.shortLabel}</span>
            <span
              className={clsx(
                "text-[10px] px-1.5 py-0.5 rounded",
                isActive ? "bg-surface text-text-muted" : "text-text-muted"
              )}
            >
              {indicator.category}
            </span>
          </button>
        );
      })}
    </div>
  );
}
