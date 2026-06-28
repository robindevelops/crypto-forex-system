"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import type { LucideIcon } from "lucide-react";

interface NavItemProps {
  href: string;
  label: string;
  icon: LucideIcon;
  collapsed?: boolean;
  badge?: string;
}

export function NavItem({
  href,
  label,
  icon: Icon,
  collapsed,
  badge,
}: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={clsx(
        "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
        isActive
          ? "bg-primary/10 text-primary"
          : "text-text-secondary hover:bg-surface-hover hover:text-text-primary"
      )}
      title={collapsed ? label : undefined}
    >
      {/* Active indicator bar */}
      {isActive && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-primary rounded-r-full" />
      )}

      <Icon
        size={20}
        className={clsx(
          "shrink-0 transition-colors",
          isActive ? "text-primary" : "text-text-muted group-hover:text-text-primary"
        )}
      />

      {!collapsed && (
        <>
          <span className="truncate">{label}</span>
          {badge && (
            <span className="ml-auto text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-primary/20 text-primary">
              {badge}
            </span>
          )}
        </>
      )}
    </Link>
  );
}
