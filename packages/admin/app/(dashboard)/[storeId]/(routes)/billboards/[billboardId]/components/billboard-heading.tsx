"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { Billboard } from "@prisma/client";

import * as BillboardApi from "@/lib/api/billboard";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { AlertModal } from "@/components/modals/alert-modal";

interface BillboardHeadingProps {
  billboard: Billboard | null;
}

export function BillboardHeading({ billboard }: BillboardHeadingProps) {
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const params = useParams();

  const removeBillboardMutation = useMutation({
    mutationFn: () => {
      return BillboardApi.remove(billboard?.storeId || "", billboard?.id || "");
    },
    onSuccess: () => {
      toast.success("Billboard deleted successfully.");
      setOpen(false);
      router.push(`/${params.storeId}/billboards`);
    },
    onError: () => {
      setOpen(false);
      toast.error("Failed to delete a billboard.");
    },
  });

  const title = billboard ? "Edit billboard" : "Create billboard";
  const description = billboard ? "Edit a billboard." : "Add a new billboard";

  return (
    <>
      <AlertModal
        isOpen={open}
        loading={removeBillboardMutation.isPending}
        onClose={() => setOpen(false)}
        onConfirm={() => removeBillboardMutation.mutate()}
      />

      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />

        {billboard && (
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
