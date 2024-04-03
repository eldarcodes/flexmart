"use client";

import { Toaster } from "@/components/ui/sonner";

export function ToastProvider() {
  return <Toaster position="top-center" duration={2000} />;
}
