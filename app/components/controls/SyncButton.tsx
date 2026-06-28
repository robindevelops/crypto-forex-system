"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { useAssetStore } from "@/app/stores/assetStore";
import { useUiStore } from "@/app/stores/uiStore";
import { ASSETS } from "@/app/constants/assets";
import clsx from "clsx";

export function SyncButton() {
  const { selectedAsset, setSyncing, setLastSynced, syncStatus } = useAssetStore();
  const { addToast } = useUiStore();
  const isSyncing = syncStatus[selectedAsset].isSyncing;
  const asset = ASSETS[selectedAsset];

  const handleSync = async () => {
    if (isSyncing) return;
    setSyncing(selectedAsset, true);

    // Simulate sync delay
    await new Promise((resolve) => setTimeout(resolve, 2000 + Math.random() * 1000));

    setLastSynced(selectedAsset, new Date().toISOString());
    addToast({
      type: "success",
      title: "Data synced",
      message: `${asset.name} market data updated successfully.`,
    });
  };

  return (
    <button
      onClick={handleSync}
      disabled={isSyncing}
      className={clsx(
        "w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
        "border border-border hover:border-border-hover",
        isSyncing
          ? "opacity-60 cursor-not-allowed"
          : "hover:bg-surface-hover active:scale-[0.98]"
      )}
    >
      <RefreshCw
        size={16}
        className={clsx(isSyncing && "animate-spin")}
      />
      <span>{isSyncing ? "Syncing..." : "Sync Live Data"}</span>
    </button>
  );
}
