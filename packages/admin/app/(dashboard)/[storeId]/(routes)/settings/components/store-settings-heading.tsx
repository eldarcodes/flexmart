"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Store } from "@prisma/client";

import * as StoreApi from "@/lib/api/store";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { AlertModal } from "@/components/modals/alert-modal";

interface StoreSettingsHeadingProps {
  store: Store;
}

export function StoreSettingsHeading({ store }: StoreSettingsHeadingProps) {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const removeStoreMutation = useMutation({
    mutationFn: () => StoreApi.remove(store.id),
    onSuccess: () => {
      setOpen(false);

      toast.success("Store deleted successfully.");
      router.refresh();
    },
    onError: () => {
      setOpen(false);
      toast.error("Failed to delete a store.");
    },
  });

  return (
    <>
      <AlertModal
        isOpen={open}
        loading={removeStoreMutation.isPending}
        onClose={() => setOpen(false)}
        onConfirm={() => removeStoreMutation.mutate()}
      />

      <div className="flex items-center justify-between">
        <Heading title="Settings" description="Update your store settings" />

        <Button variant="destructive" size="icon" onClick={() => setOpen(true)}>
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
}
