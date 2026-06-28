"use client";

import { useAssetStore } from "@/app/stores/assetStore";
import { INDICATOR_LIST, type IndicatorId } from "@/app/constants/indicators";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

export function IndicatorToggle() {
  const { activeIndicators, toggleIndicator } = useAssetStore();

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {INDICATOR_LIST.map((indicator) => {
          const isActive = activeIndicators.has(indicator.id as IndicatorId);
          return (
            <div
              key={indicator.id}
              className="flex items-center justify-between"
            >
              <div className="flex flex-col gap-1">
                <Label htmlFor={`indicator-${indicator.id}`} className="flex items-center gap-2 cursor-pointer">
                  {indicator.shortLabel}
                  <Badge variant="secondary" className="text-[10px] px-1 py-0 uppercase">
                    {indicator.category}
                  </Badge>
                </Label>
              </div>
              <Switch
                id={`indicator-${indicator.id}`}
                checked={isActive}
                onCheckedChange={() => toggleIndicator(indicator.id as IndicatorId)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
