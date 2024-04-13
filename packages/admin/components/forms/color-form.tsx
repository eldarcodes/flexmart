"use client";

import { ReloadIcon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Color } from "@prisma/client";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";

import * as ColorApi from "@/lib/api/color";
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

import { ColorPickerField } from "./fields/color-picker";

interface ColorFormProps {
  color: Color | null;
}

const FormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Color name must be at least 2 characters." }),
  value: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: "Invalid hex color code",
  }),
});

export function ColorForm({ color }: ColorFormProps) {
  const router = useRouter();
  const params = useParams();

  const saveColorMutation = useMutation({
    mutationFn: (data: ColorApi.UpdateColorInput) => {
      if (color) {
        return ColorApi.update(color.storeId, color.id, data);
      } else {
        return ColorApi.create(String(params.storeId), data);
      }
    },

    onSuccess: () => {
      toast.success(
        color ? "Color updated successfully." : "Color created successfully."
      );

      router.refresh();
      router.push(`/${params.storeId}/colors`);
    },
    onError: () => {
      toast.error(
        color ? "Failed to update a color." : "Failed to create a color."
      );
    },
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: color || {
      name: "",
      value: "#FF6900",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    saveColorMutation.mutate(data);
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
                    disabled={saveColorMutation.isPending}
                    placeholder="Enter color name"
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
                <FormLabel>Color</FormLabel>
                <FormControl>
                  <ColorPickerField
                    value={field.value}
                    onChange={(color) => field.onChange(color)}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button disabled={saveColorMutation.isPending} type="submit">
          {saveColorMutation.isPending && (
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          )}
          {color ? "Save" : "Create"}
        </Button>
      </form>
    </Form>
  );
}
