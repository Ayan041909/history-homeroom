import { Suspense } from "react";
import { CreditCard } from "lucide-react";
import { PaymentClient } from "./PaymentClient";

export default function PaymentPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center pt-16">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center shadow-lg animate-pulse">
              <CreditCard size={24} className="text-white" />
            </div>
            <p className="text-muted-foreground text-sm">Loading checkout...</p>
          </div>
        </div>
      }
    >
      <PaymentClient />
    </Suspense>
  );
}
