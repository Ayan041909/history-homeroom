"use client";

import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { AccessibilityProvider } from "@/contexts/AccessibilityContext";
import { ToastProvider } from "@/components/shared/Toast";
import { SubscriptionWatcher } from "@/components/providers/SubscriptionWatcher";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <AccessibilityProvider>
        <TooltipProvider>
          <AuthProvider>
            <ToastProvider>
              <SubscriptionWatcher />
              {children}
            </ToastProvider>
          </AuthProvider>
        </TooltipProvider>
      </AccessibilityProvider>
    </ThemeProvider>
  );
}
