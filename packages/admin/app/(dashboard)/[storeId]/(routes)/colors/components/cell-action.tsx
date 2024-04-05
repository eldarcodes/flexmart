"use client";

import { useState } from "react";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import * as ColorApi from "@/lib/api/color";
import { Button } from "@/components/ui/button";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { AlertModal } from "@/components/modals/alert-modal";

import { ColorColumn } from "./columns";

interface CellActionProps {
  data: ColorColumn;
}

export function CellAction({ data }: CellActionProps) {
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const params = useParams();
  const { copy } = useCopyToClipboard();

  const removeColorMutation = useMutation({
    mutationFn: () => {
      return ColorApi.remove(String(params.storeId), data.id);
    },
    onSuccess: () => {
      setOpen(false);
      toast.success("Color deleted successfully.");

      router.refresh();
    },
    onError: () => {
      setOpen(false);
      toast.error("Failed to delete a color.");
    },
  });

  const onCopy = (id: string) => {
    toast.success("ID copied to clipboard.");
    copy(data.id);
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        loading={removeColorMutation.isPending}
        onClose={() => setOpen(false)}
        onConfirm={() => removeColorMutation.mutate()}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            className="hover:cursor-pointer"
            onClick={() => router.push(`/${params.storeId}/colors/${data.id}`)}
          >
            <Edit className="w-4 h-4" />
            <span className="ml-2">Edit</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="hover:cursor-pointer"
            onClick={() => onCopy(data.id)}
          >
            <Copy className="w-4 h-4" />
            <span className="ml-2">Copy ID</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="hover:cursor-pointer"
            onClick={() => setOpen(true)}
          >
            <Trash className="w-4 h-4 text-red-600" />
            <span className="ml-2 text-red-600">Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
