"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import * as StoreApi from "@/lib/api/store";
import { Modal } from "@/components/ui/modal";
import { useStoreModal } from "@/hooks/use-store-modal";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
});

export function StoreModal() {
  const { isOpen, onClose } = useStoreModal();
  const router = useRouter();

  const { data: stores } = useQuery({
    queryKey: ["stores"],
    queryFn: StoreApi.list,
    refetchOnWindowFocus: false,
  });

  const mutation = useMutation({
    mutationFn: StoreApi.create,
    onSuccess: (response) => {
      toast.success("Store created successfully.");
      window.location.assign(`/${response.data.id}`);
    },
    onError: () => {
      toast.error("Failed to create a store.");
    },
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    mutation.mutate(data);
  }

  const hasStores = !!stores && stores.data.length > 0;

  return (
    <Modal
      title="Create store"
      description="Add a new store to manage products and orders."
      isOpen={isOpen}
      onClose={onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={mutation.isPending}
                        placeholder="Store name"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      The name of your store. You can change this later.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                {hasStores && (
                  <Button
                    disabled={mutation.isPending}
                    variant="outline"
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                )}

                <Button type="submit" disabled={mutation.isPending}>
                  {mutation.isPending && (
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
}
