"use client";

import { useState } from "react";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader } from "lucide-react";

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
import { useCart } from "@/hooks/use-cart";

interface CheckoutFormProps {}

const FormSchema = z.object({
  phone: z.string().min(2, { message: "Phone be at least 2 characters." }),
  address: z
    .string()
    .min(1, { message: "Address must be at least 1 characters." }),
});

export function CheckoutForm({}: CheckoutFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const cart = useCart();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      phone: "",
      address: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
      {
        productIds: cart.items.map((item) => item.id),
        address: data.address,
        phone: data.phone,
      }
    );
    setIsLoading(false);

    window.location = response.data.url;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-3">
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input
                  disabled={isLoading}
                  placeholder="Enter your phone number"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input
                  disabled={isLoading}
                  placeholder="Enter your address"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={isLoading || !cart.items.length}
          type="submit"
          className="flex items-center w-full justify-center"
        >
          {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
          Place Order
        </Button>
      </form>
    </Form>
  );
}
