"use client";

import {
  LayoutDashboard,
  BrainCircuit,
  GitCompare,
  Activity,
  FileBarChart,
  Settings,
  HelpCircle,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import { NavItem } from "@/app/components/navigation/NavItem";
import { AssetSelector } from "@/app/components/navigation/AssetSelector";
import { ROUTES } from "@/app/constants/routes";
import { useUiStore } from "@/app/stores/uiStore";
import clsx from "clsx";

const NAV_ITEMS = [
  { href: ROUTES.DASHBOARD, label: "Dashboard", icon: LayoutDashboard },
  { href: ROUTES.PREDICT, label: "AI Prediction", icon: BrainCircuit },
  { href: ROUTES.MODELS, label: "Model Comparison", icon: GitCompare },
  { href: ROUTES.INDICATORS, label: "Indicators", icon: Activity },
];

const BOTTOM_NAV = [
  { href: ROUTES.SETTINGS, label: "Settings", icon: Settings },
  { href: ROUTES.HELP, label: "Help & Docs", icon: HelpCircle },
];

export function Sidebar() {
  const { sidebarCollapsed, toggleSidebar } = useUiStore();

  return (
    <aside
      className={clsx(
        "fixed top-0 left-0 z-40 h-screen flex flex-col",
        "bg-background border-r-2 border-border transition-all duration-300 ease-in-out",
        "max-md:hidden",
        sidebarCollapsed ? "w-[72px]" : "w-[280px]"
      )}
    >
      {/* Logo Area */}
      <div
        className={clsx(
          "flex items-center h-16 border-b-2 border-border shrink-0",
          sidebarCollapsed ? "justify-center px-2" : "px-5 gap-3"
        )}
      >
        <div className="w-8 h-8 bg-[#CCFF00] flex items-center justify-center text-black font-black text-lg border-2 border-black rotate-3 shrink-0">
          C
        </div>
        {!sidebarCollapsed && (
          <div className="min-w-0">
            <h1 className="text-sm font-black text-text-primary uppercase tracking-tight truncate">
              CryptoForex
            </h1>
          </div>
        )}
      </div>

      {/* Main Navigation */}
      <nav className={clsx("flex-1 overflow-y-auto py-3", sidebarCollapsed ? "px-2" : "px-3")}>
        <div className="space-y-1">
          {NAV_ITEMS.map((item) => (
            <NavItem
              key={item.href}
              {...item}
              collapsed={sidebarCollapsed}
            />
          ))}
        </div>
      </nav>

      {/* Asset Selector */}
      <div
        className={clsx(
          "border-t-2 border-border shrink-0",
          sidebarCollapsed ? "py-3" : "p-4"
        )}
      >
        <AssetSelector collapsed={sidebarCollapsed} />
      </div>

      {/* Bottom Navigation */}
      <div
        className={clsx(
          "border-t-2 border-border py-3 space-y-1",
          sidebarCollapsed ? "px-2" : "px-3"
        )}
      >
        {BOTTOM_NAV.map((item) => (
          <NavItem
            key={item.href}
            {...item}
            collapsed={sidebarCollapsed}
          />
        ))}
      </div>

      {/* Collapse Toggle */}
      <div className="border-t-2 border-border p-2 shrink-0">
        <button
          onClick={toggleSidebar}
          className={clsx(
            "w-full flex items-center justify-center gap-2 py-2 rounded-lg",
            "text-text-muted hover:text-text-primary hover:bg-surface-hover",
            "transition-all duration-200 text-xs"
          )}
          aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {sidebarCollapsed ? (
            <ChevronRight size={16} />
          ) : (
            <>
              <ChevronLeft size={16} />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
