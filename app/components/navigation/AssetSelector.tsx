"use client";

import { useAssetStore } from "@/app/stores/assetStore";
import { ASSET_LIST, type AssetId } from "@/app/constants/assets";
import clsx from "clsx";

interface AssetSelectorProps {
  collapsed?: boolean;
}

export function AssetSelector({ collapsed }: AssetSelectorProps) {
  const { selectedAsset, setSelectedAsset } = useAssetStore();

  if (collapsed) {
    return (
      <div className="flex flex-col items-center gap-1.5 px-2">
        {ASSET_LIST.map((asset) => (
          <button
            key={asset.id}
            onClick={() => setSelectedAsset(asset.id as AssetId)}
            className={clsx(
              "w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold transition-all duration-200",
              selectedAsset === asset.id
                ? "ring-2 ring-offset-2 ring-offset-background"
                : "opacity-50 hover:opacity-80"
            )}
            style={{
              backgroundColor:
                selectedAsset === asset.id ? `${asset.color}20` : "transparent",
              color: asset.color,
              ...(selectedAsset === asset.id
                ? { ringColor: asset.color }
                : {}),
            }}
            title={asset.name}
            aria-label={`Select ${asset.name}`}
          >
            {asset.icon}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <p className="text-[11px] font-medium uppercase tracking-wider text-text-muted px-3 mb-2">
        Select Asset
      </p>
      {ASSET_LIST.map((asset) => {
        const isActive = selectedAsset === asset.id;
        return (
          <button
            key={asset.id}
            onClick={() => setSelectedAsset(asset.id as AssetId)}
            className={clsx(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-left",
              isActive
                ? "bg-surface-hover"
                : "hover:bg-surface-hover/50"
            )}
            aria-label={`Select ${asset.name}`}
          >
            {/* Color dot */}
            <div
              className={clsx(
                "w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0",
                isActive ? "shadow-md" : "opacity-60"
              )}
              style={{
                backgroundColor: `${asset.color}${isActive ? "25" : "15"}`,
                color: asset.color,
              }}
            >
              {asset.icon}
            </div>

            <div className="min-w-0 flex-1">
              <p
                className={clsx(
                  "text-sm font-medium truncate",
                  isActive ? "text-text-primary" : "text-text-secondary"
                )}
              >
                {asset.name}
              </p>
              <p className="text-[11px] text-text-muted font-mono">
                {asset.ticker}
              </p>
            </div>

            {/* Active check */}
            {isActive && (
              <div
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: asset.color }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
