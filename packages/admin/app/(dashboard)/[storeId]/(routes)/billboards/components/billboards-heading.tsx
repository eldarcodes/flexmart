"use client";

import { Plus } from "lucide-react";

import { useParams } from "next/navigation";

import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";

export function BillboardsHeading() {
  const params = useParams();

  return (
    <div className="flex items-center justify-between">
      <Heading
        title="Billboards"
        description="Manage billboards for your store"
      />

      <a href={`/${params.storeId}/billboards/new`}>
        <Button>
          <Plus className="h-4 w-4" />
          <span className="ml-2">Add New</span>
        </Button>
      </a>
    </div>
  );
}
