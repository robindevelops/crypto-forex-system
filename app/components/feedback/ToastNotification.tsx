"use client";

import { useEffect } from "react";
import { useUiStore, type Toast } from "@/app/stores/uiStore";
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";
import clsx from "clsx";

const ICONS = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

const COLORS = {
  success: "text-success border-success/20 bg-success/5",
  error: "text-error border-error/20 bg-error/5",
  warning: "text-warning border-warning/20 bg-warning/5",
  info: "text-info border-info/20 bg-info/5",
};

function ToastItem({ toast }: { toast: Toast }) {
  const { removeToast } = useUiStore();
  const Icon = ICONS[toast.type];

  useEffect(() => {
    const timer = setTimeout(
      () => removeToast(toast.id),
      toast.duration ?? 4000
    );
    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, removeToast]);

  return (
    <div
      className={clsx(
        "flex items-start gap-3 p-4 rounded-lg border backdrop-blur-md shadow-lg",
        "animate-slide-in-right",
        COLORS[toast.type]
      )}
      role="alert"
    >
      <Icon size={18} className="shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-text-primary">{toast.title}</p>
        {toast.message && (
          <p className="text-xs text-text-secondary mt-0.5">{toast.message}</p>
        )}
      </div>
      <button
        onClick={() => removeToast(toast.id)}
        className="shrink-0 text-text-muted hover:text-text-primary transition-colors"
        aria-label="Dismiss"
      >
        <X size={14} />
      </button>
    </div>
  );
}

export function ToastContainer() {
  const { toasts } = useUiStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-2 w-[360px] max-w-[calc(100vw-2rem)]">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  );
}
