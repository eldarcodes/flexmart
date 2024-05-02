"use client";

import { ShoppingCart } from "lucide-react";

import { Product } from "@/types";
import { Currency } from "@/components/ui/currency";
import { Button } from "@/components/ui/button";

interface InfoProps {
  product: Product;
}

export function Info({ product }: InfoProps) {
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
        <Button className="flex items-center gap-x-2">
          Add to Cart <ShoppingCart />
        </Button>
      </div>
    </div>
  );
}
