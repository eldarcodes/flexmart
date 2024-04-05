"use client";

import { ReloadIcon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Size } from "@prisma/client";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";

import * as SizeApi from "@/lib/api/size";
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

interface SizeFormProps {
  size: Size | null;
}

const FormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Size name must be at least 2 characters." }),
  value: z
    .string()
    .min(1, { message: "Size value must be at least 1 characters." }),
});

export function SizeForm({ size }: SizeFormProps) {
  const router = useRouter();
  const params = useParams();

  const saveSizeMutation = useMutation({
    mutationFn: (data: SizeApi.UpdateSizeInput) => {
      if (size) {
        return SizeApi.update(size.storeId, size.id, data);
      } else {
        return SizeApi.create(String(params.storeId), data);
      }
    },

    onSuccess: () => {
      toast.success(
        size ? "Size updated successfully." : "Size created successfully."
      );

      router.refresh();
      router.push(`/${params.storeId}/sizes`);
    },
    onError: () => {
      toast.error(
        size ? "Failed to update a size." : "Failed to create a size."
      );
    },
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: size || {
      name: "",
      value: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    saveSizeMutation.mutate(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <div className="grid grid-cols-3 gap-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={saveSizeMutation.isPending}
                    placeholder="Enter size name"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Value</FormLabel>
                <FormControl>
                  <Input
                    disabled={saveSizeMutation.isPending}
                    placeholder="Enter size value"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button disabled={saveSizeMutation.isPending} type="submit">
          {saveSizeMutation.isPending && (
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          )}
          {size ? "Save" : "Create"}
        </Button>
      </form>
    </Form>
  );
}
