"use client";

import { Plus } from "lucide-react";

import { useParams } from "next/navigation";

import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";

export function SizesHeading() {
  const params = useParams();

  return (
    <div className="flex items-center justify-between">
      <Heading title="Sizes" description="Manage sizes for your store" />

      <a href={`/${params.storeId}/sizes/new`}>
        <Button>
          <Plus className="h-4 w-4" />
          <span className="ml-2">Add New</span>
        </Button>
      </a>
    </div>
  );
}
