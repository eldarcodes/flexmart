"use client";

import { ReloadIcon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Store } from "@prisma/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import * as StoreApi from "@/lib/api/store";
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

interface StoreSettingsFormProps {
  store: Store;
}

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Store name must be at least 2 characters.",
  }),
});

export function StoreSettingsForm({ store }: StoreSettingsFormProps) {
  const router = useRouter();

  const updateStoreMutation = useMutation({
    mutationFn: (data: StoreApi.UpdateStoreInput) =>
      StoreApi.update(store.id, data),
    onSuccess: () => {
      toast.success("Store updated successfully.");
      router.refresh();
    },
    onError: () => {
      toast.error("Failed to update a store.");
    },
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: store,
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    updateStoreMutation.mutate(data);
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
                <FormLabel>Store name</FormLabel>
                <FormControl>
                  <Input
                    disabled={updateStoreMutation.isPending}
                    placeholder="Enter store name"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button disabled={updateStoreMutation.isPending} type="submit">
          {updateStoreMutation.isPending && (
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          )}
          Save
        </Button>
      </form>
    </Form>
  );
}
