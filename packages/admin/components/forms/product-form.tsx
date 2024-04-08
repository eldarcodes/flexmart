"use client";

import { ReloadIcon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Image, Product } from "@prisma/client";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";

import * as ProductApi from "@/lib/api/product";
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

interface ProductFormProps {
  product: (Product & { images: Image[] }) | null;
}

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Product name must be at least 2 characters.",
  }),
});

export function ProductForm({ product }: ProductFormProps) {
  const router = useRouter();
  const params = useParams();

  const saveProductMutation = useMutation({
    mutationFn: (data: ProductApi.UpdateProductInput) => {
      if (product) {
        return ProductApi.update(product.storeId, product.id, data);
      } else {
        return ProductApi.create(String(params.storeId), data);
      }
    },

    onSuccess: () => {
      toast.success(
        product
          ? "Product updated successfully."
          : "Product created successfully."
      );

      router.refresh();
      router.push(`/${params.storeId}/products`);
    },
    onError: () => {
      toast.error(
        product ? "Failed to update a product." : "Failed to create a product."
      );
    },
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: product || {
      name: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    saveProductMutation.mutate(data);
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
                    disabled={saveProductMutation.isPending}
                    placeholder="Enter product name"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button disabled={saveProductMutation.isPending} type="submit">
          {saveProductMutation.isPending && (
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          )}
          {product ? "Save" : "Create"}
        </Button>
      </form>
    </Form>
  );
}
