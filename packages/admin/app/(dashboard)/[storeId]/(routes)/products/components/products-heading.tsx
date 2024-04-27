"use client";

import { Plus } from "lucide-react";

import { useParams } from "next/navigation";

import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";

export function ProductsHeading() {
  const params = useParams();

  return (
    <div className="flex items-center justify-between">
      <Heading title="Products" description="Manage products for your store" />

      <a href={`/${params.storeId}/products/new`}>
        <Button>
          <Plus className="h-4 w-4" />
          <span className="ml-2">Add New</span>
        </Button>
      </a>
    </div>
  );
}
