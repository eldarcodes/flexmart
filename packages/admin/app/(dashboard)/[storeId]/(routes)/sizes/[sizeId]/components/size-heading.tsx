"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { Size } from "@prisma/client";

import * as SizeApi from "@/lib/api/size";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { AlertModal } from "@/components/modals/alert-modal";

interface SizeHeadingProps {
  size: Size | null;
}

export function SizeHeading({ size }: SizeHeadingProps) {
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const params = useParams();

  const removeSizeMutation = useMutation({
    mutationFn: () => {
      return SizeApi.remove(size?.storeId || "", size?.id || "");
    },
    onSuccess: () => {
      setOpen(false);
      toast.success("Size deleted successfully.");

      router.refresh();
      router.push(`/${params.storeId}/sizes`);
    },
    onError: () => {
      setOpen(false);
      toast.error("Failed to delete a size.");
    },
  });

  const title = size ? "Edit size" : "Create size";
  const description = size ? "Edit a size." : "Add a new size";

  return (
    <>
      <AlertModal
        isOpen={open}
        loading={removeSizeMutation.isPending}
        onClose={() => setOpen(false)}
        onConfirm={() => removeSizeMutation.mutate()}
      />

      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />

        {size && (
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
