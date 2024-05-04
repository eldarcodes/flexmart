import { NextResponse } from "next/server";

import { db } from "@/lib/db";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new Response(null, { headers: corsHeaders });
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { productIds, address, phone } = await req.json();

    if (!productIds || !productIds.length) {
      return new Response("Product ids are required", { status: 400 });
    }

    if (!address) {
      return new Response("Address is required", { status: 400 });
    }

    if (!phone) {
      return new Response("Phone is required", { status: 400 });
    }

    await db.order.create({
      data: {
        storeId: params.storeId,
        isPaid: true,
        address,
        phone,
        orderItems: {
          create: productIds.map((productId: string) => ({
            product: {
              connect: {
                id: productId,
              },
            },
          })),
        },
      },
    });

    const successUrl = `${process.env.FRONTEND_STORE_URL}/cart?success=1`;

    return NextResponse.json({ url: successUrl }, { headers: corsHeaders });
  } catch (error) {
    const errorUrl = `${process.env.FRONTEND_STORE_URL}/cart?canceled=1`;

    return NextResponse.json({ url: errorUrl }, { headers: corsHeaders });
  }
}
