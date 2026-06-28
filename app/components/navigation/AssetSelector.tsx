"use client";

import { useAssetStore } from "@/app/stores/assetStore";
import { ASSET_LIST, type AssetId } from "@/app/constants/assets";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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

  const activeAsset = ASSET_LIST.find(a => a.id === selectedAsset);

  return (
    <div className="space-y-1 px-3">
      <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground mb-2">
        Asset
      </p>
      <Select 
        value={selectedAsset} 
        onValueChange={(value) => setSelectedAsset(value as AssetId)}
      >
        <SelectTrigger className="w-full h-12 bg-surface hover:bg-surface-hover border-border focus:ring-1 focus:ring-primary transition-colors">
          <SelectValue>
             {activeAsset && (
               <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold"
                       style={{ backgroundColor: `${activeAsset.color}25`, color: activeAsset.color }}>
                     {activeAsset.icon}
                  </div>
                  <span className="font-medium">{activeAsset.name}</span>
               </div>
             )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {ASSET_LIST.map((asset) => (
            <SelectItem key={asset.id} value={asset.id} className="py-2 cursor-pointer">
               <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold"
                       style={{ backgroundColor: `${asset.color}25`, color: asset.color }}>
                     {asset.icon}
                  </div>
                  <span className="font-medium">{asset.name}</span>
                  <span className="text-[10px] text-muted-foreground ml-2">{asset.ticker}</span>
               </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
