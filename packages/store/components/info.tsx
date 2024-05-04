"use client";

import { Check, ShoppingCart } from "lucide-react";

import { Product } from "@/types";
import { Currency } from "@/components/ui/currency";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { cn } from "@/lib/utils";

interface InfoProps {
  product: Product;
}

export function Info({ product }: InfoProps) {
  const cart = useCart();

  const isAlreadyInCart = cart.items.some((item) => item.id === product.id);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
      <div className="mt-3 flex items-end justify-between">
        <p className="text-2xl text-gray-900">
          <Currency value={product.price} />
        </p>
      </div>

      <hr className="my-4" />

      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-2">
          <h3 className="font-semibold text-black">Size:</h3>
          <div>{product.size.value}</div>
        </div>

        <div className="flex items-center gap-x-2">
          <h3 className="font-semibold text-black">Color:</h3>
          <div
            className="h-5 w-5 rounded-full border border-gray-600"
            style={{ backgroundColor: product.color.value }}
          />
        </div>
      </div>

      <div className="mt-10 flex items-center gap-x-3">
        <Button
          onClick={() => cart.addItem(product)}
          className={cn(
            "flex items-center gap-x-2",
            isAlreadyInCart && "bg-green-500"
          )}
        >
          {isAlreadyInCart ? "Added to cart" : "Add to cart"}
          {isAlreadyInCart ? <Check /> : <ShoppingCart />}
        </Button>
      </div>
    </div>
  );
}
