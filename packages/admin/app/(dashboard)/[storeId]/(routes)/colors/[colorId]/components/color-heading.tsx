"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { Color } from "@prisma/client";

import * as ColorApi from "@/lib/api/color";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { AlertModal } from "@/components/modals/alert-modal";

interface ColorHeadingProps {
  color: Color | null;
}

export function ColorHeading({ color }: ColorHeadingProps) {
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const params = useParams();

  const removeColorMutation = useMutation({
    mutationFn: () => {
      return ColorApi.remove(color?.storeId || "", color?.id || "");
    },
    onSuccess: () => {
      setOpen(false);
      toast.success("Color deleted successfully.");

      router.refresh();
      router.push(`/${params.storeId}/colors`);
    },
    onError: () => {
      setOpen(false);
      toast.error("Failed to delete a color.");
    },
  });

  const title = color ? "Edit color" : "Create color";
  const description = color ? "Edit a color." : "Add a new color";

  return (
    <>
      <AlertModal
        isOpen={open}
        loading={removeColorMutation.isPending}
        onClose={() => setOpen(false)}
        onConfirm={() => removeColorMutation.mutate()}
      />

      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />

        {color && (
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
