"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";

type ToastType = "success" | "error" | "info";

type ToastItem = {
  id: number;
  type: ToastType;
  title: string;
  description?: string;
};

export type ToastApi = {
  success: (title: string, description?: string) => void;
  error: (title: string, description?: string) => void;
  info: (title: string, description?: string) => void;
};

const ToastContext = createContext<ToastApi | null>(null);

export function useToast(): ToastApi {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return ctx;
}

function toastIcon(type: ToastType) {
  switch (type) {
    case "success":
      return <CheckCircle2 className="h-5 w-5 shrink-0 text-green-500" aria-hidden />;
    case "error":
      return <AlertCircle className="text-destructive h-5 w-5 shrink-0" aria-hidden />;
    default:
      return <Info className="text-gold h-5 w-5 shrink-0" aria-hidden />;
  }
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const idRef = useRef(0);

  const push = useCallback((type: ToastType, title: string, description?: string) => {
    const id = ++idRef.current;
    setToasts((prev) => [...prev, { id, type, title, description }]);
    const duration = type === "error" ? 6500 : 5000;
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const success = useCallback(
    (title: string, description?: string) => push("success", title, description),
    [push]
  );
  const error = useCallback(
    (title: string, description?: string) => push("error", title, description),
    [push]
  );
  const info = useCallback(
    (title: string, description?: string) => push("info", title, description),
    [push]
  );

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ success, error, info }}>
      {children}
      <div
        className="pointer-events-none fixed bottom-4 right-4 z-[100] flex max-w-sm flex-col gap-2 sm:bottom-6 sm:right-6"
        aria-live="polite"
        aria-relevant="additions text"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            className="glass pointer-events-auto animate-in slide-in-from-right-full fade-in flex gap-3 rounded-xl border border-border bg-card p-4 text-card-foreground shadow-lg duration-300"
          >
            {toastIcon(t.type)}
            <div className="min-w-0 flex-1">
              <p className="font-semibold leading-tight">{t.title}</p>
              {t.description ? (
                <p className="text-muted-foreground mt-1 text-sm leading-snug">{t.description}</p>
              ) : null}
            </div>
            <button
              type="button"
              onClick={() => dismiss(t.id)}
              className="text-muted-foreground hover:text-foreground -m-1 shrink-0 rounded-lg p-1 transition-colors focus-visible:ring-2 focus-visible:ring-gold"
              aria-label="Dismiss notification"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
