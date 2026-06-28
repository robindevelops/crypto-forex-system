"use client";

import { create } from "zustand";
import type { AssetId } from "@/app/constants/assets";
import type { IndicatorId } from "@/app/constants/indicators";

interface AssetState {
  selectedAsset: AssetId;
  setSelectedAsset: (asset: AssetId) => void;

  activeIndicators: Set<IndicatorId>;
  toggleIndicator: (id: IndicatorId) => void;
  clearIndicators: () => void;

  syncStatus: Record<AssetId, { isSyncing: boolean; lastSynced: string | null }>;
  setSyncing: (asset: AssetId, isSyncing: boolean) => void;
  setLastSynced: (asset: AssetId, time: string) => void;
}

export const useAssetStore = create<AssetState>((set) => ({
  selectedAsset: "bitcoin",
  setSelectedAsset: (asset) => set({ selectedAsset: asset }),

  activeIndicators: new Set<IndicatorId>(),
  toggleIndicator: (id) =>
    set((state) => {
      const next = new Set(state.activeIndicators);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return { activeIndicators: next };
    }),
  clearIndicators: () => set({ activeIndicators: new Set() }),

  syncStatus: {
    bitcoin: { isSyncing: false, lastSynced: "2026-06-28T04:30:00Z" },
    gold: { isSyncing: false, lastSynced: "2026-06-28T04:30:00Z" },
    silver: { isSyncing: false, lastSynced: "2026-06-28T04:30:00Z" },
  },
  setSyncing: (asset, isSyncing) =>
    set((state) => ({
      syncStatus: {
        ...state.syncStatus,
        [asset]: { ...state.syncStatus[asset], isSyncing },
      },
    })),
  setLastSynced: (asset, time) =>
    set((state) => ({
      syncStatus: {
        ...state.syncStatus,
        [asset]: { ...state.syncStatus[asset], lastSynced: time, isSyncing: false },
      },
    })),
}));
