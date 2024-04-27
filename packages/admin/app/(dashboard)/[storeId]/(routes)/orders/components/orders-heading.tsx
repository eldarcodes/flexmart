"use client";

import { Heading } from "@/components/ui/heading";

export function OrdersHeading() {
  return (
    <div className="flex items-center justify-between">
      <Heading title="Orders" description="Orders for your store" />
    </div>
  );
}
