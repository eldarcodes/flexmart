"use client";

import { Toaster } from "sonner";

export function ToastProvider() {
  return <Toaster duration={2000} richColors />;
}
