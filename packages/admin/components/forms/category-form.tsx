"use client";

import { ReloadIcon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Billboard, Category } from "@prisma/client";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";

import * as CategoryApi from "@/lib/api/category";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CategoryFormProps {
  category: Category | null;
  billboards: Billboard[];
}

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Category name must be at least 2 characters.",
  }),
  billboardId: z.string().min(1),
});

export function CategoryForm({ category, billboards }: CategoryFormProps) {
  const router = useRouter();
  const params = useParams();

  const saveCategoryMutation = useMutation({
    mutationFn: (data: CategoryApi.UpdateCategoryInput) => {
      if (category) {
        return CategoryApi.update(category.storeId, category.id, data);
      } else {
        return CategoryApi.create(String(params.storeId), data);
      }
    },

    onSuccess: () => {
      toast.success(
        category
          ? "Category updated successfully."
          : "Category created successfully."
      );

      router.refresh();
      router.push(`/${params.storeId}/categories`);
    },
    onError: () => {
      toast.error(
        category
          ? "Failed to update a category."
          : "Failed to create a category."
      );
    },
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: category || {
      name: "",
      billboardId: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    saveCategoryMutation.mutate(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <div className="md:grid md:grid-cols-3 gap-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={saveCategoryMutation.isPending}
                    placeholder="Category name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="billboardId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Billboard</FormLabel>
                <Select
                  disabled={saveCategoryMutation.isPending}
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        defaultValue={field.value}
                        placeholder="Select a billboard"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {billboards.map((billboard) => (
                      <SelectItem key={billboard.id} value={billboard.id}>
                        {billboard.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button disabled={saveCategoryMutation.isPending} type="submit">
          {saveCategoryMutation.isPending && (
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          )}
          {category ? "Save" : "Create"}
        </Button>
      </form>
    </Form>
  );
}
