"use client";

import {
  Menu,
  Bell,
  CircleDot,
  User,
} from "lucide-react";
import { useAssetStore } from "@/app/stores/assetStore";
import { useUiStore } from "@/app/stores/uiStore";
import { ASSETS } from "@/app/constants/assets";
import { Badge } from "@/app/components/ui/Badge";
import { formatRelativeTime } from "@/app/utils/formatters";
import clsx from "clsx";

interface TopNavbarProps {
  title?: string;
}

export function TopNavbar({ title }: TopNavbarProps) {
  const { selectedAsset, syncStatus } = useAssetStore();
  const { toggleSidebar } = useUiStore();
  const asset = ASSETS[selectedAsset];
  const sync = syncStatus[selectedAsset];

  return (
    <header className="sticky top-0 z-30 h-16 border-b-2 border-border bg-background">
      <div className="flex items-center justify-between h-full px-4 md:px-6">
        {/* Left: Mobile menu + Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="md:hidden p-2 text-text-secondary hover:text-text-primary hover:bg-[#CCFF00] hover:text-black transition-colors border-2 border-transparent hover:border-black"
            aria-label="Toggle menu"
          >
            <Menu size={20} />
          </button>

          {title && (
            <h2 className="text-xl font-black uppercase tracking-widest text-text-primary hidden sm:block">
              {title}
            </h2>
          )}
        </div>

        {/* Right: Asset badge + Sync status + Actions */}
        <div className="flex items-center gap-3">
          {/* Current Asset Badge */}
          <Badge color={asset.color} variant="outline" size="md">
            <span
              className="w-2 h-2"
              style={{ backgroundColor: asset.color }}
            />
            <span className="font-bold tracking-widest uppercase">{asset.name}</span>
          </Badge>

          {/* Sync Status */}
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-text-muted font-bold tracking-widest uppercase">
            <CircleDot
              size={10}
              className={clsx(
                sync.isSyncing
                  ? "text-[#CCFF00] animate-pulse"
                  : "text-white"
              )}
            />
            <span>
              {sync.isSyncing
                ? "SYNCING..."
                : sync.lastSynced
                  ? formatRelativeTime(sync.lastSynced)
                  : "NOT SYNCED"}
            </span>
          </div>

          {/* Divider */}
          <div className="w-0.5 h-6 bg-border hidden sm:block" />


          {/* Notifications */}
          <button
            className="p-2 text-text-secondary hover:text-black hover:bg-[#CCFF00] border-2 border-transparent hover:border-black transition-colors relative"
            aria-label="Notifications"
          >
            <Bell size={18} />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#FF0055] border-2 border-background" />
          </button>

          {/* User Avatar */}
          <button
            className="w-9 h-9 bg-[#CCFF00] border-2 border-black flex items-center justify-center text-black font-black hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#FFF] transition-all"
            aria-label="User menu"
          >
            <User size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
