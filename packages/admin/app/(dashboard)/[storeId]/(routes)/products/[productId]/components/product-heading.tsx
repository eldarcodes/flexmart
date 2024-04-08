"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";

import * as ProductApi from "@/lib/api/product";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { AlertModal } from "@/components/modals/alert-modal";
import { Product } from "@prisma/client";

interface ProductHeadingProps {
  product: Product | null;
}

export function ProductHeading({ product }: ProductHeadingProps) {
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const params = useParams();

  const removeProductMutation = useMutation({
    mutationFn: () => {
      return ProductApi.remove(product?.storeId || "", product?.id || "");
    },
    onSuccess: () => {
      setOpen(false);
      toast.success("Product deleted successfully.");

      router.refresh();
      router.push(`/${params.storeId}/products`);
    },
    onError: () => {
      setOpen(false);
      toast.error("Failed to delete a product.");
    },
  });

  const title = product ? "Edit product" : "Create product";
  const description = product ? "Edit a product." : "Add a new product";

  return (
    <>
      <AlertModal
        isOpen={open}
        loading={removeProductMutation.isPending}
        onClose={() => setOpen(false)}
        onConfirm={() => removeProductMutation.mutate()}
      />

      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />

        {product && (
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
