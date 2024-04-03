"use client";

import { ReloadIcon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Billboard } from "@prisma/client";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";

import * as BillboardApi from "@/lib/api/billboard";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ImageUpload } from "@/components/image-upload";

interface BillboardFormProps {
  billboard: Billboard | null;
}

const FormSchema = z.object({
  label: z.string().min(2, {
    message: "Billboard label must be at least 2 characters.",
  }),
  imageUrl: z.string().min(1),
});

export function BillboardForm({ billboard }: BillboardFormProps) {
  const router = useRouter();
  const params = useParams();

  const saveBillboardMutation = useMutation({
    mutationFn: (data: BillboardApi.UpdateBillboardInput) => {
      if (billboard) {
        return BillboardApi.update(billboard.storeId, billboard.id, data);
      } else {
        return BillboardApi.create(String(params.storeId), data);
      }
    },

    onSuccess: () => {
      toast.success(
        billboard
          ? "Billboard updated successfully."
          : "Billboard created successfully."
      );
      router.push(`/${params.storeId}/billboards`);
    },
    onError: () => {
      toast.error(
        billboard
          ? "Failed to update a billboard."
          : "Failed to create a billboard."
      );
    },
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: billboard || {
      label: "",
      imageUrl: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    saveBillboardMutation.mutate(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Background image</FormLabel>
              <FormControl>
                <ImageUpload
                  value={field.value ? [field.value] : []}
                  disabled={saveBillboardMutation.isPending}
                  onChange={(url) => field.onChange(url)}
                  onRemove={() => field.onChange("")}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-3 gap-8">
          <FormField
            control={form.control}
            name="label"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Label</FormLabel>
                <FormControl>
                  <Input
                    disabled={saveBillboardMutation.isPending}
                    placeholder="Enter billboard label"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button disabled={saveBillboardMutation.isPending} type="submit">
          {saveBillboardMutation.isPending && (
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          )}
          {billboard ? "Save" : "Create"}
        </Button>
      </form>
    </Form>
  );
}
