"use client";

import { Sidebar } from "@/app/components/layout/Sidebar";
import { TopNavbar } from "@/app/components/layout/TopNavbar";
import { ToastContainer } from "@/app/components/feedback/ToastNotification";
import { useUiStore } from "@/app/stores/uiStore";
import clsx from "clsx";

interface AppShellProps {
  children: React.ReactNode;
  pageTitle?: string;
}

export function AppShell({ children, pageTitle }: AppShellProps) {
  const { sidebarCollapsed } = useUiStore();

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <div
        className={clsx(
          "transition-all duration-300 ease-in-out",
          "max-md:ml-0",
          sidebarCollapsed ? "md:ml-[72px]" : "md:ml-[280px]"
        )}
      >
        <TopNavbar title={pageTitle} />

        <main className="p-4 md:p-6">
          {children}
        </main>
      </div>

      {/* Toast notification container */}
      <ToastContainer />
    </div>
  );
}
