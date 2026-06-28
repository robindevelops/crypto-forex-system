"use client";

import { ASSET_LIST } from "@/app/constants/assets";
import { Badge } from "@/app/components/ui/Badge";
import { ROLE_COLORS, ROLE_LABELS, type UserRole } from "@/app/types/user.types";
import { formatRelativeTime } from "@/app/utils/formatters";
import {
  ShieldCheck,
  RefreshCw,
  Package,
  Users,
  Activity,
  CheckCircle,
  AlertTriangle,
  Server,
  Database,
  HardDrive,
  Wifi,
} from "lucide-react";
import clsx from "clsx";

const MOCK_USERS = [
  { id: "1", name: "Ahmad Khan", email: "ahmad@example.com", role: "admin" as UserRole, isActive: true, lastActive: "2026-06-28T04:00:00Z" },
  { id: "2", name: "Sara Ali", email: "sara@example.com", role: "analyst" as UserRole, isActive: true, lastActive: "2026-06-27T18:00:00Z" },
  { id: "3", name: "Usman Raza", email: "usman@example.com", role: "trader" as UserRole, isActive: true, lastActive: "2026-06-28T03:30:00Z" },
  { id: "4", name: "Fatima Noor", email: "fatima@example.com", role: "student" as UserRole, isActive: true, lastActive: "2026-06-26T12:00:00Z" },
  { id: "5", name: "Ali Hassan", email: "ali@example.com", role: "developer" as UserRole, isActive: false, lastActive: "2026-06-20T08:00:00Z" },
];

const SYSTEM_HEALTH = [
  { label: "API Server", status: "healthy", icon: Server, detail: "Response time: 45ms" },
  { label: "Database", status: "healthy", icon: Database, detail: "PostgreSQL 16 — 234 connections" },
  { label: "Storage", status: "warning", icon: HardDrive, detail: "78% used (3.2 GB / 4 GB)" },
  { label: "External API", status: "healthy", icon: Wifi, detail: "Yahoo Finance — Available" },
];

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary flex items-center gap-3">
          <ShieldCheck size={28} className="text-primary" />
          Admin Panel
        </h1>
        <p className="text-sm text-text-secondary mt-1">
          Manage data sync, model artifacts, users, and system health
        </p>
      </div>

      {/* System Health */}
      <div className="glass-card p-4 md:p-6">
        <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
          <Activity size={16} className="text-success" />
          System Health
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SYSTEM_HEALTH.map((item) => {
            const Icon = item.icon;
            const isHealthy = item.status === "healthy";
            return (
              <div
                key={item.label}
                className="p-4 rounded-lg border border-border"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon size={16} className="text-text-muted" />
                  <span className="text-sm font-medium text-text-primary">
                    {item.label}
                  </span>
                  {isHealthy ? (
                    <CheckCircle size={14} className="text-success ml-auto" />
                  ) : (
                    <AlertTriangle size={14} className="text-warning ml-auto" />
                  )}
                </div>
                <p className="text-xs text-text-muted">{item.detail}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Data Sync Status */}
      <div className="glass-card p-4 md:p-6">
        <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
          <RefreshCw size={16} className="text-info" />
          Data Sync Status
        </h3>
        <div className="space-y-3">
          {ASSET_LIST.map((asset) => (
            <div
              key={asset.id}
              className="flex items-center gap-4 p-3 rounded-lg border border-border"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                style={{ backgroundColor: `${asset.color}20`, color: asset.color }}
              >
                {asset.icon}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-text-primary">{asset.name}</p>
                <p className="text-xs text-text-muted">Last synced: {formatRelativeTime("2026-06-28T04:30:00Z")}</p>
              </div>
              <Badge color="#22C55E" size="sm">Fresh</Badge>
              <span className="text-xs text-text-muted font-mono">365 rows</span>
              <button className="px-3 py-1.5 rounded-lg text-xs font-medium border border-border hover:border-border-hover hover:bg-surface-hover transition-all flex items-center gap-1.5">
                <RefreshCw size={12} />
                Sync
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* User Management */}
      <div className="glass-card p-4 md:p-6">
        <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
          <Users size={16} className="text-secondary" />
          User Management
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-text-muted text-xs uppercase tracking-wide">
                <th className="text-left py-3 px-3 font-medium">User</th>
                <th className="text-left py-3 px-3 font-medium">Role</th>
                <th className="text-left py-3 px-3 font-medium">Status</th>
                <th className="text-left py-3 px-3 font-medium">Last Active</th>
                <th className="text-right py-3 px-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_USERS.map((user) => (
                <tr key={user.id} className="border-b border-border/50 hover:bg-surface-hover/50 transition-colors">
                  <td className="py-3 px-3">
                    <div>
                      <p className="text-sm font-medium text-text-primary">{user.name}</p>
                      <p className="text-xs text-text-muted">{user.email}</p>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <Badge color={ROLE_COLORS[user.role]} size="sm">
                      {ROLE_LABELS[user.role]}
                    </Badge>
                  </td>
                  <td className="py-3 px-3">
                    <span className={clsx(
                      "inline-flex items-center gap-1 text-xs",
                      user.isActive ? "text-success" : "text-text-muted"
                    )}>
                      <span className={clsx(
                        "w-1.5 h-1.5 rounded-full",
                        user.isActive ? "bg-success" : "bg-text-muted"
                      )} />
                      {user.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-xs text-text-muted">
                    {formatRelativeTime(user.lastActive)}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button className="text-xs text-primary hover:underline">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Model Artifacts */}
      <div className="glass-card p-4 md:p-6">
        <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
          <Package size={16} className="text-warning" />
          Model Artifacts
        </h3>
        <div className="space-y-2">
          {ASSET_LIST.map((asset) => (
            <div
              key={asset.id}
              className="flex items-center gap-3 p-3 rounded-lg border border-border"
            >
              <Package size={16} className="text-text-muted" />
              <span className="text-sm font-mono text-text-primary flex-1">
                {asset.id}_lstm_optimized.keras
              </span>
              <Badge color={asset.color} size="sm">{asset.name}</Badge>
              <Badge color="#22C55E" size="sm">Active</Badge>
              <span className="text-xs text-text-muted">4.8 MB</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
