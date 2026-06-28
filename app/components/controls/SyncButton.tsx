"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { useAssetStore } from "@/app/stores/assetStore";
import { useUiStore } from "@/app/stores/uiStore";
import { ASSETS } from "@/app/constants/assets";
import { Button } from "@/components/ui/button";
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
    <Button
      variant="outline"
      onClick={handleSync}
      disabled={isSyncing}
      className="w-full sm:w-auto"
    >
      <RefreshCw
        size={16}
        className={clsx("mr-2", isSyncing && "animate-spin")}
      />
      <span>{isSyncing ? "Syncing..." : "Sync Live Data"}</span>
    </Button>
  );
}
