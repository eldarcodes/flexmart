"use client";

import { Plus } from "lucide-react";

import { useParams } from "next/navigation";

import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";

export function CategoriesHeading() {
  const params = useParams();

  return (
    <div className="flex items-center justify-between">
      <Heading title="Categories" description="Manage your categories" />

      <a href={`/${params.storeId}/categories/new`}>
        <Button>
          <Plus className="h-4 w-4" />
          <span className="ml-2">Add New</span>
        </Button>
      </a>
    </div>
  );
}
