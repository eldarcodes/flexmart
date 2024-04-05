"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { Category } from "@prisma/client";

import * as CategoryApi from "@/lib/api/category";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { AlertModal } from "@/components/modals/alert-modal";

interface CategoryHeadingProps {
  category: Category | null;
}

export function CategoryHeading({ category }: CategoryHeadingProps) {
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const params = useParams();

  const removeCategoryMutation = useMutation({
    mutationFn: () => {
      return CategoryApi.remove(category?.storeId || "", category?.id || "");
    },
    onSuccess: () => {
      setOpen(false);
      toast.success("Category deleted successfully.");

      router.refresh();
      router.push(`/${params.storeId}/categories`);
    },
    onError: () => {
      setOpen(false);
      toast.error("Failed to delete a category.");
    },
  });

  const title = category ? "Edit category" : "Create category";
  const description = category
    ? "Edit an existing category."
    : "Create a new category.";

  return (
    <>
      <AlertModal
        isOpen={open}
        loading={removeCategoryMutation.isPending}
        onClose={() => setOpen(false)}
        onConfirm={() => removeCategoryMutation.mutate()}
      />

      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />

        {category && (
          <Button
            variant="destructive"
            size="icon"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
    </>
  );
}
