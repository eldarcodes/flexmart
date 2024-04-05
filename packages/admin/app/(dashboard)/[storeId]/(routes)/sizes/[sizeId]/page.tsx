import { db } from "@/lib/db";
import { SizeForm } from "@/components/forms/size-form";
import { Separator } from "@/components/ui/separator";

import { SizeHeading } from "./components/size-heading";

export default async function SizePage({
  params,
}: {
  params: { sizeId: string };
}) {
  const size = await db.size.findUnique({
    where: {
      id: params.sizeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeHeading size={size} />

        <Separator />

        <SizeForm size={size} />
      </div>
    </div>
  );
}
