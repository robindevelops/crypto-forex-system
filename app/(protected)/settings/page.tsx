"use client";

import { useState } from "react";
import { useUiStore } from "@/app/stores/uiStore";
import { useAssetStore } from "@/app/stores/assetStore";
import { ASSET_LIST, type AssetId } from "@/app/constants/assets";
import { Settings, User, Palette, Eye, Save, CheckCircle } from "lucide-react";
import clsx from "clsx";

export default function SettingsPage() {
  const { theme, toggleTheme } = useUiStore();
  const { selectedAsset, setSelectedAsset } = useAssetStore();
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-text-primary flex items-center gap-3">
          <Settings size={28} className="text-primary" />
          Settings
        </h1>
        <p className="text-sm text-text-secondary mt-1">
          Manage your profile and dashboard preferences
        </p>
      </div>

      {/* Profile */}
      <div className="glass-card p-6">
        <h2 className="text-base font-semibold text-text-primary flex items-center gap-2 mb-4">
          <User size={16} />
          Profile
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5">Full Name</label>
            <input
              type="text"
              defaultValue="Demo User"
              className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-sm text-text-primary focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5">Email</label>
            <input
              type="email"
              defaultValue="demo@example.com"
              className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-sm text-text-primary focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5">Role</label>
            <input
              type="text"
              value="Trader"
              disabled
              className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border text-sm text-text-muted cursor-not-allowed"
            />
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="glass-card p-6">
        <h2 className="text-base font-semibold text-text-primary flex items-center gap-2 mb-4">
          <Palette size={16} />
          Preferences
        </h2>
        <div className="space-y-4">
          {/* Theme */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-primary">Theme</p>
              <p className="text-xs text-text-muted">Choose your preferred color scheme</p>
            </div>
            <button
              onClick={toggleTheme}
              className={clsx(
                "px-4 py-2 rounded-lg text-sm font-medium border border-border transition-all",
                "hover:border-border-hover hover:bg-surface-hover"
              )}
            >
              {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
            </button>
          </div>

          {/* Default Asset */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-primary">Default Asset</p>
              <p className="text-xs text-text-muted">Asset shown when you first open the dashboard</p>
            </div>
            <select
              value={selectedAsset}
              onChange={(e) => setSelectedAsset(e.target.value as AssetId)}
              className="px-4 py-2 rounded-lg text-sm bg-background border border-border text-text-primary focus:border-primary outline-none"
            >
              {ASSET_LIST.map((a) => (
                <option key={a.id} value={a.id}>{a.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Save */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className={clsx(
            "flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all",
            saved
              ? "bg-success text-background"
              : "bg-primary text-background hover:bg-primary-hover active:scale-[0.98]"
          )}
        >
          {saved ? <CheckCircle size={16} /> : <Save size={16} />}
          {saved ? "Saved!" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
